import {
  addEdge,
  Controls,
  MiniMap,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback } from "react";
import "./App.css";
import { initialEdges, initialNodes } from "./utils/Constants";
import { Header, Wrapper } from "./styles";
import {
  BsPencil,
  BsChevronDown,
  BsFillRocketTakeoffFill,
} from "react-icons/bs";
import { Dropdown, MenuProps } from "antd";
import AddLead from "./components/Lead/AddLead";
import PlainText from "./components/Text/PlainText";
import Lead from "./components/Lead/Lead";
import AddBlock from "./components/AddBlock";
import { v4 as uuid } from "uuid";

const nodeTypes = {
  addLead: AddLead,
  plainText: PlainText,
  lead: Lead,
  addBlock: AddBlock,
};

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const items = [
    {
      key: "1",
      label: "Save and Paused",
    },
  ];

  const onMenuClick: MenuProps["onClick"] = (e) => {
    console.log("click", e);
  };

  const addLeadNode = () => {
    const spaceBetweenLeadNode = 230;

    const newLeadNode = {
      id: uuid(),
      type: "lead",
      position: { x: 420, y: 120 },
      data: { label: "Sample List (Added by SalesBlink)" },
      draggable: false,
    };

    setNodes((prev) => {
      const alignNodes = prev.map((node) => {
        if (node.type === "addLead" || node.type === "lead") {
          return {
            ...node,
            position: {
              ...node.position,
              x: node.position.x + spaceBetweenLeadNode,
            },
          };
        }

        return node;
      });

      return [...alignNodes, newLeadNode];
    });
  };

  return (
    <Wrapper className="flex-center">
      <Header>
        <div className="left-section">
          <div className="title-wrapper">
            <h3>Signal: Job Posting</h3>
            <BsPencil
              className="icon-btn"
              onClick={() => {
                console.log("edit");
              }}
            />
          </div>
          <p className="description">
            Click on a block to configure and add it in sequence.
          </p>
        </div>
        <div className="right-section">
          <Dropdown.Button
            type="primary"
            size="large"
            className="btn-action"
            menu={{ items, onClick: onMenuClick }}
            onClick={addLeadNode}
            icon={<BsChevronDown />}
          >
            <BsFillRocketTakeoffFill size={18} className="btn-icon" />
            Save & Schedule
          </Dropdown.Button>
        </div>
      </Header>
      <div className="flowchart">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          panOnScroll={true}
          nodeTypes={nodeTypes}
        >
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
    </Wrapper>
  );
}

export default App;
