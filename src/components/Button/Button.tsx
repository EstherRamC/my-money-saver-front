import React from "react";
import { IButton } from "./types";

const Button: React.FC<IButton> = ({
  text,
  bold,
  baseColor,
  image,
  icon,
  onClick,
}) => {
  return (
    <button
      className={`btn-${baseColor}${bold ? "-bold" : ""} ${text ? "pr-4" : ""} ${image && text ? "pl-0" : ""} ${!image && !icon ? "pl-4 py-2" : ""}`}
      onClick={onClick}
    >
      <div
        className={`flex items-center ${baseColor !== "transparent" ? "text-white" : "text-black"}`}
      >
        {icon && <span className="mr-2">{icon}</span>}
        {image && (
          <img
            alt={image}
            style={
              baseColor === "transparent" ? {} : { filter: "invert(100%)" }
            }
          />
        )}
        {text}
      </div>
    </button>
  );
};

export default Button;
