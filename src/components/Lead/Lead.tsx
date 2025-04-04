import { Handle, Position } from "@xyflow/react";
import { Wrapper } from "./LeadStyles";
import { BsPersonPlus } from "react-icons/bs";
import { BsX, BsPencilSquare } from "react-icons/bs";

const Lead = ({ data: { label } }) => {
  return (
    <Wrapper className="node">
      <Handle type="target" position={Position.Top} className="handle" />
      <div className="left flex-center">
        <div className="icon-wrapper flex-center">
          <BsPersonPlus className="user-icon" size={30} />
        </div>
      </div>
      <div className="right">
        <p className="title">Leads from</p>
        <p className="leads-label">{label}</p>
      </div>

      <div className="actions-wrapper">
        <BsPencilSquare className="edit" />
        <BsX className="delete" size={15} />
      </div>
      <Handle type="source" position={Position.Bottom} className="handle" />
    </Wrapper>
  );
};

export default Lead;
