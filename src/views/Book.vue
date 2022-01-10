<template>
  <div style="padding: 10px;">
    <el-table :data="tableData" border stripe style="width: 100%">
      <el-table-column prop="id" label="编号" sortable>
      </el-table-column>
      <el-table-column prop="name" label="书名">
      </el-table-column>
      <el-table-column prop="author" label="作者">
      </el-table-column>

      <el-table-column fixed="right" label="操作">

        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" size="small">修改</el-button>
          <el-button @click="deleteClick(scope.row)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination 
      background layout="prev, pager, next" 
      :page-size="6" 
      :total="totals" 
      @current-change="page">
    </el-pagination>

  </div>
</template>



<script>
  export default {
    methods: {
      handleClick(row) {
        this.$router.push({
          path: '/modifyBook',
          query: {
            id: row.id
          }
        })
        console.log(row);
      },
      page(currentPage) {
        const _this = this
        axios({
            method: 'get',
            url: 'http://localhost:8181/book/findAll/' + currentPage + '/6',
          })
          .then(function (response) {
            console.log(response)
            _this.tableData = response.data.content
            _this.totals = response.data.totalElements

          });
      },
      deleteClick(row) {
        const id = row.id
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 执行删除逻辑
          axios({
            method: 'get',
            url: 'http://localhost:8181/book/delete/' + id,
            responseType: 'stream'
          })
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          window.location.reload()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    },
    created() {
      const _this = this
      axios({
          method: 'get',
          url: 'http://localhost:8181/book/findAll/1/6',
        })
        .then(function (response) {
          console.log(response)
          _this.tableData = response.data.content
          _this.totals = response.data.totalElements

        });
    },

    data() {
      return {
        totals: null,
        tableData: null
      }
    }
  }
</script>

<style>
  .el-main {
    background-color: #e9eef3;
    color: #333;
    /* text-align: center; */
    line-height: 20px !important;
}
</style>