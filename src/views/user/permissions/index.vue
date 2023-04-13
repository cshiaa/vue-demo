<template>
    <el-button text @click="dialog = true"
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
            :data="data"
            show-checkbox
            node-key="id"
            default-expand-all
            :expand-on-click-node="false"
            :props="{ class: customNodeClass }"
            />
        </div>

        <div class="demo-drawer__footer">
          <el-button @click="cancelForm">Cancel</el-button>
          <el-button type="primary" :loading="loading" @click="onClick">{{
            loading ? 'Submitting ...' : 'Submit'
          }}</el-button>
        </div>
      </div>
    </el-drawer>
  </template>
  
  <script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import { ElDrawer, ElMessageBox } from 'element-plus'
  import type Node from 'element-plus/es/components/tree/src/model/node'

  const formLabelWidth = '80px'
  let timer
  
  const dialog = ref(false)
  const loading = ref(false)
  
  const form = reactive({
    name: '',
    region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: '',
  })

  const drawerRef = ref<InstanceType<typeof ElDrawer>>()
  const onClick = () => {
    drawerRef.value!.close()
  }

  const handleClose = (done) => {
    if (loading.value) {
      return
    }
    ElMessageBox.confirm('Do you want to submit?')
      .then(() => {
        loading.value = true
        timer = setTimeout(() => {
          done()
          // 动画关闭需要一定的时间
          setTimeout(() => {
            loading.value = false
          }, 400)
        }, 2000)
      })
      .catch(() => {
        // catch error
      })
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

    const customNodeClass = (data: Tree, node: Node) => {
        if (data.isPenultimate) {
            return 'is-penultimate'
        }
        return null
    }

    const data: Tree[] = [
    {
        id: 1,
        label: 'Level one 1',
        children: [
        {
            id: 4,
            label: 'Level two 1-1',
            isPenultimate: true,
            children: [
            {
                id: 9,
                label: 'Level three 1-1-1',
            },
            {
                id: 10,
                label: 'Level three 1-1-2',
            },
            ],
        },
        ],
    },
    {
        id: 2,
        label: 'Level one 2',
        isPenultimate: true,
        children: [
        {
            id: 5,
            label: 'Level two 2-1',
        },
        {
            id: 6,
            label: 'Level two 2-2',
        },
        ],
    },
    {
        id: 3,
        label: 'Level one 3',
        isPenultimate: false,
        children: [
        {
            id: 7,
            label: 'Level two 3-1',
        },
        {
            id: 8,
            label: 'Level two 3-2',
        },
        ],
    },
    ]
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