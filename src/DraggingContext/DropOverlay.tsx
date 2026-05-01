import type { CSSProperties, ReactNode } from "react";
import { useDroppable } from "@dnd-kit/react";
import { useIsDragging } from "./useIsDragging";
import clsx from "clsx";

type Props = {
  dropId: string;
  show: boolean;
  data?: Record<string, any>;
  background: string;
  textShadowColor: string;
  children: ReactNode;
  className?: string;
};

export function DropOverlay({ dropId, show, data, background, textShadowColor, children, className }: Props) {
  const { isDragging } = useIsDragging();
  const { ref } = useDroppable({
    id: dropId,
    data,
    disabled: !show,
  });

  return (
    <div
      ref={ref}
      className={clsx(
        className,
        "absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center z-10 transition-opacity text-4xl",
      )}
      style={{
        opacity: isDragging && show ? 1 : 0,
        pointerEvents: isDragging && show ? "all" : "none",
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 bottom-0 opacity-80 starting:opacity-0 transition-opacity"
        style={{ background: background }}
      />
      <p
        className="relative font-bold p-1 rounded-lg text-white text-shadow-md"
        style={
          {
            "--tw-text-shadow-color": `color-mix(in oklab, var(${textShadowColor}) var(--tw-text-shadow-alpha), transparent)`,
          } as CSSProperties
        }
      >
        {children}
      </p>
    </div>
  );
}
