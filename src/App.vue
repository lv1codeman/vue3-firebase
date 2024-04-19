<script setup>
import { ref } from "vue";
import Edit from "./components/Edit.vue";
import axios from "axios";
import { onMounted } from "vue";

// TODO: 列表渲染
// 聲明響應式list > 調用接口獲取數據 > 後端數據賦值給list > 綁訂到table組件
const list = ref([]);
const getList = async () => {
  const res = await axios.get("/list");
  list.value = res.data;
};

onMounted(() => {
  getList();
});
// TODO: 删除功能
// 獲取當前行的id > 通過id調用刪除接口 > 更新最新的列表

const onDelete = async (row, column, index) => {
  console.log("sss");
  console.log(row);
  console.log(column);
  console.log(index);

  await axios.delete(`del/${row.id}`);
  getList();
};

// TODO: 编辑功能
</script>

<template>
  <div class="app">
    <el-table :data="list">
      <el-table-column label="ID" prop="id"></el-table-column>
      <el-table-column label="姓名" prop="name" width="150"></el-table-column>
      <el-table-column label="籍贯" prop="place"></el-table-column>
      <el-table-column label="操作" width="150">
        <template #default="{ row, column, $index }">
          <el-button type="primary" link>编辑</el-button>
          <el-button type="danger" link @click="onDelete(row, column, $index)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
  <Edit />
</template>

<style scoped>
.app {
  width: 980px;
  margin: 100px auto 0;
}
</style>
