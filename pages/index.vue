<template>
  <el-container class="background" style="height: 100%">
    <!--メインコンテンツ-->
    <el-container>
      <el-header class="header">
        <h1>𝙿𝚎𝚢𝚘𝚞𝚗𝚐 𝚈𝚊𝚔𝚒𝚜𝚘𝚋𝚊 𝚒𝚜 𝚕𝚒𝚏𝚎 🍜</h1>
      </el-header>
      
      <el-container class="content-container">
        <!-- メインエリア -->
        <el-main class="main-content">
          <div class="center">
            <UserProfile />
          </div>

          <!--タイムライン-->
          <Timeline class="margin-top center" />
        </el-main>
        
        <!-- サイドバー（Qiita記事） -->
        <el-aside class="sidebar">
          <QiitaProfile />
        </el-aside>
      </el-container>
    </el-container>
  </el-container>
</template>
<script setup>
// Composition API スタイルでコンポーネントをインポート
import QiitaProfile from '~/components/qiita-profile.vue';
import UserProfile from '~/components/user-profile.vue';
</script>

<style scoped>
:root {
  --primary-orange: #ff7a00;
  --secondary-orange: #ff9e44;
  --dark-orange: #e56c00;
  --light-bg: #fff9f3;
}

header h1 {
  color: var(--primary-orange);
  font-weight: 700;
  margin: 0;
  letter-spacing: 1px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.header {
  width: 100%;
  padding: 20px 0;
  border-bottom: 2px solid var(--secondary-orange);
  box-shadow: 0 2px rgb(255, 123, 0);
  display: flex;
  align-items: center;
  justify-content: center;
}

.margin-top {
  margin-top: 35px;
}

.center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.skills-contents {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
}

.content-container {
  display: flex;
  flex-direction: row;
}

.main-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.sidebar {
  width: 400px;
  padding: 20px 10px;
  background-color: rgba(255, 255, 255, 0.7);
  border-left: 1px solid #eee;
  overflow-y: auto;
}
</style>
