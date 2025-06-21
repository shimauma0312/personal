<template>
  <div class="timeline-container">
    <div class="timeline-line"></div>
    <div
      v-for="(activity, index) in activities"
      :key="index"
      class="timeline-item"
      :class="{ 'timeline-item-alternate': index % 2 === 1 }"
    >
      <div class="timeline-marker">
        <div class="timeline-dot"></div>
      </div>
      
      <div class="timeline-content">
        <div class="timeline-card">
          <div class="timeline-header">
            <h3 class="timeline-title">{{ activity.title }}</h3>
            <span class="timeline-date">{{ activity.timestamp }}</span>
          </div>
          
          <div class="timeline-body">
            <p class="timeline-description">{{ activity.content }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
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
.timeline-container {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 var(--spacing-4);
}

.timeline-line {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(
    to bottom,
    var(--primary-color) 0%,
    var(--apple-gray-4) 50%,
    var(--primary-color) 100%
  );
  transform: translateX(-50%);
}

.timeline-item {
  position: relative;
  display: flex;
  margin-bottom: var(--spacing-12);
  align-items: flex-start;
}

.timeline-item:last-child {
  margin-bottom: 0;
}

.timeline-marker {
  position: absolute;
  left: 50%;
  top: var(--spacing-4);
  transform: translateX(-50%);
  z-index: 10;
}

.timeline-dot {
  width: 16px;
  height: 16px;
  background: rgba(255, 255, 255, 0.9);
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15), 0 0 0 4px rgba(255, 255, 255, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.timeline-item:hover .timeline-dot {
  transform: scale(1.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2), 0 0 0 6px rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 1);
}

.timeline-content {
  width: calc(50% - var(--spacing-6));
  padding-right: var(--spacing-6);
}

.timeline-item-alternate .timeline-content {
  margin-left: auto;
  padding-right: 0;
  padding-left: var(--spacing-6);
}

.timeline-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: var(--radius-medium);
  padding: var(--spacing-6);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.timeline-card::before {
  content: '';
  position: absolute;
  top: var(--spacing-4);
  width: 0;
  height: 0;
  border: 8px solid transparent;
}

.timeline-card::before {
  right: -16px;
  border-left-color: rgba(255, 255, 255, 0.15);
}

.timeline-item-alternate .timeline-card::before {
  left: -16px;
  right: auto;
  border-left-color: transparent;
  border-right-color: rgba(255, 255, 255, 0.15);
}

.timeline-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 64px rgba(0, 0, 0, 0.15);
  background: rgba(255, 255, 255, 0.2);
}

.timeline-header {
  margin-bottom: var(--spacing-4);
}

.timeline-title {
  font-size: var(--font-size-headline);
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  margin: 0 0 var(--spacing-2);
  line-height: 1.3;
  letter-spacing: -0.1px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.timeline-date {
  font-size: var(--font-size-footnote);
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: var(--spacing-1) var(--spacing-2);
  border-radius: var(--radius-small);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.timeline-body {
  margin: 0;
}

.timeline-description {
  font-size: var(--font-size-subheadline);
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin: 0;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

/* レスポンシブデザイン */
@media (max-width: 768px) {
  .timeline-line {
    left: var(--spacing-4);
  }
  
  .timeline-marker {
    left: var(--spacing-4);
  }
  
  .timeline-content {
    width: calc(100% - var(--spacing-12));
    margin-left: var(--spacing-12);
    padding-right: 0;
    padding-left: 0;
  }
  
  .timeline-item-alternate .timeline-content {
    margin-left: var(--spacing-12);
    padding-left: 0;
  }
  
  .timeline-card::before {
    left: -16px;
    right: auto;
    border-left-color: transparent;
    border-right-color: rgba(255, 255, 255, 0.15);
  }
  
  .timeline-item-alternate .timeline-card::before {
    left: -16px;
    border-left-color: transparent;
    border-right-color: rgba(255, 255, 255, 0.15);
  }
}

@media (max-width: 480px) {
  .timeline-container {
    padding: 0 var(--spacing-2);
  }
  
  .timeline-card {
    padding: var(--spacing-4);
  }
  
  .timeline-title {
    font-size: var(--font-size-callout);
  }
  
  .timeline-description {
    font-size: var(--font-size-footnote);
  }
}
</style>
