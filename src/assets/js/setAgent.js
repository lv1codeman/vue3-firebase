import { doc, setDoc } from "firebase/firestore";

export async function updateAgent(db, agent, docID) {
  console.log("addAgent start...agent.id=", agent.id);
  console.log("addAgent start...docID=", docID);
  console.log(agent);
  await setDoc(
    doc(db, "agents", agent.id.toString()),
    {
      id: agent.id,
      dept: agent.dept,
      college: agent.college,
      collegeFullName: agent.collegeFullName,
      dept: agent.dept,
      deptFullName: agent.deptFullName,
      agent: agent.agent,
      agentExt: agent.agentExt,
      agentEmail: agent.agentEmail,
      curriAgent: agent.curriAgent,
      curriAgentExt: agent.curriAgentExt,
      curriAgentEmail: agent.curriAgentEmail,
    },
    { merge: true }
  );
  return "add success";
}

export async function addAgent(db, agent, id) {
  console.log("addAgent start...", id);
  console.log(agent);
  await setDoc(
    doc(db, "agents", id),
    {
      id: parseInt(id),
      dept: agent.dept,
      college: agent.college,
      collegeFullName: agent.collegeFullName,
      dept: agent.dept,
      deptFullName: agent.deptFullName,
      agent: agent.agent,
      agentExt: agent.agentExt,
      agentEmail: agent.agentEmail,
      curriAgent: agent.curriAgent,
      curriAgentExt: agent.curriAgentExt,
      curriAgentEmail: agent.curriAgentEmail,
    },
    { merge: true }
  );
  return "add success";
}
