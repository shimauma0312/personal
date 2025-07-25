<template>
  <div class="timeline-container">
    <div class="timeline-line"></div>
    <div
      v-for="(activity, index) in currentActivities"
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
import { computed, inject, ref } from 'vue'

const isJapanese = inject('isJapanese', ref(true))

const activitiesEn = [
  {
    title: 'The Beginning',
    content: `In high school, I was lured by the dream of forex trading and started programming to create a system trade. After much struggle, my prototype magically wiped out my assets in an instant. Burned out, I sold my Nintendo Switch to fund my dating expenses.`,
    timestamp: '2019',
  },
  {
    title: 'HAL',
    content: `A place where I probably absorbed the basics of networking and coding through sheer force of will. I dabbled in audio spectral analysis, played around with machine learning for image recognition, and threw together web apps with whatever tech was lying around. Entered a few coding contests and hackathons like U-22, mostly for the snacks. My win rate? A flawless zero. But hey, at least I was consistent.`,
    timestamp: '2020-04 - 2024-03',
  },
  {
    title: 'Real Estate Tech Company, Development Division',
    content: `Joined a giant IT company in the real estate industry as a telephone staff-slash-debugger (at least, that's what the contract said). But for some reason, my actual job was epic battles with Java batch jobs (mostly losing), and tiptoeing through a minefield of legacy PHP, trying not to trigger a monolithic conflict disaster. My nickname in the office was "the fairy who only appears at night." By day, I was a student; by night, an engineer, which led to chronic sleep deprivation. This, by the way, was the negative event that made me tear up my new grad card. My main KPI was Monster Energy consumption, which, as a fun aside, led to a lovely liver disease.`,
    timestamp: '2021-09 - 2024-03',
  },
  {
    title: 'Major SIer ERP Division (Internship)',
    content: `Sold my soul to Microsoft and conjured an HR system out of the void using .NET. Then, shamelessly, I was made to present the release in front of a crowd. It was my first time touching .NET, and I almost fell in love with Microsoft. Rumor has it they actually deployed what I made, which is, frankly, reckless. Who's going to maintain a jungle built by an intern? When FTP exploded with I/O errors and stopped business, I spent about half a month diving into the kernel to help out, and as a side effect, I overcame my CUI allergy. Honestly, that's not an intern's job. I was mostly there for the free drink server and to master the art of looking busy.`,
    timestamp: '2022-09 - 2022-11',
  },
  {
    title: 'SES Company, Development Department:',
    content: `I vaguely remember cranking out web apps in Go, but the physical debt from my real estate tech days finally caught up with me and my health crashed, so that gig went up in smoke. After that, I had the "pleasure" of deciphering ancient CakePHP scrolls while ignoring the never-ending religious war between Agile and Waterfall in the office. Sacrificed a few brain cells to liver disease (energy drink addiction) and personal drama, but still decided to take on the legendary SES meat grinder in Shinagawa, only to be devoured by the financial darkness. Apparently, that's what it means to be a model Gen Z engineer.`,
    timestamp: '2024-04 - 2024-12',
  },
  {
    title: 'Tech Community:',
    content: `Became a member of an engineer collective. Exploring machine learning, building local LLMs, sharing the latest web tech and war stories, and occasionally setting things on fire with embedded systems and soldering irons. So far, property damage has been kept to a minimum.`,
    timestamp: '2024-05 - Present',
  },
  {
    title: 'A Certain Company, Systems Department:',
    content: `My current job is mainly production operations and new development. My main opponent is a so-called "modular monolith" (read: a chimera). Most days, you'll find me making difficult faces at my monitor, muttering to myself while pacing around, and occasionally poking at code, all while being propped up by Monster Energy. It might look glamorous, but in reality, I'm a full-stack engineer wading through the mud—and sometimes playing doctor for broken PCs. I'm a paperless human, so if you ask me about printer issues, all I can say is, "Printer? What's that?"`,
    timestamp: '2025-01 - Present',
  },
]

const activitiesJa = [
  {
    title: '始まり',
    content: '高校時代、為替という夢の言葉に惑わされ、システムトレードをするためにプログラミングを始めた。\nそして苦労の末に完成した試作品は、まるで魔法のように私の資産を一瞬で消し去った。\n燃え尽きた自分はデート代を捻出するためにNintendo Switchを売った。',
    timestamp: '2019',
  },
  {
    title: 'HAL',
    content: 'おそらく純粋な意志力でネットワークとコーディングの基礎を吸収した場所。\n音声スペクトル解析とか、画像認識の機械学習とか、ウェブアプリをでたらめに組み立てたりした。\nU-22などのいくつかのコーディングコンテスト・ハッカソンに参加したが、主にお菓子目当て。勝率は見事にゼロだった。',
    timestamp: '2020-04 - 2024-03',
  },
  {
    title: '不動産テックな大手会社の開発部門',
    content: '不動産業界では知らない人はいないぐらいの大きなIT企業に、テレフォンスタッフ兼デバッガーとして契約した。だが、なぜかJavaバッチジョブとの壮絶な戦い（大体負け）と、モノリスで起きまくるコンフリクトを殴り飛ばしながらレガシーPHPの地雷原を慎重に歩き回る事が業務になった。\n昼は学生・夜はエンジニアになり、慢性的な睡眠不足に陥ったが、これが後に新卒カードを破り捨てるネガティブイベントのきっかけとなった。\n私の主要業績指標はモンスターエナジーの消費量で、これが楽しい楽しい肝臓の病気につながったのは余談だ。',
    timestamp: '2021-09 - 2024-03',
  },
  {
    title: '大手SIerのERP事業部（インターンシップ）',
    content: 'Microsoft製品に魂を売り、.Netで虚無からHRシステムを錬成した。そして図々しくも大勢の前でリリースプレゼンまでさせられた。\n噂によると実際に導入されたらしいが、それは率直に言って無謀。一体誰がインターンの作ったジャングルを保守するのか。\nI/OエラーでFTPサーバーが爆発して業務が止まった時はカーネルの奥底まで潜り込む手伝いをした。半月ほど残業で潜り込み、その不可抗力でCUIアレルギーを克服してしまった事が思い出。\n無料のドリンクサーバー目当てと、忙しそうに見せる技術の習得のためにそこにいたはずだったのに。',
    timestamp: '2022-09 - 2022-11',
  },
  {
    title: 'SES会社の開発部門:',
    content: 'Golangでウェブアプリを叩き出していたのをぼんやりと覚えているが、不動産テック企業時代からの身体的負債によって体調を崩してオジャンになった。\nその後、社内で勃発したアジャイルvsウォーターフォール宗教論争を無視しながらCakePHPの巻物を解読する楽しい時間があった。\n肝臓の病気（エナドリ中毒）とプライベートのいざこざで脳細胞をいくつか犠牲にしながらも、品川という伝説のSES肉挽き場で炎上案件に抗う事を決意したが、金融の闇に飲み込まれて耐えられるはずがなかった。\nZ世代の鏡らしい良い思い出。',
    timestamp: '2024-04 - 2024-12',
  },
  {
    title: '技術コミュニティ:',
    content: 'エンジニア集団の一員になる。\n機械学習の探求、ローカルLLMの構築、最新のウェブ技術や戦争体験談の共有、そして時々組み込みシステムやハンダごてで何かを燃焼させている。\n今のところ、物的損害は最小限に抑えられている。',
    timestamp: '2024-05 - 現在',
  },
  {
    title: 'とある会社のシステム部門:',
    content: '現在の仕事は、プロダクション運用と新規開発。\nモジュラーモノリスという名のキメラが対戦相手。\n普段はモニターに向かって難しい顔をしたり、ぶつぶつ独り言を言いながらウロウロしたり、モンスターエナジーに支えられながら時々コードをつついたりしている。\n華やかな人生に見えるが、実態は泥沼系フルスタックエンジニア兼パソコンのお医者さん。私はペーパーレス人間なので、プリンターの不具合について聞かれても「プリンター？何それ？」としか答えられない。',
    timestamp: '2025-1 - 現在',
  },
]

const currentActivities = computed(() => {
  return isJapanese.value ? activitiesJa : activitiesEn
})

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
  white-space: pre-line;
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
