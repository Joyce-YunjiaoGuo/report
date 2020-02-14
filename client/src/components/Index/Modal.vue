<template>
    <el-dialog
        :title="modal.title"
        :visible.sync="modal.show">
        <el-form :modal="form">
          <el-form-item label="日期" label-width="120px" prop="date">
              <el-date-picker
                v-if="this.modal.type === 'add'"
                v-model="form.date"
                style="width: 100%;"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
              <el-date-picker
                v-else
                type="date"
                placeholder="选择日期"
                v-model="form.date"
                style="width: 100%;"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
          </el-form-item>
          <el-form-item label="项目名称" label-width="120px" prop="project">
              <el-input v-model="form.project"></el-input>
          </el-form-item>
          <el-form-item label="所属分组" label-width="120px" prop="team">
              <el-input v-model="form.team"></el-input>
          </el-form-item>
          <el-form-item label="工作内容" label-width="120px" prop="content">
              <el-input
                  type="textarea"
                  v-model="form.content"
                  :autosize="{ minRows: 4, maxRows: 8}"
              ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="this.modal.show = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('form')">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    modal: Object,
    form: Object,
  },
  data() {
    return {
      form: {
        date: '',
        project: '',
        team: '',
        content: '',
      },
    };
  },
  methods: {
    submitForm(formName) {
      // add or edit
      const url = this.modal.type === 'edit' ? `edit/${this.form.id}` : this.modal.type;
      const message = this.modal.type === 'edit' ? '编辑成功' : '新增成功';
      this.axios.post(`/api/profiles/${url}`, this.form)
        .then((res) => {
          if (res.data.msg === '已经填写过该日期的日报！') {
            this.$message({
              message: '已经填写过该日期的日报！',
              type: 'error',
            });
          } else {
            this.$message({
              message,
              type: 'success',
            });
            this.modal.show = false;
            this.$emit('update');
          }
        });
    },
  },
};
</script>

