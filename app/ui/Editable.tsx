import React from "react";

export type EditableContextType = {
  isEditing: boolean;
  onUpdate: (path: string, value: string) => void;
};

export const EditableContext = React.createContext<EditableContextType | null>(
  null
);

interface EditableProps {
  "data-path": string;
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export function Editable({
  "data-path": dataPath,
  children,
  className,
  as: Component = "span",
}: EditableProps) {
  const context = React.useContext(EditableContext);

  if (!context || !context.isEditing) {
    return <Component className={className}>{children}</Component>;
  }

  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    context.onUpdate(dataPath, e.currentTarget.innerText);
  };

  return (
    <Component
      contentEditable
      suppressContentEditableWarning
      onBlur={handleBlur}
      className={`outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:bg-white/20 rounded-sm p-1 cursor-text hover:ring-2 hover:ring-dashed hover:ring-indigo-400 transition-all ${className}`}
    >
      {children}
    </Component>
  );
}