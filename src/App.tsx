import { Controls, MiniMap, ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Dropdown, MenuProps } from "antd";
import {
  BsChevronDown,
  BsFillRocketTakeoffFill,
  BsPencil,
} from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import AddBlock from "./components/AddBlock";
import AddBlockModal from "./components/BlockModal/AddBlockModal";
import ColdEmailModal from "./components/ColdEmail/ColdEmailModal";
import AddLead from "./components/Lead/AddLead";
import AddLeadModal from "./components/Lead/AddLeadModal";
import Lead from "./components/Lead/Lead";
import SaveModal from "./components/SaveModal/SaveModal";
import AddSourceModal from "./components/SourceModal/AddSourceModal";
import TemplateModal from "./components/TemplateModal/TemplateModal";
import PlainText from "./components/Text/PlainText";
import {
  toggleBlockModal,
  toggleColdEmailModal,
  toggleLeadModal,
  toggleSaveModal,
  toggleSourceModal,
  toggleTemplateModal,
} from "./reducers/mainSlice";
import { onConnect, onEdgesChange, onNodesChange } from "./reducers/nodesSlice";
import { RootState } from "./store";
import { Header, Wrapper } from "./styles";
import { dropDownMenuItems } from "./utils/Constants";

const nodeTypes = {
  addLead: AddLead,
  plainText: PlainText,
  lead: Lead,
  email: Lead,
  addBlock: AddBlock,
};

function App() {
  const { nodes, edges } = useSelector((state: RootState) => state.nodes);

  console.log(nodes);

  const {
    isSourceModalOpen,
    isLeadModalOpen,
    isBlockModalOpen,
    isColdEmailModalOpen,
    isTemplateModalOpen,
    isSaveModalOpen,
  } = useSelector((state: RootState) => state.main);

  const dispatch = useDispatch();

  const onMenuClick: MenuProps["onClick"] = (e) => {
    console.log("click", e);
  };

  const handleOk = () => {
    //
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
            className="btn-primary"
            menu={{ items: dropDownMenuItems, onClick: onMenuClick }}
            onClick={() => dispatch(toggleSaveModal())}
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

      <AddSourceModal
        open={isSourceModalOpen}
        handleOk={handleOk}
        handleCancel={() => dispatch(toggleSourceModal())}
      />

      <AddBlockModal
        open={isBlockModalOpen}
        handleOk={handleOk}
        handleCancel={() => dispatch(toggleBlockModal())}
      />
      <AddLeadModal
        open={isLeadModalOpen}
        handleOk={handleOk}
        handleCancel={() => dispatch(toggleLeadModal())}
      />
      <ColdEmailModal
        open={isColdEmailModalOpen}
        handleOk={handleOk}
        handleCancel={() => dispatch(toggleColdEmailModal())}
      />
      <TemplateModal
        open={isTemplateModalOpen}
        handleOk={handleOk}
        handleCancel={() => dispatch(toggleTemplateModal())}
      />

      <SaveModal
        open={isSaveModalOpen}
        handleOk={handleOk}
        handleCancel={() => dispatch(toggleSaveModal())}
      />
    </Wrapper>
  );
}

export default App;
