<template>
  <div class="page-content-details">
    <template v-for="(item, index) in config" :key="index">
      <el-descriptions class="descriptions-margin" v-bind="item">
        <template v-for="(field, subIndex) in item.sub" :key="subIndex">
          <el-descriptions-item>
            <template #label>
              {{ field.descriptionsLabel }}
            </template>
            {{ params[field.val] }}
          </el-descriptions-item>
        </template>
      </el-descriptions>
    </template>
  </div>
</template>
<script>
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  toRaw,
} from "vue";
import { useRoute } from "vue-router";
import { ElLoading } from "element-plus";
export default defineComponent({
  props: ["config", "params", "apiUrl", "loading"],
  setup(props, { emit }) {
    const route = useRoute();
    const { proxy } = getCurrentInstance();
    onMounted(() => {
      getDetails();
    });
    const getDetails = () => {
      const loading = ElLoading.service(props.loading);
      let params = toRaw(route.query);
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
  .descriptions-margin {
    background-color: white;
    margin: 15px 0;
    padding: 15px;
    border-radius: 4px;
  }
}
</style>
