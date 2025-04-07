import { Modal } from "antd";
import styled from "styled-components";

export const StyledModal = styled(Modal)<{ top?: number; height?: number }>`
  top: 10px;
  .ant-modal-body {
    min-height: ${({ height = 500 }) => height}px;
  }

  .grid {
    display: grid;
    grid-template-columns: 3fr 1fr;

    .left {
      .ant-form-item {
        font-weight: 600;
        font-size: 1rem;
      }

      .input {
        height: 45px;
      }

      .business-input-group {
        margin-bottom: 0;
      }

      .actions-wrapper {
        display: flex;
        justify-content: space-between;

        span {
          display: flex;
          gap: 20px;
        }
      }
    }
  }
`;
