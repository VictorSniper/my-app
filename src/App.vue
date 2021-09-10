<template>
    <router-view />
</template>
<script>
import { defineComponent } from 'vue'
import * as echarts from 'echarts'
import { provide } from 'vue'
export default defineComponent({
  name: 'App',
  setup() {
    provide('ec',echarts)//provide
  },
})
</script>

<style>
body{
  background-color:#f0f2f5
}

</style>