<template>
  <el-form
    :model="formData"
    :hide-required-asterisk="false"
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
    <el-form-item style="margin-top:30px">
      <el-button
        type="primary"
        :style="{ width: btnWidth }"
        :loading="loading"
        @click="submitForm"
        >{{ submitText }}</el-button
      >
    </el-form-item>
  </el-form>
</template>
<script>
import TextInput from "@/components/BaseField/TextInput";
import TextSelect from "@/components/BaseField/TextSelect";
import TextInputSelect from "@/components/BaseField/TextInputSelect";
import TextDatePicker from "@/components/BaseField/TextDatePicker";
import TextDatePickerStartEnd from "@/components/BaseField/TextDatePickerStartEnd";
import { defineComponent, ref, getCurrentInstance, toRaw, unref } from "vue";
export default defineComponent({
  props: [
    "formConfig",
    "formData",
    "apiUrl",
    "labelPosition",
    "inline",
    "btnWidth",
    "submitText",
  ],
  components: {
    TextInput,
    TextSelect,
    TextDatePicker,
    TextInputSelect,
    TextDatePickerStartEnd,
  },
  setup(props, { emit }) {
    const formRef = ref(null);
    const { proxy } = getCurrentInstance();
    const loading = ref(false);
    const submitForm = () => {
      loading.value = true;
                    const form = unref(formRef);
      formRef.value.validate((valid) => {
        if (valid) {
          let params = toRaw(props.formData);
          proxy.$api[props.apiUrl](params).then((res) => {
            if (res.code === "0") {
              console.log(res.data.list);
              loading.value = false;
              emit("submitForm");
              form.resetFields();
            }
          });
        } else {
          loading.value = false;
          return false;
        }
      });
    };
    return {
      formRef,
      loading,
      submitForm,
    };
  },
});
</script>
