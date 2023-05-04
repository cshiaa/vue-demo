<template>
    <el-table
      ref="multipleTableRef"
      :data="tableData"
      style="width: 100%"
      border
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      @selection-change="handleSelectionChange"
      @current-change="handleCurrentChange"
      @row-dblclick="showHostInfo"
    >
      <el-table-column type="selection" width="55" />
      <!-- <el-table-column label="SN" width="80">
        <template #default="scope">{{ scope.row.sn }}</template>
      </el-table-column>
      <el-table-column property="ip" label="IP地址" width="100" />
      <el-table-column property="hostname" label="主机名" />
      <el-table-column property="operatingSystem" label="操作系统" width="100" />
      <el-table-column property="assetsType" label="资产类型" width="100"  />
      <el-table-column property="brand" label="品牌型号" width="100" />
      <el-table-column property="memory" label="内存" />
      <el-table-column property="cpu" label="CPU" />
      <el-table-column property="storage" label="存储" />
      <el-table-column property="warehouseTime" label="入库时间" width="100" />
      <el-table-column property="outboundTime" label="出库时间" width="100" />
      <el-table-column property="user" label="使用人" />
      <el-table-column property="description" label="说明" width="100" /> -->

      <!-- <el-table-column property="address" label="Address" show-overflow-tooltip /> -->
      <template v-for="(val, key, index) in hostLabel">
        <el-table-column :property="key" :label="val" width="100" v-if="(key !== 'status') && ((key !== 'tag') ) "/>
      </template>
      <el-table-column
      prop="tag"
      label="Tag"
      width="100"
    >
      <template #default="scope">
        <el-tag
          :type="scope.row.tag"
          disable-transitions
          >{{ scope.row.status }}</el-tag
        >
      </template>
    </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button @click="toggleSelection(tableData)"
        >全选</el-button
      >
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div>
    <el-dialog v-model="dialogFormVisible" title="主机信息">
      <el-form :model="hostLabel" v-for="(val, keys, index) in hostLabel">
        <el-form-item :label="val" :label-width="formLabelWidth" v-if="keys != 'tag' ">
            <!-- <el-input
              v-model="formData.ip" 
              autocomplete="off"
            /> -->
            <template v-for="(val2, keys2) in formData" :key="keys2">
              <el-input :label="val2" v-model="formData[keys]" :placeholder="keys2" v-if="keys2 === keys"></el-input>
            </template>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">
            保存
          </el-button>
        </span>
      </template>
    </el-dialog>
  </template>

  <script lang="ts" setup>
  import { ref, getCurrentInstance  } from 'vue'
  import { ElTable } from 'element-plus'

  const dialogFormVisible = ref(false)
  const formLabelWidth = '140px'
  const formData  = ref<Host>()

  interface User {
    date: string
    name: string
    address: string
    tag: string
  }

  interface Host {
    sn: string
    ip: string
    hostname: string
    //操作系统
    operatingSystem: string
    //资产类型
    assetsType: string
    //品牌型号
    brand: string
    memory: string
    cpu: string
    storage: string
    //入库时间
    warehouseTime: string
    //出库时间
    outboundTime: string
    user: string
    description: string
    status: string
    tag: string
  }

  const hostLabel: Host = {
      sn: 'SN',
      ip: 'IP地址',
      hostname: '主机名',
      operatingSystem: '操作系统',
      assetsType: '资产类型',
      brand: '品牌型号',
      memory: '内存',
      cpu: 'CPU',
      storage: '存储',
      warehouseTime: '入库时间',
      outboundTime: '出库时间',
      user: '使用人',
      description: '说明',
      status: '状态',
      tag: '',
  }
 

  const multipleTableRef = ref<InstanceType<typeof ElTable>>()
  const multipleSelection = ref<Host[]>([])
  const currentRow = ref()

  const toggleSelection = (rows?: Host[]) => {
    if (rows) {
      rows.forEach((row) => {
        // TODO: improvement typing when refactor table
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        multipleTableRef.value!.toggleRowSelection(row, undefined)
      })
    } else {
      multipleTableRef.value!.clearSelection()
    }
  }
  const handleSelectionChange = (val: Host[]) => {
    multipleSelection.value = val
  }

  const handleCurrentChange = (val: Host | undefined) => {
    currentRow.value = val
  }

  const showHostInfo = (row) => {

    dialogFormVisible.value = true
    formData.value = row
    console.log(formData)
  }

  const onInput = () => {
  }
  const tableData: Host[] = [
    {
        sn: '000001',
        ip: '192.168.1.10',
        hostname: 'localhost',
        operatingSystem: 'Centos 7',
        assetsType: '服务器',
        brand: 'DELL',
        memory: '32G',
        cpu: '16 Core',
        storage: '100G',
        warehouseTime: '2022-04-09',
        outboundTime: '2023-04-06',
        user: 'zhangsan',
        description: '张三使用',
        status: '使用中',
        tag: '',
    },
    {
        sn: '000002',
        ip: '192.168.1.11',
        hostname: 'localhost',
        operatingSystem: 'Centos 7',
        assetsType: '服务器',
        brand: 'DELL',
        memory: '32G',
        cpu: '16 Core',
        storage: '100G',
        warehouseTime: '2022-04-09',
        outboundTime: '2023-04-06',
        user: 'lisi',
        description: '李四使用',
        status: '报废',
        tag: 'danger',
    }
  ]

//   const tableData: User[] = [
//     {
//       date: '2016-05-03',
//       name: 'Tom',
//       address: 'No. 189, Grove St, Los Angeles',
//       tag: 'success',
//     },
//     {
//       date: '2016-05-02',
//       name: 'Tom',
//       address: 'No. 189, Grove St, Los Angeles',
//       tag: 'success',
//     },
//     {
//       date: '2016-05-04',
//       name: 'Tom',
//       address: 'No. 189, Grove St, Los Angeles',
//       tag: 'success',
//     },
//     {
//       date: '2016-05-01',
//       name: 'Tom',
//       address: 'No. 189, Grove St, Los Angeles',
//       tag: 'danger',
//     },
//     {
//       date: '2016-05-08',
//       name: 'Tom',
//       address: 'No. 189, Grove St, Los Angeles',
//       tag: 'danger',
//     },
//     {
//       date: '2016-05-06',
//       name: 'Tom',
//       address: 'No. 189, Grove St, Los Angeles',
//       tag: 'success',
//     },
//     {
//       date: '2016-05-07',
//       name: 'Tom',
//       address: 'No. 189, Grove St, Los Angeles',
//       tag: 'danger',
//     },
//   ]
  </script>

<script lang="ts">
export default {
  name: 'Assets'
}
</script>