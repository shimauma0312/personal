<template>
  <div class="qiita-section">
    <h2 class="qiita-title">Qiita Articles</h2>    
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
      <el-button type="success" class="update-button" @click="updateArticles" :loading="updating">
        記事を更新する
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import { onMounted, ref } from 'vue';

// データの定義
const loading = ref(true);
const updating = ref(false);
const articles = ref([]);

// 日付フォーマットの関数
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
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
        message: 'Qiita記事の読み込みに失敗しました。「記事を更新する」ボタンを押して最新の記事を取得してください。',
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
  try {
    updating.value = true;
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
});
</script>

<style scoped>
.qiita-section {
  width: 100%;
  max-width: 800px;
  padding: 25px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  text-align: center;
  transition: transform 0.3s ease;
}

.qiita-section:hover {
  transform: translateY(-5px);
}

.qiita-title {
  color: var(--primary-orange);
  font-size: 24px;
  margin-bottom: 15px;
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
  margin-bottom: 10px;
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
</style>
