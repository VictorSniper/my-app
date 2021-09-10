<template>
  <div v-if="!isTrue">
    <!-- 搜索模块start -->
    <page-content-search
      :formData="currentApi"
      :formConfig="fieldsConfig"
      :inline="true"
      @on-search="onSearch"
      @on-reset="onReset"
    ></page-content-search>
    <!-- 搜索模块end -->
    <el-row :gutter="6" v-for="o in 4" :key="o" class="row-x">
      <el-col :span="8" v-for="i in 3" :key="i">
        <el-card
          v-if="o == 1 && i == 1"
          class="center-block"
          shadow="never"
          :body-style="{ padding: '15px' }"
        >
          <el-button @click="eidt(false)" icon="el-icon-plus" class="new-button"
            >添加成语</el-button
          >
        </el-card>
        <el-card
          v-else
          class="center-block"
          shadow="never"
          :body-style="{ padding: '15px' }"
          @click="bindleView"
        >
          <img src="@/assets/img/img0.png" class="image" />
        </el-card>
      </el-col>
    </el-row>
    <page-form-dialog
      :title="dialogTitle"
      :isEdit="isEdit"
      :formData="formData"
      :formConfig="formConfig"
      :apiUrl="apiUrl"
      dialogWidth="50%"
      label-position="right"
      @handleCancel="handleCancel"
      @handleSave="handleSave"
    ></page-form-dialog>
  </div>
  <router-view></router-view>
</template>
<script>
import PageContentSearch from "@/components/PageContentSearch";
import PageFormDialog from "@/components/PageFormDialog";
import { defineComponent, ref, toRefs, reactive, provide, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default defineComponent({
  components: {
    PageContentSearch,
    PageFormDialog,
  },
  setup() {
    const store = useStore();
    const isTrue = computed(() => store.state.isTrue);
    const router = useRouter();
    const dialogFormVisible = ref(false);
    const currentDate = ref(new Date());
    const state = reactive({
      currentApi: {
        currentPage: 1,
        pageSize: 10,
        createUser: "",
        startTime: "",
        endTime: "",
        createUserId: "",
      },
      //搜索表单配置
      fieldsConfig: [
        {
          name: "createUser",
          fieldType: "text-input",
          attrs: {
            label: "姓名",
            labelWidth: "45px",
            placeholder: "请填写",
            type: "text", //表单类型
            clearable: true,
            onInputEvent: (val) => {
              state.currentApi.createUser = val;
            },
          },
        },
        {
          name: "createUserId",
          fieldType: "text-input",
          attrs: {
            label: "推荐成语",
            labelWidth: "80px",
            placeholder: "请填写",
            type: "text", //表单类型
            clearable: true,
            onInputEvent: (val) => {
              state.currentApi.createUserId = val;
            },
          },
        },
      ],

      loading: true,
      dialogTitle: "新建",
      isEdit: true,
      formData: {
        createUser: "",
        source: "",
        date: "",
      },
      formConfig: [
        {
          name: "createUser",
          fieldType: "text-input",
          width: "220px",
          attrs: {
            type: "text",
            placeholder: "一叶障目",
            label: "成语名称",
            labelWidth: "80px",
            onInputEvent: (val) => {
              state.formData.createUser = val;
            },
          },
        },
        {
          name: "date",
          fieldType: "text-date-picker",
          attrs: {
            label: "发布日期",
            labelWidth: "80px",
            type: "date",
            dateChange: (val) => {
              state.formData.date = new Date(val).getTime();
            },
          },
        },
        {
          name: "source",
          fieldType: "text-input",
          width: "100px",
          attrs: {
            type: "text",
            placeholder: "一画",
            label: "笔画",
            labelWidth: "80px",
            onInputEvent: (val) => {
              state.formData.source = val;
            },
          },
        },
        {
          name: "source",
          fieldType: "text-input",
          attrs: {
            placeholder:
              "古语有云：“尽信书不如无书。”任何理论都不能盲目轻信、盲目崇拜，必须经过科学的调查和验证，以谦虚、谨慎的态度来看待。再有，无论做事，还是在看待和研究问题时，我们都不能一叶障目，自以为是，被局部现象迷惑，而要从多角度多视角充分地分析问题，了解问题的实质，这样我们才能做出正确的判断。",
            type: "textarea",
            rows: 4,
            label: "故事启示",
            labelWidth: "80px",
          },
        },
        {
          name: "source",
          fieldType: "text-input",
          attrs: {
            placeholder:
              "比喻被眼前细小、局部的事物蒙蔽，看不到事物的本质和整体。",
            type: "text",
            label: "成语释义",
            labelWidth: "80px",
          },
        },
        {
          name: "source",
          fieldType: "text-input",
          attrs: {
            label: "活用例句",
            labelWidth: "80px",
            placeholder:
              "你们不能～，仅仅因为一些小的失误就全盘否定我们所取得的业绩。",
            type: "text",
          },
        },
        {
          name: "source",
          fieldType: "text-input",
          attrs: {
            label: "近义",
            labelWidth: "80px",
            placeholder: "一叶蔽目、盲人摸象",
            type: "text",
          },
        },
        {
          name: "source",
          fieldType: "text-input",
          attrs: {
            labelWidth: "80px",
            placeholder: "明察秋毫、洞若观火",
            label: "反义",
            type: "text",
          },
        },
        {
          name: "source",
          fieldType: "text-input",
          attrs: {
            label: "故事内容",
            labelWidth: "80px",
            placeholder:
              "古时候，楚地有个穷苦的读书人，读《淮南子》这部书时，看到书上有这样的记载：螳螂用树叶遮住自己的身体，其他小昆虫就看不见它，要是有人能得到那片树叶，就能用它隐藏自己的身体...",
            type: "textarea",
            rows: 8,
          },
        },
      ],
      apiUrl: "getCityCategory",
    });
    const handleCancel = (val) => {
      dialogFormVisible.value = val;
    };
    const handleSave = (val) => {
      dialogFormVisible.value = val;
      // getList();
    };
    //查询
    const onSearch = () => {
      state.currentApi.currentPage = 1;
      console.log(state.currentApi)
      //getList();
    };
    //重置
    const onReset = () => {
      //getList();
    };
    //编辑
    const eidt = (row, bool) => {
      if (row) {
        Object.keys(state.formData).forEach((key) => {
          state.formData[key] = row[key];
        });
      }
      state.isEdit = bool;
      state.dialogTitle = bool ? "编辑成功故事" : "添加成功故事";
      dialogFormVisible.value = true;
    };
    const bindleView = () => {
      router.push({
        path: `/article/idiomstory/details`,
        query: { id: 1 },
      });
    };
    provide("dialogFormVisible", dialogFormVisible);
    return {
      ...toRefs(state),
      currentDate,
      dialogFormVisible,
      isTrue,
      eidt,
      bindleView,
      handleCancel,
      handleSave,
      onSearch,
      onReset,
    };
  },
});
</script>
<style>
.time {
  font-size: 14px;
  line-height: 1.5;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}
.row-x {
  margin-bottom: 6px;
}
.image {
  width: 100%;
  height: auto;
  display: block;
}

.center-block {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.new-button {
  width: 100%;
  height: 283px;
  color: rgba(0, 0, 0, 0.45);
  background-color: #fff;
  border-color: #d9d9d9;
}
</style>
