import { memo } from "react";
import { Wrapper } from "./AddLeadStyles";
import { BsPlus } from "react-icons/bs";

const AddLead = () => {
  return (
    <Wrapper className="node flex-center">
      <BsPlus size={25} />
      <p>Add Lead Source</p>
      <span>Click to add leads from List or CRM</span>
    </Wrapper>
  );
};

export default memo(AddLead);
