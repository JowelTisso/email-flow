import { Button, Select } from "antd";
import { ModalProps } from "../../utils/Types";
import MainModal from "../ModalWrapper/MainModal";
import styled from "styled-components";
import { BsPlusCircle } from "react-icons/bs";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { toggleLeadModal } from "../../reducers/mainSlice";
import { setEdges, setNodes } from "../../reducers/nodesSlice";
import { RootState } from "../../store";
import { sampleLeadListData } from "../../utils/data";

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
    height: 40px;
    font-size: 1rem;
    width: 70px;
  }
`;

const LeadNodePosition = { x: 410, y: 120 };
export const spaceBetweenLeadNode = 230;

const AddLeadModal = ({ open, handleOk, handleCancel }: ModalProps) => {
  const [selectValue, setSelectValue] = useState<string[]>([]);

  const { nodes, edges } = useSelector((state: RootState) => state.nodes);

  const dispatch = useDispatch();

  const handleChange = (value: string[]) => {
    setSelectValue(value);
  };

  const clickHandler = () => {
    window.open("https://run.salesblink.io/import-list/new", "_target");
  };

  const addNode = () => {
    let emailsList: string[] = [];

    selectValue.forEach((leadListId) => {
      const selectedList = sampleLeadListData.find(
        (list) => list.id === leadListId
      );
      if (selectedList) {
        emailsList = emailsList.concat(selectedList.emails);
      }
    });

    const newLeadNode = {
      id: uuid(),
      type: "lead",
      position: LeadNodePosition,
      data: {
        label: "Sample List (Added by SalesBlink)",
        emails: emailsList,
      },
      draggable: false,
    };

    const alignNodes = nodes.map((node) => {
      if (node.type === "addLead" || node.type === "lead") {
        return {
          ...node,
          position: {
            ...node.position,
            x: node.position.x + spaceBetweenLeadNode,
          },
        };
      }

      return node;
    });

    const newEdges = [
      ...edges,
      {
        id: uuid(),
        source: newLeadNode.id,
        target: "2",
      },
    ];

    dispatch(setNodes([...alignNodes, newLeadNode]));

    dispatch(setEdges(newEdges));

    dispatch(toggleLeadModal());
  };

  return (
    <MainModal
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      title="Leads from List(s)"
      description="Connect multiple lists as source for this sequence."
      top={20}
      height={620}
      showTooltip={false}
    >
      <Wrapper>
        <div className="header">
          <h3>Select your List(s)</h3>
          <Button className="btn-outline" onClick={clickHandler} size="large">
            New List <BsPlusCircle size={17} />
          </Button>
        </div>
        <Select
          mode="multiple"
          allowClear
          className="select"
          onChange={handleChange}
          placeholder="Search for lists"
          options={[
            {
              value: "8cf00168-cfae-4d23-811a-dfb944ffd79f",
              label: "Sample List",
            },
          ]}
        />
        {selectValue?.length > 0 ? (
          <Button type="primary" className="btn-insert" onClick={addNode}>
            Insert
          </Button>
        ) : null}
      </Wrapper>
    </MainModal>
  );
};

export default AddLeadModal;
