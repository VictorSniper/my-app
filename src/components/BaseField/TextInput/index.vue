<template>
  <el-form-item v-bind="$attrs" :prop="name">
    <el-input
      v-model="currentValue"
      :style="{ width: width }"
      v-bind="$attrs"
      @input="dataChange"
    >
    </el-input>
  </el-form-item>
</template>
<script>
import { defineComponent, ref, watchEffect } from "vue";
export default defineComponent({
  props: ["name", "value", "width"],
  setup(props, { attrs }) {
    const currentValue = ref(props.value);
    watchEffect(() => {
      currentValue.value = props.value;
    });
    const dataChange = (val) => {
      attrs.onInputEvent(val);
    };
    return {
      dataChange,
      currentValue,
    };
  },
});
</script>
