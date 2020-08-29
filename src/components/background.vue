<template>
  <!-- moon背景 -->
  <canvas style="position: absolute;left:0px;top:0px" id="background" ref="background">Canvas not supported.</canvas>
</template>
<script>

export default {

  name: "animal",
  props:{},
  data() {
    return {
    
    };
  },
  components: {
      
  },

  mounted() {
    let canvas = document.getElementById('background');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // canvas.style.width = window.innerWidth + "px"
    // canvas.style.height = window.innerHeight + "px"

    if (!canvas || !canvas.getContext) {
      return false;
    }

    /********************
      Random Number
    ********************/

    function rand(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    /********************
      let
    ********************/

    let ctx = canvas.getContext('2d');
    let X = canvas.width = window.innerWidth;
    let Y = canvas.height = window.innerHeight;

    let shapes = [];
    let shapeNum = Y / 4;

    /********************
      Animation
    ********************/

    window.requestAnimationFrame =
      window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function(cb) {
        setTimeout(cb, 17);
      };

    /********************
      Shape
    ********************/
    
    function Shape(ctx, x, y, i) {
      this.ctx = ctx;
      this.init(x, y, i);
    }
    
    Shape.prototype.init = function(x, y, i) {
      this.x = x;
      this.y = y;
      this.i = i;
      this.r = 2;
      this.a = rand(0, 360);
      this.rad = this.a * Math.PI / 180;
      this.ga = Math.random() * Math.random() * Math.random();
      this.inA = Math.random();
      this.scaleX = 100 - i / 2;
      this.dist = shapeNum - i;
    };

    Shape.prototype.draw = function() {
      let ctx  = this.ctx;
      ctx.save();
      ctx.fillStyle = 'white';
      ctx.globalCompositeOperation = 'lighter';
      ctx.globalAlpha = this.ga;
      ctx.translate(Math.sin(this.rad) * this.dist + this.x, this.y);
      ctx.scale(this.scaleX, 1);
      ctx.translate(-Math.sin(this.rad) * this.dist - this.x, -this.y);
      ctx.beginPath();
      ctx.arc(Math.sin(this.rad) * this.dist + this.x, this.y, this.r, 0, Math.PI * 2, false);
      ctx.fill();
      ctx.restore();
    };

    Shape.prototype.updateParams = function() {
      this.a += this.inA;
      this.rad = this.a * Math.PI / 180;
    };

    Shape.prototype.render = function() {
      this.updateParams();
      this.draw();
    };
    
    for (let i = 0; i < shapeNum; i++) {
      let s = new Shape(ctx, X / 2, Y - i * 1, i);
      shapes.push(s);
    }

    /********************
      Moon
    ********************/
    
    let radius = 200;
    if(X>=1920){
      radius=200;
    }else if(X>=1200){
      radius=200;
    }else if(X>=992){
      radius=200;
    }else if(X>=768){
      radius=150;
    }else{
      radius=100;
    }

    function drawMoon() {
      ctx.save();
      ctx.beginPath();
      ctx.fillStyle = 'white';
      ctx.shadowColor = 'white';
      ctx.shadowBlur = 100;
      ctx.arc(X / 2, Y / 3, radius, 0, Math.PI * 2, false);
      ctx.fill();
      ctx.restore();
    }
    
    /********************
      Kirakira
    ********************/

    let particleNum = 500;
    let particles = [];
    
    function Particle(ctx, x, y) {
      this.ctx = ctx;
      this.init(x, y);
    }
    
    Particle.prototype.init = function(x, y) {
      this.x = x;
      this.y = y;
      this.r = rand(5, 10);
      this.ga = Math.random() * Math.random() * Math.random() * Math.random();
      this.v = {
        x: 0,
        y: -Math.random() * Math.random()
      };
      this.l = rand(10, 50);
    };

    Particle.prototype.draw = function() {
      let ctx  = this.ctx;
      ctx.save();
      ctx.fillStyle = 'white';
      ctx.globalCompositeOperation = 'lighter';
      ctx.globalAlpha = this.ga;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
      ctx.fill();
      ctx.restore();
    };

    Particle.prototype.updateParams = function() {
      this.a += this.inA;
      this.rad = this.a * Math.PI / 180;
      this.l -= 0.1;
      if (this.l < 0) {
        this.init(rand(0, X), rand(Y - Y / 4, Y));
      }
    };

    Particle.prototype.updatePositon = function() {
      this.y += this.v.y;
    };

    Particle.prototype.render = function() {
      this.updatePositon();
      this.updateParams();
      this.draw();
    };
    
    for (let i = 0; i < particleNum; i++) {
      let p = new Particle(ctx, rand(0, X), rand(Y - Y / 4, Y));
      particles.push(p);
    }

    /********************
      Render
    ********************/
    
    function render() {
      ctx.clearRect(0, 0, X, Y);
      drawMoon();
      for (let i = 0; i < shapes.length; i++) {
        shapes[i].render(i);
      }
      for (let i = 0; i < particles.length; i++) {
        particles[i].render(i);
      }
      requestAnimationFrame(render);
    }

    render();

    /********************
      Event
    ********************/
    
    function onResize() {
    let canvas = document.getElementById('background');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    canvas.style.width = window.innerWidth + "px"
    canvas.style.height = window.innerHeight + "px"

      X = canvas.width = window.innerWidth;
      Y = canvas.height = window.innerHeight;
      shapes = [];
      if (X < 768) {
        radius = 100;
      } else {
        radius = 150;
      }
      for (let i = 0; i < shapeNum; i++) {
        let s = new Shape(ctx, X / 2, Y - i * 1, i);
        shapes.push(s);
      }
    }

    window.addEventListener('resize', function() {
      onResize();
    });

  },

  methods: {
    
  },

};
</script>

<style>
    canvas#background {
    display: block;
    background: #360033;
    background: -webkit-linear-gradient(to bottom, #0b8793, #360033);
    background: linear-gradient(to bottom, #0b8793, #360033); 
    }
</style>
