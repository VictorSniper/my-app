<template>
  <div class="page-content-table">
    <el-table  :data="tableData" v-loading="loading" >
      <template v-for="(item, index) in tableDataColumn" :key="index">
        <el-table-column
          :type="item.type"
          :prop="item.props"
          :label="item.label"
          :align="item.align"
          :index="index"
          :formatter="item.formatter"
        >
          <template v-if="item.props === 'handle'" #default="scope">
            <el-button
              v-for="(handleItem, ind) in item.handleEvent"
              :key="ind"
              @click="customHandle(handleItem, scope.row)"
              :type="handleItem.type"
              >{{ handleItem.text }}
            </el-button>
          </template>
                     <!-- <template v-else-if="item.custom === 'href'" #default="scope">
              <el-button
                @click="handleClick(scope.row)"
                type="text"
                size="small"
                >{{ scope.row[item.props] }}</el-button
              >
            </template> -->
          <template v-else-if="item.type==='expand'" #default="scope">
              <slot :scop="scope"></slot>
          </template>
        </el-table-column>
      </template>
      <template #empty>
          <el-empty description="暂无数据"></el-empty>
      </template>
    </el-table>
  </div>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    tableData: {
      type: Array,
      required: true,
    },
    tableDataColumn: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      required: false,
    },
  },
  setup() {
    const customHandle = (currentHandle, row) => {
      currentHandle.event(row);
    };
    return {
      customHandle,
    };
  },
});
</script>
<style lang="scss" scoped>
.page-content-table {
  background-color: white;
  padding: 15px;
  border-radius: 4px;
  .page-content-table-title {
    line-height: 32px;
  }
  .page-content-table-handle {
    text-align: right;
  }
  .page-content-table-handle button {
    margin-left: 10px;
    cursor: pointer;
  }
}
</style>
