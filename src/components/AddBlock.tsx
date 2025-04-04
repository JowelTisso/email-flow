import styled from "styled-components";
import { BsPlusLg } from "react-icons/bs";

const Wrapper = styled.div`
  width: 30px;
  height: 30px;
  border: 2px solid #06a5fc;
  border-radius: 5px;

  .icon {
    color: #06a5fc;
  }
`;

const AddBlock = () => {
  return (
    <Wrapper className="flex-center">
      <BsPlusLg className="icon" size={18} />
    </Wrapper>
  );
};

export default AddBlock;
