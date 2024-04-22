<script lang="ts" setup>
import { ref, watch, nextTick } from "vue";
import Edit from "./components/Edit.vue";
import axios from "axios";
import { onMounted } from "vue";

import firebaseConfig from "./assets/js/getFirebaseConfig";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { getAllAgents } from "./assets/js/getAgents";
import { addAgent } from "./assets/js/setAgent";
import { doc, deleteDoc } from "firebase/firestore";

import type { TableColumnCtx, TableInstance } from "element-plus";

interface Agent {
  id: string;
  dept: string;
  deptFullName: string;
  college: string;
  collegeFullName: string;
  agent: string;
  agentEmail: string;
  agentExt: string;
  curriAgent: string;
  curriAgentEmail: string;
  curriAgentExt: string;
}

const tableRef = ref<TableInstance>();

const filterHandler = (
  value: string,
  row: Agent,
  column: TableColumnCtx<Agent>
) => {
  // console.log(value);
  // console.log(column);

  const property = column["property"];
  return row[property] === value;
};
// const formatter = (row: Agent, column: TableColumnCtx<Agent>) => {
//   return row.dept;
// };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const agentlist = ref([]);
const showData = async () => {
  getAllAgents(db)
    .then((users) => {
      const userNum = users.length;
      const msg = `目前資料庫中共有${userNum}位使用者。`;
      console.log("取得使用者資料成功：", users, msg);
      // users.forEach((user) => {
      //   user.id = parseInt(user.id);
      // });
      console.log("取得使用者資料成功after parseInt：", typeof users[0].id);

      //https://juejin.cn/post/7266986461102997539
      //動態數據渲染el-table時，default-sort會失效
      //在setTimeout中調用nextTick()確認資料都掛載後才執行sortTable()
      setTimeout(async function () {
        agentlist.value = users;
        console.log(agentlist.value);
        await nextTick();
        // sortTable();
        tableRef.value?.sort("id", "descending");
        loading.value = false;
      }, 200);
      // console.log("showData done.");

      // tableRef.value?.sort("id", "ascending");
    })
    .catch((error) => {
      console.error("取得使用者資料失敗：", error);
    });
};

const addone = async (data) => {
  console.log("create done.", data);
  getAllAgents(db)
    .then((users) => {
      console.log("取得使用者資料成功：", users);
      console.log("取得使用者資料成功：", users.length.toString());
      addAgent(db, data, (users.length + 1).toString());
      showData();
      // sortTable();
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
  tableRef.value?.sort("id", "ascending");
});
// TODO: 删除功能
// 獲取當前行的id > 通過id調用刪除接口 > 更新最新的列表

const onDelete = async (row, column, index) => {
  console.log(row);
  console.log(column);
  console.log(index);

  await deleteDoc(doc(db, "agents", row.id.toString()));
  showData();
};

// TODO: 编辑功能
// 打開彈框 > 回填數據 > 更新數據
// 1. 打開彈框 (獲取子組件實例 > 調用方法或者修改屬性)
// 2. 回填數據
// 調用詳情接口/當前行的靜態數據
const editRef = ref(null);
const onEdit = (row) => {
  (editRef.value as any).open(row);
  console.log(editRef.value);
};

const addNewAgent = () => {
  console.log("add agent clicked.");
  (editRef.value as any).create();
  console.log(editRef.value);
};

const defaultSort = {
  // 默认排序配置
  prop: "id", // 列字段
  order: "ascending", // 排序顺序
};

const handleDataUpdate = async (newData) => {
  console.log("table data changed!!!", newData.prop);
  tableRef.value?.sort(newData.prop, newData.order);
};

const loading = ref(true);

const sortTable = async () => {
  tableRef.value?.sort("id", "descending");
};

const sortID = (a, b) => a.id - b.id;
</script>

<template>
  <el-button @click="sortTable" type="primary" plain>sortTable</el-button>
  <el-button @click="showData" type="primary" plain>showData</el-button>
  <!-- @sort-change="handleDataUpdate" -->
  <!-- sortable="custom" -->

  <!-- :default-sort="defaultSort" -->
  <div class="app">
    <el-button @click="addNewAgent" type="primary" plain>Add agent</el-button>
    <el-table
      ref="tableRef"
      v-loading="loading"
      :data="agentlist"
      style="width: 100%"
      border
      stripe
      height="500"
    >
      <el-table-column
        fixed
        label="ID"
        prop="id"
        width="75px"
        sortable
        :sort-method="sortID"
      ></el-table-column>
      <el-table-column
        label="學院"
        prop="college"
        width="110px"
        sortable
        :filters="[
          { text: '教育學院', value: '教育學院' },
          { text: '文學院', value: '文學院' },
          { text: '理學院', value: '理學院' },
          { text: '科技學院', value: '科技學院' },
          { text: '工學院', value: '工學院' },
          { text: '管理學院', value: '管理學院' },
          { text: '社科體院', value: '社科體院' },
        ]"
        :filter-method="filterHandler"
      ></el-table-column>
      <el-table-column
        label="學院全名"
        width="110px"
        prop="collegeFullName"
        sortable
      ></el-table-column>
      <el-table-column label="系所" prop="dept" sortable></el-table-column>
      <el-table-column
        label="系所全名"
        width="160px"
        prop="deptFullName"
        sortable
      ></el-table-column>
      <el-table-column
        label="承辦人"
        width="100px"
        prop="agent"
        sortable
      ></el-table-column>
      <el-table-column
        label="承辦人Email"
        width="200px"
        prop="agentEmail"
      ></el-table-column>
      <el-table-column
        label="承辦人分機"
        width="110px"
        prop="agentExt"
      ></el-table-column>
      <el-table-column
        label="課務組承辦人"
        width="140px"
        prop="curriAgent"
        sortable
      ></el-table-column>
      <el-table-column
        label="課務組承辦人Email"
        width="200px"
        prop="curriAgentEmail"
      ></el-table-column>
      <el-table-column
        label="課務組承辦人分機"
        width="140px"
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
  <Edit ref="editRef" @on-update="getList" @on-create="addone" />
</template>

<style scoped>
.app {
  width: 980px;
  margin: 20px auto;
}
</style>
