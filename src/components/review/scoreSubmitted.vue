<template>
  <div class="content-section">
    <div class="ssp-result-table">
      <el-table stripe border tooltip-effect="dark">
        <el-table-column label="ID" min-width="90" align="center" prop='creativeid'>
        </el-table-column>
        <el-table-column label="名称" min-width="180" align="center" prop='name'>
        </el-table-column>
        <el-table-column label="投稿人" min-width="100" align="center" prop='username'>
        </el-table-column>
        <el-table-column label="投稿日期" min-width="150" prop="modified_date" align="center">
        </el-table-column>
        <el-table-column label="审稿状态" min-width="180" align="center" prop='status'>
        </el-table-column>
        <el-table-column label="审稿日期" min-width="150" prop="submitted_date" align="center">
        </el-table-column>
        <el-table-column label="操作" min-width="200" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click.prevent="doEditItem()">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="ssp-result-pagination">
    </div>
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
}

</script>
