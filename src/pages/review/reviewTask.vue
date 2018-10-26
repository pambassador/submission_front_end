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
                <el-table-column label="ID" min-width="90" align="center" prop='paperId'>
                </el-table-column>
                <el-table-column label="名称" min-width="180" align="center" prop='title'>
                </el-table-column>
                <el-table-column label="投稿日期" min-width="150" prop="submissionTime" align="center">
                </el-table-column>
                <el-table-column label="审稿状态" min-width="180" align="center" >
                  <template slot-scope="scope">
                            <span v-if="scope.row.status=='unconfirmed'">未确认</span>
                            <span v-else-if="scope.row.status=='confirmed'">已确认</span>
                            <span v-else-if="scope.row.status=='rejected'">已拒绝</span>
                            <span v-else-if="scope.row.status=='reviewed'">已审稿</span>
                        </template>
                </el-table-column>
                <el-table-column label="审稿日期" min-width="150" prop="reviewTime" align="center">
                </el-table-column>
                <el-table-column label="操作" min-width="150" align="center">
                  <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click.prevent="doEditItem(scope.row)" :disabled="scope.row.status!=='confirmed'">
                      审稿
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
import sidetab from "../../components/review/index"
export default {
  mixins: [mixin],
  props: ['option'],
  components: {
    sidetab
  },
  data() {
    return {
      nowIndex: 1,
      tableData:[],
    }

  },
  created() {
    this.getTableData();
  },
  methods:{
    getTableData() {
      let self = this;
      let data = {};
      let url = 'api/paper/review/list'
      let cbk = (res) => {
        if (res.code == 200) {
          self.tableData = res.data;
        }
      };
      this.accessUtil(data, cbk, null, url, 'GET');
      console.log(this.tableData);
    },
    doEditItem(item) {
      this.$router.push({
        name: 'detailReview',
        params: {
          id: item.paperId || '',
          userId: item.contributorId || '',
          status: 'finished'
        },
      });

    }
  }
}

</script>
