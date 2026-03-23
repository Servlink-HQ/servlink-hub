import React, { useEffect, useRef, useState } from "react";
import { useGlobalContent } from "../contexts/GlobalContentContext";

// Utility to get nested value from object path
const getNestedValue = (obj, path) => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

export const EditableText = ({ path, as: Tag = "span", className = "", style = {}, placeholder = "Digite aqui..." }) => {
  const { data, updateData, isEditMode } = useGlobalContent();
  const value = getNestedValue(data, path) || "";
  
  const [localValue, setLocalValue] = useState(value);
  const elementRef = useRef(null);

  // Sync external changes (e.g. from Discard Changes)
  useEffect(() => {
    setLocalValue(value);
    if (elementRef.current && elementRef.current.textContent !== value && !isEditMode) {
      elementRef.current.textContent = value;
    }
  }, [value, isEditMode]);

  const handleBlur = (e) => {
    const text = e.currentTarget.textContent;
    if (text !== value) {
      updateData(path, text);
    }
  };

  const editStyle = isEditMode ? {
    border: '1px dashed #A3A3A3',
    background: 'rgba(255,255,255,0.5)',
    backdropFilter: 'blur(8px)',
    borderRadius: '4px',
    padding: '2px 4px',
    minWidth: '40px',
    minHeight: '20px',
    display: Tag === 'span' ? 'inline-block' : 'block',
    outline: 'none',
    transition: 'all 0.2s',
    cursor: 'text',
    boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
  } : {
    transition: 'all 0.2s',
    border: '1px solid transparent',
    padding: '2px 4px',
    margin: '-2px -4px' // Compensate padding to avoid layout shift
  };

  if (!isEditMode) {
    return <Tag className={className} style={{...style, ...editStyle}}>{value}</Tag>;
  }

  return (
    <Tag
      ref={elementRef}
      contentEditable={isEditMode}
      suppressContentEditableWarning
      onBlur={handleBlur}
      onInput={(e) => setLocalValue(e.currentTarget.textContent)}
      className={className}
      style={{
        ...style,
        ...editStyle
      }}
      data-placeholder={placeholder}
    >
      {value}
    </Tag>
  );
};
