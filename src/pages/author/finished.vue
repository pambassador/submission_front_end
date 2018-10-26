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
                <el-table-column label="状态" min-width="180" align="center">
                  <template slot-scope="scope">
                    <span v-if="scope.row.result===0">待审稿
                    </span>
                    <span v-else-if="scope.row.result===1">已录用
                    </span>
                    <span v-else-if="scope.row.result===2">已拒绝
                    </span>
                  </template>
                </el-table-column>
                <el-table-column label="投稿日期" min-width="180" prop="updateTime" align="center">
                </el-table-column>
                <!-- <el-table-column label="操作" min-width="220" align="center">
                  <template slot-scope="scope">
                    <el-button size="mini" type="primary" :plain="true" @click.prevent="doDelItem()">
                      删除
                    </el-button>
                  </template>
                </el-table-column> -->
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
      nowIndex: 3,
      tableData: []
    }
  },
  created() {
    this.getTableData();
  },
  methods: {
    getTableData() {
      let self = this;
      let data = {};
      let url = 'api/paper/list?status=finished'
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
