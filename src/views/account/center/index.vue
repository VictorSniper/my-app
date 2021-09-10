<template>
  <el-row :gutter="12">
    <el-col :span="7">
      <el-card shadow="never" class="account-center">
        <el-avatar
          :size="124"
          src="https://preview.pro.antdv.com/avatar2.jpg"
        ></el-avatar>
        <h2>二十八画生</h2>
        <span class="sub-title">星星之火,可以燎原!</span>
        <ul class="user-info">
          <li><i class="el-icon-user"></i> 政治家，军事家，诗人，书法家</li>
          <li>
            <i class="el-icon-school"></i>
            中南海
          </li>
          <li><i class="el-icon-guide"></i> 湖南湘潭人</li>
        </ul>
        <el-divider></el-divider>
        <h4 class="tags-title">标签</h4>
        <div class="tags-body">
          <el-tag color="#EBEEF5">标签一</el-tag>
          <el-tag type="success">标签二</el-tag>
          <el-tag type="info">标签三</el-tag>
          <el-tag type="warning">标签四</el-tag>
          <el-tag type="danger">标签五</el-tag>
        </div>
        <el-divider></el-divider>
        <h4 class="tags-title">标签</h4>
        <ul class="user-info">
          <li><i class="el-icon-user"></i> 政治家，军事家，诗人，书法家</li>
          <li>
            <i class="el-icon-school"></i>
            中国人民的领袖、中国共产党、中国人民解放军领导人
          </li>
          <li><i class="el-icon-guide"></i> 湖南湘潭人</li>
        </ul>
      </el-card>
    </el-col>
    <el-col :span="17">
      <el-card shadow="never">
        <div class="el-tabs el-tabs--card el-tabs--top">
          <div class="el-tabs__header is-top">
            <div class="el-tabs__nav-wrap is-top">
              <div class="el-tabs__nav-scroll">
                <div class="el-tabs__nav is-top">
                  <div
                    v-for="tab in tabs"
                    :key="tab"
                    :class="['tab-button', { 'is-active': currentTab === tab }]"
                    @click="currentTab = tab"
                    class="el-tabs__item is-top"
                  >
                    {{ tab }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="el-tabs__content">
            <div class="el-tab-pane">
              <component :is="currentTabComponent" />
            </div>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
import { reactive, computed, defineComponent, ref } from "vue";
import TabFirst from "./components/TabFirst.vue";
import TabTwo from "./components/TabTwo.vue";
export default defineComponent({
  components: {
    TabFirst,
    TabTwo,
  },
  setup() {
    const currentTab = ref("first");
    const tabs = reactive(["first", "two"]);
    const currentTabComponent = computed(() => {
      return "tab-" + currentTab.value.toLowerCase();
    });
    return {
      currentTab,
      tabs,
      currentTabComponent,
    };
  },
});
</script>

