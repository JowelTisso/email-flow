import { ReactElement } from "react";
export interface NodeType {
  id: string;
  type: string;
  data: {
    label: string;
    icBg?: string;
    icColor?: string;
    icBorder?: string;
    followUp?: string;
  };
  draggable: boolean;
}

export type NotificationType = "success" | "info" | "warning" | "error";

export type ModalProps = {
  open: boolean;
  handleOk?: () => void;
  handleCancel: () => void;
  openNotification?: (
    type: NotificationType,
    message: string,
    description: string
  ) => void;
};

export type SourceProps = {
  title: string;
  description: string;
  onClick?: () => void;
  icon?: ReactElement;
  icBg?: string;
  icColor?: string;
  icBorder?: string;
};

export type MainModalProps = {
  children?: React.ReactNode;
  open: boolean;
  onOk?: () => void;
  onCancel: () => void;
  title: string;
  description: string;
  top?: number;
  height?: number;
  showTooltip?: boolean;
};

export interface EmailTemplate {
  name: string;
  offer: string;
  subject: string;
  body: string;
}
