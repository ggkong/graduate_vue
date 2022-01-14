<template>
    <div style="line-height: 50px; height: 50px; border-bottom: 1px solid #ccc; display: flex;">
        <div style="width: 200px; padding-left: 80px; font-weight: bold; color: dodgerblue;">DZUOJ</div>
        <div style="flex: 1;"></div>
        <div style="width: 100px;">
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                    孔格<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item>作者github</el-dropdown-item>
                    <el-dropdown-item command = "logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
    export default {
        name:'Header',
        methods: {
            handleCommand(command){
                if(command === "logout"){
                    this.$router.push('/login')
                    this.$message({
                        type:"success",
                        message:"退出登录成功"
                    })
                }
            }
        },
    }
</script>
<style>
    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }

    .el-icon-arrow-down {
        font-size: 12px;
    }
</style>