import styled from "styled-components";
import { COLORS } from "../../utils/Colors";

export const SourceCardWrapper = styled.div<{
  icBg?: string;
  icColor?: string;
  icBorder?: string;
}>`
  height: 100px;
  width: 99%;
  border-radius: 5px;
  border: 1px solid #d4d4d4;
  box-shadow: 0 0 1px 0px rgba(0, 0, 0, 0.1);

  .left {
    flex-grow: 1;
    align-items: start;

    .icon-wrapper {
      background-color: ${(props) => props.icBg || COLORS.leadUserBg};
      padding: 8px 2px;
      width: 50px;
      border-radius: 5px;
      border: 2px solid ${(props) => props.icBorder || COLORS.leadUserBorder};
    }

    .user-icon {
      color: ${(props) => props.icColor || COLORS.leadUserIcon};
    }
  }

  .right {
    flex-grow: 2;
    display: flex;
    flex-direction: column;
    align-items: start;
    max-width: 75%;

    .title {
      font-size: 1.2rem;
      font-weight: 600;
    }

    .desc {
      font-size: 0.9rem;
      text-align: start;
    }
  }

  &:hover {
    background-color: ${COLORS.flowbg};
    cursor: pointer;
  }
`;
