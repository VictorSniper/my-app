<template>
  <div class="page-content-details">
    <el-descriptions
      class="margin-top"
      size="medium"
      title="一叶障目"
      border
      :column="2"
    >
      <template #extra>
        <el-button type="primary" size="small">返回</el-button>
      </template>
      <template v-for="(field, index) in formConfig" :key="index">
        <el-descriptions-item>
          <template #label>
            {{ field.descriptionsLabel }}
          </template>
          {{ detailsApi[field.val] }}
        </el-descriptions-item>
      </template>
    </el-descriptions>
  </div>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  props: ["formConfig", "detailsApi"],
});
</script>
<style lang="scss" scoped>
.page-content-details {
  background-color: white;
  padding: 15px;
  border-radius: 4px;
  .el-descriptions__body {
    .el-form-item {
      margin-bottom: unset;
    }
  }
}
</style>
