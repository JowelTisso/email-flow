import MainModal from "../ModalWrapper/MainModal";
import { ModalProps } from "../../utils/Types";
import styled from "styled-components";
import { Button, InputNumber, InputNumberProps, Select } from "antd";
import { useState } from "react";
import { valueType } from "antd/es/statistic/utils";
import { v4 as uuid } from "uuid";
import {
  EmailNodePosition,
  spaceBetweenEmailNode,
} from "../../utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setEdges, setNodes } from "../../reducers/nodesSlice";
import { toggleDelayModal } from "../../reducers/mainSlice";

const Wrapper = styled.div`
  width: 99%;
  display: flex;
  flex-direction: column;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h3 {
      font-weight: 500;
    }
  }

  .select {
    height: 40px;
    width: 100%;
    margin-top: 10px;
  }

  .btn-insert {
    margin-top: 30px;
    margin-left: auto;
    outline: 3px solid lightblue;
    font-weight: 500;
  }
`;

const waitTypeOptions = [
  {
    label: "Minutes",
    value: "minutes",
  },
  {
    label: "Hours",
    value: "hours",
  },
  {
    label: "Days",
    value: "days",
  },
];

const DelayModal = ({ open, handleCancel }: ModalProps) => {
  const [waitTime, setWaitTime] = useState<valueType | null>(0);

  const [waitType, setWaitType] = useState("");

  const { nodes, edges } = useSelector((state: RootState) => state.nodes);
  const dispatch = useDispatch();

  const onTimeChange: InputNumberProps["onChange"] = (value) => {
    setWaitTime(value);
  };

  const handleChange = (value: string) => {
    setWaitType(value);
  };

  const addEdges = (newNodeId: string) => {
    const emailNodes = nodes.filter(
      (node) => node.type === "email" || node.type === "addBlock"
    );
    const lastNodeIndex = 0;

    const lastNodeId = emailNodes[lastNodeIndex].id;

    const reconnectedEdges = edges.map((edge) => {
      if (edge.target === lastNodeId) {
        return {
          ...edge,
          target: newNodeId,
        };
      }
      return edge;
    });

    const newEdge = {
      id: uuid(),
      source: newNodeId,
      target: lastNodeId,
    };

    dispatch(setEdges([...reconnectedEdges, newEdge]));
  };

  const addNode = () => {
    const emailNodes = nodes.filter(
      (node) => node.type === "email" || node.type === "delay"
    );
    const lastEmailNode = emailNodes[emailNodes.length - 1];

    const lastEmailNodePosition = lastEmailNode
      ? lastEmailNode.position.y
      : EmailNodePosition.y;

    const newDelayNode = {
      id: uuid(),
      type: "delay",
      position: {
        x: EmailNodePosition.x,
        y: lastEmailNodePosition + spaceBetweenEmailNode,
      },
      data: {
        label: `${waitTime} ${waitType}`,
        waitTime,
        waitType,
      },
      draggable: true,
    };

    const alignNodes = nodes.map((node) => {
      if (node.type === "addBlock") {
        return {
          ...node,
          position: {
            ...node.position,
            y: node.position.y + spaceBetweenEmailNode,
          },
        };
      }

      return node;
    });

    dispatch(setNodes([...alignNodes, newDelayNode]));

    addEdges(newDelayNode.id);

    dispatch(toggleDelayModal());
  };

  return (
    <MainModal
      open={open}
      onCancel={handleCancel}
      title="Wait"
      description="Add a delay between blocks."
      height={550}
      showTooltip={false}
    >
      <Wrapper>
        <div className="header">
          <h3>Wait For</h3>
        </div>
        <InputNumber className="select" min={1} onChange={onTimeChange} />
        <div className="header">
          <h3>Wait Type</h3>
        </div>
        <Select
          allowClear
          className="select"
          placeholder="Select an option"
          options={waitTypeOptions}
          onChange={handleChange}
        />
        <Button type="primary" className="btn-insert" onClick={addNode}>
          Insert
        </Button>
      </Wrapper>
    </MainModal>
  );
};

export default DelayModal;
