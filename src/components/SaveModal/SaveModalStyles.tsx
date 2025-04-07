import { Modal } from "antd";
import styled from "styled-components";

export const StyledModal = styled(Modal)<{ randomCheckbox: boolean }>`
  top: 30px;

  .ant-modal-body {
    height: 500px;
    overflow-y: scroll;
  }

  h3 {
    margin: 0;
    display: flex;
    align-items: center;
    font-weight: 600;

    .tooltip {
      margin-left: 10px;
    }
  }

  .week-table {
    display: flex;
    flex-direction: column;
    width: 750px;

    .tr {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr 1.5fr 1.5fr ${(props) =>
          props.randomCheckbox ? 2 : 0}fr;

      .td {
        display: flex;
        align-items: center;

        &:last-child {
          display: flex;
          align-items: center;
          gap: 10px;
        }
      }
    }
  }

  ::-webkit-scrollbar {
    display: none;
  }
`;
