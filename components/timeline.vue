<template>
    <el-timeline>
      <el-timeline-item
        v-for="(activity, index) in activities"
        placement="top"
        class="item"
        center 
        :key="index"
        :timestamp="activity.timestamp"
        :color="index % 2 === 0 ? '#0bbd87' : '#fa4646'"
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
      title: 'Disaster Prevention Company, Systems Department:',
      content: 'Full-stack development and maintenance of in-house systems, served as an internal system engineer.',
      timestamp: '2025-1',
    },
    {
      title: 'SES Company, Development Department:',
      content: 'Developed web applications using Golang, maintained and reverse-engineered web services using CakePHP, and worked in heavily polluted environments..',
      timestamp: '2024-04',
    },
    {
      title: 'Real Estate Tech Company, Development Division',
      content: 'Back-end development with Zend Framework, Java CLI and batch processing, automated testing with Selenium.',
      timestamp: '2022-09',
    },
    {
      title: 'HAL',
      content: 'Advanced Information Technology Department; developed a module for audio spectral analysis, applied machine learning for image recognition, and created web applications using Spring, Laravel, and C#.net.',
      timestamp: '2021-04',
    },
  ]
  </script>

<style scoped>
    .item {
        width: 60%;
    }
</style>
