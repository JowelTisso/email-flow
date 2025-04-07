import MainModal from "../ModalWrapper/MainModal";
import { ModalProps } from "../../utils/Types";
import { BsEnvelope, BsCheckCircle } from "react-icons/bs";
import { SourceCard } from "../SourceModal/AddSourceModal";
import { COLORS } from "../../utils/Colors";
import { useDispatch } from "react-redux";
import {
  toggleBlockModal,
  toggleColdEmailModal,
} from "../../reducers/mainSlice";
import { v4 as uuid } from "uuid";

const AddBlockModal = ({ open, handleOk, handleCancel }: ModalProps) => {
  const dispatch = useDispatch();

  const outReachList = [
    {
      id: uuid(),
      title: "Cold Email",
      description: "Send an email to a lead.",
      onClick: () => {
        dispatch(toggleColdEmailModal());
        dispatch(toggleBlockModal());
      },
      icon: <BsEnvelope className="user-icon" size={35} />,
      icBg: COLORS.sourceBg,
      icColor: COLORS.sourceIcon,
      icBorder: COLORS.sourceBorder,
    },
    {
      id: uuid(),
      title: "Task",
      description: "Schedule a manual task.",
      icon: <BsCheckCircle className="user-icon" size={35} />,
      icBg: COLORS.sourceBg,
      icColor: COLORS.sourceIcon,
      icBorder: COLORS.sourceBorder,
    },
  ];

  const conditionsList = [
    {
      id: uuid(),
      title: "Wait",
      description: "Add a delay between blocks.",
      icon: <BsCheckCircle className="user-icon" size={35} />,
      icBg: COLORS.conditionBg,
      icColor: COLORS.conditionIcon,
      icBorder: COLORS.conditionBorder,
    },
    {
      id: uuid(),
      title: "If/Else (Rules)",
      description: "Routes leads through the sequence based on events.",
      icon: <BsCheckCircle className="user-icon" size={35} />,
      icBg: COLORS.conditionBg,
      icColor: COLORS.conditionIcon,
      icBorder: COLORS.conditionBorder,
    },
    {
      id: uuid(),
      title: "Split 50/50",
      description: "Equally split contacts into two separate flows.",
      icon: <BsCheckCircle className="user-icon" size={35} />,
      icBg: COLORS.conditionBg,
      icColor: COLORS.conditionIcon,
      icBorder: COLORS.conditionBorder,
    },
  ];

  return (
    <MainModal
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      title="Add Blocks"
      description="Click on a block to configure and add it in sequence."
      height={550}
    >
      <h2>Outreach</h2>
      <div className="cards-wrapper">
        {outReachList.map((props) => (
          <SourceCard key={props.id} {...props} />
        ))}
      </div>
      <h2>Conditions</h2>
      <div className="cards-wrapper">
        {conditionsList.map((props) => (
          <SourceCard key={props.id} {...props} />
        ))}
      </div>
    </MainModal>
  );
};

export default AddBlockModal;
