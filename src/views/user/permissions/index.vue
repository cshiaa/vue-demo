<template>
    <el-button text @click="getPermissions"
      >权限</el-button
    >
    <el-drawer
      ref="drawerRef"
      v-model="dialog"
      title="菜单权限"
      :before-close="handleClose"
      direction="rtl"
      class="demo-drawer"
      :append-to-body="true"
    >
      <div class="demo-drawer__content">
        <div class="custom-tree-node-container">
            <el-tree
            ref="treeRef"
            :data="treeData"
            show-checkbox
            node-key="id"
            default-expand-all
            :expand-on-click-node="false"
            :props="{ class: customNodeClass }"
            />
        </div>
        <br/>
        <div class="demo-drawer__footer">
          <el-button @click="cancelForm">取消</el-button>
          <el-button type="primary" :loading="loading" @click="onClick">{{
            loading ? '保存中 ...' : '保存'
          }}</el-button>
        </div>
      </div>
    </el-drawer>
</template>
  
<script lang="ts" setup>
  import { reactive, ref, onMounted, Ref  } from 'vue'
  import { ElDrawer, ElMessageBox, ElTree  } from 'element-plus'
  import type Node from 'element-plus/es/components/tree/src/model/node'

  import { getAllMenu, getUserMenu, updateUserMenu } from '../../../api/menu'
  
  const formLabelWidth = '80px'
  let timer
  
  const dialog = ref(false)
  const loading = ref(false)

  const userData = defineProps({
    id: {
        type: Number
    }
  })

  const drawerRef = ref<InstanceType<typeof ElDrawer>>()
  const treeRef = ref<InstanceType<typeof ElTree>>()

  const onClick = () => {
    drawerRef.value!.close()
    saveUserPermissions()
  }

  const handleClose = (done) => {
    if (loading.value) {
      return
    }
    ElMessageBox.confirm('是否保存退出?')
      .then(() => {
        loading.value = true
        timer = setTimeout(() => {
          done()
          // 动画关闭需要一定的时间
          setTimeout(() => {
            loading.value = false
          }, 400)
        }, 1000)
      })
      .catch(() => {
        // catch error
      })
  }

  const saveUserPermissions = async() => {
    let newMenus = treeRef.value!.getCheckedKeys()
    const res = await updateUserMenu({userid: userData.id}, {menusList: newMenus})
    if (res.status === 200) {
      console.log(newMenus)
      console.log("保存成功")
    }
  }

  const cancelForm = () => {
    loading.value = false
    dialog.value = false
    clearTimeout(timer)
  }

  interface Tree {
      id: number
      label: string
      isPenultimate?: boolean
      children?: Tree[]
  }

  interface Menu {
      menuId: number
      menuName: string
      children?: Menu[]
  }
    // const treeData: Tree[] = []
    // const data = ref<Tree[]>()
  const treeData: Ref<Tree[]> = ref([])

  const getAllMenuList = async() => {
    var menuresponse =  await getAllMenu()
    const menuData: Menu[] = menuresponse.data.menuList
    treeData.value = menuData.map((menu: Menu) => {
        // return { id: menu.menuId, label: menu.menuName, children: menu.children };
        return convert(menu)
    });
    // console.log(treeData)
  }
  onMounted(() => {
    getAllMenuList()
  })

  const getPermissions = async() => {
    dialog.value = true
    console.log(userData.id)
    var res = await getUserMenu( {userid: userData.id})
    if (res.status == 200) {
      const userMenu = res.data.userMenuList
      console.log(userMenu)
      treeRef.value!.setCheckedKeys(userMenu, false)

    }
    // var menuresponse =  await getAllMenu()
    // const menuData: Menu[] = menuresponse.data.menuList
    // const a  = menuData.map((menu: Menu) => {
    //     // return { id: menu.menuId, label: menu.menuName, children: menu.children };
    //     return convert(menu)
    // });
  }



  function convert(menu: Menu): Tree {
    const tree: Tree = { id: menu.menuId, label: menu.menuName };
    if (menu.children) {
      tree.children = menu.children.map((subB: Menu) => convert(subB));
    }
    return tree;
  }

  const customNodeClass = (data: Tree, node: Node) => {
      if (data.isPenultimate) {
          return 'is-penultimate'
      }
      return null
  }

</script>

<script lang="ts" >
    export default {
        name: 'PermissionButton'
    }
</script>

<style>
.is-penultimate > .el-tree-node__content {
  color: #626aef;
}

.el-tree-node.is-expanded.is-penultimate > .el-tree-node__children {
  display: flex;
  flex-direction: row;
}
.is-penultimate > .el-tree-node__children > div {
  width: 25%;
}
</style>