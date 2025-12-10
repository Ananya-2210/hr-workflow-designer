import React from 'react';
import type { EndNodeData } from '../../types/nodes';

interface Props {
  data: EndNodeData;
  onChange: (data: Partial<EndNodeData>) => void;
}

export const EndNodeForm: React.FC<Props> = ({ data, onChange }) => {
  return (
    <div className="form-card">
      <div className="form-group">
        <label className="form-label">Title *</label>
        <input
          className="form-input"
          type="text"
          value={data.title}
          onChange={(e) => onChange({ title: e.target.value })}
          placeholder="End node title"
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">End Message</label>
        <textarea
          className="form-textarea"
          value={data.endMessage || ''}
          onChange={(e) => onChange({ endMessage: e.target.value })}
          placeholder="Workflow completed successfully"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Summary</label>
        <label className="pill" style={{ cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={data.summaryFlag || false}
            onChange={(e) => onChange({ summaryFlag: e.target.checked })}
          />
          <span style={{ fontWeight: 600 }}>Show summary at completion</span>
        </label>
        <small className="muted">Enable to display workflow summary at completion</small>
      </div>
    </div>
  );
};
