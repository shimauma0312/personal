<template>
  <div class="welcome-container">
    <div id="canvas-container" ref="canvasContainer"></div>
    <div class="content">
      <h1>WELCOME</h1>
      <p></p>
      <NuxtLink to="@/home" class="button">ENTER SITE</NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const canvasContainer = ref(null);
let p5Instance = null;

onMounted(() => {
  if (process.client) {
    import('p5').then((p5Module) => {
      const p5 = p5Module.default;
      
      p5Instance = new p5(sketch, canvasContainer.value);
    });
  }
});

onBeforeUnmount(() => {
  if (p5Instance) {
    p5Instance.remove();
  }
});

const sketch = (p) => {
  let particles = [];
  const particleCount = 80;
  let colorPalette = [];
  
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    
    // Nuxt風のカラーパレット
    colorPalette = [
      p.color(66, 185, 131, 180),   // Nuxt緑
      p.color(64, 158, 255, 180),   // 青
      p.color(255, 214, 0, 180),    // 黄色
      p.color(245, 108, 108, 180)   // 赤
    ];
    
    // 初期粒子の生成
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    // フレームレートを設定
    p.frameRate(60);
  };
  
  p.draw = () => {
    // 背景色 (Nuxt風の濃い青)
    p.background(26, 26, 46);
    
    // 各粒子の更新と描画
    for (let particle of particles) {
      particle.update();
      particle.draw();
    }
  };
  
  class Particle {
    constructor() {
      this.reset();
      // スクリーンのどこかにランダムに配置
      this.position = p.createVector(
        p.random(p.width), 
        p.random(p.height)
      );
    }
    
    reset() {
      // 基本的なプロパティ
      this.position = p.createVector(p.random(p.width), p.random(p.height));
      this.velocity = p.createVector(p.random(-0.3, 0.3), p.random(-0.3, 0.3));
      this.acceleration = p.createVector(0, 0);
      this.color = p.random(colorPalette);
      this.baseSize = p.random(2, 4);
      this.size = this.baseSize;
      this.maxSpeed = p.random(0.8, 1.8);
      this.maxForce = 0.05;
      this.uniqueOffset = p.random(100);
    }
    
    update() {
      // 緩やかな浮遊効果
      let noiseX = p.noise(this.position.x * 0.003, this.position.y * 0.003, p.frameCount * 0.001 + this.uniqueOffset) - 0.5;
      let noiseY = p.noise(this.position.x * 0.003, this.position.y * 0.003, p.frameCount * 0.001 + 100 + this.uniqueOffset) - 0.5;
      let noiseForce = p.createVector(noiseX, noiseY);
      noiseForce.mult(0.1);
      this.applyForce(noiseForce);
      
      // 画面の端での反発
      let boundaryForce = this.checkEdges();
      this.applyForce(boundaryForce);
      
      // 物理シミュレーション
      this.velocity.add(this.acceleration);
      this.velocity.limit(this.maxSpeed);
      this.position.add(this.velocity);
      this.acceleration.mult(0);
    }
    
    applyForce(force) {
      this.acceleration.add(force);
    }
    
    checkEdges() {
      let force = p.createVector(0, 0);
      const margin = 30;
      
      if (this.position.x < margin) {
        force.x = p.map(this.position.x, 0, margin, 0.1, 0);
      } else if (this.position.x > p.width - margin) {
        force.x = p.map(this.position.x, p.width - margin, p.width, 0, -0.1);
      }
      
      if (this.position.y < margin) {
        force.y = p.map(this.position.y, 0, margin, 0.1, 0);
      } else if (this.position.y > p.height - margin) {
        force.y = p.map(this.position.y, p.height - margin, p.height, 0, -0.1);
      }
      
      return force;
    }
    
    draw() {
      p.noStroke();
      
      // 粒子の描画
      p.fill(this.color);
      p.circle(this.position.x, this.position.y, this.size);
    }
  }
  
  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
};
</script>

<style scoped>
.welcome-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

#canvas-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  z-index: 1;
  text-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

h1 {
  font-size: 3.5rem;
  margin-bottom: 0.2em;
  font-weight: 300;
  letter-spacing: 2px;
  transition: transform 0.3s ease;
}

p {
  font-size: 1.2rem;
  margin-top: 0;
  opacity: 0.9;
  font-weight: 300;
}

.button {
  display: inline-block;
  margin-top: 20px;
  padding: 12px 30px;
  background-color: rgba(255, 255, 255, 0.15);
  color: white;
  text-decoration: none;
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  font-weight: 400;
}

.button:hover {
  background-color: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
}
</style>
