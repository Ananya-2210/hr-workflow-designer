import React from 'react';
import { useWorkflow } from '../../context/WorkflowContext';

const nodeTypes = [
  { type: 'start', label: 'Start', color: '#4CAF50' },  // Shortened labels
  { type: 'task', label: 'Task', color: '#2196F3' },
  { type: 'approval', label: 'Approval', color: '#FF9800' },
  { type: 'automated', label: 'Automated', color: '#9C27B0' },
  { type: 'end', label: 'End', color: '#F44336' }
];

export const Sidebar: React.FC = () => {
  const { addNode } = useWorkflow();

  const handleAddNode = (type: string) => {
    console.log('Adding node:', type);
    addNode(type);
  };

  return (
    <div style={{ 
      width: '100%',
      height: '100%',
      padding: '15px 10px',  // Reduced padding
      backgroundColor: '#2c2c2c',
      boxSizing: 'border-box'
    }}>
      <h3 style={{ 
        color: 'white', 
        marginBottom: '15px',
        marginTop: '0',
        fontSize: '16px',
        textAlign: 'center'
      }}>
        Nodes
      </h3>
      {nodeTypes.map((node) => (
        <div
          key={node.type}
          onClick={() => handleAddNode(node.type)}
          style={{
            padding: '10px 8px',
            margin: '8px 0',
            backgroundColor: node.color,
            color: 'white',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '500',
            fontSize: '13px',
            transition: 'transform 0.2s',
            userSelect: 'none',
            textAlign: 'center'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          {node.label}
        </div>
      ))}
    </div>
  );
};
