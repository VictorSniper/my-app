<template>
  <el-form-item v-bind="$attrs" :prop="name">
    <el-select
      v-bind="$attrs"
      v-model="currentValue"
      placeholder="请选择"
      style="width:200px"
      @change="dataChange"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </el-form-item>
</template>
<script>
import { defineComponent, ref, watchEffect } from "vue";
export default defineComponent({
  props: ["name", "value", "options"],
  setup(props, { attrs }) {
    const currentValue = ref(props.value);
    watchEffect(() => {
      currentValue.value = props.value;
    });
    const dataChange = (val) => {
      attrs.onSelectEvent(val);
    };
    return {
      currentValue,
      dataChange,
    };
  },
});
</script>
