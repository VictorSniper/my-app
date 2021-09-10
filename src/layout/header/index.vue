<template>
  <el-header class="layout-header">
    <div style="flex: 1 1 0%;"></div>
    <div class="global-header-right">
       <div class="to-do-list">
    <span>常见问题</span>
    <el-divider direction="vertical"></el-divider>
    <span>通知</span>
    <el-divider direction="vertical"></el-divider>
    <span>待办</span>
  </div>
      <el-avatar
        :size="24"
        style="margin-top:16px"
        src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
      ></el-avatar>
      <span class="user-name-style">{{ userInfo.name }}</span>
    </div>
  </el-header>
</template>
<script>
import { useStore } from "vuex";
import { defineComponent, reactive } from "vue";
//popover组件配合Tabs组件做消息通知
export default defineComponent({
  setup() {
    const store = useStore();
    const userInfo = reactive(store.state.userInfo);
    return {
      userInfo,
    };
  },
});
</script>
<style lang="scss" scoped>
 .to-do-list{
   margin-right: 10px;
   color:#606266;
   font-size: 12px;
   cursor: pointer;
 }
 .user-name-style{
    color:#606266;
       margin-left: 10px;
   font-size: 12px;
 }
</style>
