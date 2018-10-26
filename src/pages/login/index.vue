<template>
  <div class="main">
    <my-header>
    </my-header>
    <div class="container main-container">
      <div id="importantInfo" class="message" v-show='isShow'>
        <i class="fa fa-times" aria-hidden="true" v-on:click="closeButton"></i>
        <h2>
          <i aria-hidden="true" class="fa fa-bullhorn"></i>
          <span>重要通知</span>
        </h2>
        <p>
          <i aria-hidden="true" class=""></i>
          <b>Important Update: </b> {{item.info.content}} <a href="https://scholaroneideas.secure.force.com/gethelpnow/Article_Page?id=kA1370000009G45CAE" target="new" hidefocus="true">FAQ</a> for more information.
        </p>
      </div>
      <el-row>
        <el-col :span="12">
          <div class="left-info">
            <h3>欢迎来到投稿网站</h3>
            <h2>WSN</h2>
            <p>首先，使用您的用户ID和密码登录。</p>
            <p>如果您不确定自己是否拥有帐户，或忘记了密码，请点击
              <router-link to="/resetPassword" tag="a">重置密码</router-link>按钮。</p>
            <div class="container-bottom">
              <div id="resouces">
                <h4>资源链接</h4>
                <div>
                  <div class="inner-left">
                    <ul>
                      <li>
                        <a href="http://mchelp.manuscriptcentral.com/gethelpnow/" hidefocus="true" target="_blank">用户指南  <i class="fa-external-link"></i> </a>
                      </li>
                      <li>
                        <a href="http://mchelp.manuscriptcentral.com/gethelpnow/" hidefocus="true" target="_blank">用户指南 <i class="fa-external-link"></i></a>
                      </li>
                    </ul>
                  </div>
                  <div class="inner-right">
                    <ul>
                      <li>
                        <a href="http://mchelp.manuscriptcentral.com/gethelpnow/" hidefocus="true" target="_blank">用户指南  <i class="fa-external-link"></i> </a>
                      </li>
                      <li>
                        <a href="http://mchelp.manuscriptcentral.com/gethelpnow/" hidefocus="true" target="_blank">用户指南 <i class="fa-external-link"></i></a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="right-form">
            <div class="login-form">
              <fieldset>
                <h1>Log In</h1>
                <div>
                  <!-- <h4 class="help-block">User ID</h4> -->
                  <field-input type="text" title="用户名" :noMaxTip='1' :required='true' v-model="item.account">
                  </field-input>
                </div>
                <div>
                  <!-- <h4 class="help-block">Password</h4> -->
                  <div class="input-password">
                    <field-input type="password" title="密码" :noMaxTip='1' :required='true' v-model="item.password">
                    </field-input>
                  </div>
                  <span class="reset-password">
                <router-link to="/resetPassword" tag="a">找回密码</router-link>
              </span>
                </div>
                <hr class="hrthin">
                <div>
                  <el-button id="loginButton" type="primary" :disabled='!verify.isPass' v-on:click="loginButton">登陆</el-button>
                  <router-link to="/register" tag="a" class="create-account">注册</router-link>
                </div>
              </fieldset>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <my-footer>
    </my-footer>
  </div>
</template>
<style lang="less" scoped>
.message {
  padding: 8px 35px 8px 14px;
  margin-bottom: 30px;
  color: #9f862f;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
  background-color: #fcf7e8;
  border: 1px solid #dfd4b3;
  .fa-times {
    float: right;
    cursor: pointer;
    font-size: 18px;
  }
}

.right-form {
  font-size: 14px;
  .login-form {
    border: 3px solid #CCC;
    border-radius: 10px;
    padding: 5px 20px 30px 20px;
  }

  h1 {
    font-size: 37px;
    margin: 10px 0;
    font-weight: lighter;
    color: #606060;
    text-rendering: optimizelegibility;
  }
  .login-form {
    .input-password {
      margin-bottom: 10px;
    }
    .hrthin {
      border-top: 1px solid #C8C8C8;
      margin: 10px 0;
    }
    hr {
      padding: 0;
      margin: 20px 0;
      clear: both;
      border: 0;
      border-top: 1px solid #c8c8c8;
      border-bottom: 1px solid #ffffff;
    }
    .create-account {
      line-height: 40px;
      float: right;
      clear: both;
    }
  }
}

.left-info {
  margin-right: 50px;
  padding-top: 5px;
  .container-bottom {
    margin-top: 80px;
    font-size: 14px;
    border: 1px solid #CCC;
    border-radius: 10px;
    padding: 5px 20px 5px 20px;
    .inner-left,
    .inner-right {
      display: inline-block;
      width: 49%;
    }

    .fa-external-link {
      display: inline-block;
      font: normal normal normal 14px/1 FontAwesome;
      font-size: inherit;
      text-rendering: auto;
      -webkit-font-smoothing: antialiased;
    }
    ul {
      margin: 0 0 10px 25px;
    }
    li {
      list-style-type: disc;
      line-height: 25px;
    }
  }
}

a {
  color: #0083bf;
}

p {
  color: #606060;
  font-size: 14px;
}

</style>
<script>
import mixin from "../../server/common.js"
export default {
  mixins: [mixin],
  props: ['option'],
  data() {
    return {
      item: {
        info: '',
        account: '',
        password: '',
      },
      verifyFields: {
        account: {
          isRequired: true,
          verityFn: 'notNull'
        },
        password: {
          isRequired: true,
          verityFn: 'notNull'
        }
      },
      isShow: false
    }
  },
  created() {
    
  },
  methods: {
    closeButton() {
      $("#importantInfo").hide();
    },
    loginButton() {
      var data = {
        account: this.item.account,
        password: this.item.password
      };
      let cbk = (res) => {
        if (res.code == 200) {
          this.$router.push({ path: '/home' });
        }
      };
      this.accessUtil(data, cbk, null, 'api/user/login');
    },

  },
  mounted() {
    var self = this;
    this.$nextTick(() => {
      $.ajax({
        type: "get",
        url: this.GLOBAL.serverSrc + "api/notice/list",
        data: {status:'enabled'},
        dataType: 'json',
        xhrFields: {
          withCredentials: true
        },
        success: function(res) {
          if (res.code == 200){
            self.item.info = res.data[0] || {content:'',subject:''};
            self.isShow = true;
            console.log('test');
          } else{
            console.log('error');
          }
          
        }
      })
    })
  }
}

</script>
