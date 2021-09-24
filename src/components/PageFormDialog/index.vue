<template>
  <el-dialog
    :close-on-click-modal="false"
    :before-close="handleCancel"
    :width="dialogWidth"
    v-model="dialogFormVisible"
    custom-class="form-dialog"
  >
    <template #title>
      <div class="dialog-title">
        {{ title }}
      </div>
    </template>
    <el-form
      :model="formData"
      :hide-required-asterisk="true"
      :label-position="labelPosition"
      ref="formReff"
    >
      <template v-for="field in formConfig" :key="field.name">
        <component
          :is="field.fieldType"
          :name="field.name"
          :width="field.width"
          :options="field.options"
          :value="formData[field.name]"
          v-bind="field.attrs"
          :ref="field.name"
        />
      </template>
    </el-form>
    <template #footer>
      <el-progress
        style="height: 1px;overflow:hidden"
        :percentage="percentage"
        status="success"
        :indeterminate="indeterminate"
        :show-text="false"
        :duration="3"
      ></el-progress>
      <span class="dialog-footer">
        <el-button @click="handleCancel()">取 消</el-button>
        <el-button type="primary" @click="submitForm()">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script>
import TextInput from "@/components/BaseField/TextInput";
import TextSelect from "@/components/BaseField/TextSelect";
import TextDatePicker from "@/components/BaseField/TextDatePicker";
import {
  defineComponent,
  ref,
  getCurrentInstance,
  inject,
  unref,
  toRaw,
} from "vue";
export default defineComponent({
  emits: ["handleCancel", "handleSave"],
  props: [
    "formConfig",
    "formData",
    "apiUrl",
    "title",
    "isEdit",
    "labelPosition",
    "dialogWidth",
    "width",
  ],
  components: {
    TextInput,
    TextDatePicker,
    TextSelect,
  },
  setup(props, { emit }) {
    const formReff = ref(null);
    const { proxy } = getCurrentInstance();
    const percentage = ref(0);
    const indeterminate = ref(false);
    const dialogFormVisible = inject("dialogFormVisible");
    const handleCancel = () => {
      const form = unref(formReff);
      form.resetFields();
      emit("handleCancel", false);
    };
    const submitForm = () => {
      const form = unref(formReff);
      form.validate((valid) => {
        if (valid) {
          let params = toRaw(props.formData);
          percentage.value = 100;
          indeterminate.value = true;
          proxy.$api[props.apiUrl](params).then((res) => {
            if (res.code === 0) {
              percentage.value = 0;
              emit("handleSave", false);
              indeterminate.value = false;
              form.resetFields();
            }
          });
        } else {
          return false;
        }
      });
    };
    return {
      formReff,
      percentage,
      indeterminate,
      dialogFormVisible,
      handleCancel,
      submitForm,
    };
  },
});
</script>
<style lang="scss">
.form-dialog {
  .el-dialog__header {
    padding: 16px 24px;
    color: rgba(0, 0, 0, 0.85);
    background: #fff;
    border-bottom: 1px solid #f0f0f0;
    border-radius: 2px 2px 0 0;
  }
  .el-dialog__footer {
    padding: unset;
    .dialog-footer {
      // border-top: 1px solid #f0f0f0;
      padding: 10px 16px;
      display: block;
    }
  }
}
</style>
