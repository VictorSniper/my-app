<template>
  <el-container class="layout-has-sider">
    <layout-aside></layout-aside>
    <div
      :class="{ 'el-menu--collapse': isCollapse, fold: !isCollapse }"
      class="v-enter-to"
    ></div>
    <el-container class="is-vertical">
      <layout-header></layout-header>
      <el-main>
        <layout-breadcrumb></layout-breadcrumb>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import { useStore } from "vuex";
import { defineComponent, computed } from "vue";
import LayoutAside from "./aside";
import LayoutHeader from "./header";
import LayoutBreadcrumb from "./breadcrumb";
export default defineComponent({
  components: {
    LayoutAside,
    LayoutHeader,
    LayoutBreadcrumb,
  },
  setup() {
    const store = useStore();
    const isCollapse = computed(() => store.state.isCollapse);
    return {
      isCollapse,
    };
  },
});
</script>
<style lang="scss">
@import "~@/styles/layout.scss";
</style>
