import { ReactNode } from "react";

export interface IButton {
  text?: string;
  bold?: boolean;
  baseColor: string;
  image?: string;
  icon?: ReactNode; 
  onClick: () => void;
}
