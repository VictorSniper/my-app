
<template>
  <div class="account">
    <router-view />
  </div>
</template>
<style lang="scss" >
.account {
  .el-card {
    border: unset;
  }
  .account-center {
  
    .sub-title {
      font-size: 16px;
      color: #909399;
    }
    .user-info {
      text-align: left;
      font-size: 13px;
      line-height: 2;
      padding: 0;
      color: #909399;
      li {
        list-style: none;
      }
    }
    .tags-title {
      text-align: left;
    }
    .tags-body {
      text-align: left;
      .el-tag {
        margin: 5px;
        color: #909399;
      }
    }
  }
}
</style>
