<template>
  <div class="main">
    <my-header></my-header>
    <div class="container main-container">
      <el-row>
        <el-col :span="4">
          <sidetab :nowIndex="nowIndex"></sidetab>
        </el-col>
        <el-col :span="20">
          <div class="content-section">
            <div class="ssp-result-table">
              <h2>新建通知</h2>
              <div class="brief-text">
                <p>啊啊啊写到脱发啊啊啊</p>
              </div>
              <p><span class="required">* </span> = 必填选项</p>
              <hr>
              <div>
                <ul>
                  <li class="component-ul-multi">
                    <div class="multi-li-header">
                      添加通知
                    </div>
                    <field-input title='标题' :required='true' v-model='item.subject' size='middle'>
                    </field-input>
                    <field-textarea title='通知内容' :required='true' v-model='item.content' placeholder='请输入内容，不超过300个字' :maxlength='300'></field-textarea>
                  </li>
                  <!-- <li class="component-ul-multi">
                    <div class="multi-li-header">
                      通知内容
                    </div>
                    <field-textarea title='标题' :required='true' v-model='item.title' placeholder='请输入标题，不超过50个字' :maxlength='50'></field-textarea>
                  </li> -->
                </ul>
              </div>
            </div>
            <div class="confirm-btn">
              <el-button type="primary" class="pull-right" v-on:click="confirmSubmission" :disabled='!verify.isPass'>
                确认
              </el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <my-footer></my-footer>
  </div>
</template>
<script>
import mixin from "../../server/common.js"
import sidetab from "../../components/webMastor/index"
export default {
  mixins: [mixin],
  props: ['option'],
  components: {
    sidetab
  },
  data() {
    return {
      item: {
        subject: '',
        content: ''
      },
      nowIndex: 1,
      verifyFields: {
        subject: {
          isRequired: true,
          verityFn: 'notNull'
        },
        content: {
          isRequired: true,
          verityFn: 'notNull'
        }
      }
    }
  },
  methods: {
    confirmSubmission() {
      let self = this;
      let data = {
        subject: this.item.subject,
        content: this.item.content,
        status: 'enabled'
      };
      let cbk = (res) => {
        this.$alert('提交成功', '提示', {
          confirmButtonText: '确定',
          callback: action => {self.item.subject='';self.item.content='' }
        });
      };
      this.accessUtil(data, cbk, null, 'api/notice')
    }
  }
}

</script>
