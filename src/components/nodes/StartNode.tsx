import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import type { StartNodeData } from '../../types/nodes';

interface Props {
  data: StartNodeData;
  selected?: boolean;
}

export const StartNode: React.FC<Props> = ({ data, selected }) => {
  const [hovered, setHovered] = useState(false);
  const elevate = selected || hovered;
  return (
    <div style={{
      padding: '16px 26px',
      borderRadius: '50px',
      border: '2.5px solid #22c55e',
      background: 'linear-gradient(135deg, #ecfdf3 0%, #dcfce7 100%)',
      minWidth: '140px',
      textAlign: 'center',
      boxShadow: elevate ? '0 14px 34px rgba(34, 197, 94, 0.35)' : '0 10px 28px rgba(34, 197, 94, 0.25)',
      position: 'relative',
      transform: elevate ? 'translateY(-2px) scale(1.01)' : 'translateY(0) scale(1)',
      transition: 'transform 0.15s ease, box-shadow 0.15s ease',
      borderColor: elevate ? '#16a34a' : '#22c55e'
    }}
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
    >
      <div style={{ fontWeight: 'bold', color: '#166534', fontSize: '14px' }}>
        {data.title}
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
