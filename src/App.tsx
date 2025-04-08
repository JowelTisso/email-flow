import { Controls, MiniMap, ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Dropdown, MenuProps, notification } from "antd";
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
import DelayModal from "./components/DelayModal/DelayModal";
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
  toggleDelayModal,
  toggleLeadModal,
  toggleSaveModal,
  toggleSourceModal,
  toggleTemplateModal,
} from "./reducers/mainSlice";
import { onConnect, onEdgesChange, onNodesChange } from "./reducers/nodesSlice";
import { RootState } from "./store";
import { Header, Wrapper } from "./styles";
import { dropDownMenuItems } from "./utils/Constants";
import { NotificationType } from "./utils/Types";
import { useEffect } from "react";

const nodeTypes = {
  addLead: AddLead,
  plainText: PlainText,
  lead: Lead,
  email: Lead,
  addBlock: AddBlock,
  delay: Lead,
};

function App() {
  const { nodes, edges } = useSelector((state: RootState) => state.nodes);

  const {
    isSourceModalOpen,
    isLeadModalOpen,
    isBlockModalOpen,
    isColdEmailModalOpen,
    isTemplateModalOpen,
    isSaveModalOpen,
    isDelayModalOpen,
  } = useSelector((state: RootState) => state.main);

  const dispatch = useDispatch();

  const onMenuClick: MenuProps["onClick"] = (e) => {
    console.log("click", e);
  };

  const handleOk = () => {
    //
  };

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (
    type: NotificationType,
    message: string,
    description: string
  ) => {
    api[type]({
      message,
      description,
    });
  };

  useEffect(() => {
    window.onbeforeunload = function () {
      return "Are you sure you want to reload the page?";
    };
  }, []);

  return (
    <>
      {contextHolder}
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
          handleCancel={() => dispatch(toggleColdEmailModal())}
        />
        <TemplateModal
          open={isTemplateModalOpen}
          handleOk={handleOk}
          handleCancel={() => dispatch(toggleTemplateModal())}
          openNotification={openNotification}
        />

        <SaveModal
          open={isSaveModalOpen}
          handleOk={handleOk}
          handleCancel={() => dispatch(toggleSaveModal())}
          openNotification={openNotification}
        />
        <DelayModal
          open={isDelayModalOpen}
          handleCancel={() => dispatch(toggleDelayModal())}
        />
      </Wrapper>
    </>
  );
}

export default App;
