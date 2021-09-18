<template>
  <el-form-item v-bind="$attrs" :prop="name">
    <el-date-picker
      v-model="datePickerValue"
      value-format="YYYY-MM-DD"
      @change="dateSelectChange"
      placeholder="选择日期"
    >
    </el-date-picker>
  </el-form-item>
</template>
<script>
import { defineComponent, ref, watchEffect } from "vue";
export default defineComponent({
  props: ["name", "value"],
  setup(props, { attrs }) {
    const datePickerValue = ref(props.value);
    watchEffect(() => {
      datePickerValue.value = props.value;
    });
    const dateSelectChange = (val) => {
      attrs.dateChange(val);
    };
    return {
      datePickerValue,
      dateSelectChange,
    };
  },
});
</script>
