<template>
  <div class="container">
    <el-form ref="formRef" :model="loginForm" label-width="0px" :rules="rules">
        <div class="login-box">
      <h2 class="login-title">账号登录</h2>
      <el-form-item label="" prop="username">
        <el-input v-model="loginForm.username" placeholder="请输入账号 / 用户名" class="input-item"></el-input>
      </el-form-item>
      <el-form-item label="" prop="password">
        <el-input v-model="loginForm.password" placeholder="请输入密码" type="password" class="input-item" show-password></el-input>
      </el-form-item>
      <el-button type="primary" class="login-btn" @click="toLogin">立即登录</el-button>
      <div class="login-tip">
        还没有账号？<a href="#">立即注册</a>
      </div>
    </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { LoginRequest } from '@/types';
import {reqLogin} from '@/apis/user/index'
import { ref } from "vue";
import { useUserStore } from '@/stores/counter'
import type { FormInstance } from "element-plus/es/components/form";
import { ElMessage,ElNotification } from 'element-plus';
import {useRouter} from 'vue-router';
const router = useRouter();
const formRef = ref<FormInstance>();
  // 登录表单
const loginForm = ref<LoginRequest>({
  username: "",
  password: "",
});
// 规则验证
const rules = ref({
  username:[{
    required:true,
    message:"请输入账号 / 用户名",
    trigger:'blur'
  }],
  password:[{
    required: true,
    message: '请输入密码',
    trigger: ['blur', 'change']
  }]
});
// 登录提交
const toLogin=async()=>{
  const valid=await formRef.value?.validate();
  if(!valid){
    return;
  }
  try{
    const res=await reqLogin(loginForm.value);
      ElMessage.success('登录成功');
    // 登录成功后，将token存储到store中
    localStorage.setItem('token',res.data);
    // 登录成功后，获取用户信息
    useUserStore().token=res.data
    // 登录成功后，清空表单
    formRef.value?.resetFields();
    // 路由跳转到首页
    const now=new Date();
    const time=now.toLocaleString().split(' ')[1].split(':')[0];
    const data=time>'12'?'下午':'上午';
    ElNotification({
      title:`Hi！${data}好`,
      message:`欢迎回来`,
      type:'success'
    });
    router.push({name:'home'})
  }
  catch(err){
    console.error(err);
  }
  }
</script>

<style lang="scss" scoped>
/* 全局初始化 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(../assets/images/01.jpg);
  background-size: cover;
  background-position: center;
}

/* 登录容器 */
.login-box {
  width: 400px;
  padding: 40px 35px;
  background: #fff;
  border-radius: 20px;
  /* 二次元柔和阴影 */
  box-shadow: 0 8px 25px rgba(79, 179, 236, 0.25);
  border: 2px solid #bde9f7;
  background: rgba(255, 255, 255, 0.5);
  // 玻璃质感
  backdrop-filter: blur(7px);
}

/* 标题 */
.login-title {
  text-align: center;
  font-size: 28px;
  color: #1b8fee;
  margin-bottom: 35px;
  letter-spacing: 4px;
  font-weight: 600;
}

/* 输入框容器 */
.input-item {
  margin-bottom: 25px;
  width: 100%;
  position: relative;
}
   :deep(.el-form-item__error)
  {
    color: #f56c6c;
    position: absolute;
    top: 50px;
    left: 10px;
  }
 :deep(.el-input__wrapper) {
    height: 50px;
    padding: 0 20px;
    border: 2px solid #bde9f7;
    border-radius: 30px;
    font-size: 16px;
    color: #666;
    background: #fef8ff;
    transition: all 0.3s ease;
    box-shadow: none;
  }

  :deep(.el-input__wrapper:focus) {
    outline: none;
    border-color: #c0caf5;
    box-shadow: 0 0 8px rgba(120, 205, 220, 0.3);
  }

/* 登录按钮 */
.login-btn {
  width: 100%;
  height: 50px;
  border-radius: 30px;
  border: none;
  background: linear-gradient(90deg, #98c1e8, #83b5f7);
  color: #fff;
  font-size: 17px;
  letter-spacing: 3px;
  cursor: pointer;
  transition: all 0.3s;
}

.login-btn:hover {
  opacity: 0.9;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(120, 205, 220, 0.35);
}

/* 底部小字 */
.login-tip {
  margin-top: 20px;
  text-align: center;
  font-size: 14px;
  color: #999;
}

.login-tip a {
  color: #b9d8f5;
  text-decoration: none;
}

/* 适配手机 */
@media (max-width: 450px) {
  .login-box {
    width: 90%;
    padding: 30px 25px;
  }
}
</style>
