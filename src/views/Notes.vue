<template>
    <div style="padding: 5px;text-align: left; ">
        <div style="margin: 10px 0">
            <el-button type="primary" @click="add">新增</el-button>
        </div>

        <!--    搜索区域-->
        <div style="margin: 10px 0">
            <el-input v-model="searchContext" placeholder="请输入关键字" style="width: 20%" clearable></el-input>
            <el-button type="primary" style="margin-left: 5px" @click="searchNotes">查询</el-button>
        </div>

        <el-table stripe :data="tableData" border style="width: 100%" v-loading="loading">
            <el-table-column v-if="false" prop="id" label="编号" sortable>
            </el-table-column>

            <el-table-column prop="title" label="题目">
            </el-table-column>

            <el-table-column prop="createTime" :formatter="dateFormat" label="创建时间">
            </el-table-column>

            <el-table-column prop="updateTime" :formatter="dateFormat" label="修改时间">
            </el-table-column>


            <el-table-column fixed="right" label="操作">

                <template slot-scope="scope">
                    <el-button @click="showdetail(scope.row)" size="mini" type="primary">详情</el-button>
                    <el-button @click="handleClick(scope.row)" size="mini">修改</el-button>
                    <el-button @click="deleteClick(scope.row)" type="danger" size="mini">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="currentPage" :page-sizes="[5, 10, 20]" :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper" :total="totalNotes" style="text-align: center;">
            </el-pagination>
        </div>
        <el-dialog title="添加笔记" :visible.sync="dialogVisible" width="50%">
                <el-form :model="form" label-width="120px">
                    <el-form-item label="标题">
                        <el-input v-model="form.title" style="width: 50%"></el-input>
                    </el-form-item>

                    <div id="div1"></div>
                </el-form>
          

            <div style="text-align: center;">
                <el-button @click="addNotesCancle">取 消</el-button>
                <el-button type="primary" @click="addNotesSubmit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import E from 'wangeditor'
    import moment from 'moment'
    import request from "@/utils/request";
    let editor;
    export default {
        data() {
            return {
                loading: true,
                searchContext: '',
                currentPage: 1,
                totalNotes: 200,
                pageSize: 10,
                tableData: [],
                dialogVisible: false,
                form: {},
            }
        },
        methods: {
            addNotesCancle() {},
            addNotesSubmit() {},
            dateFormat(row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return ''
                };
                return moment(date).format("YYYY-MM-DD HH:mm:ss")

            },
            load() {
                this.loading = true
                let user = JSON.parse(sessionStorage.getItem("user"));
                // console.log(user.username);
                const username = user.username
                request.get("/notes/get_notes", {
                    params: {
                        author: username,
                        pageNum: this.currentPage,
                        pageSize: this.pageSize,
                        search: this.searchContext

                    }
                }).then((res) => {
                    this.loading = false
                    this.tableData = res.data.records
                    this.totalNotes = res.data.total
                    console.log(res);
                })
            },
            handleSizeChange(pageSize) {
                this.pageSize = pageSize
                this.load()
            },
            handleCurrentChange(pageNum) {
                this.currentPage = pageNum
                this.load()
            },
            add() {
                this.dialogVisible = true
                this.form = {}

                this.$nextTick(() => {
                    // 关联弹窗里面的div，new一个 editor对象
                    if (!editor) {
                        editor = new E('#div1')

                        // 配置 server 接口地址
                        // editor.config.uploadImgServer = 'http://' + window.server.filesUploadUrl + ':9090/files/editor/upload'
                        // editor.config.uploadFileName = "file"  // 设置上传参数名称
                        editor.create()
                    }

                    editor.txt.html("")
                })
            },
            searchNotes() {
                this.load();
            },
            showdetail() {

            },
            handleClick() {

            },
            deleteClick() {

            }
        },
        created() {
            this.load()
        },
    }
</script>
<style>

</style>