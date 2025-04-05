import { BsPersonPlus } from "react-icons/bs";
import MainModal from "../ModalWrapper/MainModal";
import { SourceCardWrapper } from "./AddSourceStyles";
import { ModalProps, SourceProps } from "../../utils/Types";
import { useDispatch } from "react-redux";
import { toggleLeadModal, toggleSourceModal } from "../../reducers/mainSlice";

export const SourceCard = ({
  title,
  description,
  onClick,
  icon: Icon,
  icBg,
  icColor,
  icBorder,
}: SourceProps) => {
  return (
    <SourceCardWrapper
      className="node flex-center"
      onClick={onClick}
      icBg={icBg}
      icColor={icColor}
      icBorder={icBorder}
    >
      <div className="left flex-center">
        <div className="icon-wrapper flex-center">{Icon}</div>
      </div>
      <div className="right">
        <p className="title">{title}</p>
        <p className="desc">{description}</p>
      </div>
    </SourceCardWrapper>
  );
};

const AddSourceModal = ({ open, handleOk, handleCancel }: ModalProps) => {
  const dispatch = useDispatch();

  const sourceList = [
    {
      title: "Leads from List(s)",
      description: "Connect multiple lists as source for this sequence.",
      onClick: () => {
        dispatch(toggleLeadModal());
        dispatch(toggleSourceModal());
      },
      icon: <BsPersonPlus className="user-icon" size={35} />,
    },
    {
      title: "Segment by Events",
      description:
        "Create a segment of leads who have engaged with emails previously.",
      icon: <BsPersonPlus className="user-icon" size={35} />,
    },
    {
      title: "Segment of List",
      description:
        "Create a segment of leads which match SalesBlink Variables.",
      icon: <BsPersonPlus className="user-icon" size={35} />,
    },
    {
      title: "Lead from CRM Integration",
      description:
        "Create a segment of leads who have engaged with emails previously.",
      icon: <BsPersonPlus className="user-icon" size={35} />,
    },
  ];
  return (
    <MainModal
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      title="Add a Source Block"
      description="Pick a block & configure, any new leads that match rules will be added
        to sequence automatically."
    >
      <h2>Sources</h2>
      <div className="cards-wrapper">
        {sourceList.map((props) => (
          <SourceCard {...props} />
        ))}
      </div>
    </MainModal>
  );
};

export default AddSourceModal;
