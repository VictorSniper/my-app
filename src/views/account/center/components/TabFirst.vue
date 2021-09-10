<template>
  <div class="calendar">
    <div class="calendar-header">
      <div class="calendar-header-title">2021年6月</div>
      <div class="calendar-header-select">
        <el-input-number
          v-model="value"
          :step="1"
          step-strictly
        ></el-input-number>
      </div>
    </div>
    <div class="calendar-body">
      <div class="calendar-body-group-date"></div>
      <div class="calendar-body-group-time">
        <div class="calendar-time-header">
          <div
            v-for="childItem in 8"
            :key="childItem"
            :class="childItem == 1 ? 'header-item-first-x' : 'header-item-y'"
          >
            <div v-if="childItem == 1">时间</div>
            <div v-else class="header-group-item-x">
              {{ ["一", "二", "三", "四", "五", "六", "日"][childItem - 2] }}
            </div>
          </div>
        </div>
        <div
          v-for="(item, index) in calendar"
          :key="index"
          class="group-item time-line"
        >
          <div
            v-for="(childItem, ind) in item.child"
            :key="ind"
            :class="ind == 0 ? 'group-item-first-y' : 'group-item-y'"
          >
            <div class="time-line-first-x" v-if="ind == 0">
              {{ (index + 7).toString().padStart(2, "0") }}:00
            </div>
            <div v-else class="group-item-x">
              <el-popover
                :placement="ind > 3 ? 'bottom' : 'right'"
                width="400"
                trigger="click"
                v-model:visible="childItem.visible"
              >
                <el-form label-position="rigth" label-width="80px">
                  <el-form-item label="名称">
                    <el-input size="mini" v-model="childItem.title"></el-input>
                  </el-form-item>
                  <el-form-item label="时间">
                    <el-input size="mini" v-model="childItem.title"></el-input>
                  </el-form-item>
                  <el-form-item label="活动形式">
                    <el-input size="mini" v-model="childItem.title"></el-input>
                  </el-form-item>
                </el-form>
                <div class="popover-footer">
                  <el-button size="mini" @click="childItem.visible = false"
                    >取消</el-button
                  >
                  <el-button
                    :loading="loading"
                    type="primary"
                    size="mini"
                    @click="handleSubmit(childItem)"
                    >确定</el-button
                  >
                </div>
                <template #reference>
                  <div class="reference-item">{{ childItem.title }}</div>
                </template>
              </el-popover>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="calendar-footer">
      <svg-icon name="export" :size="12" color="#777" />
    </div>
  </div>
</template>
<script>
import { defineComponent, reactive, ref, toRefs } from "vue";
export default defineComponent({
  setup() {
    const value = ref(1);
    const isShow = ref(false);
    const state = reactive({
      loading: false,
      calendar: [
        {
          child: [
            { title: "", visible: false },
            { title: "", visible: false },
            { title: "", visible: false },
            { title: "", visible: false },
            { title: "", visible: false },
            { title: "", visible: false },
            { title: "", visible: false },
            { title: "", visible: false },
          ],
        },
        {
          child: [
            { title: "", visible: false },
            { title: "", visible: false },
            { title: "", visible: false },
            { title: "", visible: false },
            { title: "", visible: false },
            { title: "", visible: false },
            { title: "", visible: false },
            { title: "", visible: false },
          ],
        },
      ],
    });
    //提交数据给后台
    const handleSubmit = (item) => {
      state.loading = true;
      //模拟提交数据给后台
      setTimeout(() => {
        state.loading = false;
        item.visible = false;
      }, 1000);
    };
    return {
      ...toRefs(state),
      value,
      isShow,
      handleSubmit,
    };
  },
});
</script>
<style lang="scss" scoped>
.calendar-body-group-time {
  border-top: 1px solid #ccc;
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  border-left: 1px solid #ccc;
  background-color: rgba(240, 242, 245, 1);
}
.group-item {
  height: 100px;
}
.time-line {
  position: relative;
  border-top: 1px solid white;
}
.time-line-first-x {
  text-align: center;
  line-height: 100px;
}
.calendar-time-header {
  height: 30px;
  line-height: 30px;
  overflow: hidden;
}
.header-item-y {
  display: inline-block;
  width: calc(100% / 8 - 1px);
  height: 30px;
  border-left: 1px solid #ccc;
  overflow: hidden;
  border-bottom: 0;
}
.header-item-first-x {
  display: inline-block;
  width: calc(100% / 8 - 1px);
  height: 30px;
  text-align: center;
  line-height: 30px;
  border-left: unset;
  overflow: hidden;
}
.group-item-first-y {
  display: inline-block;
  width: calc(100% / 8 - 1px);
  height: 100px;
  border-left: unset;
  overflow: hidden;
}
.group-item-y {
  display: inline-block;
  width: calc(100% / 8 - 1px);
  height: 100px;
  border-left: 1px solid #ccc;
  overflow: hidden;
}
.header-group-item-x {
  height: 30px;
  text-align: center;
  border-bottom: 1px solid white;
}
.group-item-x {
  // position: relative;
  height: 100px;
  text-align: center;
  //   border-bottom: 1px solid white;
}
.reference-item {
  border-radius: 4px;
  width: 100%;
  height: 100px;
  background-color: #b9dbff;
  opacity: 1;
  border-left: 5px solid #409eff;
}
.popover-footer {
  text-align: right;
}
</style>
