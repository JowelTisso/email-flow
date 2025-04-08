import { Node } from "@xyflow/react";
import { axiosInstance } from "../utils/axiosConfig";
import { DataType } from "../components/SaveModal/SaveModal";

export const saveNodes = async (nodes: Node[]) => {
  try {
    const res = await axiosInstance.post("/node", {
      nodes: nodes,
    });

    return res;
  } catch (err) {
    console.log(err);
  }
};

export const saveSchedule = async (data: DataType) => {
  try {
    const { time, body, subject, email } = data;
    const res = await axiosInstance.post("/schedule", {
      time,
      body,
      subject,
      email,
    });

    return res;
  } catch (err) {
    console.log(err);
  }
};

export const getAllNodes = async () => {
  try {
    const allNodes = await axiosInstance.get("/nodes");
    return allNodes.data;
  } catch (err) {
    console.log(err);
  }
};
