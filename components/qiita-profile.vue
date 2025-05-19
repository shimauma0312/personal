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

// Qiitaから記事を取得する関数（JSONファイルから読み込み）
const fetchQiitaArticles = async () => {
  try {
    loading.value = true;
    // サーバーAPIを使用して、キャッシュされたJSON記事データを取得
    const response = await fetch('/api/qiita');
    if (!response.ok) throw new Error('サーバーAPIからデータを取得できませんでした');
    
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
    ElMessage.error('Qiita記事の読み込みに失敗しました');
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
  max-width: 100%;
  text-align: center;
}
.qiita-title {
  color: var(--primary-orange);
  font-size: 24px;
  margin-bottom: 15px;
  user-select: none; /* テキスト選択を無効化 */
  cursor: pointer;
}

.qiita-description {
  color: #555;
  margin-bottom: 20px;
}

.qiita-link {
  text-decoration: none;
  display: inline-block;
}

.qiita-button {
  background-color: var(--primary-orange);
  border-color: var(--primary-orange);
}

.qiita-button:hover {
  background-color: var(--dark-orange);
  border-color: var(--dark-orange);
}

.update-button {
  margin-left: 10px;
}

.action-buttons {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
}

/* 記事一覧のスタイル */
.articles-container {
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.article-card {
  text-align: left;
  transition: all 0.3s ease;
}

.article-card:hover {
  transform: translateY(-3px);
}

.article-header {
  margin-bottom: 10px;
}

.article-title {
  font-size: 16px;
  margin: 0;
  line-height: 1.4;
}

.article-title a {
  color: var(--primary-orange);
  text-decoration: none;
}

.article-title a:hover {
  text-decoration: underline;
  color: var(--dark-orange);
}

.article-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;
}

.article-date {
  color: #777;
}

.like-tag {
  margin-left: 10px;
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.tag {
  margin-right: 5px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}
</style>
