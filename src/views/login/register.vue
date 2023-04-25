<template>
    <div class="login-wrap">
        <el-form 
            ref="registerForm"
            :model="registerFormData"
            :validate-on-rule-change="false"
            @keyup.enter="toLogin"
            class="login-container">
            <h1 class="title">用户注册</h1>
            <el-form-item>
                <el-input type="text" v-model="registerFormData.username" placeholder="请输入用户名" autocomplete="off" />
            </el-form-item>
            <el-form-item>
                <el-input show-password v-model="registerFormData.password" placeholder="请输入密码" autocomplete="off" change="checkPassword"/>
            </el-form-item>
            <el-form-item>
                <el-input show-password v-model="confirmPassword" placeholder="再次输入密码" autocomplete="off" />
                <p v-if="isError" style="color: red;">两次输入的密码不一致，请重新输入</p>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="toRegister" style="width: 100%;">注册</el-button>
            </el-form-item>
            <el-row style="justify-content: center;margin-top: -10px;">
                <el-link type="primary" @click="toLogin">返回登录 </el-link>
            </el-row>
        </el-form>
    </div>
</template>

<script setup>
    import { reactive } from 'vue'
    import { useRouter } from 'vue-router'
    import { ref, watch } from 'vue'
    import { ElMessageBox } from 'element-plus'
    
    import { register } from '@/api/user'

    const router = useRouter()

    const registerForm = ref(null)
    const registerFormData = reactive({
        username: '',
        password: ''
    })
    const isError = ref(false);
    const confirmPassword = ref('');

    const validatePassword = () => {
    if (registerFormData.password !== confirmPassword.value) {
        console.log('asd')
        isError.value = true;
    } else {
        console.log('456')
        isError.value = false;
    }
    };

    // 注册一个 watch 监听 confirmPasssword 值的变化
    // 当 confirmPasssword 值变化时，自动执行 validatePassword 方法进行密码确认验证
    watch(confirmPassword, validatePassword);
    
    const toLogin = () => {
    // authentication logic here
        router.push({ name: 'login', replace: true })
    }
    const toRegister = async() => {
    // authentication logic here
        const res = await register(registerFormData)
        if (res.status === 200 ) {
            ElMessageBox.alert('注册成功', '注册', {
                // if you want to disable its autofocus
                // autofocus: false,
                confirmButtonText: '返回登录界面',
            })
            router.push({ name: 'login', replace: true })
        }
    }

</script>

<style scoped>
@import "@/style/login.css";
</style>