<template>
  <el-dialog
    :close-on-click-modal="false"
    :before-close="handleCancel"
    width="40%"
    v-model="dialogVisible"
    @open="dialogOpen"
  >
      <template #title>
      <div class="dialog-title">
        {{title}}
      </div>
    </template>
    <el-form :model="from" :rules="rules" ref="formRef">
      <el-form-item label="活动名称" prop="courseNname" label-width="120">
        <el-input v-model="from.courseNname" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="活动区域" prop="date" label-width="120">
        <el-input v-model="from.date" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" :loading="loading" @click="submitForm()">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script>
import { defineComponent, inject, ref, reactive, unref, toRefs } from "vue";
export default defineComponent({
  emits: ["handleFinish"],
  props: {
    title: {
      type: String,
      required: true,
    },
    editItem: {
      type: Object,
      required: true,
    },
    isEdit: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { emit }) {
    const formRef = ref(null);
    const dialogVisible = inject("dialogVisible");
    let state = reactive({
      from: {
        courseNname: "",
        date: "",
      },
      loading: false,
      rules: {
        courseNname: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
        ],
        date: [
          { required: true, message: "请选择活动区域", trigger: "blur" },
        ],
      },
    });
    const dialogOpen = () => {
      if (props.isEdit) {
        Object.keys(state.from).forEach((key) => {
          state.from[key] = props.editItem[key];
        });
      }
    };
    //提交数据
    const submitForm = async () => {
      const form = unref(formRef);
      if (!form) return;
      try {
        await form.validate();
        state.loading = true;
        setTimeout(() => {
          state.loading = false;
          emitHandle(false, state.from);
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    };
    const handleCancel = () => {
      const form = unref(formRef);
      form.resetFields();
      emitHandle(false, null);
    };
    //向父组件发送emit,指令（消息）
    const emitHandle = (bool, result) => {
      const form = unref(formRef);
      emit("handleFinish", bool, result);
      form.resetFields();
      Object.keys(state.from).forEach((key) => (state.from[key] = ""));
    };
    return {
      ...toRefs(state),
      dialogVisible,
      formRef,
      emitHandle,
      submitForm,
      handleCancel,
      dialogOpen,
    };
  },
});
</script>
