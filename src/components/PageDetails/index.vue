<template>
  <div class="page-content-details">
    <template v-for="(item, index) in config" :key="index">
      <el-descriptions
        class="descriptions-margin"
        @dragstart="dragstart($event, item, index)"
        draggable="true"
        @dragend="dragend"
        v-bind="item"
      >
        <template v-for="(field, subIndex) in item.sub" :key="subIndex">
          <el-descriptions-item>
            <template #label>
              {{ field.descriptionsLabel }}
            </template>
            {{ params[field.val] }}
          </el-descriptions-item>
        </template>
      </el-descriptions>
    </template>
  </div>
  <div @drop="drop" @dragover.prevent class="page-content-details-target">
    <template v-for="(item, index) in targetObj" :key="index">
      <el-descriptions
        class="descriptions-margin"
        @dragstart="dragstart($event, item)"
        draggable="true"
        @dragend="dragend"
        v-bind="item"
      >
        <template v-for="(field, subIndex) in item.sub" :key="subIndex">
          <el-descriptions-item>
            <template #label>
              {{ field.descriptionsLabel }}
            </template>
            {{ params[field.val] }}
          </el-descriptions-item>
        </template>
      </el-descriptions>
    </template>
  </div>
</template>
<script>
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  reactive,
  toRaw,
  toRefs,
} from "vue";
import { useRoute } from "vue-router";
import { ElLoading } from "element-plus";
export default defineComponent({
  emits: ["finish"],
  props: ["config", "params", "apiUrl", "loading"],
  setup(props, { emit }) {
    const route = useRoute();
    const state = reactive({
      targetObj: [],
    });
    const { proxy } = getCurrentInstance();
    onMounted(() => {
      getDetails();
    });
    const getDetails = () => {
      const loading = ElLoading.service(props.loading);
      let params = toRaw(route.query);
      proxy.$api[props.apiUrl](toRaw(params)).then((res) => {
        if (res.code === 0) {
          emit("finish", res.data);
          loading.close();
        }
      });
    };
    const dragstart = (event, item, index) => {
      console.log("dragstart拖拽开始事件，绑定于被拖拽元素上", event, index);
      event.dataTransfer.setData("item", JSON.stringify(item));
    };
    const drop = (event) => {
      //这里面去重操作。
      state.targetObj.push(JSON.parse(event.dataTransfer.getData("item")));
    };
    const dragend = (event) => {
      console.log("dragend", event);
      event.dataTransfer.clearData();
    };
    return {
      ...toRefs(state),
      getDetails,
      dragstart,
      drop,
      dragend,
    };
  },
});
</script>
<style lang="scss" scoped>
.page-content-details {
  .descriptions-margin {
    background-color: white;
    margin: 15px 0;
    padding: 15px;
    border-radius: 4px;
  }
}
.page-content-details-target {
  width: 100%;
  height: 700px;
  background-color: white;
  .descriptions-margin {
    background-color: white;
    margin: 15px 0;
    padding: 15px;
    border-radius: 4px;
  }
}
</style>
