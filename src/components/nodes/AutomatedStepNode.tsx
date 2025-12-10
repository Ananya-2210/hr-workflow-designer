import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import type { AutomatedStepNodeData } from '../../types/nodes';

interface Props {
  data: AutomatedStepNodeData;
  selected?: boolean;
}

export const AutomatedStepNode: React.FC<Props> = ({ data, selected }) => {
  const [hovered, setHovered] = useState(false);
  const elevate = selected || hovered;
  return (
    <div style={{
      padding: '16px 20px',
      borderRadius: '12px',
      border: '1.5px solid #a855f7',
      background: 'linear-gradient(135deg, #f5f3ff 0%, #f3e8ff 100%)',
      minWidth: '200px',
      boxShadow: elevate ? '0 18px 34px rgba(168, 85, 247, 0.24)' : '0 14px 30px rgba(168, 85, 247, 0.2)',
      position: 'relative',
      transition: 'transform 0.15s ease, box-shadow 0.15s ease',
      transform: elevate ? 'translateY(-2px) scale(1.01)' : 'translateY(0) scale(1)',
      borderColor: elevate ? '#9333ea' : '#a855f7'
    }}
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
    >
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
