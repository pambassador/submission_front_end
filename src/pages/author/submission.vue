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
              <h2>新建投稿说明</h2>
              <div class="brief-text">
                <p>啊啊啊写不完啊啊啊</p>
              </div>
              <p><span class="required">* </span> = 必填选项</p>
              <hr>
              <div class="new-article">
                <ul>
                  <li class="component-ul-multi">
                    <div class="multi-li-header">
                      类别
                    </div>
                    <field-select title='类别' :required='true' v-model='item.type' :list='meta.type' size='middle'>
                    </field-select>
                  </li>
                  <li class="component-ul-multi">
                    <div class="multi-li-header">
                      论文信息
                    </div>
                    <field-textarea title='标题' :required='true' v-model='item.title' placeholder='请输入标题，不超过50个字' :maxlength='50'></field-textarea>
                    <field-textarea title='摘要' :required='true' v-model='item.summary' placeholder='请输入摘要，不超过300个字' :maxlength='300'></field-textarea>
                    <field-textarea title='关键字' :required='true' v-model='item.keywords' placeholder='请输入关键字，并以逗号隔开，不超过300个字' :maxlength='300'></field-textarea>
                  </li>
                  <li class="component-ul-multi">
                    <div class="multi-li-header">
                      论文上传
                    </div>
                    <el-table :data="artileTable" tooltip-effect="dark">
                      <el-table-column label="操作" min-width="80" align="center">
                        <template slot-scope="scope">
                          <el-button size="mini" type="primary" @click.prevent="doDelItem(scope.row)">
                            删除
                          </el-button>
                        </template>
                      </el-table-column>
                      <el-table-column label="文件名" min-width="180" align="center" prop='title'>
                      </el-table-column>
                      <el-table-column label="上传时间" min-width="180" align="center" prop='updateTime'>
                      </el-table-column>
                      <el-table-column label="操作人" min-width="80" align="center" prop='contributor'>
                      </el-table-column>
                    </el-table>
                    <el-button size="small" class="operate-button"  v-on:click="getUploadInfo"><i class="el-icon-refresh"></i>刷新论文列表</el-button>
                    <ul class="upload-file">
                      <li class="li-edit-item">
                        <span class="sp-edit-title">文件描述</span>
                        <div class="d-edit-wrap">
                          <span class="sp-edit-inner">
                    <div class="field-file">
        <form enctype="multipart/form-data" id="formSubmit">
            <div class="file-tips">
                <strong class="str-tips">
                    <slot name="tips">(文件小于15M)</slot>
                </strong>
            </div>
            <div class="file-upload">
                
                  <el-input v-model="item.url" size="small" disabled></el-input>
                  <input type="file" name="file" accept="application/pdf" class="upload-file" v-on:change="getFile">
                  <!--  <span class="uploading" v-if="ctrl.state==1">上传中...</span>
                          <span class="uploading" v-else-if="ctrl.state==2">上传失败</span> -->
                          <span class="upload-select">选择文件</span>
                          <span class="upload-select" v-on:click='uploadFile'>上传</span>
                          <!-- <input type="submit" value=""> -->
                        </div>
                        </form>
              </div>
              </span>
            </div>
            </li>
            </ul>
            </li>
            </ul>
          </div>
    </div>
    <div class="confirm-btn">
      <el-button type="primary" v-on:click="confirmSubmission" :disabled='!verify.isPass'>
        下一步
      </el-button>
    </div>
  </div>
  </el-col>
  </el-row>
  </div>
  <my-footer></my-footer>
  </div>
</template>
<style lang='less'>
.sp-edit-desc {
  width: 540px !important;
}

.sp-edit-title {
  width: 100px !important;
}

.d-edit-wrap {
  margin-left: 110px !important;
}
.operate-button {
  margin-top: 10px;
}
.field-file {
  border: 1px solid #ddd;
  padding: 5px;
  width: 450px;

  .file-tips {
    font-weight: normal;
    padding-bottom: 5px;
  }

  .file-upload {
    position: relative;
    padding-bottom: 5px;

    .el-input {
      width: 72%;
    }

    .upload-file {
      width: 70px;
      height: 30px;
      opacity: 0;
      position: absolute;
      top: 0;
      right: 50px;
    }

    .upload-select {
      display: inline-block;
      line-height: 25px;
      text-align: center;
      border: 1px solid #ccc;
      font-size: 13px;
      border-radius: 2px;
      cursor: pointer;
      padding: 1px 6px;
    }

    .uploading {
      color: red;
      display: block;
    }
  }
}

.confirm-btn {
  float: right;
}

</style>
<script>
import mixin from "../../server/common.js"
import sidetab from "../../components/author/index"
export default {
  mixins: [mixin],
  props: ['option'],
  components: {
    sidetab
  },
  data() {
    return {
      item: {
        url: (this.$refs.fileName) || '',
        type: '',
        title: '',
        summary: '',
        keywords: '',
        filepath: ''
      },
      nowIndex: 1,
      meta: {
        type: [{
          name: 'test1',
          id: 'test1'
        }, {
          name: 'test2',
          id: 'test2'
        }, {
          name: 'test3',
          id: 'test3'
        }]
      },
      specFields: {
        filepath: {
          url: ''
        },
        file: {

        }
      },
      verifyFields: {
        type: {
          isRequired: true,
          verityFn: 'notNull'
        },
        title: {
          isRequired: true,
          verityFn: 'notNull'
        },
        summary: {
          isRequired: true,
          verityFn: 'notNull'
        },
        keywords: {
          isRequired: true,
          verityFn: 'notNull'
        }
      },
      artileTable: []
    }
  },
  created() {
    this.getCookie();
    this.initEdit();
  },
  methods: {
    initEdit() {
      let data = {
        id: this.$route.params.id || '',
        userId: this.$route.params.userId || '',
        status: this.$route.params.status || ''
      };
      if (this.$route.params.id) {
        let cbk = (res) => {
          if (res.code == 200) {
            this.item.type = res.data.type || '';
            this.item.title = res.data.title || '';
            this.item.summary = res.data.summary || '';
            this.item.keywords = res.data.keywords || '';
          }
        };
        this.accessUtil(data, cbk, null, 'api/paper/data', 'GET');
      }

    },
    getFile(e) {
      this.item.url = e.target.files[0].name || '';
      this.specFields.file = e.target.files[0];
    },
    confirmSubmission() {
      let data = {
        type: this.item.type,
        title: this.item.title,
        summary: this.item.summary,
        keywords: this.item.keywords,
        status: 'unfinished'
      }
      sessionStorage.setItem('articleInfo', JSON.stringify(this.item));
      let cbk1 = (res) => {
        this.$router.push({
          path: '/confirmSubmission'
        });
      };
      let cbk2 = (res) => {
        this.$alert('请先上传论文', '提示', {
          confirmButtonText: '确定'
        });
      }
      this.accessUtil(data, cbk1, cbk2, 'api/paper/data');
    },
    uploadFile() {
      var self = this;
      var file = this.specFields.file;
      var formData = new FormData($('#formSubmit')[0]);
      // formData.append(file.name, file);
      $.ajax({
        async: true,
        // data: $('#formSubmit').serialize(),
        data: formData,
        type: 'POST',
        dataType: 'JSON',
        processData: false,
        contentType: false,
        url: this.GLOBAL.serverSrc + '/api/paper',
        xhrFields: {
          withCredentials: true
        },
        success: function(res) {
          if (res.code == 200 && res.success == true) {
            self.$message({
              message: '上传成功',
              type: 'success'
            });
          } else {
            self.$msgbox({
              title: '警告',
              message: res.message || '上传失败，请重新上传',
              confirmButtonText: '确定',
            });
          }

        },
        error: function(res, type, err) {
          self.$msgbox({
            title: '错误',
            message: '操作错误',
            confirmButtonText: '确定',
          });
        }
      });
    },
    validateSize(file) {
      let ret = 1;
      if (file.size > this.ctrl.maxSize) {
        ret = 0;
        this.failNotice('文件存储空间过大');
      }
      return ret;
    },
    failNotice(msg) {
      layer.alert({
        title: '提示',
        text: msg || '上传失败',
      });
    },
    getUploadInfo() {
      let self = this;
      let title = this.item.url;
      title = title.replace('.pdf', '');
      let data = {
        title: title,
      };
      let cbk = (res) =>{
        let tmp = [];
        if(res.data) {
          tmp.push(res.data);
        }
        
        self.artileTable = tmp;
      };
      this.accessUtil(data, cbk, null, 'api/paper/data', 'GET')
    },
    doDelItem(item) {
      let self = this;
      let url = 'api/paper/'+item.id;
      let data = {};
      let cbk = (res) => {
        self.$message({
          message: "删除成功",
          type: 'success'
        });
        self.artileTable = [];
      };
      this.accessUtil(data, cbk, null, url, "DELETE");
    }
  },
  beforeRouteLeave(to, from, next) {
    from.meta.keepAlive = false;
    next();
  }


}

</script>
