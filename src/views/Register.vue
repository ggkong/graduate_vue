<template lang="">
    <div style="width: 100%; height: 100vh; background-color: darkblue;overflow: hidden;">
        <div style="width: 400px; margin: 150px auto;">
            <div style="color: whitesmoke; font-size: 30px; text-align: center;">欢迎注册DZUOJ</div>
            <div style="margin-top: 30px;">
                <el-form ref="form" :model="form" :rules="rules">
                    <el-form-item prop="username">
                        <el-input prefix-icon="el-icon-user-solid" v-model="form.username"></el-input>
                    </el-form-item>

                    <el-form-item prop="password">
                        <el-input prefix-icon="el-icon-lock" show-password v-model="form.password"></el-input>
                    </el-form-item>

                    <el-form-item prop="confirm">
                        <el-input prefix-icon="el-icon-lock" show-password v-model="form.confirm"></el-input>
                    </el-form-item>

                    <el-form-item style="text-align: center;">
                        <el-button type="primary" style="width: 100%;" @click="regsterConfirm('form')">注册</el-button>
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
                form: {
                    username: '',
                    password: '',
                    confirm: '',
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
                    confirm: [{
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    }],
                }
            }

        },
        methods: {
            regsterConfirm(form) {
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        if (this.form.password != this.form.confirm) {
                            this.$message({
                                type: "error",
                                message: "两次输入密码不一致"
                            })
                            return false;
                        } else {
                            //向后台传输数据
                            request.post("/user/register", this.form).then((res) => {
                                if (res.code === '0') {
                                    this.$message({
                                        type: "success",
                                        message: "注册成功"
                                    })
                                    this.$router.push("/login") //登录成功之后进行页面的跳转，跳转到主页
                                } else {
                                    this.$message({
                                        type: "error",
                                        message: res.msg
                                    })
                                }
                            })
                        }

                    } else {
                        this.$message({
                            type: "error",
                            message: "按照提示输入信息"
                        })
                        return false;
                    }
                });
            }
        },
    }
</script>
<style lang="">

</style>