import React from 'react';
import { useWorkflow } from '../../context/WorkflowContext';
import { StartNodeForm } from './StartNodeForm';
import { TaskNodeForm } from './TaskNodeForm';
import { ApprovalNodeForm } from './ApprovalNodeForm';
import { AutomatedStepNodeForm } from './AutomatedStepNodeForm';
import { EndNodeForm } from './EndNodeForm';

export const NodeEditorPanel: React.FC = () => {
  const { nodes, selectedNode, updateNodeData } = useWorkflow();

  const currentNode = nodes.find((n) => n.id === selectedNode);

  if (!currentNode) {
    return (
      <div style={{ 
        width: '100%',
        height: '100%',
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <p style={{ 
          color: '#999', 
          fontSize: '14px',
          textAlign: 'center'
        }}>
          Select a node to edit its properties
        </p>
      </div>
    );
  }

  const handleChange = (data: any) => {
    updateNodeData(currentNode.id, data);
  };

  const renderForm = () => {
    switch (currentNode.data.type) {
      case 'start':
        return <StartNodeForm data={currentNode.data} onChange={handleChange} />;
      case 'task':
        return <TaskNodeForm data={currentNode.data} onChange={handleChange} />;
      case 'approval':
        return <ApprovalNodeForm data={currentNode.data} onChange={handleChange} />;
      case 'automated':
        return <AutomatedStepNodeForm data={currentNode.data} onChange={handleChange} />;
      case 'end':
        return <EndNodeForm data={currentNode.data} onChange={handleChange} />;
      default:
        return <p>Unknown node type</p>;
    }
  };

  return (
    <div style={{ width: '100%', minHeight: '100%' }}>
      {/* Header */}
      <div style={{
        padding: '15px 20px',
        borderBottom: '1px solid #e0e0e0',
        backgroundColor: '#f8f9fa',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <h3 style={{ 
          margin: 0, 
          fontSize: '16px',
          color: '#333',
          fontWeight: 600
        }}>
          Node Properties
        </h3>
        <p style={{
          margin: '5px 0 0 0',
          fontSize: '12px',
          color: '#666'
        }}>
          {currentNode.data.type.charAt(0).toUpperCase() + currentNode.data.type.slice(1)} Node
        </p>
      </div>
      
      {/* Form Content */}
      {renderForm()}
    </div>
  );
};
