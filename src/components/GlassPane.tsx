import clsx from "clsx";
import React, { FC, ReactNode } from "react";

type GlassPaneProps = {
  className: string;
  children: ReactNode;
};

const GlassPane: FC<GlassPaneProps> = ({ className, children }) => {
  return (
    <div
      className={clsx(
        "glass rounded-2xl border-solid border-2 border-gray-200",
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassPane;
