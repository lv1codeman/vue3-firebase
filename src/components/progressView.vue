<template>
  <el-steps style="min-width: 600px" active="3" finish-status="success">
    <el-step title="Step 1" description="刪除承辦人" />
    <el-step title="Step 2" description="新增承辦人" />
    <el-step title="Step 3" description="編輯承辦人" />
    <el-step title="Step 4" description="table row複製到剪貼簿" />
    <el-step title="Step 5" />
  </el-steps>

  <!-- <el-button style="margin-top: 12px" @click="next">Next step</el-button> -->
</template>

<script lang="ts" setup>
import { ref } from "vue";

const active = ref(0);

const next = () => {
  if (active.value++ > 2) active.value = 0;
};
</script>
