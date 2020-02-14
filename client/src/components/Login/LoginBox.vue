<template>
    <div class="box">
      <el-form
        :model="loginForm"
        :rules="rules"
        ref="loginForm"
        label-width="70px"
        label-position="left"
        v-loading="loading"
        element-loading-text="登录中"
      >
        <el-form-item label="用户名" prop="username">
            <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
import jwtDecode from 'jwt-decode';

export default {
  name: 'LoginBox',
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
        ],
      },
      loading: false,
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.post('/api/users/login', this.loginForm)
            .then((res) => {
              console.log(res);
              this.$message({
                message: '登录成功',
                type: 'success',
              });
              const { token, id } = res.data;
              localStorage.setItem('token', token);
              localStorage.setItem('userId', id);

              const decoded = jwtDecode(token);
              console.log(decoded);

              this.$store.dispatch('setAuthenticated', !this.isEmpty(decoded));
              this.$store.dispatch('setUser', decoded);
              this.$router.push('/index');
              console.log(res);
            })
            .catch(err => console.log(err));
          return true;
        }
        alert('error submit!!');
        return false;
      });
    },
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)
      );
    },
  },
};
</script>

<style scoped>
.box {
  width: 400px;
  height: 300px;
  padding: 30px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}
</style>

