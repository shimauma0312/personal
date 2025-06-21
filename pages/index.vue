<template>
  <div class="app-container">
    <!-- ナビゲーションヘッダー -->
    <header class="app-header">
      <div class="header-content">
        <h1 class="app-title">shimauma0312</h1>
        <p class="app-subtitle">Software Engineer & System Developer</p>
      </div>
    </header>

    <!-- メインコンテンツエリア -->
    <main class="app-main">
      <div class="content-grid">
        <!-- プロフィールセクション -->
        <section class="profile-section">
          <UserProfile />
        </section>

        <!-- タイムラインセクション -->
        <section class="timeline-section">
          <div class="section-header">
            <h2 class="section-title">Experience</h2>
            <p class="section-subtitle">My professional journey and key milestones</p>
          </div>
          <Timeline />
        </section>
      </div>

      <!-- サイドバー -->
      <aside class="app-sidebar">
        <div class="sidebar-content">
          <QiitaProfile />
        </div>
      </aside>
    </main>
  </div>
</template>
<script setup>
// Composition API スタイルでコンポーネントをインポート
import QiitaProfile from '~/components/qiita-profile.vue';
import UserProfile from '~/components/user-profile.vue';
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  background: linear-gradient(135deg, 
    #667eea 0%, 
    #764ba2 25%, 
    #f093fb 50%, 
    #f5576c 75%, 
    #4facfe 100%
  );
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.app-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  padding: var(--spacing-5) 0;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-6);
  text-align: center;
}

.app-title {
  font-size: var(--font-size-large-title);
  font-weight: 700;
  color: rgba(255, 255, 255, 0.95);
  margin: 0;
  letter-spacing: -0.5px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.app-subtitle {
  font-size: var(--font-size-callout);
  color: rgba(255, 255, 255, 0.8);
  margin: var(--spacing-1) 0 0;
  font-weight: 400;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.app-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-10) var(--spacing-6);
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: var(--spacing-12);
  align-items: start;
}

.content-grid {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-16);
}

.profile-section {
  display: flex;
  justify-content: center;
}

.timeline-section {
  width: 100%;
}

.section-header {
  text-align: center;
  margin-bottom: var(--spacing-12);
}

.section-title {
  font-size: var(--font-size-title-1);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
  letter-spacing: -0.3px;
}

.section-subtitle {
  font-size: var(--font-size-callout);
  color: var(--text-secondary);
  margin: var(--spacing-2) 0 0;
  font-weight: 400;
}

.app-sidebar {
  position: sticky;
  top: calc(var(--spacing-20) + 60px);
  height: fit-content;
}

.sidebar-content {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: var(--radius-large);
  padding: var(--spacing-6);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.sidebar-content:hover {
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 16px 64px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

/* レスポンシブデザイン */
@media (max-width: 968px) {
  .app-main {
    grid-template-columns: 1fr;
    gap: var(--spacing-8);
    padding: var(--spacing-8) var(--spacing-4);
  }
  
  .app-sidebar {
    position: relative;
    top: auto;
  }
  
  .content-grid {
    gap: var(--spacing-12);
  }
}

@media (max-width: 640px) {
  .app-title {
    font-size: var(--font-size-title-1);
  }
  
  .header-content,
  .app-main {
    padding-left: var(--spacing-4);
    padding-right: var(--spacing-4);
  }
  
  .content-grid {
    gap: var(--spacing-8);
  }
  
  .section-header {
    margin-bottom: var(--spacing-8);
  }
}
</style>
