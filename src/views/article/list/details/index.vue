<template>
  <page-details
    :detailsApi="detailsApi"
    :formConfig="fieldsConfig"
    :inline="true"
  ></page-details>
</template>
<script>
import PageDetails from "@/components/PageDetails";
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
    PageDetails,
  },
  setup() {
    const router = useRouter();
    const { proxy } = getCurrentInstance();
    const state = reactive({
      detailsApi: {},
      //搜索表单配置
      fieldsConfig: [
        {
          val: "createUser",
          descriptionsLabel: "姓名",
        },
        {
          val: "title",
          descriptionsLabel: "标题",
        },
        {
          val: "date",
          descriptionsLabel: "日期",
        },
        {
          val: "createUserId",
          descriptionsLabel: "推荐成语",
        },
        {
          val: "content",
          descriptionsLabel: "内容",
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
          state.detailsApi = res.data.list[params.id - 1];
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