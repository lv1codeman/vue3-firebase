<script setup>
import { ref } from "vue";
import Edit from "./components/Edit.vue";
import axios from "axios";
import { onMounted } from "vue";

import { getAllAgents } from "./assets/js/getAgents";
import { addAgent } from "./assets/js/setAgent";

import firebaseConfig from "./assets/js/getFirebaseConfig";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const agentlist = ref([]);
const isLoading = ref(false);
const showData = async () => {
  getAllAgents(db)
    .then((users) => {
      console.log("取得使用者資料成功：", users);
      const userNum = users.length;
      const msg = `目前資料庫中共有${userNum}位使用者。`;
      console.log(msg);
      agentlist.value = users;
      isLoading.value = true;
    })
    .catch((error) => {
      console.error("取得使用者資料失敗：", error);
    });
};

// TODO: 列表渲染
// 聲明響應式list > 調用接口獲取數據 > 後端數據賦值給list > 綁訂到table組件
const list = ref([]);
const getList = async () => {
  const res = await axios.get("/list");
  console.log(res);
  list.value = res.data;
};

onMounted(() => {
  getList();
  showData();
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
// 打開彈框 > 回填數據 > 更新數據
// 1. 打開彈框 (獲取子組件實例 > 調用方法或者修改屬性)
// 2. 回填數據
// 調用詳情接口/當前行的靜態數據
const editRef = ref(null);
const onEdit = (row) => {
  editRef.value.open(row);
};

// console.log(editRef.value.book);
</script>

<template>
  <button @click="showData">showData</button>
  <div class="app" v-if="isLoading">
    <el-table :data="agentlist" style="width: 100%" height="500">
      <el-table-column fixed label="ID" prop="id" sortable></el-table-column>
      <el-table-column label="學院" prop="college"></el-table-column>
      <el-table-column
        label="學院全名"
        prop="collegeFullName"
      ></el-table-column>
      <el-table-column label="系所" prop="dept"></el-table-column>
      <el-table-column label="系所全名" prop="deptFullName"></el-table-column>
      <el-table-column label="承辦人" prop="agent"></el-table-column>
      <el-table-column label="承辦人Email" prop="agentEmail"></el-table-column>
      <el-table-column label="承辦人分機" prop="agentExt"></el-table-column>
      <el-table-column label="課務組承辦人" prop="curriAgent"></el-table-column>
      <el-table-column
        label="課務組承辦人Email"
        prop="curriAgentEmail"
      ></el-table-column>
      <el-table-column
        label="課務組承辦人分機"
        prop="curriAgentExt"
      ></el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="{ row, column, $index }">
          <el-button type="primary" link @click="onEdit(row)">编辑</el-button>
          <el-button type="danger" link @click="onDelete(row, column, $index)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
  <div class="app">
    <el-table :data="list">
      <el-table-column label="ID" prop="id"></el-table-column>
      <el-table-column label="姓名" prop="name" width="150"></el-table-column>
      <el-table-column label="籍贯" prop="place"></el-table-column>
      <el-table-column label="操作" width="150">
        <template #default="{ row, column, $index }">
          <el-button type="primary" link @click="onEdit(row)">编辑</el-button>
          <el-button type="danger" link @click="onDelete(row, column, $index)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
  <Edit ref="editRef" @on-update="getList" />
</template>

<style scoped>
.app {
  width: 980px;
  margin: 100px auto 0;
}
</style>
