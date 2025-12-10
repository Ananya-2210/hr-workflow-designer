import React from 'react';
import { Handle, Position } from 'reactflow';
import type { StartNodeData } from '../../types/nodes';

interface Props {
  data: StartNodeData;
}

export const StartNode: React.FC<Props> = ({ data }) => {
  return (
    <div style={{
      padding: '15px 25px',
      borderRadius: '50px',
      border: '3px solid #4CAF50',
      backgroundColor: '#E8F5E9',
      minWidth: '120px',
      textAlign: 'center',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      position: 'relative'
    }}>
      {/* NO target handle - Start node only has source */}
      
      <div style={{ fontWeight: 'bold', color: '#2E7D32', fontSize: '14px' }}>
        🚀 {data.title}
      </div>
      {data.metadata && Object.keys(data.metadata).length > 0 && (
        <div style={{ fontSize: '11px', color: '#666', marginTop: '5px' }}>
          {Object.keys(data.metadata).length} metadata fields
        </div>
      )}
      
      {/* Source Handle at Bottom */}
      <Handle 
        type="source" 
        position={Position.Bottom} 
        id="source"
        style={{ 
          background: '#4CAF50',
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
