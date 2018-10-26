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
                <el-table-column label="ID" min-width="40" align="center" prop='id'>
                </el-table-column>
                <el-table-column label="名称" min-width="180" align="center" prop='title'>
                  <template slot-scope="scope">
                    <a v-text="scope.row.title" @click="showDetail(scope.row)"></a>
                    <el-dialog :title="scope.row.title" :visible.sync="dialogVisible" width="80%">
                      <el-row>
                        <p><span class="required">* </span>只能采纳三条审稿意见</p>
                        <hr>
                        <el-col :span="10">
                          <el-table :data='reviewerData' ref="reviewerTable" size="small" stripe border tooltip-effect="dark" height="400px">
                            <el-table-column type="selection" align="center" width="55" :selectable="selectDisabled">
                              <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.adoptedStatus===2" :disabled="scope.row.status!=='reviewed' || (selectedCount>=3 && scope.row.adoptedStatus === 1)" @change="adoptComments(scope.row)">
                                </el-checkbox>
                              </template>
                            </el-table-column>
                            <el-table-column <el-table-column label="姓名" min-width="90" align="center" prop='username'>
                            </el-table-column>
                            <el-table-column label="状态" min-width="80" align="center">
                              <template slot-scope="scope">
                                <span v-if="scope.row.status=='unconfirmed'">未确认</span>
                                <span v-else-if="scope.row.status=='confirmed'">已确认</span>
                                <span v-else-if="scope.row.status=='rejected'">已拒绝</span>
                                <span v-else-if="scope.row.status=='reviewed'">已审稿</span>
                              </template>
                            </el-table-column>
                            <el-table-column label="审稿意见" min-width="90" align="center">
                              <template slot-scope="scope">
                                <span v-if="scope.row.reviewCommentsStatus==0"无></span>
                                <span v-else-if="scope.row.reviewCommentsStatus==1">审稿中</span>
                                <span v-else-if="scope.row.reviewCommentsStatus==2"><a v-on:click="showComment(scope.row)">查看</a></span>
                              </template>
                            </el-table-column>
                            <el-table-column label="采纳状态" min-width="90" align="center">
                              <template slot-scope="scope">
                                <span v-if="scope.row.adoptedStatus==1">未采纳</span>
                                <span v-else-if="scope.row.adoptedStatus==2">已采纳</span>
                              </template>
                            </el-table-column>
                          </el-table>
                        </el-col>
                        <el-col :span="14">
                          <div class="right-description">
                            <div class="rate-star">
                              <div class="block">
                                <span class="descripton">标准一balalallalalalalalalalallalala</span>
                                <el-rate v-model="item.item1" disabled></el-rate>
                              </div>
                              <div class="block">
                                <span class="descripton">标准一balalallalalalalalalalallalala</span>
                                <el-rate v-model="item.item2" disabled></el-rate>
                              </div>
                              <div class="block">
                                <span class="descripton">标准一balalallalalalalalalalallalala</span>
                                <el-rate v-model="item.item3" disabled></el-rate>
                              </div>
                              <div class="block">
                                <span class="descripton">标准一balalallalalalalalalalallalala</span>
                                <el-rate v-model="item.item4" disabled></el-rate>
                              </div>
                              <div class="block">
                                <span class="descripton">标准一balalallalalalalalalalallalala</span>
                                <el-rate v-model="item.item5" disabled></el-rate>
                              </div>
                            </div>
                            <div class="input-description">
                              <textarea v-model="item.comment" class="text-area" disabled>
                              </textarea>
                            </div>
                          </div>
                        </el-col>
                      </el-row>
                      <span slot="footer" class="dialog-footer">
                      <el-button size="small" @click="dialogVisible = false">取 消</el-button>

                      <el-button size="small" type="primary" @click="getTableData">确 认</el-button>
                    </span>
                    </el-dialog>
                  </template>
                </el-table-column>
                <el-table-column label="投稿人" min-width="90" align="center" prop='contributor'>
                </el-table-column>
                <el-table-column label="投稿日期" min-width="180" prop="updateTime" align="center">
                </el-table-column>
                <el-table-column label="分配状态" min-width="80" align="center">
                  <template slot-scope="scope">
                    <span v-if="scope.row.distributionStatus==0">未分配</span>
                    <span v-else-if="scope.row.distributionStatus==1">已分配</span>
                    <span v-else-if="scope.row.distributionStatus==2">已完成</span>
                  </template>
                </el-table-column>
                <el-table-column label="选择审稿人" min-width="100" align="center">
                  <template slot-scope="scope">
                    <el-button size="small" type="primary" slot="reference" :disabled="scope.row.result===1 || scope.row.result===2" v-on:click="getExpert(scope.row)">选择</el-button>
                    <el-dialog :visible.sync="dialogTableVisible" width="30%">
                      <el-table height="300" ref="multipleTable" :data="expertData" tooltip-effect="light" @selection-change="handleSelectionChange" stripe border fit highlight-current-row>
                        <el-table-column type="selection" align="center" width="55">
                        </el-table-column>
                        <el-table-column prop="username" align="center" label="姓名" min-width="120">
                        </el-table-column>
                        <el-table-column :filters="fields" :filter-method="filterHandler" align="center" min-width="120" prop="degree" label="学历" show-overflow-tooltip>
                        </el-table-column>
                      </el-table>
                      <div class="operate-button">
                        <el-button size="mini" type="text" @click="dialogTableVisible = false">取消</el-button>
                        <el-button type="primary" size="small" class="pull-right" v-on:click="reviewerSelect(scope.row)">确认</el-button>
                      </div>
                    </el-dialog>
                    <!-- <el-button size="mini" type="primary" :plain="true" @click.prevent="doDelItem()">
                      删除
                    </el-button> -->
                  </template>
                </el-table-column>
                <el-table-column min-width="80" align="center" label="录用状态">
                  <template slot-scope="scope">
                    <span v-if="scope.row.result===0">待操作
                    </span>
                    <span v-else-if="scope.row.result===1">已录用
                    </span>
                    <span v-else-if="scope.row.result===2">已拒绝
                    </span>
                  </template>
                </el-table-column>
                <el-table-column min-width="200" align="center" label="操作">
                  <template slot-scope="scope">
                    <el-button type="success" size="small" @click="resultOperate(scope.row, 1)" :disabled="!(scope.row.adoptTotalStatus===1 && scope.row.result === 0)">
                      录用
                    </el-button>
                    <el-button type="danger" size="small" @click="resultOperate(scope.row, 2)" :disabled="!(scope.row.adoptTotalStatus===1 && scope.row.result === 0)">
                      拒绝
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
a {
  color: #0083bf;
  cursor: pointer;
}

.right-description {
  margin-left: 20px;

  .rate-star {
    font-size: 15px;
  }

  .block {
    margin-bottom: 10px;
  }

  .descripton {
    float: left;
  }

  .input-description {
    margin-top: 30px;
    margin-bottom: 10px;
  }

  .text-area {
    height: 220px;
    width: 100%;
  }

}

.operate-button {
  padding-top: 20px;
}

</style>
<script>
import mixin from "../../server/common.js"
import sidetab from "../../components/editor/index"
export default {
  mixins: [mixin],
  props: ['option'],
  components: {
    sidetab
  },
  data() {
    return {
      item: {
        item1: 0,
        item2: 0,
        item3: 0,
        item4: 0,
        item5: 0,
        comment: '',
        paperId: 0,
        contributorId: 0,
      },
      dialogVisible: false,
      dialogTableVisible: false,
      tableData: [],
      reviewerData: [],
      expertData: [],
      multipleSelection: [],
      fields: [],
      selectedCount: 0,
      nowIndex: 1
    }
  },
  created() {
    this.getTableData();


  },
  methods: {
    getExpert(item) {
      this.item.paperId = item.id;
      this.item.contributorId = item.userId;
      let self = this;
      self.dialogTableVisible = true;
      let data = {
        role: 'expert'
      };
      let url = 'api/user/info/list'
      let cbk = (res) => {
        if (res.code == 200) {
          self.expertData = res.data;

        }
      };
      this.accessUtil(data, cbk, null, url, 'GET');
    },
    getTableData() {
      let self = this;
      this.dialogVisible = false;
      let data = {};
      let url = 'api/paper/list?status=finished'
      let cbk = (res) => {
        if (res.code == 200) {
          self.tableData = res.data;
        }
      };
      this.accessUtil(data, cbk, null, url, 'GET');
    },
    handleSelectionChange(val) {
      //val 为选中数据的集合
      this.multipleSelection = val;

    },
    reviewerSelect(item) {
      this.dialogTableVisible = false;
      let self = this;
      // let data = {
      //   // paperId: item.id,
      //   // contributor: item.userId,
      //   reviewerId: JSON.stringify([{ id: 1 }, { id: 2 }])
      // };
      let length = this.multipleSelection.length;
      let data = [];
      let tmpJson = {};
      for (var i = 0; i < length; i++) {
        tmpJson = {
          paperId: self.item.paperId,
          contributorId: self.item.contributorId,
          reviewerId: this.multipleSelection[i].id
        };
        data.push(tmpJson);
      }

      data = JSON.stringify(data);
      // let cbk = (res) => {
      //   console.log('success');
      // };
      // this.accessUtil(data, cbk, null, 'api/paper/distributionTest')
      $.ajax({
        url: this.GLOBAL.serverSrc + 'api/paper/distribution',
        type: 'POST',
        data: data,
        dataType: 'json',
        contentType: 'application/json',
        xhrFields: {
          withCredentials: true
        },
        success(res) {
          self.getTableData();
          self.$message({
            message: '分配成功',
            type: 'success'
          });
        },
        error: function() {
          console.log('oh');
          self.$msgbox({
            title: '错误',
            message: '操作错误',
            confirmButtonText: '确定',
          });
        }
      });
    },
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
    showDetail(item) {
      let self = this;
      let data = {
        paperId: item.id,
      };
      let cbk = (res) => {
        self.dialogVisible = true;
        self.reviewerData = res.data;
        self.getSelectedCount();
        // res.data.forEach(row => {
        //   if (row.adoptedStatus === 1) {
        //     self.$refs.reviewerTable.toggleRowSelection(row, true);
        //   }
        // });
      };
      this.accessUtil(data, cbk, null, 'api/paper/reviewer/list', 'GET', 'false');
      setTimeout(self.selectedComments, 200); //此处存在一个异步函数顺序执行问题待解决
      // self.selectedComments();

    },
    showComment(item) {
      let self = this;
      let data = {
        paperId: item.paperId,
        reviewerId: item.reviewerId
      };
      let cbk = (res) => {
        self.item = res.data;
      };
      this.accessUtil(data, cbk, null, 'api/paper/review/comments', 'GET');
    },

    selectDisabled(row) {
      return row.status === "reviewed";
    },
    selectedComments() {
      let self = this;
      self.reviewerData.forEach(row => {

        if (row.adoptedStatus === 2) {

          self.$refs.reviewerTable.toggleRowSelection(row, true);
        }
      });
    },
    adoptComments(row) {
      let self = this;
      let data = {
        paperId: row.paperId,
        reviewerId: row.reviewerId,
        status: row.adoptedStatus === 1 ? 2 : 1,
      };
      let dataTmp = {
        paperId: row.paperId,
      };
      let cbk = (res) => {
        let cbkTmp = (tmp) => {
          self.reviewerData = tmp.data;
        };
        self.accessUtil(dataTmp, cbkTmp, null, 'api/paper/reviewer/list', 'GET');
        self.getReduceCount(row);
      };
      this.accessUtil(data, cbk, null, 'api/paper/review/comments/status');
    },
    getSelectedCount() {
      let self = this;
      this.selectedCount = 0;
      this.reviewerData.forEach(item => {
        if (item.adoptedStatus === 2) {
          self.selectedCount = self.selectedCount + 1;
          console.log(self.selectedCount);
        }
      })
    },
    getReduceCount(item) {
      if (item.adoptedStatus === 1) {
        this.selectedCount = this.selectedCount + 1;
        console.log(this.selectedCount);
      } else if (item.adoptedStatus === 2 && item.status === 'reviewed') {
        this.selectedCount = this.selectedCount - 1;
        console.log(this.selectedCount);
      }
    },
    resultOperate(item, result) {
      let data = {
        id: item.id,
        result: result
      };
      let cbk = (res) => {
        this.$message({
          message: '操作成功',
          type: 'success'
        });
        this.getTableData();
      };
      this.accessUtil(data, cbk, null, 'api/paper/submission/result');
    }
  }
}

</script>
