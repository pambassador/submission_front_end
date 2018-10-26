<template>
  <div class="side-tab">
    <ul class="nav-list">
      <li class="nav-header">
        投稿管理
      </li>
      <!-- <li class="nav-submenu" v-for="(item,index) in tabsParam" @click="toggleTabs(index)" :class="{active:index===nowIndex}">
                <a>{{item}}<i class="el-icon-arrow-right"></i></a>
              </li> -->
      <router-link class="nav-submenu" to="/author/submission" tag="li" :class="{active:nowIndex===1}">
        新建投稿
        <i class="el-icon-arrow-right"></i>
      </router-link>
      <li class="divider">
      </li>
      <router-link class="nav-submenu" to="/author/unfinished" tag="li" :class="{active:nowIndex===2}">
        未完成投稿
        <i class="el-icon-arrow-right"></i>
      </router-link>
      <li class="divider">
      </li>
      <router-link class="nav-submenu" to="/author/finished" tag="li" :class="{active:nowIndex===3}">
        已完成投稿
        <i class="el-icon-arrow-right"></i>
      </router-link>
    </ul>
  </div>
</template>
<style lang="less">
.main-container {
  .side-tab {
    border-radius: 6px;
    border: 1px solid #d9d9d9;
    min-height: 20px;

    .nav-list {
      .nav-header {
        border-radius: 6px 6px 0 0;
        padding: 10px 0 10px 15px;
        background-color: #4B749B;
      }

      a {
        cursor: pointer;
        color: #000;
      }

      .nav-submenu {
        padding: 10px 15px;
        cursor: pointer;
      }

      a:active {
        background-color: #e5e5e5;
      }

      .el-icon-arrow-right {
        float: right;
      }

      .divider {
        height: 1px;
        margin: 0 15px;
        overflow: hidden;
        background-color: #e5e5e5;
        border-bottom: 1px solid #ffffff;
      }

      .active {
        color: #4B749B;
        font-weight: bold;
      }
    }
  }
}

</style>
<script>
import mixin from "../../server/common.js"
export default {
  props: ['nowIndex'],
  name: 'newCreate',
  data() {
    return {
      // tabsParam: ['新建投稿', '未完成', '已完成'],
      // nowIndex: 0,
      isShow: false
    }
  },
  methods: {
    //切换tab项
    toggleTabs(index) {
      this.nowIndex = index;
      $(window).resize();
    }
  },
  beforeRouteEnter(to, from, next) {
    if (from.name == 'confirmSubmission') {
      to.meta.keepAlive = true;
    } else {
      to.meta.keepAlive = false;
    }
    next();
  }
}

</script>
