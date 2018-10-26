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
              <el-table :data="tableData" stripe border tooltip-effect="dark">
                <el-table-column type="expand" min-width="90">
                  <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                      <el-form-item label="通知内容">
                        <span>{{ props.row.content }}</span>
                      </el-form-item>
                    </el-form>
                  </template>
                </el-table-column>
                <el-table-column label="ID" min-width="90" align="center" prop='id'>
                </el-table-column>
                <el-table-column label="主题" min-width="150" prop="subject" align="center">
                </el-table-column>
                <el-table-column label="状态" min-width="90" align="center">
                  <template slot-scope="scope">
                    <span v-if = "scope.row.status='enabled'">
                      启用
                    </span>
                    <span v-else-if = "scope.row.status='disabled'">
                      未启用
                    </span>
                  </template> 
                </el-table-column>
                <!-- <el-table-column label="通知内容" min-width="180" align="center" prop='content'>
                </el-table-column> -->
                <el-table-column label="添加日期" min-width="150" prop="updateTime" align="center">
                </el-table-column>
                <el-table-column label="操作" min-width="200" align="center">
                  <template slot-scope="scope">
                    <el-button size="mini" type="success" @click.prevent="doEditItem(scope.row, 'enabled')" :disabled="scope.row.status=='enabled'">
                      启用
                    </el-button>
                    <el-button size="mini" type="warning" @click.prevent="doEditItem(scope.row, 'disabled')" :disabled="scope.row.status=='disabled'">
                      停止
                    </el-button>
                    <el-button size="mini" type="danger" @click.prevent="doEditItem(scope.row, 'deleted')">
                      删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="ssp-result-pagination">
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <my-footer></my-footer>
  </div>
</template>
<style lang="less">
 .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
</style>
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
        title: '',
        content: ''
      },
      nowIndex: 2,
      tableData: [],
      verifyFields: {
        title: {
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
  created() {
    this.getTableData();
  },
  methods: {
    confirmSubmission() {
      let data = {
        title: this.item.title,
        content: this.item.content
      };
      let cbk = (res) => {
        this.$message({
          message: '提交成功',
          type: 'success'
        });
      }
    },
    getTableData() {
      let self = this;
      let data = {
        status: null
      };
      let cbk = (res) => {
        if (res.code == 200) {
          self.tableData = res.data;
        }
      };
      this.accessUtil(data, cbk, null, 'api/notice/list', 'GET');
    },
    doEditItem(item, status) {
      let self = this;
      let data = {
        id: item.id,
        status: status
      };
      let cbk = (res)=>{
        self.getTableData();
      }
      this.accessUtil(data, cbk, null, 'api/notice/status');
    }
  }
}

</script>
