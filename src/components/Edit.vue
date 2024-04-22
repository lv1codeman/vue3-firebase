<script setup>
// TODO: 编辑
import { ref } from "vue";
import { addAgent } from "../assets/js/setAgent";
import axios from "axios";
// 弹框开关
const eventType = ref("");
const formTitle = eventType.value == "create" ? "新增系辦" : "更新系辦資料";
const dialogVisible = ref(false);

const form = ref({
  id: "",
  dept: "",
  deptFullName: "",
  college: "",
  collegeFullName: "",
  agent: "",
  agentEmail: "",
  agentExt: "",
  curriAgent: "",
  curriAgentEmail: "",
  curriAgentExt: "",
});

const create = (row) => {
  eventType.value = "create";
  dialogVisible.value = true;
  form.value.id =
    form.value.dept =
    form.value.deptFullName =
    form.value.college =
    form.value.collegeFullName =
    form.value.agent =
    form.value.agentEmail =
    form.value.agentExt =
    form.value.curriAgent =
    form.value.curriAgentEmail =
    form.value.curriAgentExt =
      "";
};

const open = (row) => {
  console.log(row);
  eventType.value = "update";
  form.value.id = row.id;
  form.value.dept = row.dept;
  form.value.deptFullName = row.deptFullName;
  form.value.college = row.college;
  form.value.collegeFullName = row.collegeFullName;
  form.value.agent = row.agent;
  form.value.agentEmail = row.agentEmail;
  form.value.agentExt = row.agentExt;
  form.value.curriAgent = row.curriAgent;
  form.value.curriAgentEmail = row.curriAgentEmail;
  form.value.curriAgentExt = row.curriAgentExt;

  dialogVisible.value = true;
};

const emit = defineEmits(["on-update", "on-create"]);
const onUpdate = async () => {
  // await axios.patch(`/edit/${form.value.id}`, {
  //   name: form.value.name,
  //   place: form.value.place,
  // });
  dialogVisible.value = false;

  emit("on-update");
};

const onCreate = async () => {
  console.log("onCreate event start...");
  const res = {
    id: form.value.id,
    dept: form.value.dept,
    deptFullName: form.value.deptFullName,
    college: form.value.college,
    collegeFullName: form.value.collegeFullName,
    agent: form.value.agent,
    agentEmail: form.value.agentEmail,
    agentExt: form.value.agentExt,
    curriAgent: form.value.curriAgent,
    curriAgentEmail: form.value.curriAgentEmail,
    curriAgentExt: form.value.curriAgentExt,
  };

  emit("on-create", res);
  dialogVisible.value = false;
};

defineExpose({
  create,
  open,
});
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    :title="eventType == 'create' ? '新增系辦' : '更新系辦資料'"
    width="30%"
  >
    <div>
      <el-form>
        <el-form-item label="系所">
          <el-input placeholder="請輸入系所" v-model="form.dept" />
        </el-form-item>
        <el-form-item label="系所全名">
          <el-input placeholder="請輸入系所全名" v-model="form.deptFullName" />
        </el-form-item>
        <el-form-item label="學院">
          <el-input placeholder="請輸入學院" v-model="form.college" />
        </el-form-item>
        <el-form-item label="學院全名">
          <el-input
            placeholder="請輸入學院全名"
            v-model="form.collegeFullName"
          />
        </el-form-item>
        <el-form-item label="承辦人">
          <el-input placeholder="請輸入承辦人" v-model="form.agent" />
        </el-form-item>
        <el-form-item label="承辦人Email">
          <el-input placeholder="請輸入承辦人Email" v-model="form.agentEmail" />
        </el-form-item>
        <el-form-item label="承辦人分機">
          <el-input placeholder="請輸入承辦人分機" v-model="form.agentExt" />
        </el-form-item>
        <el-form-item label="課務組承辦人">
          <el-input
            placeholder="請輸入課務組承辦人"
            v-model="form.curriAgent"
          />
        </el-form-item>
        <el-form-item label="課務組承辦人Email">
          <el-input
            placeholder="請輸入課務組承辦人Email"
            v-model="form.curriAgentEmail"
          />
        </el-form-item>
        <el-form-item label="課務組承辦人分機">
          <el-input
            placeholder="請輸入課務組承辦人分機"
            v-model="form.curriAgentExt"
          />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button class="spacer" @click="dialogVisible = false"
          >取消</el-button
        >
        <span v-if="eventType == 'update'">
          <el-button type="primary" @click="onUpdate">確認</el-button>
        </span>
        <span v-else>
          <el-button type="primary" @click="onCreate">新增</el-button>
        </span>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
.spacer {
  margin-right: 10px;
}
:deep(.el-form-item) {
  justify-content: center;
}
:deep(.el-form-item__label) {
  flex: 0.7 0;
  padding: 0;
}
:deep(.el-form-item__content) {
  flex: 1 0;
  padding: 0 0 0 12px;
}
/* .el-form-item__content >>> .el-input__wrapper {
  flex-grow: 0.1;
} */

:deep(.el-input__wrapper) {
  flex-grow: 0.1;
}
</style>
