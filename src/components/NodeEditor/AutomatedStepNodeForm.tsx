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
          placeholder="Enter step title"
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
          Action Type
        </label>
        <select
          value={data.actionId || ''}
          onChange={(e) => handleActionChange(e.target.value)}
          disabled={loading}
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
          <option value="">{loading ? 'Loading...' : 'Select Action'}</option>
          {actions.map(action => (
            <option key={action.id} value={action.id}>
              {action.label}
            </option>
          ))}
        </select>
      </div>

      {selectedAction && (
        <div style={{ marginBottom: '20px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '12px', 
            fontWeight: 600,
            fontSize: '13px',
            color: '#333'
          }}>
            Action Parameters
          </label>
          {selectedAction.params.map(param => (
            <div key={param} style={{ marginBottom: '15px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '5px', 
                fontSize: '12px',
                color: '#666',
                textTransform: 'capitalize'
              }}>
                {param.replace(/_/g, ' ')}
              </label>
              <input
                type="text"
                value={data.parameters?.[param] || ''}
                onChange={(e) => handleParameterChange(param, e.target.value)}
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
                placeholder={`Enter ${param}`}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
