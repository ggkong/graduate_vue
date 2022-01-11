<template>
  <div style="padding: 5px;">
    <div style="margin-bottom: 10px; padding-top: 0; float: left;">
      <el-button type="primary" @click="add">添加</el-button>
      <el-button type="primary">按钮</el-button>
      <el-button type="primary">按钮</el-button>
    </div>

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

    <el-pagination background layout="prev, pager, next" :page-size="6" :total="totals" @current-change="page">
    </el-pagination>
    <el-dialog title="添加图书" :visible.sync="dialogVisibleAdd" width="30%" :before-close="handleClose">
      <div style="margin:0 auto; text-align:center;">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="名称" prop="name" style="width: 90%;">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>

          <el-form-item label="作者" prop="author" style="width: 90%;">
            <el-input v-model="ruleForm.author"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-button @click="addButtonCancle">取 消</el-button>
        <el-button type="primary" @click="addButtonSubmit('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
    
    <el-dialog title="修改图书" :visible.sync="dialogVisibleModify" width="30%" :before-close="handleClose">
      <div style="margin:0 auto; text-align:center;">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="名称" prop="name" style="width: 90%;">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>

          <el-form-item label="作者" prop="author" style="width: 90%;">
            <el-input v-model="ruleForm.author"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-button @click="modifyButtonCancle">取 消</el-button>
        <el-button type="primary" @click="modifyButtonSubmit('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>




<script>
  export default {
    methods: {
      modifyButtonCancle() {
        this.dialogVisibleModify = false
        this.ruleForm.name = ''
        this.ruleForm.author = ''
      },
      modifyButtonSubmit(formName){
        const _this = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios({
              method: 'post',
              url: 'http://localhost:8181/book/modifyBook',
              data: {
                id: this.modifyId,
                name: this.ruleForm.name,
                author: this.ruleForm.author
              }
            }).then(function (resp) {
              if (resp.data == 'success') {
                // 添加成功
                _this.$message({
                  message:'数据修改成功',
                  type:'success'
                });
                window.location.reload();
              } else {
                //  添加失败
                _this.$message({
                  message:'数据修改失败',
                  type:'warning'
                  
                });
              }
            })
          } else {
            return false;
          }
        });
      },
      addButtonCancle() {
        this.dialogVisibleAdd = false
        this.ruleForm.name = ''
        this.ruleForm.author = ''
      },
      // 添加方法
      addButtonSubmit(formName) {
        const _this = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.ruleForm)
            axios({
              method: 'post',
              url: 'http://localhost:8181/book/save',
              data: {
                name: this.ruleForm.name,
                author: this.ruleForm.author
              }
            }).then(function (resp) {
              if (resp.data == 'success') {
                // 添加成功
                _this.$message({
                  message:'数据添加成功',
                  type:'success'
                });
                window.location.reload();
              } else {
                //  添加失败
                _this.$message({
                  message:'数据添加失败',
                  type:'warning'
                  
                });
              }
            })
          } else {
            return false;
          }
        });
      },

      add() {
        console.log("add");
        this.dialogVisibleAdd = true
      },
      handleClick(row) {
        // 传输modifyId
        this.modifyId = row.id;
        this.dialogVisibleModify = true
        console.log(row);
        this.ruleForm.name = row.author
        this.ruleForm.author = row.name
        /*this.$router.push({
          path: '/modifyBook',
          query: {
            id: row.id
          }
        })
        console.log(row);*/
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
    // 页面初始调用方法
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
        tableData: null,
        dialogVisibleAdd: false,
        dialogVisibleModify: false,
        modifyId:null,
        ruleForm: {
          name: '',
          author: '',
        },
        rules: {
          name: [{
              required: true,
              message: '请输入图书名称',
              trigger: 'blur'
            },
            //{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          author: [{
              required: true,
              message: '请输入作者',
              trigger: 'blur'
            },
            //{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
        }
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