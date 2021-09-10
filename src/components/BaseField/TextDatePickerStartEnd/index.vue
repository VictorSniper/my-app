<template>
  <el-form-item :label="label" :label-width="labelWidth" :prop="name">
    <el-date-picker
      v-model="currentValue"
      @change="onInputEvent"
      :type="type"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
    >
    </el-date-picker>
  </el-form-item>
</template>
<script>
import { defineComponent, ref, watchEffect } from "vue";
export default defineComponent({
  props: ["name", "type", "label", "value", "labelWidth"],
  setup(props, { emit }) {
    const currentValue = ref(props.value);
    watchEffect(() => {
      currentValue.value = props.value;
    });
    const onInputEvent = (value) => {
      emit("query", props.name, value);
    };
    return {
      currentValue,
      onInputEvent,
    };
  },
});
</script>
