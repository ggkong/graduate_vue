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
              <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
              <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
            </el-form-item>
          </el-form>
    </div>
</template>
<script>
    export default {
      name:'modifyBook',
      data() {
        return {
          ruleForm: {
            name: '',
            author: '',
          },
          rules: {
            name: [
              { required: true, message: '请输入图书名称', trigger: 'blur' },
            ],
            author: [
              { required: true, message: '请输入作者', trigger: 'blur' },
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
                    url: 'http://localhost:8181/book/modifyBook',
                    data: {
                        id: _this.$route.query.id,
                        name: this.ruleForm.name,
                        author: this.ruleForm.author
                    }
                }).then(function(resp){
                    if(resp.data == 'success'){
                        // 添加成功
                        _this.$message('数据修改成功');
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
        }
      },
      created() {
        const _this = this
        // 获取 穿过来的参
        const id = this.$route.query.id
        axios({
            method: 'get',
            url: 'http://localhost:8181/book/findById/'+id,
            responseType: 'stream'
        })
        .then(function (response) {
            console.log(response.data.name);
            _this.ruleForm.author =  response.data.author
            _this.ruleForm.name = response.data.name
        });
      },
    }
  </script>
  
<style lang="">
    
</style>