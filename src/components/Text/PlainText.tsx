import { Handle, Position } from "@xyflow/react";
import { Wrapper } from "./PlainTextStyles";
import { NodeType } from "../../utils/Types";

const PlainText = ({ data: { label } }: NodeType) => {
  return (
    <Wrapper className="node flex-center">
      <Handle type="target" position={Position.Top} className="handle" />
      {label}
      <Handle type="source" position={Position.Bottom} className="handle" />
    </Wrapper>
  );
};

export default PlainText;
