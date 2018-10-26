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
                <el-table-column label="ID" min-width="90" align="center" prop='id'>
                </el-table-column>
                <el-table-column label="名称" min-width="180" align="center" prop='title'>
                </el-table-column>
                <el-table-column label="投稿日期" min-width="180" prop="updateTime" align="center">
                </el-table-column>
                <el-table-column label="操作" min-width="220" align="center">
                  <template slot-scope="scope">
                    <el-button size="mini" type="danger" :plain="true" @click.prevent="doDelItem(scope.row)">
                      删除
                    </el-button>
                    <el-button size="mini" type="primary" :plain="true" @click.prevent="doEditItem(scope.row)">
                      编辑
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
      nowIndex: 2,
      tableData: []
    }
  },
  created() {
    this.getTableData();
  },
  methods: {
    doDelItem(item) {
      let url = 'api/paper/' + item.id;
      let data = {};
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let cbk = (res) => {
          if (res.code == 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getTableData();
          }
        };
        this.accessUtil(data, cbk, null, url, 'DELETE')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    doEditItem(item) {
      // this.userInfo = {
      //   id: item.id || '',
      //   userId: item.userId || '',
      //   status: 'unfinished'
      // };

      // sessionStorage.setItem('userInfo', 't');

      this.$router.push({
        name: 'submission',
        params: {
          id: item.id || '',
          userId: item.userId || '',
          status: 'unfinished'
        },
      });
    },
    getTableData() {
      let self = this;
      let data = {};
      let url = 'api/paper/list?status=unfinished'
      let cbk = (res) => {
        if (res.code == 200) {
          self.tableData = res.data;
        }
      };
      this.accessUtil(data, cbk, null, url, 'GET');
      console.log(this.tableData);
    }
  }
}

</script>

