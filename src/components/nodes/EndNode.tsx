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
      boxShadow: elevate ? '0 20px 46px 0 rgba(239,68,68,0.19), 0 1.2px 11px #ef444488' : '0 6px 17px rgba(239,68,68,0.12)',
      position: 'relative',
      transition: 'transform 0.23s cubic-bezier(0.44,0,0.56,1), box-shadow 0.20s',
      transform: elevate ? 'translateY(-2px) scale(1.022)' : 'translateY(0) scale(1)',
      borderColor: elevate ? '#dc2626' : '#ef4444',
      animation: 'fadeGrow 0.38s cubic-bezier(.32,0,.67,0) 1',
      outline: selected ? '2.5px solid #fca5a5' : undefined,
      zIndex: elevate ? 3 : 2
    }}
    aria-label={data.title}
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
         {data.title}
      </div>
      
      {data.summaryFlag && (
        <div style={{ fontSize: '11px', color: '#666', marginTop: '5px' }}>
           Summary enabled
        </div>
      )}
      
      {/* NO source handle - End node only has target */}
    </div>
  );
};
