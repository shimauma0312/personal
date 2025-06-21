<template>
  <div class="qiita-section">
    <h2 class="qiita-title" @click="handleTitleClick" @keydown.ctrl="handleKeyDown">Qiita Articles</h2>
    
    <!-- ローディング表示 -->
    <el-skeleton :rows="3" animated v-if="loading" />
    
    <!-- 記事一覧 -->
    <div class="articles-container" v-else>
      <el-card v-for="article in articles" :key="article.id" class="article-card" shadow="hover">
        <div class="article-header">
          <h3 class="article-title">
            <a :href="article.url" target="_blank" rel="noopener noreferrer">{{ article.title }}</a>
          </h3>
        </div>
        <div class="article-meta">
          <span class="article-date">{{ formatDate(article.created_at) }}</span>
          <el-tag size="small" type="success" class="like-tag">LGTM {{ article.likes_count }}</el-tag>
        </div>
        <div class="article-tags">
          <el-tag size="small" v-for="tag in article.tags" :key="tag" class="tag">{{ tag }}</el-tag>
        </div>
      </el-card>
      
      <el-empty description="記事が見つかりませんでした" v-if="articles.length === 0"></el-empty>
    </div>
    
    <div class="action-buttons">
      <a href="https://qiita.com/shimauma0322" target="_blank" rel="noopener noreferrer" class="qiita-link">
        <el-button type="primary" class="qiita-button">Qiitaプロフィールを見る</el-button>
      </a>
      <el-button v-if="showUpdateButton" type="success" class="update-button" @click="updateArticles" :loading="updating">
        記事を更新する
      </el-button>
    </div>

    <!-- 秘密の更新モーダル -->
    <el-dialog
      v-model="showSecretDialog"
      title="秘密の更新"
      width="30%"
      :before-close="handleCloseDialog"
    >
      <span>記事データを更新しますか？</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showSecretDialog = false">キャンセル</el-button>
          <el-button type="success" @click="doUpdateArticles" :loading="updating">更新する</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import { onMounted, ref } from 'vue';

// データの定義
const loading = ref(true);
const updating = ref(false);
const articles = ref([]);
const showUpdateButton = ref(false); // 更新ボタンの表示状態
const showSecretDialog = ref(false); // 秘密ダイアログの表示状態
const secretClickCount = ref(0); // シークレットクリック回数
const ctrlPressed = ref(false); // Ctrlキーが押されているか

// 日付フォーマットの関数
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// タイトルクリック時の処理
const handleTitleClick = (event) => {
  // Ctrl + Shift + クリックで秘密のダイアログを表示
  if (event.ctrlKey && event.shiftKey) {
    showSecretDialog.value = true;
    event.preventDefault();
    return;
  }
  
  // 3回連続クリックで更新ボタンを表示/非表示
  secretClickCount.value++;
  
  if (secretClickCount.value >= 3) {
    showUpdateButton.value = !showUpdateButton.value;
    secretClickCount.value = 0;
    
    // 通知を表示
    if (showUpdateButton.value) {
      ElMessage({
        message: '更新ボタンが有効になりました',
        type: 'info',
        duration: 2000
      });
    }
  }
  
  // 一定時間後にクリックカウントをリセット
  setTimeout(() => {
    secretClickCount.value = 0;
  }, 1000);
};

// キー押下時の処理
const handleKeyDown = (event) => {
  if (event.ctrlKey) {
    ctrlPressed.value = true;
  }
};

// ダイアログを閉じる
const handleCloseDialog = () => {
  showSecretDialog.value = false;
};

// Qiitaから記事を取得する関数（JSONファイルから直接読み込み）
const fetchQiitaArticles = async () => {
  try {
    loading.value = true;
    // 静的JSONファイルを直接読み込む（publicフォルダ内）
    const response = await fetch('/personal/qiita-articles.json');
    if (!response.ok) throw new Error('Qiita記事のJSONファイルを取得できませんでした');
    
    const data = await response.json();
    
    // エラーオブジェクトかどうかをチェック
    if (data.error || data.success === false) {
      console.error('APIエラー:', data);
      articles.value = [];
      ElMessage({
        message: 'Qiita記事の読み込みに失敗しました',
        type: 'warning',
        duration: 5000
      });
    } else {
      // 正常にデータが取得できた場合
      articles.value = Array.isArray(data) ? data : [];
    }
  } catch (error) {
    console.error('Qiita記事の取得に失敗しました:', error);
    articles.value = [];
    ElMessage.error('Qiita記事のJSONファイルの読み込みに失敗しました');
  } finally {
    loading.value = false;
  }
};

// APIから最新の記事を取得して更新する関数
const updateArticles = async () => {
  await doUpdateArticles();
};

// 実際に更新を行う共通関数
const doUpdateArticles = async () => {
  try {
    updating.value = true;
    showSecretDialog.value = false;
    
    const response = await fetch('/api/qiita?action=update');
    if (!response.ok) throw new Error('APIリクエストに失敗しました');
    
    const result = await response.json();
    
    if (result.success) {
      ElMessage({
        message: `${result.count}件の記事を更新しました`,
        type: 'success'
      });
      articles.value = result.data || [];
    } else {
      throw new Error(result.message || '更新に失敗しました');
    }
  } catch (error) {
    console.error('記事の更新に失敗しました:', error);
    ElMessage.error(`更新に失敗しました: ${error.message}`);
  } finally {
    updating.value = false;
  }
};

// コンポーネントがマウントされたときに記事を取得
onMounted(() => {
  fetchQiitaArticles();
  
  // グローバルなキーボードイベントリスナーを追加
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Control') {
      ctrlPressed.value = true;
    }
  });
  
  document.addEventListener('keyup', (event) => {
    if (event.key === 'Control') {
      ctrlPressed.value = false;
    }
  });
});
</script>

<style scoped>
.qiita-section {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.qiita-title {
  font-size: var(--font-size-title-3);
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  margin: 0 0 var(--spacing-4);
  user-select: none;
  cursor: pointer;
  letter-spacing: -0.1px;
  transition: color 0.2s ease;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
}

.qiita-title:hover {
  color: rgba(255, 255, 255, 1);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
}

/* 記事一覧のスタイル */
.articles-container {
  flex: 1;
  overflow-y: auto;
  padding-right: var(--spacing-2);
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
  max-height: calc(100vh - 300px);
}

/* カスタムスクロールバー */
.articles-container::-webkit-scrollbar {
  width: 6px;
}

.articles-container::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.articles-container::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
  transition: background 0.2s ease;
}

.articles-container::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

.article-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: var(--radius-medium);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  flex-shrink: 0;
}

.article-card:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.25);
}

:deep(.el-card__body) {
  padding: var(--spacing-4);
}

.article-header {
  margin-bottom: var(--spacing-3);
}

.article-title {
  font-size: var(--font-size-callout);
  font-weight: 500;
  margin: 0;
  line-height: 1.4;
}

.article-title a {
  color: rgba(255, 255, 255, 0.95);
  text-decoration: none;
  transition: color 0.2s ease;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.article-title a:hover {
  color: rgba(255, 255, 255, 1);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
}

.article-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-3);
  font-size: var(--font-size-footnote);
}

.article-date {
  color: rgba(255, 255, 255, 0.7);
  font-weight: 400;
}

.like-tag {
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: rgba(255, 255, 255, 0.95);
  font-size: var(--font-size-caption-2);
  height: 20px;
  line-height: 20px;
  padding: 0 var(--spacing-2);
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-1);
}

.tag {
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.8);
  font-size: var(--font-size-caption-2);
  height: 20px;
  line-height: 20px;
  padding: 0 var(--spacing-2);
}

.action-buttons {
  margin-top: var(--spacing-4);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
  flex-shrink: 0;
}

.qiita-link {
  text-decoration: none;
  display: block;
  width: 100%;
}

.qiita-button {
  width: 100%;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.95);
  font-weight: 500;
  border-radius: var(--radius-small);
  height: 36px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.qiita-button:hover {
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  color: rgba(255, 255, 255, 1);
}

.update-button {
  width: 100%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  border-radius: var(--radius-small);
  height: 36px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.update-button:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.25);
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

/* Element Plus カスタマイズ */
:deep(.el-skeleton__item) {
  background: rgba(255, 255, 255, 0.1);
}

:deep(.el-empty__description) {
  color: rgba(255, 255, 255, 0.7);
  font-size: var(--font-size-footnote);
}

:deep(.el-dialog) {
  border-radius: var(--radius-large);
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

:deep(.el-dialog__header) {
  padding: var(--spacing-5) var(--spacing-6) var(--spacing-3);
}

:deep(.el-dialog__title) {
  font-size: var(--font-size-headline);
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
}

:deep(.el-dialog__body) {
  padding: 0 var(--spacing-6) var(--spacing-5);
  color: rgba(255, 255, 255, 0.8);
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-3);
  margin-top: var(--spacing-5);
}

:deep(.el-button) {
  border-radius: var(--radius-small);
  font-weight: 500;
}
</style>
