<template>
  <el-container style="height: 100%">
    <!--サイドメニュー-->
    <!--<SideMenu />-->

    <!--メインコンテンツ-->
    <el-container>
      <el-header class="line">
        <h1>Element plus検証用ページ</h1>

      </el-header>
      <el-main>
        <div class="center">
          <el-avatar :size="100" src="https://avatars.githubusercontent.com/u/195411741?v=4" />
          <p>これはVue 3で作成されたホームページです。</p>
          <el-button type="primary">Default</el-button>
        </div>

        <!--スキルカード-->
        <SkillCards class="skills-contents" />

        <!--カルーセル-->>
        <Carousel />

      </el-main>
      <!--<el-footer>aaa</el-footer>-->
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
  margin-top: 20px;
}
</style>
