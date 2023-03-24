<template>
    <div class="common-layout">
      <el-container>
        <el-aside width="200px">
            <el-row class="tac">
              <el-col  :span="24" :style="{backgroundColor:'#545c64'}">
                <h3 class="mb-2">管理系统</h3>
                <el-menu
                  default-active="2"
                  active-text-color="#ffd04b"
                  background-color="#545c64"
                  text-color="#fff"
                  class="el-menu-vertical-demo"
                  :router="true"
                >
                <template v-for="menu in routerStore.asyncRouters[0].children" :key="menu.menuId">
                    <el-sub-menu :index="menu.path" v-if="menu.children && menu.children.length">
                        <template #title >
                        <el-icon><location /></el-icon>
                        <span> {{ menu.menuname }} </span>
                        </template>
                        <el-menu-item-group  >
                        <el-menu-item :index="menu_children.path" v-for="menu_children in menu.children" :key="menu.menuId" > {{ menu_children.menuname }} </el-menu-item>
                        </el-menu-item-group>
                    </el-sub-menu>
                    <el-menu-item :index="menu.path" v-else>
                        <template #title >
                        <el-icon><location /></el-icon>
                        <span> {{ menu.menuname }} </span>
                        </template>
                    </el-menu-item>
                </template>
                </el-menu>
              </el-col>
            </el-row>
          </el-aside>
        <el-container>
            <el-header>Header</el-header>
            <el-main>
                <span> Main </span>
                <router-view></router-view>
            </el-main>
        </el-container>
      </el-container>
    </div>
  
  </template>
  
  <script>
  export default {
    name: 'Layout',
  }
  </script>
  
  <script  setup>
  import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
  } from '@element-plus/icons-vue'
  import { useRouterStore } from '@/pinia/modules/router'
  
  
  const routerStore = useRouterStore()
  
  </script>
  
  <style  scoped>
  .common-layout {
    height: 100%;
  }
  .el-container {
    height: 100%;
  }
  .el-header {
    height: 20px;
  }
  
  .el-aside {
    height: 100%;
  }
  
  .el-row {
    height: 100%;
  }
  
  .el-col {
    height: 100%;
  }
  
  .mb-2 {
    text-align:center;
    color: white;
    font-weight: normal;
  }
  </style>