<template>
  <div class="profile-card">
    <div class="avatar-container">
      <el-avatar 
        :size="120" 
        src="https://avatars.githubusercontent.com/u/86759249?v=4" 
        class="profile-avatar">
      </el-avatar>
      <div class="avatar-ring"></div>
    </div>
    
    <div class="profile-info">
      <h3 class="profile-name">shimauma0312 / Miyamaru Fuki</h3>
      <p class="profile-role">{{ role }}</p>
      <p class="profile-description">
        {{ description }}
      </p>
      
      <div class="profile-stats">
        <div class="stat-item">
          <span class="stat-number">5+</span>
          <span class="stat-label">{{ experienceLabel }}</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-number">5+</span>
          <span class="stat-label">{{ projectsLabel }}</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-number">3</span>
          <span class="stat-label">{{ languagesLabel }}</span>
        </div>
      </div>
      
      <div class="profile-actions">
        <el-button
          class="github-btn"
          tag="a"
          href="https://github.com/shimauma0312"
          target="_blank"
          rel="noopener"
        >
          <template #icon>
            <svg viewBox="0 0 24 24" width="16" height="16">
              <path fill="currentColor" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </template>
          GitHub
        </el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, ref } from 'vue';

const isJapanese = inject('isJapanese', ref(true));

const role = computed(() => isJapanese.value ? 'ソフトウェアエンジニア' : 'Software Engineer');
const description = computed(() => isJapanese.value 
  ? 'スケーラブルなシステムの構築と新しい技術の探求に情熱を注いでいます。' 
  : 'Passionate about building scalable systems and exploring new technologies. ');
const experienceLabel = computed(() => isJapanese.value ? '年経験' : 'Years Experience');
const projectsLabel = computed(() => isJapanese.value ? 'プロジェクト' : 'Projects');
const languagesLabel = computed(() => isJapanese.value ? '言語' : 'Languages');
</script>

<style scoped>
.profile-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: var(--radius-xl);
  padding: var(--spacing-10);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-align: center;
  max-width: 400px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.profile-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 64px rgba(0, 0, 0, 0.18);
  background: rgba(255, 255, 255, 0.2);
}

.avatar-container {
  position: relative;
  display: inline-block;
  margin-bottom: var(--spacing-6);
}

.profile-avatar {
  border: 3px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.avatar-ring {
  position: absolute;
  top: -4px;
  left: -4px;
  right: -4px;
  bottom: -4px;
  border: 2px solid rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
}

.profile-card:hover .avatar-ring {
  opacity: 1;
  transform: scale(1);
}

.profile-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-3);
}

.profile-name {
  font-size: var(--font-size-title-2);
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  margin: 0;
  letter-spacing: -0.2px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.profile-role {
  font-size: var(--font-size-callout);
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  margin: 0;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.profile-description {
  font-size: var(--font-size-subheadline);
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.5;
  margin: var(--spacing-2) 0;
  text-align: center;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.profile-stats {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-4);
  margin: var(--spacing-5) 0;
  padding: var(--spacing-4) 0;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-1);
}

.stat-number {
  font-size: var(--font-size-title-3);
  font-weight: 700;
  color: rgba(255, 255, 255, 0.95);
  line-height: 1;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.stat-label {
  font-size: var(--font-size-caption-1);
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-divider {
  width: 1px;
  height: 24px;
  background-color: rgba(255, 255, 255, 0.3);
}

.profile-actions {
  display: flex;
  gap: var(--spacing-3);
  margin-top: var(--spacing-5);
}

.contact-btn {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
  color: white;
  font-weight: 500;
  border-radius: var(--radius-small);
  padding: var(--spacing-2) var(--spacing-5);
}

.contact-btn:hover {
  background-color: var(--primary-color-hover);
  border-color: var(--primary-color-hover);
}

.github-btn {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  border-radius: var(--radius-small);
  padding: var(--spacing-2) var(--spacing-5);
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.github-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

/* レスポンシブ */
@media (max-width: 640px) {
  .profile-card {
    max-width: 100%;
    padding: var(--spacing-6);
  }
  
  .profile-stats {
    gap: var(--spacing-3);
  }
  
  .profile-actions {
    flex-direction: column;
    width: 100%;
  }
  
  .contact-btn,
  .github-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
