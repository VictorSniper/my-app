<template>
  <!-- 搜索模块start -->
  <page-content-search
    :formData="currentApi"
    :formConfig="fieldsConfig"
    :inline="true"
    @on-search="onSearch"
    @on-reset="onReset"
  ></page-content-search>
  <!-- 搜索模块end -->
  <page-content-table
    :tableData="tableData"
    :tableDataColumn="tableDataColumn"
    :loading="loading"
  ></page-content-table>
  <el-pagination
    class="pagination-right"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :page-sizes="[20, 40, 60, 80, 100]"
    layout="total, sizes, prev, pager, next, jumper"
    :page-size="20"
    :pager-count="11"
    :total="totalCount"
  >
  </el-pagination>
  <page-form-dialog
    :title="dialogTitle"
    :isEdit="isEdit"
    :formData="formData"
    :formConfig="formConfig"
    :apiUrl="apiUrl"
    dialogWidth="30%"
    @handleCancel="handleDialogCancel"
    @handleSave="handleDialogSave"
  ></page-form-dialog>
</template>
<script>
function number_format(number, decimals, dec_point, thousands_sep) {
  /*
   * 参数说明：
   * number：要格式化的数字
   * decimals：保留几位小数
   * dec_point：小数点符号
   * thousands_sep：千分位符号
   * */
  number = (number + "").replace(/[^0-9+-Ee.]/g, "");
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = typeof thousands_sep === "undefined" ? "," : thousands_sep,
    dec = typeof dec_point === "undefined" ? "." : dec_point,
    s = "",
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return "" + Math.floor(n * k) / k;
    };
  s = (prec ? toFixedFix(n, prec) : "" + Math.floor(n)).split(".");
  var re = /(-?\d+)(\d{3})/;
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, "$1" + sep + "$2");
  }
  if ((s[1] || "").length < prec) {
    s[1] = s[1] || "";
    s[1] += new Array(prec - s[1].length + 1).join("0");
  }
  return s.join(dec);
}
import { ElMessageBox } from "element-plus";
import PageContentSearch from "@/components/PageContentSearch";
import PageFormDialog from "@/components/PageFormDialog";
import PageContentTable from "@/components/PageContentTable";
import {
  defineComponent,
  reactive,
  toRefs,
  getCurrentInstance,
  onMounted,
  provide,
  ref,
} from "vue";
export default defineComponent({
  components: {
    PageContentSearch,
    PageContentTable,
    PageFormDialog,
  },
  setup() {
    const dialogFormVisible = ref(false);
    const { proxy } = getCurrentInstance();
    const state = reactive({
      currentApi: {
        currentPage: 1,
        pageSize: 10,
        createUser: "",
        startTime: "",
        endTime: "",
        createUserId: "",
        date: "",
      },
      //搜索表单配置
      fieldsConfig: [
        {
          name: "createUserId", //字段名与保存currentApi的字段相对应
          fieldType: "text-input", //表单属性类型
          attrs: {
            label: "姓名",
            labelWidth: "45px",
            placeholder: "请填写",
            type: "text", //表单类型
            clearable: true,
            onInputEvent: (val) => {
              state.currentApi.createUserId = val;
            },
          },
        },
        {
          name: "createUser",
          fieldType: "text-select",
          attrs: {
            label: "城市",
            labelWidth: "45px",
            placeholder: "请填写",
            clearable: true,
            onSelectEvent: (val) => {
              state.currentApi.createUser = val;
            },
          },
        },
                {
          name: "date",
          fieldType: "text-date-picker",
          attrs: {
            label: "时间",
            labelWidth: "45px",
            type: "date", //表单类型
            dateChange: (val) => {
              console.log(val);
              state.currentApi.date = val;
            },
          },
        },
      ],
      //表格列表配置
      tableDataColumn: [
        { type: "selection" },
        {
          type: "index",
          props: "index",
          align: "center",
          width: "55",
          label: "序号",
        },
        {
          props: "createUser",
          label: "姓名",
          custom: "createUser",
          align: "left",
        },
        {
          props: "date",
          label: "课程时间",
          custom: "date",
          align: "left",
        },
        {
          props: "createUserId",
          label: "金额",
          custom: "createUserId",
          align: "right",
          formatter: (row) => {
            return `¥${row["createUserId"]}`;
          },
        },
        {
          props: "handle",
          label: "操作",
          align: "right",
          handleEvent: [
            {
              text: "编辑",
              type: "text",
              event: (row) => {
                eidt(row, true);
              },
            },
            {
              text: "删除",
              type: "text",
              event: (row) => {
                //处理删除
                del(row.id);
              },
            },
          ],
        },
      ],
      tableData: [],
      totalCount: 0,
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
          attrs: {
            label: "姓名",
            labelWidth: "45px",
            placeholder: "请填写",
            type: "text", //表单类型
            rules: [
              { required: true, message: "请输入活动名称", trigger: "blur" },
            ],
            onInputEvent: (val) => {
              state.formData.createUser = val;
            },
          },
        },
        {
          name: "date",
          fieldType: "text-date-picker",
          attrs: {
            label: "时间",
            labelWidth: "45px",
            placeholder: "请时间",
            type: "date", //表单类型
            dateChange: (val) => {
              console.log(val);
              state.formData.date = val;
            },
          },
        },
        {
          name: "source",
          fieldType: "text-input",
          attrs: {
            label: "金额",
            labelWidth: "45px",
            placeholder: "请填写",
            type: "text", //表单类型
            clearable: true,
            onInputEvent: (val) => {
              state.formData.source = val;
            },
          },
        },
      ],
      apiUrl: "getCityCategory",
    });
    const handleDialogCancel = (val) => {
      dialogFormVisible.value = val;
    };
    const handleDialogSave = (val) => {
      dialogFormVisible.value = val;
      getList();
    };
    //查询
    const onSearch = () => {
      state.currentApi.currentPage = 1;
      getList();
    };
    //重置
    const onReset = () => {
      getList();
    };
    //改变每页显示多少条信息
    const handleSizeChange = (page) => {
      state.currentApi.currentPage = 1;
      state.currentApi.pageSize = page;
      getList();
    };
    //跳转到当前页
    const handleCurrentChange = (page) => {
      state.currentApi.currentPage = page;
      getList();
    };
    //获取城市分类数据列表
    const getCityCategory = () => {
      proxy.$api.getCityCategory().then((res) => {
        if (res.code === "0") {
          state.fieldsConfig[1].options = res.data.list;
        }
      });
    };
    //获取列表数据
    const getList = () => {
      state.loading = true;
      proxy.$api.getRedBlackList(state.currentApi).then((res) => {
        if (res.code === 0) {
          state.totalCount = res.data.totalCount;
          state.tableData = res.data.list;
          state.tableData.map((item) => {
            item.source = item.createUserId;
            item.createUserId = number_format(item.createUserId, 2, ".", ",");
          });
          state.loading = false;
        }
      });
    };
    //编辑
    const eidt = (row, bool) => {
      if (row) {
        Object.keys(state.formData).forEach((key) => {
          state.formData[key] = row[key];
        });
      }
      state.isEdit = bool;
      state.dialogTitle = bool ? "编辑" : "新建";
      dialogFormVisible.value = true;
    };
    //删除
    const del = (id) => {
      ElMessageBox.confirm("该课程是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "删除中...";
            done();
            proxy.$api.districtDdelete({ id: id }).then((res) => {
              if (res.code === "0") {
                instance.confirmButtonLoading = false;
                getList();
              }
            });
          } else {
            done();
          }
        },
      }).then((action) => {
        console.log(action);
      });
    };
    //加载数据
    onMounted(() => {
      getList();
      getCityCategory();
    });
    provide("dialogFormVisible", dialogFormVisible);
    return {
      ...toRefs(state),
      handleSizeChange,
      handleCurrentChange,
      onSearch,
      onReset,
      getList,
      getCityCategory,
      eidt,
      del,
      handleDialogCancel,
      handleDialogSave,
    };
  },
});
</script>
