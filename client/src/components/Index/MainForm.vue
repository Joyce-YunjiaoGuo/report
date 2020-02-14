<template>
    <div>
      <div style="margin-top: 20px">
        <el-button size="mini" @click="handleAddOne()" icon="el-icon-plus">新增</el-button>
        <el-button size="mini" @click="handleAdd()">批量填写</el-button>
        <el-button size="mini" @click="search()" icon="el-icon-search">查找</el-button>
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
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
              icon="el-icon-edit">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              icon="el-icon-delete">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.currentPage"
          :page-sizes="pagination.pageSizes"
          :page-size="pagination.pageSize"
          :layout="pagination.layout"
          :total="pagination.total">
        </el-pagination>
      </div>
      <Modal :modal="modal" :form="form" @closemodal="closeModal()" @update="getList()" />
    </div>
</template>

<script>
import Modal from './Modal';

export default {
  name: 'MainForm',
  components: {
    Modal,
  },
  data() {
    return {
      allTableData: [],
      tableData: [],
      form: {
        date: '',
        project: '',
        team: '',
        content: '',
        id: '',
      },
      modal: {
        show: false,
        type: 'edit',
        title: '',
      },
      pagination: {
        currentPage: 1,
        pageSizes: [10, 20, 30, 40],
        pageSize: 10,
        layout: "total, sizes, prev, pager, next, jumper",
        total: 500,
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.axios.get('/api/profiles')
        .then((res) => {
          this.allTableData = res.data;
          this.setPagination();
        });
    },
    handleDelete(index) {
      const id = this.tableData[index]._id;
      this.axios.delete(`/api/profiles/delete/${id}`)
        .then(() => {
          this.$message({
            message: '删除成功',
            type: 'success',
          });
          this.getList();
        });
    },
    handleAddOne() {
      this.modal = {
        show: true,
        type: 'addOne',
        title: '添加日报',
      };
      this.form = {
        date: '',
        project: '',
        team: '',
        content: '',
        id: '',
      };
    },
    handleAdd() {
      this.modal = {
        show: true,
        type: 'add',
        title: '批量添加日报',
      }
    },
    handleEdit(index, row) {
      this.modal = {
        show: true,
        type: 'edit',
        title: '编辑日报',
      };
      this.form = {
        date: row.date,
        project: row.project,
        team: row.team,
        content: row.content,
        id: this.tableData[index]._id,
      };
    },
    setPagination() {
      this.pagination.currentPage = 1;
      this.pagination.total = this.allTableData.length;
      this.tableData = this.allTableData.filter((ele, index) => index < this.pagination.pageSize);
    },
    handleSizeChange(pageSize) {
      this.pagination.currentPage = 1;
      this.pagination.pageSize = pageSize;
      this.tableData = this.allTableData.filter((ele, index) => index < pageSize);
    },
    handleCurrentChange(current) {
      const {pageSize} = this.pagination;
      this.pagination.currentPage = current;
      this.tableData = this.allTableData.filter((ele, index) => index >= (current-1) * pageSize &&  index < pageSize * current );
    },
    search() {
      this.$router.push('/search');
    }
  },
};
</script>
