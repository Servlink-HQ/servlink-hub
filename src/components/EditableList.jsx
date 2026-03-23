import React from "react";
import { useGlobalContent } from "../contexts/GlobalContentContext";
import { EditableText } from "./EditableText";

export const EditableList = ({ listPath, renderItem, emptyText = "Sem itens" }) => {
  const { data, updateData, isEditMode, generateId } = useGlobalContent();
  
  // get list
  const list = listPath.split('.').reduce((acc, part) => acc && acc[part], data) || [];

  const handleAdd = () => {
    const newItem = { id: generateId(), text: "Novo item" };
    // special handling for some items, but generally:
    updateData(listPath, [...list, newItem]);
  };

  const handleRemove = (idToRemove) => {
    updateData(listPath, list.filter(item => item.id !== idToRemove));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1, position: "relative" }}>
      {list.length === 0 && <div style={{ fontSize: 12, color: "#A3A3A3" }}>{emptyText}</div>}
      {list.map((item, index) => (
        <div key={item.id} style={{ display: "flex", alignItems: "baseline", gap: 8, position: "relative", group: "true" }}>
          {renderItem(item, index)}
          
          {isEditMode && (
            <button 
              onClick={() => handleRemove(item.id)}
              style={{
                background: "rgba(220, 0, 0, 0.1)", color: "red", border: "none", borderRadius: "50%",
                width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", fontSize: 10, marginLeft: "auto", flexShrink: 0
              }}
              title="Remover Item"
            >
              ✕
            </button>
          )}
        </div>
      ))}
      {isEditMode && (
        <button 
          onClick={handleAdd}
          style={{
            marginTop: 4, padding: "4px 8px", fontSize: 11, background: "rgba(0,0,0,0.05)",
            border: "1px dashed #A3A3A3", borderRadius: 4, color: "#666",
            cursor: "pointer", fontFamily: "var(--font-mono)", transition: "0.2s",
            alignSelf: "flex-start"
          }}
        >
          + Adicionar Item
        </button>
      )}
    </div>
  );
};
