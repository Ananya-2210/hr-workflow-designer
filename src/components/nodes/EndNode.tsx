import React from 'react';
import { Handle, Position } from 'reactflow';
import type { EndNodeData } from '../../types/nodes';

interface Props {
  data: EndNodeData;
}

export const EndNode: React.FC<Props> = ({ data }) => {
  return (
    <div style={{
      padding: '15px 25px',
      borderRadius: '50px',
      border: '3px solid #F44336',
      backgroundColor: '#FFEBEE',
      minWidth: '120px',
      textAlign: 'center',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      position: 'relative'
    }}>
      {/* Target Handle at Top */}
      <Handle 
        type="target" 
        position={Position.Top}
        id="target"
        style={{ 
          background: '#F44336',
          width: '16px',
          height: '16px',
          border: '3px solid white',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          cursor: 'crosshair'
        }} 
      />
      
      <div style={{ fontWeight: 'bold', color: '#C62828', fontSize: '14px' }}>
        🏁 {data.title}
      </div>
      
      {data.summaryFlag && (
        <div style={{ fontSize: '11px', color: '#666', marginTop: '5px' }}>
          📊 Summary enabled
        </div>
      )}
      
      {/* NO source handle - End node only has target */}
    </div>
  );
};
