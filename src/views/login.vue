<template lang="">
    <div style="width: 100%; height: 100vh; background-color: darkblue;overflow: hidden;">
        <div style="width: 400px; margin: 150px auto;">
            <div style="color: whitesmoke; font-size: 30px; text-align: center;">欢迎登录DZUOJ</div>
            <div style="margin-top: 30px;">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                    <el-form-item prop="username">
                        <el-input prefix-icon="el-icon-user-solid" v-model="ruleForm.username"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input prefix-icon="el-icon-lock" show-password v-model="ruleForm.password"></el-input>
                    </el-form-item>

                    <el-form-item style="text-align: center;">
                        <el-button type="primary" style="width: 45%;" @click="login('ruleForm')">登录</el-button>
                        <el-button type="primary" style="width: 45%;" @click="regster">注册</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>

    </div>
</template>
<script>
    import request from "@/utils/request";
    export default {
        name: 'login',
        data() {
            return {
                ruleForm: {
                    username: '',
                    password: '',
                },
                rules: {
                    username: [{
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur'
                    }],
                    password: [{
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    }],
                }
            }

        },
        methods: {
            login(formName) {
                console.log("测试");
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        request.post("/user/login", this.ruleForm).then((res) => {
                            if (res.code === '0') {
                                this.$message({
                                    type: "success",
                                    message: "登录成功"
                                })
                                this.$router.push("/") //登录成功之后进行页面的跳转，跳转到主页
                            } else {
                                this.$message({
                                    type: "error",
                                    message: res.msg
                                })
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                        this.$message({
                            type: "error",
                            message: "填写信息错误"
                        })
                    }
                })
            },
            regster() {
                this.$router.push("/register")
            }
        },
    }
</script>
<style lang="">

</style>