<script lang="ts" setup>
// TODO: 编辑
import { reactive, ref } from "vue";
import type { ComponentSize, FormInstance, FormRules } from "element-plus";
import { addAgent } from "../assets/js/setAgent";
import { reg_4_digit, reg_number_1_to_4 } from "../assets/js/regex.js";
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
  ruleForm.dept =
    ruleForm.deptFullName =
    ruleForm.college =
    ruleForm.collegeFullName =
    ruleForm.agent =
    ruleForm.agentEmail =
    ruleForm.agentExt =
    ruleForm.curriAgent =
    ruleForm.curriAgentEmail =
    ruleForm.curriAgentExt =
      "";
  dialogVisible.value = true;
  resetForm(ruleFormRef.value);
};
const updateAgentID = ref(null);
const open = (row) => {
  console.log(row);
  updateAgentID.value = row.id;
  eventType.value = "update";
  ruleForm.dept = row.dept;
  ruleForm.deptFullName = row.deptFullName;
  ruleForm.college = row.college;
  ruleForm.collegeFullName = row.collegeFullName;
  ruleForm.agent = row.agent;
  ruleForm.agentEmail = row.agentEmail;
  ruleForm.agentExt = row.agentExt;
  ruleForm.curriAgent = row.curriAgent;
  ruleForm.curriAgentEmail = row.curriAgentEmail;
  ruleForm.curriAgentExt = row.curriAgentExt;

  dialogVisible.value = true;
};

const emit = defineEmits(["on-update", "on-create"]);
const onUpdate = async (formEl: FormInstance | undefined) => {
  console.log("onUpdate event start...");
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit! packing res for App.vue to do addone...");
      const res = {
        id: updateAgentID.value,
        dept: ruleForm.dept,
        deptFullName: ruleForm.deptFullName,
        college: ruleForm.college,
        collegeFullName: ruleForm.collegeFullName,
        agent: ruleForm.agent,
        agentEmail: ruleForm.agentEmail,
        agentExt: ruleForm.agentExt,
        curriAgent: ruleForm.curriAgent,
        curriAgentEmail: ruleForm.curriAgentEmail,
        curriAgentExt: ruleForm.curriAgentExt,
      };
      emit("on-update", res);
      dialogVisible.value = false;
    } else {
      console.log("error submit!", fields);
      dialogVisible.value = true;
    }
  });
};

const onCreate = async (formEl: FormInstance | undefined) => {
  console.log("onCreate event start...");
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit! packing res for App.vue to do addone...");
      const res = {
        dept: ruleForm.dept,
        deptFullName: ruleForm.deptFullName,
        college: ruleForm.college,
        collegeFullName: ruleForm.collegeFullName,
        agent: ruleForm.agent,
        agentEmail: ruleForm.agentEmail,
        agentExt: ruleForm.agentExt,
        curriAgent: ruleForm.curriAgent,
        curriAgentEmail: ruleForm.curriAgentEmail,
        curriAgentExt: ruleForm.curriAgentExt,
      };
      emit("on-create", res);
      dialogVisible.value = false;
    } else {
      console.log("error submit!", fields);
      dialogVisible.value = true;
    }
  });
};

defineExpose({
  create,
  open,
});

interface RuleForm {
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

const formSize = ref<ComponentSize>("default");
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<RuleForm>({
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
const locationOptions = ["Home", "Company", "School"];

// type FormRules<RuleForm> = () => {
//   dept: "Hello";
// };

const rules = reactive<FormRules<RuleForm>>({
  dept: [{ required: true, message: "請輸入系所全名", trigger: "blur" }],
  deptFullName: [
    { required: true, message: "請輸入系所全名", trigger: "blur" },
  ],
  college: [{ required: true, message: "請輸入學院", trigger: "blur" }],
  collegeFullName: [
    { required: true, message: "請輸入學院全名", trigger: "blur" },
  ],
  agent: [{ required: true, message: "請輸入承辦人", trigger: "blur" }],
  agentEmail: [
    {
      required: true,
      type: "email",
      message: "不符合email格式",
      trigger: "blur",
    },
  ],
  agentExt: [
    {
      required: true,
      pattern: reg_4_digit,
      message: "請輸入4位數數字",
      trigger: "blur",
    },
  ],
  curriAgent: [
    {
      message: "請輸入課務組承辦人",
      trigger: "change",
    },
  ],
  curriAgentEmail: [
    {
      type: "email",
      message: "不符合email格式",
      trigger: "blur",
    },
  ],
  curriAgentExt: [
    {
      pattern: reg_4_digit,
      message: "請輸入4位數數字",
      trigger: "blur",
    },
  ],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
    } else {
      console.log("error submit!", fields);
    }
  });
};
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

const curriAgentChanged = () => {
  switch (ruleForm.curriAgent) {
    case "黃思嘉":
      ruleForm.curriAgentEmail = "loria@cc.ncue.edu.tw";
      ruleForm.curriAgentExt = "5622";
      break;
    case "鍾博凱":
      ruleForm.curriAgentEmail = "s26153@cc.ncue.edu.tw";
      ruleForm.curriAgentExt = "5626";
      break;
    case "黃嘉玲":
      ruleForm.curriAgentEmail = "chialing@cc.ncue.edu.tw";
      ruleForm.curriAgentExt = "5623";
      break;
    case "范豈瑗":
      ruleForm.curriAgentEmail = "ang3188@cc.ncue.edu.tw";
      ruleForm.curriAgentExt = "5624";
      break;
  }
};
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    :title="eventType == 'create' ? '新增系辦' : '更新系辦資料'"
    width="30%"
  >
    <div>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        class="demo-ruleForm"
        :size="formSize"
      >
        <!-- status-icon -->
        <el-form-item label="系所" prop="dept">
          <el-input
            placeholder="請輸入系所"
            v-model="ruleForm.dept"
            clearable
          />
        </el-form-item>
        <el-form-item label="系所全名" prop="deptFullName">
          <el-input
            placeholder="請輸入系所全名"
            v-model="ruleForm.deptFullName"
          />
        </el-form-item>
        <el-form-item label="學院" prop="college">
          <el-input
            placeholder="請輸入學院"
            v-model="ruleForm.college"
            clearable
          />
        </el-form-item>
        <el-form-item label="學院全名" prop="collegeFullName">
          <el-input
            placeholder="請輸入學院全名"
            v-model="ruleForm.collegeFullName"
            clearable
          />
        </el-form-item>
        <el-form-item label="承辦人" prop="agent">
          <el-input placeholder="請輸入承辦人" v-model="ruleForm.agent" />
        </el-form-item>
        <el-form-item label="承辦人Email" prop="agentEmail">
          <el-input
            placeholder="請輸入承辦人Email"
            v-model="ruleForm.agentEmail"
          />
        </el-form-item>
        <el-form-item label="承辦人分機" prop="agentExt">
          <el-input
            placeholder="請輸入承辦人分機"
            v-model="ruleForm.agentExt"
          />
        </el-form-item>

        <el-form-item label="課務組承辦人" prop="curriAgent">
          <el-select
            v-model="ruleForm.curriAgent"
            placeholder="請選擇課務組承辦人"
            @change="curriAgentChanged"
          >
            <!-- <el-option disable label="請選擇課務組承辦人" value="0" /> -->
            <el-option label="黃思嘉" value="黃思嘉" />
            <el-option label="鍾博凱" value="鍾博凱" />
            <el-option label="黃嘉玲" value="黃嘉玲" />
            <el-option label="范豈瑗" value="范豈瑗" />
          </el-select>
        </el-form-item>
        <el-form-item label="課務組承辦人Email" prop="curriAgentEmail">
          <el-input
            placeholder="請選擇課務組承辦人"
            v-model="ruleForm.curriAgentEmail"
            disabled
          />
        </el-form-item>
        <el-form-item label="課務組承辦人分機" prop="curriAgentExt">
          <el-input
            placeholder="請選擇課務組承辦人"
            v-model="ruleForm.curriAgentExt"
            disabled
          />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <!-- @click="dialogVisible = false" -->
        <el-button @click="clearForm(ruleFormRef)">返回</el-button>
        <el-button class="spacer" @click="resetForm(ruleFormRef)"
          >重設</el-button
        >
        <span v-if="eventType == 'update'">
          <el-button type="primary" @click="onUpdate(ruleFormRef)"
            >更新</el-button
          >
        </span>
        <span v-else>
          <el-button type="primary" @click="onCreate(ruleFormRef)"
            >新增</el-button
          >
        </span>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
.spacer {
  margin-right: 12px;
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
:deep(.el-form-item__error) {
  padding: 0 0 0 12px;
}

:deep(.el-input__wrapper) {
  flex-grow: 0.1;
}
:deep(.el-select__wrapper) {
  width: 196px;
}
</style>
