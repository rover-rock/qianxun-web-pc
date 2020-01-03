<template>
  <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
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
    <FormItem>
      <Button @click="handleSubmit" type="primary" long>登录</Button>
    </FormItem>
  </Form>
</template>
<script>
export default {
  name: 'LoginForm',
  props: {
    phoneRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '手机号不能为空', trigger: 'blur' }
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
    }
  },
  data () {
    return {
      form: {
        phone:  localStorage.getItem('user_phone')  || '',
        password: ''
      }
    }
  },
  computed: {
    rules () {
      return {
        phone: this.phoneRules,
        password: this.passwordRules
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          localStorage.setItem('user_phone',this.form.phone)
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
