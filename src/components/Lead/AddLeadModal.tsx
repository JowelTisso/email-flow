import { Button, Select } from "antd";
import { ModalProps } from "../../utils/Types";
import MainModal from "../ModalWrapper/MainModal";
import styled from "styled-components";
import { BsPlusCircle } from "react-icons/bs";
import { useState } from "react";

const Wrapper = styled.div`
  width: 99%;
  display: flex;
  flex-direction: column;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .btn-action {
      border: 3px solid #06a5fc;
      color: #06a5fc;
      font-weight: 500;
      height: 40px;
      width: 130px;
      font-size: 1rem;

      .icon {
        font-weight: 600;
      }
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

const AddLeadModal = ({ open, handleOk, handleCancel }: ModalProps) => {
  const [selectValue, setSelectValue] = useState([""]);

  const handleChange = (value: string[]) => {
    setSelectValue(value);
  };

  const clickHandler = () => {
    window.open("https://run.salesblink.io/import-list/new", "_target");
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
    >
      <Wrapper>
        <div className="header">
          <h3>Select your List(s)</h3>
          <Button className="btn-action" onClick={clickHandler}>
            New List <BsPlusCircle className="icon" size={17} />
          </Button>
        </div>
        <Select
          mode="multiple"
          allowClear
          defaultValue={["lucy"]}
          className="select"
          onChange={handleChange}
          options={[
            { value: "jack", label: "Jack" },
            { value: "lucy", label: "Lucy" },
            { value: "Yiminghe", label: "yiminghe" },
            { value: "Yiminghe", label: "yiminghe" },
            { value: "Yiminghe", label: "yiminghe" },
            { value: "Yiminghe", label: "yiminghe" },
            { value: "Yiminghe", label: "yiminghe" },
            { value: "Yiminghe", label: "yiminghe" },
            { value: "Yiminghe", label: "yiminghe" },
            { value: "Yiminghe", label: "yiminghe" },
            { value: "Yiminghe", label: "yiminghe" },
            { value: "Yiminghe", label: "yiminghe" },
            { value: "Yiminghe", label: "yiminghe" },
            { value: "Yiminghe", label: "yiminghe" },
            { value: "Yiminghe", label: "yiminghe" },
            { value: "Yiminghe", label: "yiminghe" },
            { value: "Yiminghe", label: "yiminghe" },
            { value: "Yiminghe", label: "yiminghe" },
            { value: "Yiminghe", label: "yiminghe" },
            { value: "disabled", label: "Disabled", disabled: true },
          ]}
        />
        {selectValue.length > 0 ? (
          <Button type="primary" className="btn-insert">
            Insert
          </Button>
        ) : null}
      </Wrapper>
    </MainModal>
  );
};

export default AddLeadModal;
