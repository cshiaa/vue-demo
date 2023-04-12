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
                      <el-icon v-if="menu.icon">
                        <component :is="menu.icon"></component>
                      </el-icon>
                      <span> {{ menu.menuname }} </span>
                      </template>
                      <el-menu-item-group  >
                      <el-menu-item :index="menu_children.path" v-for="menu_children in menu.children" :key="menu.menuId" >
                        <template #title >
                        <el-icon v-if="menu_children.icon">
                          <component :is="menu_children.icon"></component>
                        </el-icon>
                        <span> {{ menu_children.menuname }} </span>
                        </template>
                      </el-menu-item>
                      </el-menu-item-group>
                  </el-sub-menu>
                  <el-menu-item :index="menu.path" v-else>
                      <template #title >
                        <el-icon v-if="menu.icon">
                        <component :is="menu.icon"></component>
                      </el-icon>
                      <span> {{ menu.menuname }} </span>
                      </template>
                  </el-menu-item>
              </template>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
      
      <el-container>
          <el-header  style="text-align: right;">
            <el-dropdown @command="handleCommand" >
              <span class="el-dropdown-link" style="cursor: pointer;line-height: 2;">
                User Name<el-icon></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="userinfo">个人资料</el-dropdown-item>
                  <el-dropdown-item @click="userStore.LoginOut">注 销</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </el-header>
          <el-main>
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
  import { ElMessage } from 'element-plus'
  import { useRouterStore } from '@/pinia/modules/router'
  import { useUserStore } from '@/pinia/modules/user'

  const userStore = useUserStore()
  const routerStore = useRouterStore()

  const handleCommand = (command) => {
      ElMessage(`click on item ${command}`)

    }

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

.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>