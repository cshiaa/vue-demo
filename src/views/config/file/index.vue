<template>
    <div>
      <div style="margin-bottom: 15px">展开:  &emsp; <el-switch v-model="fill" />
        &emsp;
        <el-button type="primary" @click="modify">修改</el-button>
        <el-button type="primary" @click="update">保存</el-button>
      </div>

      <el-space :fill="fill" fill-ratio=100 wrap>
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>本地存储设置 &emsp;是否启用 </span>
              <el-switch 
                v-model="localFill"
                :before-change="beforeChangeLocal"
                :disabled="localSwitchDisabled"
              />
            </div>
          </template>
          <el-row align='middle' :gutter="24">
            <el-col :span="3">
              <div class="card-col">保存路径:</div>
            </el-col>
            <el-col >
              <el-input class="card-input" v-model="conf.storage.local.filepath"  placeholder="127.0.0.1" :disabled="localInputDisabled"/>
            </el-col>
          </el-row>
        </el-card>
        <el-card class="box-card" >
          <template #header>
            <div class="card-header">
              <span>Etcd存储设置 &emsp;是否启用 </span>
              <el-switch
                v-model="etcdFill"
                :before-change="beforeChangeEtcd"
                :disabled="etcdSwitchDisabled"
              />
            </div>
          </template>
          <el-row align='middle' :gutter="24">
            <el-col :span="3">
              <div class="card-col">版本:</div>
            </el-col>
            <el-col >
              <el-input class="card-input" v-model="conf.zap.level"  placeholder="INFO,WARNING,ERROR" :disabled="etcdInputDisabled"/>
            </el-col>
          </el-row>
          <el-row align='middle' :gutter="24">
            <el-col :span="3">
              <div class="card-col">地址:</div>
            </el-col>
            <el-col >
              <el-input class="card-input" v-model="conf.zap.filename"  placeholder="./log/cshiaa.log" :disabled="etcdInputDisabled"/>
            </el-col>
          </el-row>
          <el-row align='middle' :gutter="24">
            <el-col :span="3">
              <div class="card-col">证书:</div>
            </el-col>
            <el-col >
              <el-input class="card-input" v-model="conf.zap.maxsize"  placeholder="10(M)" :disabled="etcdInputDisabled"/>
            </el-col>
          </el-row>
        </el-card>
        <el-card class="box-card" v-model="jenkinsConf">
          <template #header>
            <div class="card-header">
              <span>Consul存储设置 &emsp;是否启用 </span>
              <el-switch
                v-model="consulFill"
                :before-change="beforeChangeConsul"
                :disabled="consulSwitchDisabled"
              />
            </div>
          </template>
          <el-row align='middle' :gutter="24">
            <el-col :span="3">
              <div class="card-col">主机地址:</div>
            </el-col>
            <el-col >
              <el-input class="card-input" v-model="conf.jenkins.url"  placeholder="http://localhost:8080" :disabled="consulInputDisabled"/>
            </el-col>
          </el-row>
          <el-row align='middle' :gutter="24">
            <el-col :span="3">
              <div class="card-col">端口号:</div>
            </el-col>
            <el-col >
              <el-input class="card-input" v-model="conf.jenkins.user"  placeholder="admin" :disabled="consulInputDisabled"/>
            </el-col>
          </el-row>
          <el-row align='middle' :gutter="24">
            <el-col :span="3">
              <div class="card-col">证书Key:</div>
            </el-col>
            <el-col >
              <el-input class="card-input" v-model="conf.jenkins.password"  placeholder="Jenkins API Token" :disabled="consulInputDisabled"/>
            </el-col>
          </el-row>
        </el-card>
      </el-space>
    </div>
  </template>

<script setup>
  import { ref } from 'vue'
  import { getConfigList, saveConfig } from '@/api/config'
  const fill = ref(true)
  const localFill = ref(true)
  const etcdFill = ref(false)
  const consulFill = ref(false)

  const localSwitchDisabled = ref(false)
  const etcdSwitchDisabled = ref(false)
  const consulSwitchDisabled = ref(false)

  const conf = ref({
    mysql: {},
    zap: {},
    jenkins: {},
    storage: {
      local: {},
      type: ''
    }
  })


  const localInputDisabled = ref(true)
  const etcdInputDisabled = ref(true)
  const consulInputDisabled = ref(true)

  const getConifgList = async() => {
    const confres = await getConfigList()
    if (confres.status === 200) {
      conf.value = confres.data.config
      switch (confres.data.config.storage.type) {
        case 'local':
          localFill.value = true
          etcdFill.value = false
          consulFill.value = false
          break;
        case 'etcd':
          localFill.value = false
          etcdFill.value = true
          consulFill.value = false
          break;
        case 'consul':
          localFill.value = false
          etcdFill.value = false
          consulFill.value = true
          break;
      }
    }
  }
  getConifgList()

  const modify = () => {
    if ( localInputDisabled.value === true) {
      localInputDisabled.value = false
    } else {
      localInputDisabled.value = true
      etcdInputDisabled.value = true
      consulInputDisabled.value = true
    }
  }

  const update = () => {
    saveConfig({config: conf.value})
    localInputDisabled.value = true
    etcdInputDisabled.value = true
    consulInputDisabled.value = true
  }

  const beforeChangeLocal = () => {
    if ( localFill.value === false){
      etcdFill.value = false
      consulFill.value = false
    }
    return true
  }

  const beforeChangeEtcd = () => {
    if ( etcdFill.value === false){
      localFill.value = false
      consulFill.value = false
    }
    return true
  }

  const beforeChangeConsul = () => {
    if ( consulFill.value === false){
      etcdFill.value = false
      localFill.value = false
    }
    return true
  }

</script>

<script>
export default {
  name: 'File'
}
</script>

<style>

.el-card.div.span {
  display:inline-block
}
.el-col {
  max-width: 100%;
  flex: 20 30 40%;
}
.card-col {
  width: 200px;
  max-width: 200px;
}
.card-input {
  width: 400px;
  max-width: 400px;
}
</style>