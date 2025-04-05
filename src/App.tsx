import {
  addEdge,
  Connection,
  Controls,
  MiniMap,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useEffect, useState } from "react";
import "./App.css";
import {
  dropDownMenuItems,
  initialEdges,
  initialNodes,
} from "./utils/Constants";
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
import AddSourceModal from "./components/SourceModal/AddSourceModal";
import AddBlockModal from "./components/BlockModal/AddBlockModal";
import AddLeadModal from "./components/Lead/AddLeadModal";

const nodeTypes = {
  addLead: AddLead,
  plainText: PlainText,
  lead: Lead,
  addBlock: AddBlock,
};

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

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

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    showModal();
  }, []);

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
            menu={{ items: dropDownMenuItems, onClick: onMenuClick }}
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

      {/* <AddSourceModal
        open={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
      /> */}

      {/* <AddBlockModal
        open={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
      /> */}
      <AddLeadModal
        open={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </Wrapper>
  );
}

export default App;
