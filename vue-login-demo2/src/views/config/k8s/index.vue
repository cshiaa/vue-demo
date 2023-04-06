<template>
  <el-upload
    class="upload-demo"
    drag
    :action="`${path}/upload`"
    :headers="{'atoken':userStore.token}"
    multiple
  >
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">
      将文件拖拽到这里或者 <em>点击上传</em>
    </div>
    <template #tip>
      <div class="el-upload__tip">
        yaml files with a size less than 500kb
      </div>
    </template>
  </el-upload>
  <div>
      <!-- codemirror组件，用于输入yaml代码 -->
      <codemirror
        v-model="yamlCode"
        placeholder="Code goes here..."
        :style="{ height: '400px' }"
        :autofocus="true"
        :indent-with-tab="true"
        :tab-size="1"
        :extensions="extensions"
        @ready="handleReady"
        @change="log('change', $event)"
      ></codemirror>
    </div>
</template>


<script>
export default {
  name: 'K8s'
}
</script>

<script setup>
    import { UploadFilled } from '@element-plus/icons-vue'
    import { ref, shallowRef } from 'vue';
    import { useUserStore } from '@/pinia/modules/user'
    import { Codemirror } from 'vue-codemirror';
    import { oneDark } from '@codemirror/theme-one-dark'
    import axios from 'axios' // 引入axios


    import jsYaml from 'js-yaml';

    const userStore = useUserStore()

    // yaml代码
    const yamlCode = ref('');
    const view = shallowRef()
    const path = ref('http://19.224.154.190:8089/file')

    const handleReady = (payload) => {
        view.value = payload.view
        // 从接口获取yaml文件内容
        axios
          .get('http://19.224.154.190:8089/file/getFile')
          .then((response) => {
            // 将文件内容绑定到codemirror组件的v-model指令中
            yamlCode.value = response.data;
          })
          .catch((error) => {
            console.error('从接口获取数据失败:', error);
          });
    }

    const extensions = [oneDark]

    

</script>