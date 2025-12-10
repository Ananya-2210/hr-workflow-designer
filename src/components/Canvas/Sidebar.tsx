import React from 'react';
import { useWorkflow } from '../../context/WorkflowContext';
import type { NodeType } from '../../types/nodes';

const nodeTypes: { type: NodeType; label: string; color: string }[] = [
  { type: 'start', label: 'Start', color: '#4CAF50' },
  { type: 'task', label: 'Task', color: '#2196F3' },
  { type: 'approval', label: 'Approval', color: '#FF9800' },
  { type: 'automated', label: 'Automated', color: '#9C27B0' },
  { type: 'end', label: 'End', color: '#F44336' }
];

export const Sidebar: React.FC = () => {
  const { addNode } = useWorkflow();

  const handleAddNode = (type: NodeType) => {
    addNode(type);
  };

  return (
    <div className="sidebar-inner">
      <div className="sidebar-header">
        <p className="sidebar-title">Nodes</p>
        <p className="sidebar-subtitle">Drag or click to add</p>
      </div>
      <div className="sidebar-list">
        {nodeTypes.map((node) => (
          <button
            key={node.type}
            className="sidebar-item"
            style={{ background: node.color }}
            draggable
            onDragStart={(event) => {
              event.dataTransfer.setData('application/reactflow', node.type);
              event.dataTransfer.effectAllowed = 'move';
            }}
            onClick={() => handleAddNode(node.type)}
          >
            {node.label}
          </button>
        ))}
      </div>
    </div>
  );
};
