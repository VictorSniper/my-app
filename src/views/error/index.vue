<template>
  <div class="error-background">
      <el-result class="error" icon="error" title="您没有访问权限" subTitle="">
    <template #extra>
      <el-button type="primary"  @click="back()">返回上一步</el-button>
    </template>
  </el-result>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
    const router = useRouter();
    const back = () => {
      router.back();
    };
    return {
      back,
    };
  },
});
</script>
<style lang="scss" scoped>
.error-background{
  background-color: white;
  height: 90vh;
   .error{
    padding-top:250px
 }
}

</style>
