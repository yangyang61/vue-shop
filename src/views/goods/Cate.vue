<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item to="{path: '/home'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="showAddCateDialog">添加分类</el-button>
        </el-col>
      </el-row>

      <!--  -->
      <el-table
        :data="cateList"
        row-key="cat_id"
        border
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="cat_name" label="分类名称" sortable> </el-table-column>
        <el-table-column prop="name" label="是否有效" sortable>
          <template slot-scope="scope">
            <i
              v-if="!scope.row.cat_delete"
              class="el-icon-success"
              style="color: lightgreen"
            ></i>
            <i v-else class="el-icon-error" style="color: red"></i>
          </template>
        </el-table-column>
        <el-table-column label="排序">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.cat_level == 0" size="mini">一级</el-tag>
            <el-tag v-else-if="scope.row.cat_level == 1" size="mini" type="success"
              >二级</el-tag
            >
            <el-tag v-else size="mini" type="warning">三级</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
            <!-- 删除按钮 -->
            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            <!-- 分配角色按钮 -->
            <el-tooltip
              effect="dark"
              content="分配角色"
              placement="top-start"
              :enterable="false"
            >
              <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 20, 30]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <!-- 添加用户对话框 -->
    <el-dialog title="添加分类" :visible.sync="addCateVisible" width="50%">
      <!-- 内容主体区域 -->
      <el-form
        :model="addCateForm"
        :rules="addCateFormRules"
        ref="addCateFormRef"
        @close="addCateDialogClose"
        label-width="120px"
      >
        <el-form-item label="分类名称：" prop="cat_name">
          <el-input v-model="addCateForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类：" prop="password">
          <!-- options 用来指定数据源 -->
          <!-- props 用来指定数据对象 -->
          <el-cascader
            style="width: 100%"
            v-model="selectedKeys"
            :options="parentCateList"
            :props="cascaderProps"
            clearable
            @change="parentCateChanged"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCateVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 查询参数
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5,
      },
      // 商品分类的数据列表
      cateList: [],
      // 总数据条数
      total: 0,
      // 控制添加分类对话框的显示和隐藏
      addCateVisible: false,
      // 添加分类表单
      addCateForm: {
        cat_name: "",
        cat_pid: 0,
        cat_level: 0,
      },
      // 添加分类表单校验规则
      addCateFormRules: {
        cat_name: [{ required: true, message: "请输入分类名称", trigger: "blur" }],
      },
      // 父级分类的列表
      parentCateList: [],
      // 指定级联选择器的配置对象
      cascaderProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children',
        expandTrigger: 'hover'
      },
      // 选中的父级分类的id数组
      selectedKeys: [ ]
    };
  },
  created() {
    this.getCateList();
  },
  methods: {
    async getCateList() {
      const { data: res } = await this.$http.get("categories", {
        params: this.queryInfo,
      });
      if (res.meta.status !== 200) return this.$message.error("获取商品分类失败");
      this.cateList = res.data.result;
      this.total = res.data.total;
    },
    // 监听 pagesize 改变
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getCateList();
    },
    // 监听 pagenum 改变
    handleCurrentChange(currentSize) {
      this.queryInfo.pagenum = currentSize;
      this.getCateList();
    },
    showAddCateDialog() {
      this.getParentCateList();

      this.addCateVisible = true;
    },
    // 获取父级分类的数据列表
    async getParentCateList() {
      const { data: res } = await this.$http.get("categories", { params: { type: 2}});

      if (res.meta.status !== 200) return this.$message.error("获取父级分类列表失败");

      this.parentCateList = res.data;
    },
    // 选择框发生变化触发这个函数
    parentCateChanged() {
      // 如果 selectedKeys 数组的 length 大于 0，证明选中了父级分类
      // 反之，就说明没有选中任何父级分类
      if(this.selectedKeys.length > 0) {
        this.addCateForm.cat_level = this.selectedKeys[this.selectedKeys.length -1]
        // 为当前分类的等级赋值
        this.addCateForm.cat_pid = this.selectedKeys.length
      }else {
        // 父级分类的 id
        this.addCateForm.cat_pid = 0

        // 为当前分类的等级赋值
        this.addCateForm.cat_level = 0
      }
    },
    // 监听对话框的关闭事件
    addCateDialogClose() {
      this.$refs.addCateFormRef.resetFields()
      this.selectedKeys = []
      this.addCateForm.cat_level = 0
      this.addCateForm.cat_pid = 0
    },
    addCate() {
      this.$refs.addCateFormRef.validate(async valid => {
        if(!valid) return
        // 发起添加分类的请求
        const {data: res} = await this.$http.post(
          'categories',
          this.addCateForm
        )
        if(res.meta.status !== 201) return this.$message.error('添加分类失败')
        // 关闭对话框
        this.addCateVisible = false
        // 刷新数据列表
        this.getCateList()
        // 提示更新成功
        this.$message.success('添加分类成功')
      })
    }
  },
};
</script>

<style></style>
