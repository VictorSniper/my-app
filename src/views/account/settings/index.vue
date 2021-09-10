<template>
  <el-card shadow="never" class="account-center">
    <el-tabs tab-position="left" style="height:auto;overflow-y: scroll;">
      <el-tab-pane label="基本信息">
        <div class="page-tab-pane">
          <div class="page-tab-pane-title">基本信息</div>
          <page-pro-form
            :formData="formData"
            :formConfig="formConfig"
            :apiUrl="apiUrl"
            labelPosition="top"
            submitText="更新基本信息"
            @resetForm="resetForm"
          ></page-pro-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="安全设置">安全设置</el-tab-pane>
      <el-tab-pane label="风格设置">风格设置</el-tab-pane>
      <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
    </el-tabs>
  </el-card>
</template>
<script>
import PageProForm from "@/components/PageProForm";
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  reactive,
  toRefs,
} from "vue";
export default defineComponent({
  components: {
    PageProForm,
  },
  setup() {
    const { proxy } = getCurrentInstance();
    const state = reactive({
      formData: {
        createUserId: "",
      },
      formConfig: [
        {
          name: "Email",
          fieldType: "text-input",
          width: "320px",
          attrs: {
            label: "邮箱",
            labelWidth: "100px",
            placeholder: "it_163@alipay.com",
            clearable: true,
            type: "text",
            labelPosition: "top",
            onInputEvent: (val) => {
              state.formData.createUserId = val;
            },
          },
        },
        {
          name: "Password",
          fieldType: "text-input",
          attrs: {
            label: "密码",
            labelWidth: "100px",
            width: "320px",
            type: "password",
            placeholder: "(非必填)请填写",
            labelPosition: "top",
            onInputEvent: (val) => {
              state.formData.createUserId = val;
            },
          },
        },
        {
          name: "Nickname",
          width: "220px",
          fieldType: "text-input",
          attrs: {
            label: "姓名",
            labelWidth: "100px",
            placeholder: "请填写",
            clearable: true,
            type: "text",
            labelPosition: "top",
            onInputEvent: (val) => {
              state.formData.createUserId = val;
            },
          },
        },
        {
          name: "Phone",
          width: "220px",
          fieldType: "text-input",
          attrs: {
            label: "电话",
            labelWidth: "100px",
            placeholder: "186 5113 6279",
            clearable: true,
            type: "text",
            labelPosition: "top",
            onInputEvent: (val) => {
              state.formData.createUserId = val;
            },
          },
        },
        {
          name: "city",
          fieldType: "text-select",
          options: [],
          type: "text",
          attrs: {
            label: "城市",
            labelWidth: "100px",
            placeholder: "请选择",
            clearable: true,
            type: "text",
            labelPosition: "top",
            onInputEvent: (val) => {
              state.formData.createUserId = val;
            },
          },
        },
        {
          name: "address",
          width: "50%",
          fieldType: "text-input",
          type: "text",
          attrs: {
            label: "地址",
            labelWidth: "100px",
            placeholder: "金港镇长江中路57号",
            clearable: true,
            type: "text",
            labelPosition: "top",
            onInputEvent: (val) => {
              state.formData.createUserId = val;
            },
          },
        },
        {
          name: "address",
          width: "50%",
          fieldType: "text-input",
          attrs: {
            label: "个人简介",
            labelWidth: "100px",
            placeholder: "请填写您的高光时刻...",
            clearable: true,
            type: "textarea",
             rows:4,
            labelPosition: "top",
            onInputEvent: (val) => {
              state.formData.createUserId = val;
            },
          },
        },
      ],
      labelPosition: "left",
      apiUrl: "getCityCategory",
    });
    const resetForm = () => {
      state.formConfig.forEach((item, index) => {
        item.id = +new Date() + index;
      });
    };
    //获取城市分类数据列表
    const getCityCategory = () => {
      proxy.$api.getCityCategory().then((res) => {
        if (res.code === "0") {
          state.formConfig[4].options = res.data.list;
        }
      });
    };
    onMounted(() => {
      getCityCategory();
    });
    return {
      ...toRefs(state),
      getCityCategory,
      resetForm,
    };
  },
});
</script>
<style lang="scss" scoped>
.page-tab-pane {
  padding: 0 20px;
  .page-tab-pane-title {
    font-size: 24px;
    font-weight: bold;
    margin-top: 10px;
    margin-bottom: 20px;
  }
}
</style>
