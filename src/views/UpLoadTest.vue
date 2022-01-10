<template lang="">
    <div>
        <el-upload
            name="uploadFile"
            action="http://localhost:8181/files/upload"
            :on-success="fileUploadSuccess"
            :on-error="fileUploadError"
        >
            <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
        
    </div>
</template>
<script>
export default {
    name:'upload',
    data() {
      return {
        fileList: [] 
      };
    },
    methods: {
        fileUploadSuccess(resp){
            this.$message.success('文件上传成功');
            console.log(resp)
        },
        fileUploadError(){
            this.$message.error('文件上传失败');
        }
    }
}
</script>
<style lang="">
    
</style>