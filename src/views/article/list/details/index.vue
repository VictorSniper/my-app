<template>
  <page-edit
    :formData="currentApi"
    :formConfig="fieldsConfig"
    :inline="true"
  ></page-edit>
</template>
<script>
import PageEdit from "@/components/PageEdit";
import { defineComponent, ref, reactive, toRefs } from "vue";
export default defineComponent({
  components: {
    PageEdit,
  },
  setup() {
    const val = ref(null);
    const state = reactive({
      currentApi: {
        currentPage: 1,
        pageSize: 10,
        createUser: "",
        startTime: "",
        endTime: "",
        createUserId: "",
      },
      //搜索表单配置
      fieldsConfig: [
        {
          name: "createUser",
          fieldType: "text-input",
          attrs: {
            descriptionsLabel: "姓名",
            placeholder: "请填写",
            type: "text", //表单类型
            clearable: true,
            onInputEvent: (val) => {
              state.currentApi.createUser = val;
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
              state.currentApi.createUserId = val;
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
              state.currentApi.createUserId = val;
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
              state.currentApi.createUserId = val;
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
              state.currentApi.createUserId = val;
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
              state.currentApi.createUserId = val;
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
              state.currentApi.createUserId = val;
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
              state.currentApi.createUserId = val;
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
              state.currentApi.createUserId = val;
            },
          },
        },
      ],
    });
    return {
      ...toRefs(state),
      val,
    };
  },
});
</script>

<style lang="scss" scoped>
.page-content-details {
  background-color: white;
  padding: 15px;
  border-radius: 4px;
}
</style>
