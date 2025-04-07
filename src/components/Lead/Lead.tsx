import { Handle, Position } from "@xyflow/react";
import { Wrapper } from "./LeadStyles";
import { BsPersonPlus } from "react-icons/bs";
import { BsX, BsPencilSquare } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setEdges, setNodes } from "../../reducers/nodesSlice";
import { spaceBetweenLeadNode } from "./AddLeadModal";
import { NodeType } from "../../utils/Types";
import { spaceBetweenEmailNode } from "../../utils/Constants";

const Lead = ({ data, id, type }: NodeType) => {
  const { label, icBg, icBorder, icColor } = data;

  const { nodes, edges } = useSelector((state: RootState) => state.nodes);
  const dispatch = useDispatch();

  const onDelete = () => {
    // removing node
    const updatedNodes = nodes.filter((node) => node.id !== id);
    const removedNodeIndex = nodes.findIndex((node) => node.id === id);

    console.log(nodes);

    console.log(updatedNodes);

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
        (type === "email" || type === "delay") &&
        (node.type === "email" || node.type === "delay") &&
        i >= removedNodeIndex
      ) {
        return {
          ...node,
          position: {
            ...node.position,
            y: node.position.y - spaceBetweenEmailNode,
          },
        };
      } else if (node.type === "addBlock") {
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
        <BsPencilSquare className="edit" />
        <BsX className="delete" size={15} onClick={onDelete} />
      </div>
      <Handle type="source" position={Position.Bottom} className="handle" />
    </Wrapper>
  );
};

export default Lead;
