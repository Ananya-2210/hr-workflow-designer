import React from 'react';
import type { ApprovalNodeData } from '../../types/nodes';

interface Props {
  data: ApprovalNodeData;
  onChange: (data: Partial<ApprovalNodeData>) => void;
}

export const ApprovalNodeForm: React.FC<Props> = ({ data, onChange }) => {
  return (
    <div className="form-card">
      <div className="form-group">
        <label className="form-label">Title *</label>
        <input
          className="form-input"
          type="text"
          value={data.title}
          onChange={(e) => onChange({ title: e.target.value })}
          placeholder="Approval title"
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Approver Role</label>
        <select
          className="form-select"
          value={data.approverRole || ''}
          onChange={(e) => onChange({ approverRole: e.target.value })}
        >
          <option value="">Select role</option>
          <option value="Manager">Manager</option>
          <option value="HRBP">HRBP</option>
          <option value="Director">Director</option>
          <option value="VP">VP</option>
          <option value="CEO">CEO</option>
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Auto-Approve Threshold</label>
        <input
          className="form-input"
          type="number"
          value={data.autoApproveThreshold || ''}
          onChange={(e) => onChange({ autoApproveThreshold: parseInt(e.target.value) || undefined })}
          placeholder="e.g., 5000"
        />
        <small className="muted">
          Auto-approve if amount is below this threshold
        </small>
      </div>
    </div>
  );
};
