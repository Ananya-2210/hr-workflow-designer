import React from 'react';
import { Handle, Position } from 'reactflow';
import type { AutomatedStepNodeData } from '../../types/nodes';

interface Props {
  data: AutomatedStepNodeData;
}

export const AutomatedStepNode: React.FC<Props> = ({ data }) => {
  return (
    <div style={{
      padding: '15px 20px',
      borderRadius: '8px',
      border: '2px solid #9C27B0',
      backgroundColor: '#F3E5F5',
      minWidth: '180px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      position: 'relative'
    }}>
      <Handle 
        type="target" 
        position={Position.Top}
        id="target"
        style={{ 
          background: '#9C27B0',
          width: '16px',
          height: '16px',
          border: '3px solid white',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          cursor: 'crosshair'
        }} 
      />
      
      <div style={{ fontWeight: 'bold', color: '#6A1B9A', marginBottom: '8px', fontSize: '14px' }}>
        ⚙️ {data.title}
      </div>
      
      {data.actionId && (
        <div style={{ fontSize: '12px', color: '#555', marginBottom: '5px' }}>
          <strong>Action:</strong> {data.actionId.replace(/_/g, ' ')}
        </div>
      )}
      
      {data.parameters && Object.keys(data.parameters).length > 0 && (
        <div style={{ fontSize: '11px', color: '#666', backgroundColor: '#E1BEE7', padding: '4px 8px', borderRadius: '4px', marginTop: '5px' }}>
          {Object.keys(data.parameters).length} parameter(s) set
        </div>
      )}
      
      <Handle 
        type="source" 
        position={Position.Bottom}
        id="source"
        style={{ 
          background: '#9C27B0',
          width: '16px',
          height: '16px',
          border: '3px solid white',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          cursor: 'crosshair'
        }} 
      />
    </div>
  );
};
