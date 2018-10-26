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
                <el-table-column label="姓名" min-width="100" align="center" prop='username'>
                </el-table-column>
                <el-table-column label="权限" min-width="150" align="center" prop='role'>
                </el-table-column>
                <el-table-column label="学位" min-width="90" prop="degree" align="center">
                </el-table-column>
                <el-table-column label="邮箱" min-width="200" align="center" prop='email'>
                </el-table-column>
                <el-table-column label="更新日期" min-width="180" prop="updateTime" align="center">
                </el-table-column>
                <el-table-column label="操作" min-width="150" align="center">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.role" placeholder="请选择" size="small" @change="updateRole(scope.row)">
                      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </template>
                  <!--  <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click.prevent="doEditItem()">
                      更新
                    </el-button>
                  </template> -->
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
import sidetab from "../../components/administrator/index"
export default {
  mixins: [mixin],
  props: ['option'],
  components: {
    sidetab
  },
  data() {
    return {
      item: {
        role: ''
      },
      options: [{
        value: 'general',
        label: '一般用户'
      },{
        value: 'expert',
        label: '专家用户'
      },{
        value: 'editor',
        label: '编辑'
      },{
        value: 'webMastor',
        label: '网站管理员'
      },{
        value: 'administrator',
        label: '超级管理员'
      }],
      nowIndex: 1,
      tableData: []
    }
  },
  created() {
    this.getTableData();
  },
  methods: {
    getTableData() {
      let self = this;
      let data = {
        role: null
      };
      let url = 'api/user/info/list'
      let cbk = (res) => {
        if (res.code == 200) {
          self.tableData = res.data;
        }
      };
      this.accessUtil(data, cbk, null, url, 'GET');
      console.log(this.tableData);
    },
    updateRole(item) {
      let data = {
        userId: item.id,
        role: item.role
      };
      let cbk1 = (res) => {
         this.$message({
          showClose: true,
          message: '更新成功',
          type: 'success'
        });
      };
      let cbk2 = (res) => {
         this.$message({
          showClose: true,
          message: '更新失败',
          type: 'danger'
        });
         this.getTableData();
      };
      this.accessUtil(data, cbk1, cbk2, 'api/user/role');
    }
  }
}

</script>
