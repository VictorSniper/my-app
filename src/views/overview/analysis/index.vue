<template>
  <div class="analysis">
    <el-row :gutter="15">
      <el-col :span="18">
        <el-card shadow="never">
          <div class="analysis-content">
            <div class="pageHeaderContent">
              <div class="page-header-avatar">
                <el-avatar
                  :size="72"
                  src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                ></el-avatar>
              </div>
              <div class="page-header-content">
                <div class="page-header-content-header">
                  早安，北辰，祝你开心每一天！
                </div>
                <div class="tag">
                  兴趣标签：
                  <el-tag type="success">javascript</el-tag>
                  <el-tag type="info">vue</el-tag>
                  <el-tag type="warning">react</el-tag>
                  <el-tag type="danger">es6</el-tag>
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="never">
          <template #header>
            <div class="card-header">
              <span>快速开始 / 便捷导航</span>
            </div>
          </template>
          <div class="tag">
            <el-tag type="success">便捷导航</el-tag>
            <el-tag type="info">便捷导航</el-tag>
            <el-tag type="warning">便捷导航</el-tag>
            <el-tag type="danger">便捷导航</el-tag>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row style="margin-top:15px" :gutter="15">
      <el-col :span="18">
        <el-card shadow="never">
          <template #header>
            <div class="card-header">
              <span>成长路线图</span>
            </div>
          </template>
          <div
            id="customerChart"
            :style="{ width: '100%', height: '300px' }"
          ></div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="never">
          <template #header>
            <div class="card-header">
              <span>六边形选手</span>
            </div>
          </template>
          <div id="circle" :style="{ width: '100%', height: '300px' }"></div>
        </el-card>
      </el-col>
    </el-row>
    <el-row style="margin-top:15px" :gutter="15">
      <el-col :span="8">
        <el-card shadow="never">
          <template #header>
            <div class="card-header">
              <span>仪表盘</span>
            </div>
          </template>
          <div id="gauge" :style="{ width: '100%', height: '220px' }"></div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="never">
          <template #header>
            <div class="card-header">
              <span>柱状图</span>
            </div>
          </template>
          <div id="category" :style="{ width: '100%', height: '220px' }"></div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="never">
          <template #header>
            <div class="card-header">
              <span>线形图</span>
            </div>
          </template>
          <div id="pie" :style="{ width: '100%', height: '220px' }"> </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
function init(echarts, id, opt) {
  let obj = echarts.init(document.getElementById(id));
  obj.setOption(opt);
  window.addEventListener("resize", function() {
    obj.resize();
  });
}
import { defineComponent, inject, onMounted } from "vue";
export default defineComponent({
  setup() {
    let echarts = inject("ec"); //引入
    onMounted(() => {
      init(echarts, "gauge", {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%",
        },
        series: [
          {
            name: "Pressure",
            type: "gauge",
            progress: {
              show: true,
            },
            detail: {
              valueAnimation: true,
              formatter: "{value}",
            },
            data: [
              {
                value: 50,
                name: "SCORE",
              },
            ],
          },
        ],
      });
      init(echarts,'circle',{
        radar: {
          // shape: 'circle',
          indicator: [
            { name: "销售", max: 6500 },
            { name: "管理", max: 16000 },
            { name: "信息技术", max: 30000 },
            { name: "客服", max: 38000 },
            { name: "研发", max: 52000 },
            { name: "市场", max: 25000 },
          ],
        },
        series: [
          {
            name: "预算 vs 开销（Budget vs spending）",
            type: "radar",
            data: [
              {
                value: [5000, 14000, 20000, 35000, 50000, 18000],
                name: "预算分配（Allocated Budget）",
              },
            ],
          },
        ],
      });
      init(echarts,"pie",{
    tooltip: {
        trigger: 'item'
    },
    legend: {
        top: '5%',
        left: 'left'
    },
    series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '40',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [
                {value: 1048, name: '搜索引擎'},
                {value: 735, name: '直接访问'},
                {value: 580, name: '邮件营销'},
            ]
        }
    ]
})
      init(echarts,"category", {
             grid: {
          x: 30,
          y: 10,
          x2: 0,
          y2: 20,
          backgroundColor: "rgba(0,0,0,0)",
          borderWidth: 1,
          borderColor: "#ccc",
        },
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
        }
    }]
})
      init(echarts,'customerChart',{
        tooltip: {},
        grid: {
          x: 30,
          y: 10,
          x2: 0,
          y2: 20,
          backgroundColor: "rgba(0,0,0,0)",
          borderWidth: 1,
          borderColor: "#ccc",
        },
        xAxis: {
          data: ["12-3", "12-4", "12-5", "12-6", "12-7", "12-8", "12-9"],
        },
        yAxis: {},
        series: [
          {
            name: "文学类",
            type: "line",
            data: [5, 20, 6, 10, 10, 20, 50],
          },
          {
            name: "技术类",
            type: "line",
            data: [2, 15, 36, 4, 8, 22, 18],
          },
        ],
      })

    });
  },
});
</script>
<style lang="scss" scoped>
.analysis {
  .analysis-content {
    flex: auto;
    width: 100%;
    .pageHeaderContent {
      display: flex;
      .page-header-avatar {
        flex: 0 1 72px;
      }
      .page-header-content {
        position: relative;
        top: 4px;
        flex: 1 1 auto;
        margin-left: 24px;
        color: rgba(0, 0, 0, 0.45);
        line-height: 22px;
        .page-header-content-header {
          margin-bottom: 12px;
          color: rgba(0, 0, 0, 0.85);
          font-weight: 500;
          font-size: 20px;
          line-height: 28px;
        }
      }
    }
  }
  .tag {
    font-size: 12px;
  }
  .el-tag {
    margin-right: 10px;
  }
}
</style>
