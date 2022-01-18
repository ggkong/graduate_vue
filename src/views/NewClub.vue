<template>
    <div>
        <p>hello world</p>
        <el-button @click="buy">购买测试按钮</el-button>
    </div>
</template>

<script>
    import request from "@/utils/request";
    export default {
        name: 'NewClub',
        data() {
            return {

            }
        },
        methods: {
            buy() {
                const user = JSON.parse(sessionStorage.getItem("user"))
                const userIdStr = user.id;
                const bookIdStr = '1482257375111979010';
                
                request.get("/order/buy",{
                    params:{
                        bookId:bookIdStr,
                        userId:userIdStr
                    }
                })
                .then((res)=>{
                    console.log(res)
                    window.open(res.data)
                })
            }
        },
    }
</script>

<style>

</style>