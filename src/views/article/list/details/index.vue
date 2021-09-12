<template>
  <page-details
    :params="params"
    :config="config"
    apiUrl="getRedBlackList"
    @finish="finish"
  ></page-details>
</template>
<script>
import PageDetails from "@/components/PageDetails";
import { defineComponent, reactive, toRefs } from "vue";
export default defineComponent({
  components: {
    PageDetails,
  },
  setup() {
    const state = reactive({
      params: {},
      //搜索表单配置
      config: [
        {
          title: "基本信息",
          size: "medium",
          column: 3,
          border: true,
          sub: [
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
        },
        {
          title: "充值信息",
          size: "medium",
          column: 4,
          border: true,
          sub: [
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