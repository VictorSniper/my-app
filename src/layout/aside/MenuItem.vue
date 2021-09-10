<template>
  <template v-for="item in menuItems" :key="item.key">
    <template v-if="getItemShow(item)">
      <el-submenu  router v-if="item.type === 'submenu'" :index="item.key">
        <template #title>
          <i :class="item.icon"></i>
          <span>{{ item.title }}</span>
        </template>
        <template v-if="item.children">
          <menu-item :route-list="item.children" />
        </template>
      </el-submenu>
      <el-menu-item-group v-if="item.type === 'group'">
        <el-menu-item :index="item.key">{{ item.title }}</el-menu-item>
        <template v-if="item.children">
          <menu-item :route-list="item.children" />
        </template>
      </el-menu-item-group>
      <el-menu-item v-if="item.type === 'item'"  :index="item.path">
        <i :class="item.icon"></i>
        <span>{{ item.title }}</span>
      </el-menu-item>
    </template>
  </template>
</template>
<script>
import { computed, defineComponent } from "vue";
export default defineComponent({
  props: {
    routeList: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const menuItems = computed(() => {
      return props.routeList.map((item) => {
        let temp = { key: item.key };
        let path = { path: item.path };
        if (item.meta) {
          temp = { ...temp, ...path, ...item.meta };
        }
        if (item.children) {
          temp.children = item.children;
        }
        return temp;
      });
    });

    const getItemShow = computed(() => (item) => {
     //  console.log(item.roles)
   //   console.log(item.roles.includes(window.localStorage.getItem('token')))
      /**
       * 这里暂时不写关于用户权限控制的逻辑了，因为我也不知道你们会怎么存储用户的role字段
       * 权限控制思路：
       * 1. 假设你的role字段存在了store.userModule.role中
       * 2. 使用instanceof判断一下menuitem中的roles是数组还是字符串
       * 3. 如果是字符串：return store.userModule.role === item.roles
       * 4. 如果是数组：return item.roles.includes(store.userModule.role)
       * 5. 但是要注意修改一下分支结构，因为item.hidden的优先级在item.roles前面
       */
     // window.localStorage.getItem('token')
      return item.roles.includes(window.localStorage.getItem('token'));
     // return !item.hidden
    });
    return {
      menuItems,
      getItemShow,
    };
  },
});
</script>
