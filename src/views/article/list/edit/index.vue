<template>
  <page-edit
    :params="params"
    :config="config"
    :loading="loading"
    apiUrl="getRedBlackList"
    @finish="finish"
  ></page-edit>
</template>
<script>
import PageEdit from "@/components/PageEdit";
import { defineComponent, reactive, toRefs } from "vue";
export default defineComponent({
  components: {
    PageEdit,
  },
  setup() {
    const state = reactive({
      params: {
        createUser: "",
        title: "",
        endTime: "",
        createUserId: "",
      },
      loading: {
        lock: true,
        text: "数据加载中...",
        spinner: "el-icon-loading",
        background: "#fff",
        target: ".article",
      },
      //搜索表单配置
      config: [
        {
          name: "createUser",
          fieldType: "text-input",
          attrs: {
            descriptionsLabel: "姓名",
            placeholder: "请填写",
            type: "text", //表单类型
            clearable: true,
            onInputEvent: (val) => {
              state.params.createUser = val;
            },
          },
        },
        {
          name: "title",
          fieldType: "text-input",
          attrs: {
            descriptionsLabel: "标题",
            placeholder: "请填写",
            type: "text", //表单类型
            clearable: true,
            onInputEvent: (val) => {
              state.params.createUserId = val;
            },
          },
        },
        {
          name: "date",
          fieldType: "text-input",
          attrs: {
            descriptionsLabel: "日期",
            placeholder: "请填写",
            type: "text", //表单类型
            clearable: true,
            onInputEvent: (val) => {
              state.params.createUserId = val;
            },
          },
        },
        {
          name: "createUserId",
          fieldType: "text-input",
          attrs: {
            descriptionsLabel: "推荐成语",
            placeholder: "请填写",
            type: "text", //表单类型
            clearable: true,
            onInputEvent: (val) => {
              state.params.createUserId = val;
            },
          },
        },
        {
          name: "createUserId",
          fieldType: "text-input",
          attrs: {
            descriptionsLabel: "推荐成语",
            placeholder: "请填写",
            type: "text", //表单类型
            clearable: true,
            onInputEvent: (val) => {
              state.params.createUserId = val;
            },
          },
        },
        {
          name: "createUserId",
          fieldType: "text-input",
          attrs: {
            descriptionsLabel: "推荐成语",
            placeholder: "请填写",
            type: "text", //表单类型
            clearable: true,
            onInputEvent: (val) => {
              state.params.createUserId = val;
            },
          },
        },
        {
          name: "createUserId",
          fieldType: "text-input",
          attrs: {
            descriptionsLabel: "推荐成语",
            placeholder: "请填写",
            type: "text", //表单类型
            clearable: true,
            onInputEvent: (val) => {
              state.params.createUserId = val;
            },
          },
        },
        {
          name: "createUserId",
          fieldType: "text-input",
          attrs: {
            descriptionsLabel: "推荐成语",
            placeholder: "请填写",
            type: "text", //表单类型
            clearable: true,
            onInputEvent: (val) => {
              state.params.createUserId = val;
            },
          },
        },
        {
          name: "content",
          fieldType: "text-input",
          attrs: {
            descriptionsLabel: "内容",
            placeholder: "请填写",
            type: "textarea", //表单类型
            clearable: true,
            onInputEvent: (val) => {
              state.params.createUserId = val;
            },
          },
        },
      ],
    });
    const finish = (val) => {
      state.params = val.list[0];
    };
    return {
      ...toRefs(state),
      finish,
    };
  },
});
</script>
