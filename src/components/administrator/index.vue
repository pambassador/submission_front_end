<template>
  <div class="side-tab">
    <ul class="nav-list">
      <li class="nav-header">
        管理员功能
      </li>
      <!-- <li class="nav-submenu" v-for="(item,index) in tabsParam" @click="toggleTabs(index)" :class="{active:index===nowIndex}">
                <a>{{item}}<i class="el-icon-arrow-right"></i></a>
              </li> -->
      <!-- <router-link class="nav-submenu" to="/editor/notice" tag="li">
        <a>
          添加通知
          <i class="el-icon-arrow-right"></i>
        </a>
      </router-link>
      <li class="divider">
      </li> -->
      <router-link class="nav-submenu" to="/administrator/updateRole" tag="li" :class="{active:nowIndex===1}">
        更新用户权限
        <i class="el-icon-arrow-right"></i>
      </router-link>
      <li class="divider">
      </li>
      <router-link class="nav-submenu" to="/administrator/updateRole" tag="li" :class="{active:nowIndex===2}">
        功能待定
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
export default {
  props: ['nowIndex'],
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
  }
}

</script>
