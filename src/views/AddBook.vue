<template lang="">
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="名称" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>

            <el-form-item label="作者" prop="author">
                <el-input v-model="ruleForm.author"></el-input>
              </el-form-item>
            
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">创建</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
    </div>
</template>
<script>
    export default {
      name:'addBook',
      data() {
        return {
          ruleForm: {
            name: '',
            author: '',
          },
          rules: {
            name: [
              { required: true, message: '请输入图书名称', trigger: 'blur' },
              //{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            author: [
              { required: true, message: '请输入作者', trigger: 'blur' },
              //{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
          }
        };
      },
      methods: {
        submitForm(formName) {
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
                }).then(function(resp){
                    if(resp.data == 'success'){
                        // 添加成功
                        _this.$message('数据添加成功');
                        _this.$router.push('/book')
                    }else{
                        //  添加失败
                        _this.$message('数据添加失败');

                    }
                })
            } else {
              return false;
            }
          });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        }
      },
      
    }
  </script>
  
<style lang="">
    
</style>