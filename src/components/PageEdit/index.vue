<template>
  <div class="page-content-details">
    <el-form
      :model="formData"
      :hide-required-asterisk="true"
      :inline="inline"
      ref="formRef"
      :label-position="labelPosition"
    >
      <el-descriptions class="margin-top" title="一叶障目" :column="5" border>
        <template #extra>
          <el-button type="primary" size="small">返回</el-button>
        </template>
              <template v-for="field in formConfig" :key="field.name">
        <el-descriptions-item>
          <template #label>
            <i class="el-icon-user"></i>
            {{field.attrs.descriptionsLabel}}
          </template>
            <component
              :is="field.fieldType"
              :width="field.width"
              :name="field.name"
              :options="field.options"
              :value="formData[field.name]"
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
import { defineComponent } from "vue";
export default defineComponent({
  components: {
    TextInput,
    TextSelect,
    TextDatePicker,
    TextDatePickerStartEnd,
  },
  props: ["formConfig", "formData", "apiUrl"],
  setup() {
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
