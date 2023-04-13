
<template>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column fixed prop="id" label="ID" width="150" />
      <el-table-column prop="username" label="用户名" width="200" />
      <el-table-column prop="email" label="邮箱" width="200" />
      <el-table-column prop="phone" label="手机号" width="200" />
      <el-table-column prop="address" label="地址" width="200" />
      <el-table-column fixed="right" label="操作" width="200">
        <template #default>
          <el-button link type="primary" size="small" @click="handleClick"
            >查看</el-button
          >    
          <PermissionButton></PermissionButton>
          <el-button link type="primary" size="small" style="color:red" @click="deleteUser">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
</template>

<script  setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { getUserList } from '@/api/user'
import { ref } from 'vue'
import PermissionButton from './permissions/index.vue'
const tableData = ref([])

const getTableData = async() => {
  const table = await getUserList()
  if (table.status === 200) {
    tableData.value = table.data.userList
  }
}

getTableData()

const handleClick = () => {
  console.log('handleClick')
}

const deleteUser = () => {
  ElMessageBox.confirm(
    '是否要删除该用户?',
    'Warning',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      ElMessage({
        type: 'success',
        message: '删除成功',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消删除',
      })
    })
}



// const tableData = [
//   {
//     ID: '2016-05-03',
//     username: 'Tom',
//     email: 'California',
//     phone: 'Los Angeles',
//     address: 'No. 189, Grove St, Los Angeles',
//   },
// ]

</script>

<script>
  export default {
    name: 'User'
  }
</script>