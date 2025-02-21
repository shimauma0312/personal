<template>
  <el-container style="height: 100%">
    <!--サイドメニュー-->
    <SideMenu />
    <!--メインコンテンツ-->
    <el-container>
      <el-header class="line">
        <h1>Element plus検証用ページ</h1>
        <el-icon>
          <Shop />
        </el-icon>
      </el-header>
      <el-main>
        <div>
          <p>これはVue 3で作成されたホームページです。</p>
        </div>
        <el-button type="primary">Default</el-button>
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
</style>
