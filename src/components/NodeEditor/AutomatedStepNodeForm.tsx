import React, { useEffect, useState } from 'react';
import axios from 'axios';
import type { AutomatedStepNodeData } from '../../types/nodes';
import type { AutomationAction } from '../../api/types';

interface Props {
  data: AutomatedStepNodeData;
  onChange: (data: Partial<AutomatedStepNodeData>) => void;
}

export const AutomatedStepNodeForm: React.FC<Props> = ({ data, onChange }) => {
  const [actions, setActions] = useState<AutomationAction[]>([]);
  const [selectedAction, setSelectedAction] = useState<AutomationAction | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get('/api/automations')
      .then(response => {
        setActions(response.data);
        if (data.actionId) {
          const action = response.data.find((a: AutomationAction) => a.id === data.actionId);
          setSelectedAction(action || null);
        }
      })
      .catch(error => console.error('Failed to load automations:', error))
      .finally(() => setLoading(false));
  }, [data.actionId]);

  const handleActionChange = (actionId: string) => {
    const action = actions.find(a => a.id === actionId);
    setSelectedAction(action || null);
    onChange({ 
      actionId, 
      parameters: {}
    });
  };

  const handleParameterChange = (paramName: string, value: string) => {
    onChange({
      parameters: {
        ...data.parameters,
        [paramName]: value
      }
    });
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
          placeholder="Automated step title"
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Action Type</label>
        <select
          className="form-select"
          value={data.actionId || ''}
          onChange={(e) => handleActionChange(e.target.value)}
          disabled={loading}
        >
          <option value="">{loading ? 'Loading...' : 'Select action'}</option>
          {actions.map(action => (
            <option key={action.id} value={action.id}>
              {action.label}
            </option>
          ))}
        </select>
      </div>

      {selectedAction && (
        <div className="form-group">
          <label className="form-label">Action Parameters</label>
          {selectedAction.params.map(param => (
            <div key={param} className="form-group">
              <label className="form-label" style={{ fontSize: '12px', color: '#4b5563' }}>
                {param.replace(/_/g, ' ')}
              </label>
              <input
                className="form-input"
                type="text"
                value={data.parameters?.[param] || ''}
                onChange={(e) => handleParameterChange(param, e.target.value)}
                placeholder={`Enter ${param}`}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
