<template>
    <div>
      <template v-for="(item,index) in routes" :key="index">
    <!--没有子菜单-->
      <el-menu-item v-if="!item.hidden&& !item.children" :index="item.path">
        <i v-if="item.meta.icon&&item.meta.icon.includes('el')" :class="item.meta.icon"/>
        <base-svg-icon style="margin-right: 8px" v-else :icon-class="item.meta.icon"/>
        <span>{{item.meta.name}}</span>
      </el-menu-item>
    <!--  有子菜单-->
        <el-submenu :index="item.path" v-if="item.children">
          <template #title>
            <span>
              <i v-if="item.meta.icon&&item.meta.icon.includes('el')" :class="item.meta.icon"/>
              <base-svg-icon style="margin-right: 8px" v-else :icon-class="item.meta.icon"/>
              {{item.meta.name}}</span>
          </template>
          <menu-item :routes="item.children"></menu-item>
        </el-submenu>
      </template>
    </div>
    </template>
    
    <script>
    import MenuItem from '@/views/layout/compontents/MenuItem';
    import BaseSvgIcon from "@/components/SvgIcon";
    export default {
      name: "MenuItem",
      // eslint-disable-next-line vue/no-unused-components
      components: {MenuItem,BaseSvgIcon},
    
      data(){
        return{
    
        }
      },
      props:["routes"]
    }
    </script>
    
    <style scoped>
    i{
      color: #fff!important;
    }
    </style>
    