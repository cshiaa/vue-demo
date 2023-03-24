<template>
    <div style="width: 100%;height: 100%">
      <el-menu :default-active="route.path"
               background-color="#8abcd10a"
               text-color="#fff"
               active-text-color="#ffd04b"
               :router="true"
               style="text-align: left"
      >
        <MenuItem :routes="routes"></MenuItem>
      </el-menu>
    
    </div>
    </template>
    
    <script>
    import MenuItem from "@/views/layout/compontents/MenuItem";
    
    export default {
      name: "Menu",
      components: {MenuItem},
    
    }
    </script>
    <script setup>
    import {useRoute, useRouter} from "vue-router";
    
    const route =useRoute()
    const router = useRouter()
    const routes = router.options.routes //获取全部路由信息
    // console.log('router', router.options.routes)
    </script>
    <style scoped>
    
    </style>
    