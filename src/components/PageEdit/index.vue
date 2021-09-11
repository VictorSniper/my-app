<template>
  <div class="page-content-details">
    <el-form :model="params" :hide-required-asterisk="true" ref="formRef">
      <el-descriptions
        class="margin-top"
        size="medium"
        title="一叶障目"
        border
        :column="4"
      >
        <template #extra>
          <el-button type="primary" size="small">返回</el-button>
        </template>
        <template v-for="field in config" :key="field.name">
          <el-descriptions-item>
            <template #label>
              {{ field.attrs.descriptionsLabel }}
            </template>
            <component
              :is="field.fieldType"
              :width="field.width"
              :name="field.name"
              :options="field.options"
              :value="params[field.name]"
              v-bind="field.attrs"
              :ref="field.name"
            />
          </el-descriptions-item>
        </template>
      </el-descriptions>
    </el-form>
  </div>
</template>
<script>
import TextInput from "@/components/BaseField/TextInput";
import TextSelect from "@/components/BaseField/TextSelect";
import TextDatePicker from "@/components/BaseField/TextDatePicker";
import TextDatePickerStartEnd from "@/components/BaseField/TextDatePickerStartEnd";
import { defineComponent, getCurrentInstance, onMounted, toRaw } from "vue";
import { useRouter } from "vue-router";
import { ElLoading } from "element-plus";
export default defineComponent({
  components: {
    TextInput,
    TextSelect,
    TextDatePicker,
    TextDatePickerStartEnd,
  },
  props: ["config", "params", "apiUrl"],
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
