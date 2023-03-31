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
              <span>数据库配置信息 &emsp; </span>
            </div>
          </template>
          <el-row align='middle' :gutter="24">
            <el-col :span="3">
              <div class="card-col">连接地址:</div>
            </el-col>
            <el-col >
              <el-input class="card-input" v-model="conf.mysql.host"  placeholder="127.0.0.1" :disabled="inputDisabled"/>
            </el-col>
          </el-row>
          <el-row align='middle' :gutter="24">
            <el-col :span="3">
              <div class="card-col">端口号:</div>
            </el-col>
            <el-col >
              <el-input class="card-input" v-model="conf.mysql.port"  placeholder="3306" :disabled="inputDisabled"/>
            </el-col>
          </el-row>
          <el-row align='middle' :gutter="24">
            <el-col :span="3">
              <div class="card-col">数据库名称:</div>
            </el-col>
            <el-col >
              <el-input class="card-input" v-model="conf.mysql.dbname"  placeholder="cshiaa" :disabled="inputDisabled"/>
            </el-col>
          </el-row>
          <el-row align='middle' :gutter="24">
            <el-col :span="3">
              <div class="card-col">用户:</div>
            </el-col>
            <el-col >
              <el-input class="card-input" v-model="conf.mysql.username"  placeholder="cshiaa" :disabled="inputDisabled"/>
            </el-col>
          </el-row>
          <el-row align='middle' :gutter="24">
            <el-col :span="3">
              <div class="card-col">密码:</div>
            </el-col>
            <el-col >
              <el-input class="card-input" v-model="conf.mysql.password"  placeholder="cshiaa" :disabled="inputDisabled"/>
            </el-col>
          </el-row>
        </el-card>
        <el-card class="box-card" >
          <template #header>
            <div class="card-header">
              <span>Zap日志配置信息 &emsp; </span>
            </div>
          </template>
          <el-row align='middle' :gutter="24">
            <el-col :span="3">
              <div class="card-col">日志级别:</div>
            </el-col>
            <el-col >
              <el-input class="card-input" v-model="conf.zap.level"  placeholder="INFO,WARNING,ERROR" :disabled="inputDisabled"/>
            </el-col>
          </el-row>
          <el-row align='middle' :gutter="24">
            <el-col :span="3">
              <div class="card-col">日志路径:</div>
            </el-col>
            <el-col >
              <el-input class="card-input" v-model="conf.zap.filename"  placeholder="./log/cshiaa.log" :disabled="inputDisabled"/>
            </el-col>
          </el-row>
          <el-row align='middle' :gutter="24">
            <el-col :span="3">
              <div class="card-col">日志文件大小:</div>
            </el-col>
            <el-col >
              <el-input class="card-input" v-model="conf.zap.maxsize"  placeholder="10(M)" :disabled="inputDisabled"/>
            </el-col>
          </el-row>
          <el-row align='middle' :gutter="24">
            <el-col :span="3">
              <div class="card-col">保留时间:</div>
            </el-col>
            <el-col >
              <el-input class="card-input" v-model="conf.zap.maxage"  placeholder="30(天)" :disabled="inputDisabled"/>
            </el-col>
          </el-row>
          <el-row align='middle' :gutter="24">
            <el-col :span="3">
              <div class="card-col">最大备份数:</div>
            </el-col>
            <el-col >
              <el-input class="card-input" v-model="conf.zap.maxbackups"  placeholder="3" :disabled="inputDisabled"/>
            </el-col>
          </el-row>
        </el-card>
        <el-card class="box-card" v-model="jenkinsConf">
          <template #header>
            <div class="card-header">
              <span>Jenkins配置信息 &emsp; </span>
            </div>
          </template>
          <el-row align='middle' :gutter="24">
            <el-col :span="3">
              <div class="card-col">Jenkins 地址:</div>
            </el-col>
            <el-col >
              <el-input class="card-input" v-model="conf.jenkins.url"  placeholder="http://localhost:8080" :disabled="inputDisabled"/>
            </el-col>
          </el-row>
          <el-row align='middle' :gutter="24">
            <el-col :span="3">
              <div class="card-col">用户:</div>
            </el-col>
            <el-col >
              <el-input class="card-input" v-model="conf.jenkins.user"  placeholder="admin" :disabled="inputDisabled"/>
            </el-col>
          </el-row>
          <el-row align='middle' :gutter="24">
            <el-col :span="3">
              <div class="card-col">API Token:</div>
            </el-col>
            <el-col >
              <el-input class="card-input" v-model="conf.jenkins.password"  placeholder="Jenkins API Token" :disabled="inputDisabled"/>
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

  const conf = ref({
    mysql: {},
    zap: {},
    jenkins: {}
  })


  const inputDisabled = ref(true)

  const getConifgList = async() => {
    const confres = await getConfigList()
    if (confres.status === 200) {
      conf.value = confres.data.confList

    }
  }
  getConifgList()

  const modify = () => {
    if ( inputDisabled.value === true) {
      inputDisabled.value = false
    } else {
      inputDisabled.value = true
    }
  }

  const update = () => {
    saveConfig({config: conf.value})
    inputDisabled.value = true

  }

</script>

<script>
export default {
  name: 'Config'
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