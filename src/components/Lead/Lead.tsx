import { Handle, Position } from "@xyflow/react";
import { BsPersonPlus, BsX } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setEdges, setNodes } from "../../reducers/nodesSlice";
import { RootState } from "../../store";
import { spaceBetweenEmailNode } from "../../utils/Constants";
import { NodeType } from "../../utils/Types";
import { spaceBetweenLeadNode } from "./AddLeadModal";
import { Wrapper } from "./LeadStyles";

const getTitle = (type: string) => {
  switch (type) {
    case "lead":
      return "Leads from";
    case "email":
      return "Email";
    case "delay":
      return "Delay";
    default:
      return "Leads from";
  }
};

const getSubText = (type: string) => {
  switch (type) {
    case "email":
      return "Template : ";
    case "delay":
      return "Wait";
    default:
      return "";
  }
};

const Lead = ({ data, id, type }: NodeType) => {
  const { label, icBg, icBorder, icColor } = data;

  const { nodes, edges } = useSelector((state: RootState) => state.nodes);
  const dispatch = useDispatch();

  const onDelete = () => {
    // removing node
    const updatedNodes = nodes.filter((node) => node.id !== id);
    const removedNodeIndex = nodes.findIndex((node) => node.id === id);

    // aligning node in the flowchart
    const alignedNodes = updatedNodes.map((node, currentNodeIndex) => {
      if (
        type === "lead" &&
        (node.type === "addLead" || node.type === "lead") &&
        currentNodeIndex < removedNodeIndex
      ) {
        return {
          ...node,
          position: {
            ...node.position,
            x: node.position.x - spaceBetweenLeadNode,
          },
        };
      } else if (
        (type === "email" || type === "delay") &&
        (node.type === "email" || node.type === "delay") &&
        currentNodeIndex >= removedNodeIndex
      ) {
        return {
          ...node,
          position: {
            ...node.position,
            y: node.position.y - spaceBetweenEmailNode,
          },
        };
      } else if (type !== "lead" && node.type === "addBlock") {
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
        <p className="title">{getTitle(type)}</p>
        <p className="leads-label">
          {getSubText(type)} <span>{label}</span>
        </p>
      </div>

      <div className="actions-wrapper">
        <BsX className="delete" size={15} onClick={onDelete} />
      </div>
      <Handle type="source" position={Position.Bottom} className="handle" />
    </Wrapper>
  );
};

export default Lead;
