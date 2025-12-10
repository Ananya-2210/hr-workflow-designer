import React from 'react';
import type { ApprovalNodeData } from '../../types/nodes';

interface Props {
  data: ApprovalNodeData;
  onChange: (data: Partial<ApprovalNodeData>) => void;
}

export const ApprovalNodeForm: React.FC<Props> = ({ data, onChange }) => {
  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ 
          display: 'block', 
          marginBottom: '8px', 
          fontWeight: 600,
          fontSize: '13px',
          color: '#333'
        }}>
          Title *
        </label>
        <input
          type="text"
          value={data.title}
          onChange={(e) => onChange({ title: e.target.value })}
          style={{ 
            width: '100%', 
            padding: '10px 12px', 
            borderRadius: '6px', 
            border: '1px solid #d0d0d0',
            fontSize: '14px',
            color: '#333',
            backgroundColor: '#fff',
            boxSizing: 'border-box'
          }}
          placeholder="Enter approval title"
          required
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ 
          display: 'block', 
          marginBottom: '8px', 
          fontWeight: 600,
          fontSize: '13px',
          color: '#333'
        }}>
          Approver Role
        </label>
        <select
          value={data.approverRole || ''}
          onChange={(e) => onChange({ approverRole: e.target.value })}
          style={{ 
            width: '100%', 
            padding: '10px 12px', 
            borderRadius: '6px', 
            border: '1px solid #d0d0d0',
            fontSize: '14px',
            color: '#333',
            backgroundColor: '#fff',
            boxSizing: 'border-box'
          }}
        >
          <option value="">Select Role</option>
          <option value="Manager">Manager</option>
          <option value="HRBP">HRBP</option>
          <option value="Director">Director</option>
          <option value="VP">VP</option>
          <option value="CEO">CEO</option>
        </select>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ 
          display: 'block', 
          marginBottom: '8px', 
          fontWeight: 600,
          fontSize: '13px',
          color: '#333'
        }}>
          Auto-Approve Threshold
        </label>
        <input
          type="number"
          value={data.autoApproveThreshold || ''}
          onChange={(e) => onChange({ autoApproveThreshold: parseInt(e.target.value) || undefined })}
          style={{ 
            width: '100%', 
            padding: '10px 12px', 
            borderRadius: '6px', 
            border: '1px solid #d0d0d0',
            fontSize: '14px',
            color: '#333',
            backgroundColor: '#fff',
            boxSizing: 'border-box'
          }}
          placeholder="e.g., 5000"
        />
        <small style={{ 
          color: '#666', 
          fontSize: '12px',
          display: 'block',
          marginTop: '5px'
        }}>
          Auto-approve if amount is below this threshold
        </small>
      </div>
    </div>
  );
};
