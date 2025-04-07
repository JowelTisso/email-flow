import MainModal from "../ModalWrapper/MainModal";
import { EmailTemplate, ModalProps } from "../../utils/Types";
import { Button, Select } from "antd";
import { BsPlusCircle } from "react-icons/bs";
import { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleColdEmailModal,
  toggleTemplateModal,
} from "../../reducers/mainSlice";
import { RootState } from "../../store";
import { v4 as uuid } from "uuid";
import { COLORS } from "../../utils/Colors";
import { setEdges, setNodes } from "../../reducers/nodesSlice";

const Wrapper = styled.div`
  width: 99%;
  display: flex;
  flex-direction: column;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
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

const EmailNodePosition = { x: 410, y: 450 };
export const spaceBetweenEmailNode = 180;

const ColdEmailModal = ({ open, handleOk, handleCancel }: ModalProps) => {
  const [selectValue, setSelectValue] = useState<EmailTemplate>({
    name: "",
    body: "",
    offer: "",
    subject: "",
  });

  const { nodes, edges } = useSelector((state: RootState) => state.nodes);
  const { emailTemplates } = useSelector((state: RootState) => state.main);
  const dispatch = useDispatch();

  const handleChange = (value: EmailTemplate) => {
    setSelectValue(value);
  };

  const clickHandler = () => {
    dispatch(toggleTemplateModal());
    dispatch(toggleColdEmailModal());
  };

  const formatTemplates = () => {
    return emailTemplates.reduce(
      (acc, curr) => {
        acc.push({
          label: curr.name,
          value: JSON.stringify(curr),
        });
        return acc;
      },
      [] as {
        label: string;
        value: string;
      }[]
    );
  };

  const addEdges = (newNodeId: string) => {
    const emailNodes = nodes.filter(
      (node) => node.type === "email" || node.type === "addBlock"
    );
    const lastNodeIndex = emailNodes.length - 1;

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
    const parsedValue = JSON.parse(selectValue as unknown as string);

    const newEmailNode = {
      id: uuid(),
      type: "email",
      position: EmailNodePosition,
      data: {
        label: parsedValue.name,
        value: parsedValue,
        icBg: COLORS.sourceBg,
        icColor: COLORS.sourceIcon,
        icBorder: COLORS.sourceBorder,
      },
      draggable: true,
    };

    const alignNodes = nodes.map((node) => {
      if (node.type === "addBlock" || node.type === "email") {
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

    dispatch(setNodes([...alignNodes, newEmailNode]));

    addEdges(newEmailNode.id);

    dispatch(toggleColdEmailModal());
  };

  return (
    <MainModal
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      title="Cold Email"
      description="Send an email to a lead."
      height={550}
      showTooltip={false}
    >
      <Wrapper>
        <div className="header">
          <h3>Email Template</h3>
          <Button className="btn-outline" onClick={clickHandler} size="large">
            New Template <BsPlusCircle size={17} />
          </Button>
        </div>
        <Select
          allowClear
          className="select"
          onChange={handleChange}
          placeholder="Search for an Email Template"
          options={formatTemplates()}
        />
        {selectValue ? (
          <Button type="primary" className="btn-insert" onClick={addNode}>
            Insert
          </Button>
        ) : null}
      </Wrapper>
    </MainModal>
  );
};

export default ColdEmailModal;
