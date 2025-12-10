import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import type { ApprovalNodeData } from '../../types/nodes';

interface Props {
  data: ApprovalNodeData;
  selected?: boolean;
}

export const ApprovalNode: React.FC<Props> = ({ data, selected }) => {
  const [hovered, setHovered] = useState(false);
  const elevate = selected || hovered;
  return (
    <div style={{
      padding: '16px 20px',
      borderRadius: '18px',
      border: '2.5px solid #fb923c',
      background: 'linear-gradient(135deg, #fff7ed 0%, #fff1e0 100%)',
      minWidth: '220px',
      boxShadow: elevate ? '0 20px 46px 0 rgba(251,146,60,0.18), 0 1.2px 14px #fb923c44' : '0 7px 19px rgba(251,146,60,0.14)',
      position: 'relative',
      transition: 'transform 0.23s cubic-bezier(0.44,0,0.56,1), box-shadow 0.20s',
      transform: elevate ? 'translateY(-3px) scale(1.018)' : 'translateY(0) scale(1)',
      borderColor: elevate ? '#f97316' : '#fb923c',
      animation: 'fadeGrow 0.37s cubic-bezier(.32,0,.67,0) 1',
      outline: selected ? '2.5px solid #fdba74' : undefined,
      zIndex: elevate ? 3 : 2
    }}
    aria-label={data.title}
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
    >
      <Handle 
        type="target" 
        position={Position.Top}
        id="target"
        style={{ 
          background: '#FF9800',
          width: '16px',
          height: '16px',
          border: '3px solid white',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          cursor: 'crosshair'
        }} 
      />
      
      <div style={{ fontWeight: 'bold', color: '#E65100', marginBottom: '8px', fontSize: '14px' }}>
         {data.title}
      </div>
      
      {data.approverRole && (
        <div style={{ fontSize: '12px', color: '#555', marginBottom: '5px' }}>
          <strong>Approver:</strong> {data.approverRole}
        </div>
      )}
      
      {data.autoApproveThreshold !== undefined && (
        <div style={{ fontSize: '11px', color: '#666', backgroundColor: '#FFE0B2', padding: '4px 8px', borderRadius: '4px', marginTop: '5px' }}>
          Auto-approve: &lt; {data.autoApproveThreshold}
        </div>
      )}
      
      <Handle 
        type="source" 
        position={Position.Bottom}
        id="source"
        style={{ 
          background: '#FF9800',
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
