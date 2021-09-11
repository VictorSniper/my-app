<template>
  <div class="page-content-details">
    <el-descriptions
      class="margin-top"
      size="medium"
      title="一叶障目"
      border
      :column="2"
    >
      <template #extra>
        <el-button type="primary" >返回</el-button>
      </template>
      <template v-for="(field, index) in config" :key="index">
        <el-descriptions-item>
          <template #label>
            {{ field.descriptionsLabel }}
          </template>
          {{ params[field.val] }}
        </el-descriptions-item>
      </template>
    </el-descriptions>
  </div>
</template>
<script>
import { defineComponent, getCurrentInstance, onMounted, toRaw } from "vue";
import { useRouter } from "vue-router";
import { ElLoading } from "element-plus";
export default defineComponent({
  props: ["config", "params","apiUrl"],
  setup(props, { emit }) {
    const router = useRouter();
    const { proxy } = getCurrentInstance();
    onMounted(() => {
      getDetails();
    });
    const getDetails = () => {
      const loading = ElLoading.service({
        lock: true,
        text: "数据加载中...",
        spinner: "el-icon-loading",
        background: "#fff",
        target: document.querySelector(".article"),
      });
      let params = router.currentRoute.value.query;
      proxy.$api[props.apiUrl](toRaw(params)).then((res) => {
        if (res.code === "0") {
          emit("finish", res.data);
          loading.close();
        }
      });
    };
    return {
      getDetails,
    };
  },
});
</script>
<style lang="scss" scoped>
.page-content-details {
  background-color: white;
  padding: 15px;
  border-radius: 4px;
  .el-descriptions__body {
    .el-form-item {
      margin-bottom: unset;
    }
  }
}
</style>
