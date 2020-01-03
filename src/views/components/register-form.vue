<template>
  <Form ref="registerForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
    <FormItem prop="phone">
      <Input v-model="form.phone" placeholder="请输入手机号">
        <span slot="prepend">
          <Icon :size="16" type="ios-person"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" v-model="form.password" placeholder="请输入密码">
        <span slot="prepend">
          <Icon :size="14" type="md-lock"></Icon>
        </span>
      </Input>
    </FormItem>
     <FormItem prop="verifyCode" >
       <div style="display:flex">
         <Input v-model="form.verifyCode" placeholder="请输入验证码" style="width:200px;">
        <span slot="prepend">
          <Icon :size="16" type="ios-card"></Icon>
        </span>
      </Input>
      <Button type="info" style="margin-left: 20px;" @click="get_verify_code" :disabled='btn_disabled'>
          {{ btn_text }}
      </Button>
       </div>
      
    </FormItem>
    <FormItem>
      <Button @click="handleSubmit" type="primary" long>注册</Button>
    </FormItem>
  </Form>
</template>
<script>
import { get_verify_code as get_code } from "@/apis/user";
export default {
  name: 'registerForm',
  props: {
    phoneRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ]
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    },
     verifyCodeRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '验证码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  data () {
    return {
      form: {
        phone: '',
        password: '',
        verifyCode:''
      },
      code: '',
      btn_text:'获取验证码',
      btn_disabled:false
    }
  },
  computed: {
    rules () {
      return {
        phone: this.phoneRules,
        password: this.passwordRules,
        verifyCode:this.verifyCodeRules
      }
    }
  },
  methods: {
    get_verify_code(){
      if(!this.validate_phone(this.form.phone)) {
        alert('手机号不合法！');
        return;
      }
      get_code( this.form.phone ).then( res => {
        console.log(res);
        this.code = res.data.verify_code;
      })
      this.btn_disabled = true
      
      let i = 60
      const timer = setInterval( () => {
        if(i>0){
          i--;
          this.btn_text = `${i}s后重发`
        }
        else{
          clearInterval( timer )
          this.btn_text = '获取验证码'
          this.btn_disabled = false
        }

      },1000)

      alert('验证码已发送！')
      
    },
    validate_phone( phone ){
      if(!(/^1[3456789]\d{9}$/.test(phone))){ 
        alert("手机号码有误，请重填");  
        return false; 
      } 
      return phone;
    },
    handleSubmit () {
      this.$refs.registerForm.validate((valid) => {
        if( this.code != this.form.verifyCode ){
          alert('验证码错误！');
          return;
        }
        if (valid) {
          this.$emit('on-success-valid', {
            phone: this.form.phone,
            password: this.form.password
          })
        }
      })
    }
  }
}
</script>
