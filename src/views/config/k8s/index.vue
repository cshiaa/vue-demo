<template>
  <!-- <el-upload
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
  </el-upload> -->
  <el-upload
    ref="upload"
    class="upload-demo"
    accept=".yaml"
    :action="`${path}/upload`"
    :limit="1"
    :on-exceed="handleExceed"
    :auto-upload="false"
    :headers="{'atoken':userStore.token}"
    :on-change="openFile"
    :on-success="refreshCodeMirror"
    :on-error="uploadError"
    multiple
  >
    <template #trigger>
      <el-button type="primary" >选择文件</el-button>
    </template>
    <el-button class="ml-3" type="success" @click="submitUpload">
      上传<el-icon class="el-icon--right"><Upload /></el-icon>
    </el-button>
    <el-button 
      color="#626aef"
      @click="saveFile"
    >保存</el-button>

    <!-- <template #tip>  
      <div class="el-upload__tip text-red">
        limit 1 file, new file will cover the old file
      </div>
    </template> -->
  </el-upload>
  <div class="box">
    <Codemirror
      class="code"
      v-model="yamlCode"
      placeholder="#将.kube/config文件复制到这里或者点击上传文件"
      :style="{ height: '100%' }"
      :extensions="extensions"
      :autofocus="true"
      :disabled="false"
      :indent-with-tab="true"
      :tab-size="1"
      @ready="handleReady"
    />
  </div>

</template>


<script lang="ts">
export default {
  name: 'K8s'
}
</script>

<script setup lang="ts">
    // import { UploadFilled } from '@element-plus/icons-vue'
    import { ref } from 'vue';
    import { useUserStore } from '../../../pinia/modules/user'
    import axios from 'axios' // 引入axios

    import { Codemirror } from "vue-codemirror"
    import { oneDark } from '@codemirror/theme-one-dark'
    import { StreamLanguage } from "@codemirror/language"
    import { yaml } from "@codemirror/legacy-modes/mode/yaml"
    import { genFileId } from 'element-plus'
    import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'

    import { ElNotification } from 'element-plus'

    import { uploadFile } from '../../../api/file'

    import jsYaml from 'js-yaml';

    const extensions = [StreamLanguage.define(yaml), oneDark]

    const userStore = useUserStore()

    const yamlCode = ref('');

    // yaml代码
    const path = ref('http://19.224.154.190:8089/file')


    const upload = ref<UploadInstance>()

    const handleExceed: UploadProps['onExceed'] = (files) => {
      upload.value!.clearFiles()
      const file = files[0] as UploadRawFile
      file.uid = genFileId()
      upload.value!.handleStart(file)
    }

    const submitUpload = () => {
      upload.value!.submit()
    }

    const openFile = (file) => {
      const reader = new FileReader();
      reader.onload = function () {
          if (reader.result) {
              //打印文件内容
              // console.log(reader.result);
              yamlCode.value = reader.result.toString();

          }
      };
      reader.readAsText(file.raw);
    }

    const refreshCodeMirror: UploadProps['onSuccess'] = () => {
      handleReady()
    }

    const uploadError: UploadProps['onError'] = () => {
      ElNotification({
        title: 'Error',
        message: 'This is an error message',
        type: 'error',
      })
    }

    const handleReady = () => {
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

    const saveFile = async() => {

      const data = new Blob([yamlCode.value], { type: 'text/plain' });
      const formData = new FormData();
      formData.append('file', data, 'config.yaml');
      await uploadFile(formData)
    }

    // const handleInput = (value) => {
    //   yamlCode.value = value;
    //   try {
    //     formattedCode.value = jsYaml.safeDump(jsYaml.safeLoad(yamlCode.value));
    //   } catch (e) {
    //     console.error('解析yaml文件出错:', e);
    //     formattedCode.value = '';
    //   }
    // }

</script>