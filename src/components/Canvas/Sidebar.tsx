import React from 'react';
import { useWorkflow } from '../../context/WorkflowContext';
import type { NodeType } from '../../types/nodes';
import { FiPlayCircle, FiCheckCircle, FiClock, FiZap, FiFlag } from 'react-icons/fi';

const nodeTypes = [
  { type: 'start', label: 'Start', color: '#4CAF50', icon: <FiPlayCircle size={18} style={{marginRight:8}} /> },
  { type: 'task', label: 'Task', color: '#2196F3', icon: <FiClock size={18} style={{marginRight:8}} /> },
  { type: 'approval', label: 'Approval', color: '#FF9800', icon: <FiCheckCircle size={18} style={{marginRight:8}} /> },
  { type: 'automated', label: 'Automated', color: '#9C27B0', icon: <FiZap size={18} style={{marginRight:8}} /> },
  { type: 'end', label: 'End', color: '#F44336', icon: <FiFlag size={18} style={{marginRight:8}} /> }
];

export const Sidebar: React.FC = () => {
  const { addNode } = useWorkflow();
  const [fade, setFade] = React.useState(false);
  React.useEffect(() => {
    setTimeout(() => setFade(true), 50);
  }, []);

  const handleAddNode = (type: NodeType) => {
    addNode(type);
  };

  return (
    <div className="sidebar-inner" style={{ opacity: fade ? 1 : 0, transition: 'opacity 0.55s cubic-bezier(.32,0,.67,0)' }}>
      <div className="sidebar-header">
        <p className="sidebar-title" style={{ fontSize: 21, letterSpacing: 0.5 }}>Workflow Nodes</p>
        <p className="sidebar-subtitle" style={{ fontSize: 13 }}>Drag or click to add</p>
      </div>
      <div className="sidebar-list">
        {nodeTypes.map((node) => (
          <button
            key={node.type}
            className="sidebar-item"
            style={{ background: node.color, position: 'relative', display: 'flex', alignItems: 'center', fontSize: 15 }}
            draggable
            onDragStart={(event) => {
              event.dataTransfer.setData('application/reactflow', node.type);
              event.dataTransfer.effectAllowed = 'move';
            }}
            onClick={() => handleAddNode(node.type)}
            tabIndex={0}
            aria-label={`Add ${node.label} node`}
          >
            {node.icon}
            <span>{node.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
