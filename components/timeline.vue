<template>
    <el-timeline>
      <el-timeline-item
        v-for="(activity, index) in activities"
        placement="top"
        :key="index"
        :timestamp="activity.timestamp"
      >
        <el-card>
            <h4>{{ activity.title }}</h4>
            <p>{{ activity.content }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </template>
  
  <script lang="ts" setup>
  const activities = [
    {
      title: 'Event start',
      content: 'Update Github template',
      timestamp: '2018-04-15',
    },
    {
      title: 'Approved',
      content: 'Update Github template',
      timestamp: '2018-04-13',
    },
    {
      title: 'Success',
      content: 'Update Github template',
      timestamp: '2018-04-11',
    },
  ]
  </script>

<style scoped>
    .item {
        width: 100px;
    }
</style>
