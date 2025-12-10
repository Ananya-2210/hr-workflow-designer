import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import type { EndNodeData } from '../../types/nodes';

interface Props {
  data: EndNodeData;
  selected?: boolean;
}

export const EndNode: React.FC<Props> = ({ data, selected }) => {
  const [hovered, setHovered] = useState(false);
  const elevate = selected || hovered;
  return (
    <div style={{
      padding: '16px 26px',
      borderRadius: '50px',
      border: '2.5px solid #ef4444',
      background: 'linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%)',
      minWidth: '140px',
      textAlign: 'center',
      boxShadow: elevate ? '0 14px 32px rgba(239, 68, 68, 0.3)' : '0 10px 28px rgba(239, 68, 68, 0.25)',
      position: 'relative',
      transition: 'transform 0.15s ease, box-shadow 0.15s ease',
      transform: elevate ? 'translateY(-2px) scale(1.01)' : 'translateY(0) scale(1)',
      borderColor: elevate ? '#dc2626' : '#ef4444'
    }}
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
    >
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
