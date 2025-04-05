import { Divider, Modal, Tooltip } from "antd";
import { BsQuestionCircle } from "react-icons/bs";
import styled from "styled-components";
import { MainModalProps } from "../../utils/Types";

const StyledModal = styled(Modal)<{ top?: number; height?: number }>`
  top: ${({ top = 50 }) => top}px;

  .ant-modal-body {
    height: ${({ height = 500 }) => height}px;
  }

  h2 {
    display: flex;
    align-items: center;
    margin: 0;
    font-weight: 600;
  }

  .tooltip {
    margin-left: 10px;
    cursor: pointer;
  }

  .top-divider {
    margin-bottom: 10px;
  }

  .bottom-divider {
    margin-top: 15px;
  }

  .cards-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 25px;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  section {
    height: ${({ height = 400 }) => height - 100}px;
    overflow-y: scroll;
  }

  ::-webkit-scrollbar {
    display: none;
  }
`;

const MainModal: React.FC<MainModalProps> = ({
  children,
  open,
  onOk,
  onCancel,
  title,
  description,
  top,
  height,
}) => {
  return (
    <StyledModal
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      width={850}
      footer={null}
      top={top}
      height={height}
    >
      <Divider className="top-divider" />
      <h2>
        {title}
        <Tooltip className="tooltip" title={description}>
          <BsQuestionCircle />
        </Tooltip>
      </h2>
      <p>{description}</p>
      <Divider className="bottom-divider" />
      <section>{children}</section>
    </StyledModal>
  );
};

export default MainModal;
