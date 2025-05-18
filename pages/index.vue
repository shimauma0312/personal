<template>
  <el-container class="background" style="height: 100%">
    <!--サイドメニュー-->
    <!--<SideMenu />-->

    <!--メインコンテンツ-->
    <el-container>
      <el-header class="header">
        <h1>𝙿𝚎𝚢𝚘𝚞𝚗𝚐 𝚈𝚊𝚔𝚒𝚜𝚘𝚋𝚊 𝚒𝚜 𝚕𝚒𝚏𝚎 🍜</h1>
      </el-header>
      <el-main class="margin">
        <div class="center profile-container">
          <el-avatar :size="100" src="https://avatars.githubusercontent.com/u/86759249?v=4" class="profile-avatar" />
          <p class="profile-name">shimauma0312</p>
        </div>

        <!--タイムライン-->
        <Timeline class="margin-top center" />
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  name: "HomePage",
};
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

.profile-container {
  padding: 20px;
  background-color: white;
  border-radius: 15px;
  transition: transform 0.3s ease;
}

.profile-avatar {
  border: 3px solid var(--secondary-orange);
}

.profile-container:hover {
  transform: translateY(-5px);
}

.profile-name {
  margin-top: 15px;
  font-size: 18px;
  font-weight: 600;
  color: var(--dark-orange);
}

.skills-contents {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
}
</style>
