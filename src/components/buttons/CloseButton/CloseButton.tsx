import { FC } from "react";
import { X } from "lucide-react"; // иконка крестика
import styles from "./CloseButton.module.css";

type CloseButtonProps = {
  onClick?: () => void;
  label?: string;
};

export const CloseButton: FC<CloseButtonProps> = ({ onClick, label = "Закрыть" }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      <span>{label}</span>
      <X size={20} />
    </button>
  );
};