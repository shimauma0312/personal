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
    content: 'My current soul-crushing gig involves a lot of screen-gazing, mostly trying to get Nuxt3, Laravel, and SQLServer to behave for our in-house systems. And soon, a large-scale destructive war, also known as the "core system replacement," is scheduled to unfold. You can usually find me making difficult faces at my monitor, muttering to myself while pacing, or fueled by Monster Energy, occasionally prodding some code. It\'s a glamorous life.',
    timestamp: '2025-1 - Present',
  },
  {
    title: 'Joined a Certain Mysterious Tech Community:',
    content: 'Became part of a shadowy cabal of engineers in May 2024. Our agenda? Delving into AI, attempting to build our own (hopefully not too sentient) LLMs, swapping war stories about the latest web tech and those ever-so-stable core systems, and occasionally making things go "boom" with embedded systems and soldering irons. So far, property damage has been minimal.',
    timestamp: '2024-05 - Present',
  },
  {
    title: 'SES Company, Development Department:',
    content: 'Ah, the SES epoch. Vaguely recall hammering out some web apps with Go. Then there was that fun time deciphering ancient CakePHP scrolls – "reverse-engineering," they called it. Pretty sure I sacrificed a few brain cells in those trenches and barely escaped the legendary SES meat grinder. Good times? Debatable.',
    timestamp: '2024-04',
  },
  {
    title: 'Major IT Services Company (Internship)',
    content: 'Internship saga: conjured an HR system from the ether using C#.NET and SQLServer. Then they made me *talk* about it. In front of *people*. The audacity. Rumor has it they actually deployed it, which is frankly terrifying. I was mainly there for the free coffee and perfecting the art of looking busy.',
    timestamp: '2022-09',
  },
  {
    title: 'Real Estate Tech Company, Development Division',
    content: 'Pretty sure I signed up to be a debugger here, but somehow ended up in epic battles with Java batch jobs (mostly losing) and carefully navigating a minefield of legacy PHP, trying not to be the one who broke it all. It was, technically speaking, employment. My key performance indicator was Monster Energy consumption, which, fun fact, led to a delightful liver ailment.',
    timestamp: '2021-09',
  },
  {
    title: 'HAL',
    content: 'HAL: where I absorbed network and coding fundamentals, probably through sheer willpower. Tinkered with making sound waves look cool (audio spectral analysis), taught computers to play peek-a-boo (machine learning for image recognition), and haphazardly assembled some web apps with Spring, Laravel, and C#.Net, mostly because I could. Entered a few coding contests, mostly for the snacks. My win rate was impressively zero. But hey, I showed up!',
    timestamp: '2020-04',
  },
];
  </script>

<style scoped>
    .item {
        width: 60%;
    }
</style>
