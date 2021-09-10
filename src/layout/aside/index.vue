<template>
  <el-aside class="aside sider-fixed" width="200">
    <div class="logo">
      <a href="/">
        <img
          alt="Vue logo"
          src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
        />
        <h1 v-if="!isCollapse">VUE3 Admin</h1>
      </a>
    </div>
    <el-menu
      router
      :default-active="$route.meta.index"
      text-color="#fff"
      background-color="#001529"
      :collapse="isCollapse"
      :unique-opened="true"
    >
      <menu-item :route-list="list" />
    </el-menu>
    <div class="sider-links">
      <div @click="isCollapseHandle" class="sider-title-content">
        <i :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
      </div>
    </div>
  </el-aside>
</template>
<script>
import { useStore } from "vuex";
import { computed, defineComponent } from "vue";
import { useRouter } from "vue-router";
import MenuItem from "./MenuItem";
export default defineComponent({
  components: {
    MenuItem,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const isCollapse = computed(() => store.state.isCollapse);
    const list = computed(() => {
      const indexRoute = router.options.routes.find(
        (route) => route.index === "layout"
      );
      return indexRoute.children;
    });
    return {
      list,
      isCollapse,
      isCollapseHandle: () => store.commit("isCollapseHandle"),
    };
  },
});
</script>
