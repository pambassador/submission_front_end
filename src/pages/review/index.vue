<template>
  <div class="main">
    <my-header></my-header>
    <div class="container main-container">
      <el-row>
        <el-col :span="4">
          <div class="side-tab">
            <ul class="nav-list">
              <li class="nav-header">
                查看投稿
              </li>
              <li class="nav-submenu" v-for="(item,index) in tabsParam" @click="toggleTabs(index)" :class="{active:index===nowIndex}">
                <a>{{item}}<i class="el-icon-arrow-right"></i></a>
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="20">
          <scoreSubmitted v-show="nowIndex===0"></scoreSubmitted>
          <unfinished v-show="nowIndex===1"></unfinished>
          <finished v-show="nowIndex===2"></finished>
        </el-col>
      </el-row>
    </div>
    <my-footer></my-footer>
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
      }
      .nav-submenu {
        padding: 10px 15px;
      }
      .active {
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
    }
  }
}

</style>
<script>
import mixin from "../../server/common.js"
import finished from "../../components/author/finished"
import unfinished from "../../components/author/unfinished"
import scoreSubmitted from "../../components/review/scoreSubmitted"

export default {
  name: 'newCreate',
  components: {
    finished,
    unfinished,
    scoreSubmitted
  },
  data() {
    return {
      tabsParam: ['审稿任务', '待定', '待定'],
      nowIndex: 0,
      isShow: false
    }
  },
  methods: {
    //切换tab项
    toggleTabs(index) {
      this.nowIndex = index;
      $(window).resize();
    }
  }
}

</script>
