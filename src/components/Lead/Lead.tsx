import { Handle, Position } from "@xyflow/react";
import { Wrapper } from "./LeadStyles";
import { BsPersonPlus } from "react-icons/bs";
import { BsX, BsPencilSquare } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setEdges, setNodes } from "../../reducers/nodesSlice";
import { spaceBetweenLeadNode } from "./AddLeadModal";
import { spaceBetweenEmailNode } from "../ColdEmail/ColdEmailModal";
import { NodeType } from "../../utils/Types";

const Lead = ({ data, id, type }: NodeType) => {
  const { label, icBg, icBorder, icColor } = data;

  const { nodes, edges } = useSelector((state: RootState) => state.nodes);
  const dispatch = useDispatch();

  const onDelete = () => {
    // removing node
    const updatedNodes = nodes.filter((node) => node.id !== id);
    const removedNodeIndex = nodes.findIndex((node) => node.id === id);

    // aligning node in the flowchart
    const alignedNodes = updatedNodes.map((node, i) => {
      if (
        type === "lead" &&
        (node.type === "addLead" || node.type === "lead") &&
        i < removedNodeIndex
      ) {
        return {
          ...node,
          position: {
            ...node.position,
            x: node.position.x - spaceBetweenLeadNode,
          },
        };
      } else if (
        type === "email" &&
        (node.type === "addBlock" || node.type === "email") &&
        i < removedNodeIndex
      ) {
        return {
          ...node,
          position: {
            ...node.position,
            y: node.position.y - spaceBetweenEmailNode,
          },
        };
      } else {
        return node;
      }
    });

    dispatch(setNodes(alignedNodes));

    // removing edge
    const updatedEdges = edges.filter((edge) => edge.source !== id);
    const removedEdge = edges.find((edge) => edge.source === id);

    if (removedEdge) {
      const reconnectEdges = updatedEdges.map((edge) => {
        if (edge.target === id) {
          return {
            ...edge,
            target: removedEdge.target,
          };
        }
        return edge;
      });

      dispatch(setEdges(reconnectEdges));
    }
  };

  return (
    <Wrapper className="node" icBg={icBg} icColor={icColor} icBorder={icBorder}>
      <Handle type="target" position={Position.Top} className="handle" />
      <div className="left flex-center">
        <div className="icon-wrapper flex-center">
          <BsPersonPlus className="user-icon" size={30} />
        </div>
      </div>
      <div className="right">
        <p className="title">Leads from </p>
        <p className="leads-label">{label}</p>
      </div>

      <div className="actions-wrapper">
        <BsPencilSquare className="edit" />
        <BsX className="delete" size={15} onClick={onDelete} />
      </div>
      <Handle type="source" position={Position.Bottom} className="handle" />
    </Wrapper>
  );
};

export default Lead;
