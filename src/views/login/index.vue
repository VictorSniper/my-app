<template>
  <div class="full">
    <div class="full-login">
      <div class="full-login-header">后台登录</div>
      <div class="full-login-body">
        <page-pro-form
          :formData="formData"
          :formConfig="formConfig"
          :apiUrl="apiUrl"
          labelPosition="top"
          btnWidth="100%"
          submitText="登 录"
          @submitForm="submitForm"
        ></page-pro-form>
      </div>
    </div>
  </div>
</template>
<script>
import PageProForm from "@/components/PageProForm";
import { defineComponent, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  components: {
    PageProForm,
  },
  setup() {
    const router = useRouter();
    const state = reactive({
      formData: {
        userName: "",
        passWord: "",
      },
      formConfig: [
        {
          name: "userName",
          fieldType: "text-input",
          attrs: {
            label: "邮箱",
            labelWidth: "100px",
            prefixIcon: "el-icon-user",
            placeholder: "it_163@alipay.com",
            type: "text", //表单类型
            rules: [{ required: true, message: "请填写邮箱", trigger: "blur" }],
            onInputEvent: (val) => {
              state.formData.userName = val;
            },
          },
          labelPosition: "top",
        },
        {
          name: "passWord",
          fieldType: "text-input",
          labelPosition: "top",
          attrs: {
            label: "密码",
            labelWidth: "100px",
            prefixIcon: "el-icon-lock",
            showPassword: true,
            placeholder: "请填写密码",
            type: "text", //表单类型
            rules: [{ required: true, message: "请填写密码", trigger: "blur" }],
            onInputEvent: (val) => {
              state.formData.passWord = val;
            },
          },
        },
      ],
      apiUrl: "getCityCategory",
    });
    const submitForm = () => {
      console.log("登录成功");
      window.localStorage.setItem("token", "admin");
      router.push({
        path: `/overview`,
      });
    };
    return {
      ...toRefs(state),
      submitForm,
    };
  },
});
</script>
<style lang="scss" scoped>
.full {
  box-sizing: border-box;
  height: 100vh;
  background: url("https://ui.cn/Public/img/reg_bg.jpg") no-repeat center;
  background-size: 100% 100%;
  position: relative;
  .full-login {
    width: 420px;
    background-color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 4px;
    box-shadow: 0 0 30px rgb(0 0 0 / 10%);
    .full-login-header {
      height: 64px;
      line-height: 64px;
      text-align: center;
      font-size: 26px;
      border-bottom: 1px solid #f0f0f0;
    }
    .full-login-body {
      padding: 25px;
    }
  }
}
</style>
