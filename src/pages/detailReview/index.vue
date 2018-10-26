<template>
  <div class="main">
    <my-header></my-header>
    <div class="container main-container">
      
      <el-row>
        <el-col :span="12">
          <div class="left-description">
            <h2>审稿说明</h2>
            <div class="brief-text">
              <p>啊啊啊写不完啊啊啊</p>
            </div>
            <hr>
            <div class="rate-star">
              <div class="block">
                <span class="descripton">标准一balalallalalalalalalalallalala</span>
                <el-rate v-model="item.item1"></el-rate>
              </div>
              <div class="block">
                <span class="descripton">标准一balalallalalalalalalalallalala</span>
                <el-rate v-model="item.item2"></el-rate>
              </div>
              <div class="block">
                <span class="descripton">标准一balalallalalalalalalalallalala</span>
                <el-rate v-model="item.item3"></el-rate>
              </div>
              <div class="block">
                <span class="descripton">标准一balalallalalalalalalalallalala</span>
                <el-rate v-model="item.item4"></el-rate>
              </div>
              <div class="block">
                <span class="descripton">标准一balalallalalalalalalalallalala</span>
                <el-rate v-model="item.item5"></el-rate>
              </div>
            </div>
            <div class="input-description">
              <textarea placeholder="请输入评价" v-model="item.comment" class="text-area">
              </textarea>
            </div>
            <el-button v-on:click="cancel">取消
            </el-button>
            <el-button type="primary" class="pull-right" v-on:click="confirmButton">
              提交
            </el-button>
          </div>
        </el-col>
        <el-col :span="12">
          <ul>
            <li class="component-ul-multi">
              <div class="multi-li-header">
                论文信息
              </div>
              <div class="downloadurl" >
              <span>论文下载链接: </span>
              <a href="#" id="test" class="downUrl" title="点击下载论文" v-on:click="getDownloadUrl">{{item.title}}.pdf</a>
            </div>
           <!--  </li>
            <li class="component-ul-multi"> -->
           <!--    <div class="multi-li-header">
                论文信息
              </div> -->
              <table class="article-info">
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
                <tr class="summary">
                  <td class="left-title">
                    摘要
                  </td>
                  <td class="right-info">
                    <div class="summary" id="hideContent" v-on='{mouseenter:showContent, mouseout:hideContent}'>
                    {{item.summary}}
                  </div>
                  </td>
                </tr>
              </table>
            </li>
          </ul>
        </el-col>
      </el-row>
    </div>
    <my-footer></my-footer>
  </div>
</template>
<style lang="less">
.li-edit-item {
  margin-left: 10px;
}

.sp-edit-title {
  width: 90px!important;
}

.d-edit-wrap {
  margin-left: 100px!important;
}

.main-container {
  .left-description {
    margin-right: 50px;
  }
  .rate-star {
    font-size: 15px;
  }
  .block {
    margin-bottom: 10px;
  }
  .descripton {
    float: left;
    margin-right: 20px;
  }
  .input-description {
    margin-top: 30px;
    margin-bottom: 20px;
  }
  .downloadurl {
    padding: 20px;
    width: 10px;
    width: 90%;
    overflow: hidden;
    text-overflow:ellipsis
  }
  .text-area {
    height: 180px;
    width: 100%;
  }
  .article-info {
    vertical-align: middle;
    table-layout: fixed;
    word-wrap: break-word;
    margin: 20px;
    height: 50px;
    width: 95%;
  }
  .left-title {
    width: 50px;
    text-align: right;
    background-color: #eee;
  }
  .left-title,
  .right-info {
    padding: 10px;
    border: 1px solid #aaa;
    text-overflow: ellipsis; /* for IE */  
    -moz-text-overflow: ellipsis; /* for Firefox,mozilla */  
    overflow: hidden; 
    .summary {
      max-height: 160px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 8;
      overflow: hidden;
    } 
  }
  .downUrl {
    font-weight: bold;
    cursor: pointer;
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
        type: '',
        title: '',
        keywords: '',
        summary: '',
        item1: 0,
        item2: 0,
        item3: 0,
        item4: 0,
        item5: 0,
        comment: ''
      },
      downloadUrl: ''
    }
  },
  created() {
    this.getArticleInfo();
  },
  methods: {
    confirmButton() {
      let self = this;
      let data = {
        item1: this.item.item1,
        item2: this.item.item2,
        item3: this.item.item3,
        item4: this.item.item4,
        item5: this.item.item5,
        comment: this.item.comment,
        paperId: this.$route.params.id || '',
      };
      let cbk = (res) => {
        this.$alert('提交成功', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            self.$router.push({ path: '/review/reviewTask' });
          }
        });
      };
      this.accessUtil(data, cbk, null, 'api/paper/review/comments');
    },
    cancel() {
      this.$router.push({ path: '/review/reviewTask' });
    },
    showContent(){
      $('#hideContent').removeClass('summary');
    },
    hideContent(){
      $('#hideContent').addClass('summary');
    },
    getArticleInfo() {
      console.log(this.item.item1);
      let self = this;
      let data = {
        id: this.$route.params.id || '',
        userId: this.$route.params.userId || '',
        status: this.$route.params.status || '',
      };
      let cbk=(res)=>{
        self.item.type = res.data.type || '';
        self.item.title = res.data.title || '';
        self.item.keywords = res.data.keywords || '';
        self.item.summary = res.data.summary || '';
      };
      this.accessUtil(data, cbk, null, 'api/paper/data', 'GET');
    },
    getDownloadUrl() {
      var self = this;
      this.downloadUrl = this.GLOBAL.serverSrc + 'api/paper/'+ this.$route.params.id;
      $("#test").attr("href", self.downloadUrl);

    },
  }
}

</script>
