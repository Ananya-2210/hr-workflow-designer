import React from 'react';
import type { StartNodeData } from '../../types/nodes';

interface Props {
  data: StartNodeData;
  onChange: (data: Partial<StartNodeData>) => void;
}

export const StartNodeForm: React.FC<Props> = ({ data, onChange }) => {
  const [metadataKey, setMetadataKey] = React.useState('');
  const [metadataValue, setMetadataValue] = React.useState('');

  const addMetadata = () => {
    if (metadataKey && metadataValue) {
      onChange({
        metadata: {
          ...data.metadata,
          [metadataKey]: metadataValue
        }
      });
      setMetadataKey('');
      setMetadataValue('');
    }
  };

  const removeMetadata = (key: string) => {
    const newMetadata = { ...data.metadata };
    delete newMetadata[key];
    onChange({ metadata: newMetadata });
  };

  return (
    <div className="form-card">
      <div className="form-group">
        <label className="form-label">Title *</label>
        <input
          className="form-input"
          type="text"
          value={data.title}
          onChange={(e) => onChange({ title: e.target.value })}
          placeholder="Start node title"
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Metadata (optional)</label>
        <div className="pill-list">
          {data.metadata && Object.entries(data.metadata).map(([key, value]) => (
            <div key={key} className="pill">
              <span style={{ flex: 1 }}><strong>{key}:</strong> {value}</span>
              <button className="danger-btn" onClick={() => removeMetadata(key)}>Remove</button>
            </div>
          ))}
        </div>
        <div className="form-group">
          <input
            className="form-input"
            type="text"
            placeholder="Key"
            value={metadataKey}
            onChange={(e) => setMetadataKey(e.target.value)}
          />
          <input
            className="form-input"
            type="text"
            placeholder="Value"
            value={metadataValue}
            onChange={(e) => setMetadataValue(e.target.value)}
          />
          <button className="primary-btn" onClick={addMetadata}>Add metadata</button>
        </div>
      </div>
    </div>
  );
};
