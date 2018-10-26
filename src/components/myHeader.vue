<template>
  <header class="my-header">
    <div class="navbar">
      <div class="navbar-top">
        <div class="container">
          <ul class="nav-left">
            <li>
              <a target="_blank" href="https://www.bupt.edu.cn/" hidefocus="true">Beijing University Of Posts And Telecommunications™</a>
            </li>
          </ul>
          <ul class="nav-right">
            <li class="nav-link" v-show="isShow">
              <a target="_blank" hidefocus="true">{{item.username}}</a>
            </li>
            <li class="nav-link">
              <a target="_blank" href="http://scholarone.com/products/manuscript/" hidefocus="true">此项待定</a>
            </li>
            <li class="nav-link">
              <a target="_blank" href="http://oprssupport.custhelp.com" hidefocus="true">帮助</a>
            </li>
            <li class="nav-link" v-show="isShow">
              <a target="_blank" hidefocus="true" v-on:click="logOut">退出</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="navbar-logo">
        <div class="container">
          <img src="../assets/logo2019.png">
        </div>
        </div>
        <div class="navbar-breadcrumbs">
          <div class="container">
            <ul class="mainnav" v-if="!isShow">
              <router-link to="/login" tag="li" class="nav-link">
                登陆
              </router-link>
              <router-link to="/resetPassword" tag="li" class="nav-link">
                密码重置
              </router-link>
              <router-link to="/register" tag="li" class="nav-link">
                注册
              </router-link>
            </ul>
            <ul class="mainnav" v-else>
              <router-link to="/home" tag="li" class="nav-link">
                首页
              </router-link>
              <router-link to="/author/submission" tag="li" class="nav-link">
                作者
              </router-link>
              <router-link to="/review/reviewTask" tag="li" class="nav-link">
                审稿
              </router-link>
              <router-link v-if="item.role==='editor'" to="/editor/distribution" tag="li" class="nav-link">
                编辑
              </router-link>
              <router-link v-else-if="item.role==='webMastor'" to="/webMastor/notice" tag="li" class="nav-link">
                网站管理员
              </router-link>
              <router-link v-else-if="item.role==='administrator'" to="/administrator/updateRole" tag="li" class="nav-link">
                超级管理员
              </router-link>
            </ul>
          </div>
        </div>
      </div>
  </header>
</template>
<style lang="less" scoped>
.my-header {
  min-width: 600px;
  margin-bottom: 50px;

  .container {
    ul {
      letter-spacing: -5px;
    }

    li {
      cursor: pointer;
      letter-spacing: normal;
      display: inline-block;
      padding: 0 10px;
      color: #FFF;
      a {
        color: #FFF;
      }
      &:hover {
        background: #4B749B;
      }


    }

    .nav-link {
      border-left: 1px solid #666;
    }

    .active {
      
        background-color: #4B749B;
      
    }
  }
}

.navbar-top {
  vertical-align: middle;
  line-height: 30px;
  background-color: #333;

  border-color: #666;

  .container {
    ul {
      display: inline-block;
    }

    .nav-right {
      float: right;
      clear: both;
    }
  }
}

.navbar-logo {
  background: #fff;

  .container {
    img {
      height: 80px;
      width: 270px;
      max-width: 100%;
      vertical-align: middle;
      border: 0;
    }
  }
}

.navbar-breadcrumbs {
  background: #000;
  font-size: 12px;
  font-weight: bold;
  padding-right: 20px;

  li {
    line-height: 40px;
  }
}

</style>
<script>
import mixin from "../server/common.js"
export default {
  mixins: [mixin],
  props: ['option'],
  data() {
    return {
      item: {
        username: '',
        role: ''
      },
      isShow: false
    }
  },
  created() {
    this.isLogin();
    this.isActive()
  },
  methods: {
    isLogin() {
      this.item.username = this.getCookie('username');
      this.item.role = this.getCookie('role');
      if (this.item.username) {
        this.isShow = true;
        console.log(this.isShow);
      } else {
        this.isShow = false;
      }
    },
    logOut() {
      let data = {};
      let cbk = (res) => {
        if (res.code == 200) {
          this.$router.push({ path: '/login' });
        }
      };
      this.accessUtil(data, cbk, null, 'api/user/logout', 'GET');
    },
    isActive() {
      $(document).on('click','.nav-link',function () {
        $(this).addClass('active').siblings().removeClass('active');
    })
    }
  }
}

</script>
