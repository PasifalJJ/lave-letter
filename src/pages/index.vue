<template>
  <el-container>
    <background></background>
    <!-- 文字 -->
    <el-row type="flex" style="position: absolute;left: 13px;top: 14px;" class="hidden-xs-only">
      <el-col>
        <p style="font-family: jg;font-size: 6vw;">GQ and JSC</p>
      </el-col>
    </el-row>

    <el-row
      type="flex"
      style="position: absolute;"
      :style="{top:nameTop+'px',left:nameLeft+'px'}"
      class="hidden-sm-and-up"
    >
      <el-col>
        <div ref="nameW" id="nameW">
          <p style="font-family: jg;font-size: 8vw;">GQ and JSC</p>
        </div>
      </el-col>
    </el-row>

    <!-- time倒计时 -->
    <el-row
      style="position:absolute;"
      :style="{top:timeTop+'px',left:timeLeft+'px',fontSize:timeSize+'px'}"
    >
      <el-col>
        <div ref="timerD" id="timerD" onselectstart="return false;">
          <span
            id="trueLoveTime"
            style="color: #5260aa;font-family: Arial;font-weight:bold"
            onselectstart="return false;"
          >{{loveTime}}</span>
        </div>
      </el-col>
    </el-row>// 鲸鱼
    <animal ref="animal"></animal>
  </el-container>
</template>

<script>
// import NavSelf from "../components/nav";
import "element-ui/lib/theme-chalk/display.css";
import animal from "../components/animal";
import background from "../components/background";

export default {
  name: "index",
  data() {
    return {
      loveTime: " 999 天 99 时 99 分 99 秒 ",
      timeTop: 0,
      timeLeft: 0,
      nameTop: 10,
      nameLeft: 0,
      intervalTimer: {},
      timeSize:10
    };
  },
  components: {
    // NavSelf,
    animal,
    background,
  },
  methods: {
    showTime() {
      // 获取当前时间
      let curTime = new Date();
      // 2020-07-19
      let loveTime = new Date(2020, 7 - 1, 19, 2, 0, 0);

      // 相遇时间
      let curLong = curTime.getTime();
      let loveLong = loveTime.getTime();

      // 间隔时间
      let spaceTime = curLong - loveLong;

      // 获取天
      let day = spaceTime / 1000 / 60 / 60 / 24;
      day = Math.floor(day);
      // 获取月
      let hour = (spaceTime - day * 24 * 60 * 60 * 1000) / 1000 / 60 / 60;
      hour = Math.floor(hour);
      // 获取分
      let minute =
        (spaceTime - day * 24 * 60 * 60 * 1000 - hour * 60 * 60 * 1000) /
        1000 /
        60;
      minute = Math.floor(minute);
      // 获取秒
      let second =
        (spaceTime -
          day * 24 * 60 * 60 * 1000 -
          hour * 60 * 60 * 1000 -
          minute * 60 * 1000) /
        1000;
      second = Math.floor(second);

      if (hour < 10) {
        hour = "0" + hour;
      }

      if (minute < 10) {
        minute = "0" + minute;
      }

      if (second < 10) {
        second = "0" + second;
      }

      this.loveTime =
        "" + day + " 天 " + hour + " 时 " + minute + " 分 " + second + " 秒 ";

      // 设置尺寸位置
      let timeDoc = document.getElementById("timerD");
      this.timeTop = window.innerHeight / 3 - timeDoc.offsetHeight / 2;
      this.timeLeft = window.innerWidth / 2 - timeDoc.offsetWidth / 2;
    },

    timePix() {
      let winWidth = window.innerWidth;
      let pix = 10;
      if (winWidth >= 1920) {
        pix = 25;
      } else if (winWidth >= 1200) {
        pix = 25;
      } else if (winWidth >= 992) {
        pix = 25;
      } else if (winWidth >= 768) {
        pix = 15;
      } else {
        pix = 15;
      }
      return pix;
    },
  },


  mounted() {
    this.intervalTimer = setInterval(this.showTime, 40);

    this.timeSize=this.timePix();

    let nameWoc = document.getElementById("nameW");
    this.nameLeft = window.innerWidth / 2 - nameWoc.offsetWidth / 2;

    let timeDoc = document.getElementById("timerD");
    // this.timeTop=window.innerHeight/2-timeDoc.offsetHeight/2;
    this.timeTop = window.innerHeight / 3 - timeDoc.offsetHeight / 2;
    this.timeLeft = window.innerWidth / 2 - timeDoc.offsetWidth / 2;

    window.onresize = () => {
      let nameWoc = document.getElementById("nameW");
      this.nameLeft = window.windowWidth / 2 - nameWoc.offsetWidth / 2;

      let timeDoc = document.getElementById("timerD");
      this.timeTop = window.windowHeight / 3 - timeDoc.offsetHeight / 2;
      this.timeLeft = window.windowWidth / 2 - timeDoc.offsetWidth / 2;

      // 子组件resize
      this.$refs.animal.onCanvaResize();

      this.timeSize=this.timePix();
    };
  },

  watch: {
    // 监听屏幕宽度
  },
  created() {},
};
</script>

<style>
body {
  position: relative;
  background: #f4f7fd;
  display: -webkit-box;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
}

html {
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}
* {
  margin: 0;
  padding: 0;
}

@font-face {
  font-family: "jg"; /*字体名称*/
  src: url("../assets/font/AcryleScript-PersonalUse.ttf"); /*字体源文件*/
}
</style>

