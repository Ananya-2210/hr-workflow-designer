import React from 'react';
import type { TaskNodeData } from '../../types/nodes';

interface Props {
  data: TaskNodeData;
  onChange: (data: Partial<TaskNodeData>) => void;
}

export const TaskNodeForm: React.FC<Props> = ({ data, onChange }) => {
  const [customKey, setCustomKey] = React.useState('');
  const [customValue, setCustomValue] = React.useState('');

  const addCustomField = () => {
    if (customKey && customValue) {
      onChange({
        customFields: {
          ...(data.customFields || {}),
          [customKey]: customValue
        }
      });
      setCustomKey('');
      setCustomValue('');
    }
  };

  const removeCustomField = (key: string) => {
    const newFields = { ...data.customFields };
    delete newFields[key];
    onChange({ customFields: newFields });
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
          placeholder="Task title"
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Description</label>
        <textarea
          className="form-textarea"
          value={data.description || ''}
          onChange={(e) => onChange({ description: e.target.value })}
          placeholder="Describe the task"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Assignee</label>
        <input
          className="form-input"
          type="text"
          value={data.assignee || ''}
          onChange={(e) => onChange({ assignee: e.target.value })}
          placeholder="e.g., HR Executive"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Due Date</label>
        <input
          className="form-input"
          type="date"
          value={data.dueDate || ''}
          onChange={(e) => onChange({ dueDate: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Custom Fields (optional)</label>
        <div className="pill-list">
          {data.customFields && Object.entries(data.customFields).map(([key, value]) => (
            <div key={key} className="pill">
              <span style={{ flex: 1 }}><strong>{key}:</strong> {value}</span>
              <button className="danger-btn" onClick={() => removeCustomField(key)}>Remove</button>
            </div>
          ))}
        </div>
        <div className="form-group">
          <input
            className="form-input"
            type="text"
            placeholder="Key"
            value={customKey}
            onChange={(e) => setCustomKey(e.target.value)}
          />
          <input
            className="form-input"
            type="text"
            placeholder="Value"
            value={customValue}
            onChange={(e) => setCustomValue(e.target.value)}
          />
          <button className="primary-btn" onClick={addCustomField}>Add custom field</button>
        </div>
      </div>
    </div>
  );
};
