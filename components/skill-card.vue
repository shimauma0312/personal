<template>
  <el-space wrap>
    <el-card v-for="i in 3" :key="i" class="box-card">
      <el-header>
        <h2>Skills</h2>
      </el-header>
      <el-row>
        <el-col>
          Java
        </el-col>
        <el-col>
          PHP
        </el-col>
        <el-col>
          JavaScript
        </el-col>
        <el-col>
          Python
        </el-col>
        <el-col>
          Ruby
        </el-col>
        <el-col>
          C#
        </el-col>
      </el-row>
    </el-card>
  </el-space>
</template>

<style>
.box-card {
  width: 300px;
  margin: 10px;
}
</style>
