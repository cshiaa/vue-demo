<template>
    <div>
      <div style="margin-bottom: 15px">展开: <el-switch v-model="fill" /></div>
      <el-space :fill="fill" fill-ratio=100 wrap>
        <el-card v-for="i in 3" :key="i" class="box-card">
          <template #header>
            <div class="card-header">
              <span>Card name  </span>
              <el-button class="button" type="primary" >修改</el-button>
              <el-button class="button" type="primary" >保存</el-button>
            </div>
          </template>
          <div v-for="o in 4" :key="o" class="text item">
            <span>{{ 'List item ' + o }} :&emsp;</span>
            <el-input v-model="input"  placeholder="Please input" style="width: 55%;"/>
          </div>
        </el-card>
      </el-space>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const fill = ref(true)
  const input = ref('')
  </script>
  

<script>
export default {
  name: 'Config'
}
</script>