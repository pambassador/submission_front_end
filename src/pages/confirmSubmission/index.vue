<template>
  <div class="main">
    <my-header>
    </my-header>
    <div class="main-container content">
      <table class="confirm-article">
        <tr>
          <td class="left-title">
            期刊
          </td>
          <td class="right-info">
            {{item.journal}}
          </td>
        </tr>
        <tr>
          <td class="left-title">
            类别
          </td>
          <td class="right-info">
            {{item.type}}
          </td>
        </tr>
        <tr>
          <td class="left-title">
            标题
          </td>
          <td class="right-info">
            {{item.title}}
          </td>
        </tr>
        <tr>
          <td class="left-title">
            关键词
          </td>
          <td class="right-info">
            {{item.keywords}}
          </td>
        </tr>
        <tr>
          <td class="left-title">
            摘要
          </td>
          <td class="right-info">
            {{item.summary}}
          </td>
        </tr>
      </table>
      <div class="operation-button">
        <el-button v-on:click="cancel">
          取消
        </el-button>
        <el-button type="primary" class="pull-right" v-on:click="uploadData">
          确认
        </el-button>
      </div>
    </div>
    <my-footer>
    </my-footer>
  </div>
</template>
<style lang="less">
.content {
  margin: 0 auto;
  width: 60%;

  .confirm-article {
    width: 95%;
    height: 200px;
    table-layout: fixed;
    word-wrap: break-word;
  }

  .left-title {
    width: 80px;
    text-align: right;
    background-color: #eee;
  }

  .left-title,
  .right-info {
    padding: 10px;
    border: 1px solid #aaa;
  }

  .operation-button {
    margin: 20px;
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
        journal: 'wsn最强期刊',
        type: '',
        title: '',
        keywords: '',
        summary: ''
      }
    }
  },
  created() {
    var articleInfo = sessionStorage.getItem('articleInfo');
    articleInfo = JSON.parse(articleInfo);
    this.item.type = articleInfo.type;
    this.item.title = articleInfo.title;
    this.item.keywords = articleInfo.keywords;
    this.item.summary = articleInfo.summary;
  },
  methods: {
    cancel() {
      var self = this;
      this.$router.push({ 
        path: '/author/submission',
        // params: {
        //   type: self.item.type,
        //   title
        // } 
      });
    },
    uploadData() {
      let self = this;
      let data = {
        type: this.item.type,
        title: this.item.title,
        summary: this.item.summary,
        keywords: this.item.keywords,
        status: 'finished'
      };
      let cbk = (res) => {
        // this.$message({
        //   message: '论文资料上传成功',
        //   type: 'success'
        // });
        this.$alert('提交成功', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            self.$router.push({path:'/author/finished'});
          }
        });
      }
      this.accessUtil(data, cbk, null, 'api/paper/data')
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.path == '/submission') {
      console.log('ha');
      to.meta.keepAlive = true;
    } else {
      to.meta.keepAlive = false;
    }
    next();
   
  },
}

</script>
