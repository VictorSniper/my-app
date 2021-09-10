<template>
  <div class="page-content-details">

  <el-descriptions class="margin-top" title="一叶障目" :column="3"  border>
    <template #extra>
      <el-button type="primary" size="small">返回</el-button>
    </template>
    <el-descriptions-item>
      <template #label>
        <i class="el-icon-user"></i>
        用户名
      </template>
      kooriookami
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <i class="el-icon-mobile-phone"></i>
        手机号
      </template>
      18100000000
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <i class="el-icon-location-outline"></i>
        居住地
      </template>
      苏州市
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <i class="el-icon-tickets"></i>
        备注
      </template>
      <el-tag size="small">学校</el-tag>
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <i class="el-icon-office-building"></i>
        联系地址
      </template>
      江苏省苏州市吴中区吴中大道 1188 号
    </el-descriptions-item>
  </el-descriptions>
  </div>
</template>
<style lang="scss" scoped>
.page-content-details {
  background-color: white;
  padding: 15px;
  border-radius: 4px;
}
</style>
