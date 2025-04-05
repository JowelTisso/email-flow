import { ReactElement } from "react";
import { IconType } from "react-icons";

export type ModalProps = {
  open: boolean;
  handleOk: () => void;
  handleCancel: () => void;
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
  children: React.ReactNode;
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
  title: string;
  description: string;
};
