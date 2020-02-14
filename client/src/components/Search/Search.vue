<template>
    <div>
      <el-container>
        <el-header>Header</el-header>
        <el-container>
            <el-aside width="20%">Aside</el-aside>
            <el-main>
              <div>
                <div class="block">
                  <el-date-picker
                    v-model="form.searchDate"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
                   <el-button size="mini" @click="search()" icon="el-icon-search"></el-button>
                </div>
                <el-table
                  :data="tableData"
                  height="500"
                  style="width: 100%">
                  <el-table-column
                    prop="date"
                    label="日期"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    prop="project"
                    label="项目名称"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="team"
                    label="所属分组"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="content"
                    label="工作内容"
                    width="200">
                  </el-table-column>
                </el-table>
              </div>
            </el-main>
        </el-container>
      </el-container>
    </div>
</template>

<script>


export default {
  data() {
    return {
      tableData: [],
      form: {
        searchDate: '',
      },
    }
  },
  methods: {
    search() {
      this.axios.post('/api/profiles/search', this.form)
        .then(res => this.tableData = res.data);
    }
  },
};
</script>