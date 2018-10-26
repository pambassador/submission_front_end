<template>
  <div class="main">
    <my-header>
    </my-header>
    <div class="container main-container content">
      <div id="webValidation" class="alert alert-error" v-show="isShow">
        <i class="fa fa-exclamation-triangle"></i>
        <strong>请解决以下问题:</strong>
        <ul>
          <li>
            请输入正确的邮箱格式
          </li>
        </ul>
      </div>
      <h1>重置密码</h1>
      <p><span class="required">* </span> = 必填选项</p>
      <hr>
      <div>
        <fieldset>
          <h4><span class="required">*</span>
          Your Primary  E-mail For This Site</h4>
          <input id="resetPasswordEmail" type="email" class="input-block" placeholder="email@example.com" v-model='item.email'>
        </fieldset>
      </div>
      <hr>
      <div class="operate-button">
        <router-link to="/login" tag="el-button">取消</router-link>
        <el-button id="resetPasswordLnk" class="pull-right" type="primary" hidefocus="true" @click='sendEmail' :disabled='!verify.isPass'>
          发送邮件
        </el-button>
      </div>
    </div>
    <my-footer>
    </my-footer>
  </div>
</template>
<style lang="less" scoped>
.content {
  margin: 0 auto;
  width: 60%;
  h1 {
    font-weight: lighter;
    line-height: 40px;
    margin: 10px 0;
  }
  input {
    width: 48%;
    border: 1px solid #cccccc;
    height: 20px;
    padding: 4px 6px;
    margin-bottom: 10px;
    font-size: 14px;
    line-height: 20px;
    color: #606060;
    vertical-align: middle;
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
        email: ''
      },
      verifyFields: {
        email: {
          isRequired: true,
          verityFn: 'notNull'
        }
      },
      isShow: false
    }
  },

  methods: {
    sendEmail() {
      var data = {
        email: this.item.email
      };
      if (this.verifyEmail(this.item.email)) {
        this.isShow = false
        let cbk = (res) => {
          if (res.code == 200) {
            this.$alert('邮件已发送', '提示', {
              confirmButtonText: '确定'
            });
          }
        };
        this.accessUtil(data, cbk, null, 'api/user/reset/email');
      } else {
        this.isShow = true;
      }

    }
  }
}

</script>
