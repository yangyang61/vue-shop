<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/logo.png" alt="">
        <span>后台管理系统</span>
      </div>
      <el-button type="info">退出</el-button>
    </el-header>
    <!-- 内容主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409bff"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="true"
          router
          :default-active="activePath"
        >
          <!-- 一级菜单 -->
          <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
            <template slot="title">
              <i class="el-icon-message"></i>
              <span>{{item.authName}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item :index="'/' + subitem.path" v-for="subitem in item.children" :key="subitem.id" @click="savePath('/'+subitem.path)">
                <i class="el-icon-menu"></i>
                <span>{{subitem.authName}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return{
      // 左侧菜单数据
      menuList: [],
      // 是否折叠
      isCollapse: false,
      activePath: ''
    }
  },
  created() {
    this.getMeunList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout() {
      window.sessionStorage.removeItem('token')
      this.$router.push('/login')
    },
    // 获取所有菜单
    getMeunList() {
      this.$http.get("menus").then(res => {
        if(res.data.meta.status === 200){
          this.menuList = res.data.data
        }

      })
    },
    // 点击按钮，切换菜单的折叠和展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    // 
    savePath(activePath) {
      window.sessionStorage.setItem('activePath',activePath)
      this.activePath = activePath
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 0;
  background-color: #373d41;
  font-size: 20px;
  color: #fff;
  > div {
    display: flex;
    align-items: center;
    img {
      width: 100px;
      height: 100px;
    }
    span {
      margin-left: 15px;
    }
  }
}
.el-aside {
  background-color: #333744;
  .el-menu{
    border-right: none;
  }
  .toggle-button {
    background-color: #4a5064;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    cursor: pointer;
    letter-spacing: .2em;
  }
}
.el-mian {
  background-color: #eaedf1;
}
</style>
