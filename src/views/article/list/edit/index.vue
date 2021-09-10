<template>
  <page-edit
    :formData="currentApi"
    :formConfig="fieldsConfig"
    :inline="true"
  ></page-edit>
</template>
<script>
import PageEdit from "@/components/PageEdit";
import { useRouter } from "vue-router";
import {
  defineComponent,
  toRaw,
  reactive,
  toRefs,
  getCurrentInstance,
  onMounted,
} from "vue";
export default defineComponent({
  components: {
    PageEdit,
  },
  setup() {
    const router = useRouter();
    const { proxy } = getCurrentInstance();
    const state = reactive({
      currentApi: {
        createUser: "",
        title: "",
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
          name: "title",
          fieldType: "text-input",
          attrs: {
            descriptionsLabel: "标题",
            placeholder: "请填写",
            type: "text", //表单类型
            clearable: true,
            onInputEvent: (val) => {
              state.currentApi.createUserId = val;
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
          name: "content",
          fieldType: "text-input",
          attrs: {
            descriptionsLabel: "内容",
            placeholder: "请填写",
            type: "textarea", //表单类型
            clearable: true,
            onInputEvent: (val) => {
              state.currentApi.createUserId = val;
            },
          },
        },
      ],
    });
    onMounted(() => {
      getList();
    });
    const getList = () => {
      let params = router.currentRoute.value.query;
      proxy.$api.getRedBlackList(toRaw(params)).then((res) => {
        if (res.code === "0") {
          state.currentApi = res.data.list[params.id - 1];
        }
      });
    };
    return {
      ...toRefs(state),
      getList,
    };
  },
});
</script>