<template>
    <el-container class="background" style="height: 100%">
      <!--サイドメニュー-->
      <!--<SideMenu />-->
  
      <!--メインコンテンツ-->
      <el-container>
        <el-header class="line">
          <h1>𝙿𝚎𝚢𝚘𝚞𝚗𝚐 𝚈𝚊𝚔𝚒𝚜𝚘𝚋𝚊 𝚒𝚜 𝚕𝚒𝚏𝚎 🍜</h1>
  
        </el-header>
        <el-main class="margin">
          <div class="center">
            <el-avatar :size="100" src="https://avatars.githubusercontent.com/u/86759249?v=4" />
            <p>shimauma0312</p>
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
  header h1 {
    color: rgb(185, 123, 66);
  }
  
  header {
    width: 100%;
    /* --el-border-color */
    border-bottom: 1px solid var(--el-border-color);
  }
  
  .margin-top {
    margin-top: 25px;
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
  
  .background {
    background-color: #ffffff;
  }
  </style>
  