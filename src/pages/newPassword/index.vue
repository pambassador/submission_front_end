<template>
  <div class="main">
    <div class="wrap">
      <my-header>
      </my-header>
      <div class="container main-container content">
        <div id="webValidation" class="alert alert-error" v-show="!this.ret.isPass">
          <i class="fa fa-exclamation-triangle"></i>
          <strong>请解决以下问题:</strong>
          <ul>
            <li v-show="!this.ret.isPassword">
              请输入8-16位数字字母组合密码.
            </li>
            <li v-show="!this.ret.isEqual">
              两次输入密码不等.
            </li>
          </ul>
        </div>
        <h1>重置密码</h1>
        <p><span class="required">* </span> = 必填选项</p>
        <hr>
        <div>
          <field-input type="password" title="密码" :noMaxTip='1' :required='true' placeholder="密码由8-16位数字与字母组合" v-model="item.password">
          </field-input>
          <field-input type="password" title="确认密码" :noMaxTip='1' :required='true' placeholder="请再次输入新密码" v-model="item.confirmPassword">
          </field-input>
        </div>
        <hr>
        <div class="operate-button">
          <router-link to="/login" tag="el-button">取消</router-link>
          <el-button id="resetPasswordLnk" type="primary" class="pull-right" hidefocus="true" v-on:click="createPassword" :disabled="!verify.isPass">
            确认
          </el-button>
        </div>
      </div>
    </div>
    <my-footer>
    </my-footer>
  </div>
</template>
<style lang='less'>
.content {
  margin: 0 auto;
  width: 60%;
  h1 {
    font-weight: lighter;
    line-height: 40px;
    margin: 10px 0;
  }
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
        password: '',
        confirmPassword: ''
      },
      verifyFields: {
        password: {
          isRequired: true,
          verityFn: 'notNull'
        },
        confirmPassword: {
          isRequired: true,
          verityFn: 'notNull'
        }
      },
      ret: {
        isPass: true,
        isPassword: true,
        isEqual: true
      }
    }
  },
  
  methods: {
    createPassword() {
      var data = {
        safeUserId: this.$route.query.safeUserId,
        password: this.item.password
      };
      console.log(data);
      this.ret = this.verifyPassword(this.item.password, this.item.confirmPassword);
      if(this.ret.isPass){
        let cbk = (res) => {
        if (res.code == 200) {
          this.$alert('密码修改成功，点击确定按钮跳转到登陆页面', '通知', {
            confirmButtonText: '确定',
            callback: action => {
              this.$router.push({ path: '/login' });
            }
          });
          // this.$router.push({ path: '/login' });
        }
      };
      this.accessUtil(data, cbk, null, 'api/user/reset');
      }
      
    },
  }

}

</script>
