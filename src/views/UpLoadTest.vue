<template lang="">
    <div>
        <el-upload name="uploadFile" action="http://localhost:8181/files/upload" :on-success="fileUploadSuccess"
            :on-error="fileUploadError">
            <el-button type="primary">点击上传</el-button>

        </el-upload>

        <div style="margin-top:20px;">
            <el-select v-model="cmOptions.theme" style="width: 10%;">
                <el-option v-for="theme in themeSelect" :key="theme.value" :label="theme.label" :value="theme.value">
                </el-option>
            </el-select>

            <el-select v-model="cmOptions.mode" style="width: 10%; margin-left: 20px;">
                <el-option v-for="mode in modeSelect" :key="mode.value" :label="mode.label" :value="mode.value">
                </el-option>
            </el-select>
            
            <el-button type="primary" @click="submit" style="margin-left: 20px;">提交代码</el-button>
        </div>
        <div style="text-align: left;margin-top: 20px;">
            <codemirror ref="cm" v-model="code" :options="cmOptions"></codemirror>
            
        </div>
    </div>

</template>
<script>
    // 全局引入vue-codemirror
    import {
        codemirror
    } from 'vue-codemirror';
    // 引入css文件
    import 'codemirror/lib/codemirror.css'
    // 引入主题 可以从 codemirror/theme/ 下引入多个
    import 'codemirror/theme/idea.css'
    import 'codemirror/theme/mbo.css'
    // 引入语言模式 可以从 codemirror/mode/ 下引入多个
    import 'codemirror/mode/javascript/javascript.js'
    import 'codemirror/mode/css/css.js'
    import 'codemirror/mode/xml/xml.js'
    import 'codemirror/mode/clike/clike.js'
    import 'codemirror/mode/markdown/markdown.js'
    import 'codemirror/mode/python/python.js'
    import 'codemirror/mode/r/r.js'
    import 'codemirror/mode/shell/shell.js'
    import 'codemirror/mode/sql/sql.js'
    import 'codemirror/mode/swift/swift.js'
    import 'codemirror/mode/vue/vue.js'

    // 代码提示功能 具体语言可以从 codemirror/addon/hint/ 下引入多个
    import 'codemirror/addon/hint/show-hint.css';
    import 'codemirror/addon/hint/show-hint';

    import 'codemirror/addon/hint/sql-hint';
    import 'codemirror/addon/hint/javascript-hint';
    import 'codemirror/addon/hint/anyword-hint';

    export default {
        name: 'upload',
        data() {
            return {
                fileList: [],
                form: {

                },
                code: '您的代码,上面的两个切换键可以切换语言和主题',
                cmOptions: {
                    // 语言及语法模式
                    mode: 'text/x-sql',
                    // 主题
                    theme: 'mbo',
                    // 显示函数
                    line: true,
                    lineNumbers: true,
                    // 软换行
                    lineWrapping: true,
                    // tab宽度
                    tabSize: 4,
                    hintOptions: {
                        // 避免由于提示列表只有一个提示信息时，自动填充
                        completeSingle: false,
                    },
                },
                themeSelect: [{
                        label: "light",
                        value: "idea"
                    },
                    {
                        label: "dark",
                        value: "mbo"
                    }
                ],
                modeSelect: [{
                        value: 'text/x-java',
                        label: 'Java'
                    },
                    {
                        value: 'text/x-sql',
                        label: 'sql'
                    },
                    {
                        value: 'text/x-c++src',
                        label: 'c++'
                    },
                    {
                        value: 'text/x-python',
                        label: 'python'
                    }
                ]
            };
        },
        methods: {
            fileUploadSuccess(resp) {
                this.$message.success('文件上传成功');
                console.log(resp)
            },
            fileUploadError() {
                this.$message.error('文件上传失败');
            },
            submit(){
                console.log(this.code);
                console.log(this.cmOptions.mode)
            }

        },
        components: {
            codemirror
        },
        mounted() {
            // 代码提示功能 当用户有输入时，显示提示信息
            this.$refs.cm.codemirror.on('inputRead', cm => {
                cm.showHint();
            })
        }


    }
</script>
<style lang="">

</style>