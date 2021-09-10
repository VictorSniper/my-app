<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item
      v-for="(item, index) in currentBreadcrumb"
      :key="index"
      class="router-link"
    >
      <router-link :to="item.path">{{ item.name }}</router-link>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { defineComponent, computed } from "vue";
export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    const currentBreadcrumb = computed(() => {
      if (
        router.currentRoute.value.matched[
          router.currentRoute.value.matched.length - 1
        ].meta.hidden
      ) {
        store.commit("isTrueHandle");
      } else {
        store.commit("isFalseHandle");
      }
      return router.currentRoute.value.matched;
    });
    return {
      currentBreadcrumb,
    };
  },
});
</script>
