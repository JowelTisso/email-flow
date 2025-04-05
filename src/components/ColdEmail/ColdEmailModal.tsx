import MainModal from "../ModalWrapper/MainModal";
import { ModalProps } from "../../utils/Types";
import { Button, Select } from "antd";
import { BsPlusCircle } from "react-icons/bs";
import { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import {
  toggleColdEmailModal,
  toggleTemplateModal,
} from "../../reducers/mainSlice";

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
      min-width: 130px;
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

const ColdEmailModal = ({ open, handleOk, handleCancel }: ModalProps) => {
  const [selectValue, setSelectValue] = useState("");

  const dispatch = useDispatch();

  const handleChange = (value: string) => {
    setSelectValue(value);
  };

  const clickHandler = () => {
    dispatch(toggleTemplateModal());
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
          <Button className="btn-action" onClick={clickHandler}>
            New Template <BsPlusCircle className="icon" size={17} />
          </Button>
        </div>
        <Select
          allowClear
          className="select"
          onChange={handleChange}
          placeholder="Search for an Email Template"
          options={[
            { value: "jack", label: "Jack" },
            { value: "lucy", label: "Lucy" },
            { value: "Yiminghe", label: "yiminghe" },
            { value: "Yiminghe", label: "yiminghe" },

            { value: "disabled", label: "Disabled", disabled: true },
          ]}
        />
        {selectValue ? (
          <Button type="primary" className="btn-insert">
            Insert
          </Button>
        ) : null}
      </Wrapper>
    </MainModal>
  );
};

export default ColdEmailModal;
