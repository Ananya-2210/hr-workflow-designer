import React from 'react';
import { Handle, Position } from 'reactflow';
import type { ApprovalNodeData } from '../../types/nodes';

interface Props {
  data: ApprovalNodeData;
}

export const ApprovalNode: React.FC<Props> = ({ data }) => {
  return (
    <div style={{
      padding: '15px 20px',
      borderRadius: '8px',
      border: '2px solid #FF9800',
      backgroundColor: '#FFF3E0',
      minWidth: '180px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      position: 'relative'
    }}>
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
        ✅ {data.title}
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
