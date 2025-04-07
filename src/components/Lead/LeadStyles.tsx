import styled from "styled-components";
import { COLORS } from "../../utils/Colors";

export const Wrapper = styled.div<{
  icBg?: string;
  icColor?: string;
  icBorder?: string;
}>`
  padding: 15px;
  display: flex;
  gap: 10px;
  cursor: default;

  &:hover {
    .actions-wrapper {
      visibility: visible;
    }
  }

  .left {
    flex-grow: 1;
    align-items: start;

    .icon-wrapper {
      background-color: ${(props) => props.icBg || COLORS.leadUserBg};
      padding: 5px 2px;
      width: 40px;
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

    .title {
      font-size: 0.9rem;
      font-weight: 500;
    }

    .leads-label {
      font-size: 0.9rem;
      text-align: start;

      span {
        color: ${(props) => props.icColor || COLORS.leadUserIcon};
      }
    }
  }

  .actions-wrapper {
    display: flex;
    gap: 10px;
    position: absolute;
    top: -12px;
    right: -8px;
    visibility: hidden;

    .edit {
      background-color: #fff7b1;
      padding: 5px;
      border-radius: 3px;
      color: #a39515;
      cursor: pointer;
    }

    .delete {
      background-color: ${COLORS.leadUserBg};
      padding: 5px;
      border-radius: 3px;
      color: ${COLORS.leadUserIcon};
      cursor: pointer;
    }
  }
`;
