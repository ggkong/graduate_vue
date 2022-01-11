<template>
  
  <div>
    <Header></Header>
    <el-container>
    <el-aside width="200px">
      <el-menu default-active="1" router>
        <el-menu-item index="index" :class="$route.path=='/index'?'is-active':''">首页</el-menu-item>
        <el-menu-item index="newClub">社团招新</el-menu-item>
        <el-menu-item index="question">问题</el-menu-item>
        <el-menu-item index="4">状态</el-menu-item>
        <el-submenu index="5">
          <template slot="title">排行榜</template>
            <el-menu-item index="5-1">刷题榜</el-menu-item>
            <el-menu-item index="5-2">积分榜</el-menu-item>
        </el-submenu>
        <el-submenu index="6">
          <template slot="title">竞赛中心</template>
            <el-menu-item index="6-1">竞赛</el-menu-item>
            <el-menu-item index="6-2">竞赛结果排名</el-menu-item>
        </el-submenu>

        <el-menu-item index="book" :class="$route.path=='/book'?'is-active':''">图书测试</el-menu-item>
        <el-menu-item index="modifyBook" v-if="false" :class="$route.path=='/modifyBook'?'is-active':''">修改图书</el-menu-item>
        <el-menu-item index="upload">上传文件</el-menu-item>
      </el-menu>
        
    </el-aside>
    <el-container>
    <el-header style="height: 20px; line-height: 20px;">标签栏</el-header>

    <el-main>
      <router-view></router-view>
    </el-main>
    
    <el-footer>Footer</el-footer>
  </el-container>
</el-container>
  </div>
</template>

<style>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>

<script>
  import Header from '@/components/Header.vue'
  export default {
    data() {
      return{}
    },
    components:{
      Header,
    }
  };
</script>