<template>
  <div
    class="page-content-search"
    :class="{ 'page-content-search-isCollapse': isCollapse }"
  >
    <el-row  class="page-content-search-row">
      <el-col :span="20">
        <el-form
          :model="formData"
          :hide-required-asterisk="true"
          :inline="inline"
          ref="formRef"
          :label-position="labelPosition"
        >
          <template v-for="field in formConfig" :key="field.name">
            <component
              :is="field.fieldType"
              :width="field.width"
              :name="field.name"
              :options="field.options"
              :value="formData[field.name]"
              v-bind="field.attrs"
              :ref="field.name"
            />
          </template>
        </el-form>
      </el-col>
      <el-col :span="4">
        <div class="search-handle">
          <el-button @click="handleReset" icon="el-icon-refresh"
            >重置</el-button
          >
          <el-button @click="handleSearch" icon="el-icon-search" type="primary"
            >查询</el-button
          >
          <el-button
            type="text"
            v-if="show"
            @click="toggle"
            :icon="!isCollapse ? 'el-icon-arrow-down' : 'el-icon-arrow-up'"
            style="direction: rtl;"
            >{{ !isCollapse ? "展开" : "收起" }}</el-button
          >
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import TextInput from "@/components/BaseField/TextInput";
import TextSelect from "@/components/BaseField/TextSelect";
import TextDatePicker from "@/components/BaseField/TextDatePicker";
import TextDatePickerStartEnd from "@/components/BaseField/TextDatePickerStartEnd";
import { defineComponent, ref, unref } from "vue";
export default defineComponent({
  props: [
    "formConfig",
    "formData",
    "apiUrl",
    "labelPosition",
    "inline",
    "show",
  ],
  components: {
    TextInput,
    TextSelect,
    TextDatePicker,
    TextDatePickerStartEnd,
  },
  setup(props, { emit }) {
    const formRef = ref(null);
    const isCollapse = ref(false);
    const toggle = () => {
      isCollapse.value = !isCollapse.value;
    };
    const handleSearch = () => {
      emit("on-search");
    };
    const handleReset = () => {
      const form = unref(formRef);
      form.resetFields();
      emit("on-reset");
    };
    return {
      formRef,
      isCollapse,
      toggle,
      handleReset,
      handleSearch,
    };
  },
});
</script>
<style lang="scss">
.page-content-search {
  background-color: white;
  padding: 15px 15px 5px 15px;
  border-radius: 4px;
  margin-bottom: 15px;
  overflow: hidden;
  height: 40px;
  // .el-form-item {
  //   // margin-bottom: unset;
  // }
  // .el-form-item__content{
  //   width: 200px;
  // }
  .search-handle {
    text-align: right;
  }
  .el-row {
    margin-bottom: 15px;
  }
  .page-content-search-row {
    margin-bottom: unset;
  }
}
.page-content-search-isCollapse {
  overflow: auto;
  height: auto;
}
</style>
