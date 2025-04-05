import { memo } from "react";
import { Wrapper } from "./AddLeadStyles";
import { BsPlus } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { toggleSourceModal } from "../../reducers/mainSlice";

const AddLead = () => {
  const dispatch = useDispatch();
  return (
    <Wrapper
      className="node flex-center"
      onClick={() => dispatch(toggleSourceModal())}
    >
      <BsPlus size={25} />
      <p>Add Lead Source</p>
      <span>Click to add leads from List or CRM</span>
    </Wrapper>
  );
};

export default memo(AddLead);
