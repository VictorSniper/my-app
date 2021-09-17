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
      <div class="details-submit">
        <el-form-item>
          <el-button
            type="primary"
            size="medium"
            style="width:100%"
            :loading="saveLoading"
            @click="onSubmit"
            >保存</el-button
          >
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script>
import TextInput from "@/components/BaseField/TextInput";
import TextSelect from "@/components/BaseField/TextSelect";
import TextDatePicker from "@/components/BaseField/TextDatePicker";
import TextDatePickerStartEnd from "@/components/BaseField/TextDatePickerStartEnd";
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  ref,
  toRaw,
} from "vue";
import { useRoute } from "vue-router";
import { ElLoading } from "element-plus";
export default defineComponent({
  components: {
    TextInput,
    TextSelect,
    TextDatePicker,
    TextDatePickerStartEnd,
  },
  props: ["config", "params", "loading", "apiUrl"],
  setup(props, { emit }) {
    const route = useRoute();
    const { proxy } = getCurrentInstance();
    const saveLoading = ref(false);
    const url = props.apiUrl.split(",");
    onMounted(() => {
      getDetails();
    });
    const getDetails = () => {
      const loading = ElLoading.service(props.loading);
      let params = toRaw(route.query);
      proxy.$api[url[0]](toRaw(params)).then((res) => {
        if (res.code === 0) {
          emit("finish", res.data);
          loading.close();
        }
      });
    };
    const onSubmit = () => {
      let params = toRaw(route.query);
      saveLoading.value = true;
      proxy.$api[url[1]](toRaw(params)).then((res) => {
        if (res.code === 0) {
          saveLoading.value = false;
        }
      });
    };
    return {
      saveLoading,
      getDetails,
      onSubmit,
    };
  },
});
</script>
<style lang="scss" scoped>
.page-content-details {
  background-color: white;
  padding: 15px;
  border-radius: 4px;
  .details-submit {
    padding: 15px 0;
  }
  .el-descriptions__body {
    .el-form-item {
      margin-bottom: unset;
    }
  }
}
</style>
