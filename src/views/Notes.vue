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

            <el-table-column prop="title" align="center" label="题目">
            </el-table-column>

            <el-table-column prop="createTime" :formatter="dateFormat" align="center" sortable label="创建时间">
            </el-table-column>

            <el-table-column prop="updateTime" :formatter="dateFormat" align="center" sortable label="最后修改时间">
            </el-table-column>


            <el-table-column fixed="right" align="center" label="操作">
                <template slot-scope="scope">
                    <el-button @click="showdetail(scope.row)" size="mini" type="primary">详情</el-button>
                    <el-button @click="handleClick(scope.row)" size="mini">修改</el-button>
                    <el-button @click="deleteClick(scope.row)" type="danger" size="mini">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="block" style="margin-top: 20px;">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="currentPage" :page-sizes="[5, 10, 20]" :page-size="pageSize" background 
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

        <el-dialog title="显示笔记" :visible.sync="showDetailVisable" width="50%">
            <el-form :model="form" label-width="120px">

                <el-card v-html="showForm.content" style="min-height: 100px">
                </el-card>
            </el-form>

        </el-dialog>

        <!-- // 更新修改 -->
        <el-dialog title="编辑笔记" :visible.sync="modifyDialogVisible" width="50%">
            <el-form :model="form" label-width="120px">
                <el-form-item label="标题">
                    <el-input v-model="modifyForm.title" style="width: 50%"></el-input>
                </el-form-item>

                <div id="modifyDiv"></div>
            </el-form>

            <div style="text-align: center;">
                <el-button @click="modifyNotesCancle">取 消</el-button>
                <el-button type="primary" @click="modifyNotesSubmit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import E from 'wangeditor'
    import moment from 'moment'
    import request from "@/utils/request";
    let editor;
    let modifyEditor;
    let username;
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
                showForm: {},
                showDetailVisable: false,
                modifyForm: {
                    title:''
                },
                modifyDialogVisible: false

            }
        },
        methods: {
            modifyNotesCancle() {
                this.modifyDialogVisible = false;
                this.modifyForm = {}
            },
            modifyNotesSubmit() {
                console.log("修改提交拉")
                this.modifyForm.content = modifyEditor.txt.html()
                request.post("/notes/update_notes", this.modifyForm).then((res) => {
                    if (res.code == '0') {
                        this.$message({
                            center: true,
                            message: res.data + "修改成功",
                            type: "success"
                        })
                    } else {
                        this.$message({
                            center: true,
                            message: res.msg,
                            type: "error"
                        })
                    }
                })
                this.modifyDialogVisible = false
                this.load()
            },
            addNotesCancle() {
                this.form = {}
                this.dialogVisible = false
            },
            addNotesSubmit() {
                // 获得数据
                this.form.content = editor.txt.html() //获得对象
                this.form.author = username
                request.post("/notes/add_notes", this.form).then((res) => {
                    //console.log(res);
                    if (res.code == '0') {
                        this.$message({
                            center: true,
                            message: res.data + "添加成功",
                            type: 'success'
                        });
                    } else {
                        this.$message({
                            center: true,
                            message: res.msg,
                            type: 'error'
                        });
                    }
                })
                this.dialogVisible = false
                this.form = {}
            },
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
                username = user.username
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
                    // console.log(res);
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
            showdetail(row) {
                // console.log(row.id)
                request.get("/notes/get_notes_id", {
                    params: {
                        id: row.id
                    }
                }).then((res) => {
                    if (res.code == '0') {
                        this.showDetailVisable = true
                        // 查询成功显示出来
                        // console.log(res)
                        this.showForm.content = res.data.content
                    } else {
                        this.$message({
                            center: true,
                            message: res.msg,
                            type: 'error'
                        });
                    }

                })
            },
            handleClick(row) {
                // 查找出来
                request.get("/notes/get_notes_id", {
                    params: {
                        id: row.id
                    }
                }).then((res) => {
                    if (res.code == '0') {
                        console.log(res);
                        this.modifyDialogVisible = true
                        this.modifyForm.title = res.data.title
                        this.modifyForm.id = res.data.id
                        this.$nextTick(() => {
                            if (!modifyEditor) {
                                modifyEditor = new E("#modifyDiv")
                                modifyEditor.create()
                            }

                            modifyEditor.txt.html(res.data.content)
                        })
                    } else {
                        this.$message({
                            center: true,
                            message: res.msg,
                            type: 'error'
                        });
                    }

                })
            },
            deleteClick(row) {
                // 对话框是否删除
                this.$confirm('此操作将永久删除该笔记, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    request.get("/notes/delete_notes", {
                        params: {
                            id: row.id
                        }
                    }).then((res) => {
                        // console.log(res);
                        if (res.code == '0') {
                            this.$message({
                                center: true,
                                message: "删除成功",
                                type: 'success'
                            });
                            this.load() // 重新加载
                        } else {
                            this.$message({
                                center: true,
                                type: "error",
                                message: res.msg
                            })
                        }
                    })

                }).catch(() => {
                    this.$message({
                        center: true,
                        type: 'info',
                        message: '已取消删除'
                    });
                })
            }
        },
        created() {
            this.load()
        },
    }
</script>
<style>

</style>