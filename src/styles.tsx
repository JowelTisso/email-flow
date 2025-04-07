import styled from "styled-components";
import { COLORS } from "./utils/Colors";

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  background-color: ${COLORS.bg};

  .flowchart {
    width: 95%;
    height: 90%;
    background-color: ${COLORS.flowbg};
  }

  .node {
    width: 180px;
    border-radius: 3px;
    background-color: ${COLORS.bg};
    box-shadow: 0 0 5px 0px rgba(0, 0, 0, 0.1);
  }

  .handle {
    background-color: ${COLORS.bgHandle};
  }
`;

export const Header = styled.header`
  height: 100px;
  width: 95%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;

  .left-section {
    margin-left: 10px;

    .title-wrapper {
      display: flex;
      align-items: center;
      gap: 15px;

      h3 {
        margin: 0;
      }

      .icon-btn {
        cursor: pointer;
      }
    }

    .description {
      font-size: 1em;
      margin-top: 5px;
    }
  }
`;
