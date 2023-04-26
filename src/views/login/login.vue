<template>
    <div class="login-wrap">
        <el-form 
            ref="loginForm"
            :model="loginFormData"
            :validate-on-rule-change="false"
            @keyup.enter="toLogin"
            class="login-container">
            <h1 class="title">用户登录</h1>
            <el-form-item>
                <el-input type="text" v-model="loginFormData.username" placeholder="请输入用户名" autocomplete="off" />
            </el-form-item>
            <el-form-item>
                <el-input show-password v-model="loginFormData.password" placeholder="请输入密码" autocomplete="off" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="toLogin" style="width: 100%;">登录</el-button>
            </el-form-item>
            <el-row style="justify-content: center;margin-top: -10px;">
                <el-link type="primary" @click="toRegister">注册账号 </el-link>
                <el-link type="primary" > &emsp;忘记密码</el-link>
            </el-row>
        </el-form>
    </div>
</template>

<script setup>
    import { reactive } from 'vue'
    // import { useRouter } from 'vue-router'
    import router from '@/router/index'
    import { useUserStore } from '@/pinia/modules/user'
    import { ref } from 'vue'


    const userStore = useUserStore()
    const login = async() => {
        return await userStore.LoginIn(loginFormData)
    }

    // const router = useRouter()

    const loginForm = ref(null)
    const loginFormData = reactive({
        username: 'admin',
        password: '123'
    })

    const toLogin = () => {
    // authentication logic here
        loginForm.value.validate(async(v) => {
            if (v) {
                const flag = await login()
                if (!flag) {
                    console.log('登录失败')
                }
            } else {
                ElMessage({
                    type: 'error',
                    message: '请正确填写登录信息',
                    showClose: true,
                })
                return false
            }
        })
    }
    const toRegister = () => {
    // authentication logic here
        router.push({ name: 'register', replace: true })
    }


</script>

<style scoped>
@import "@/style/login.css";
</style>