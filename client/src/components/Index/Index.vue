<template>
    <div>
      <el-container>
        <el-header>Header</el-header>
        <el-container>
            <el-aside width="20%">Aside</el-aside>
            <el-main>
              <MainForm />
            </el-main>
        </el-container>
      </el-container>
    </div>
</template>

<script>
import MainForm from './MainForm';

export default {
  components: {
    MainForm,
  },
};
</script>
