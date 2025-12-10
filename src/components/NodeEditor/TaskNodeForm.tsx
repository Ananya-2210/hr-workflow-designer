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
          ...data.customFields,
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
          placeholder="Enter task title"
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
          Description
        </label>
        <textarea
          value={data.description || ''}
          onChange={(e) => onChange({ description: e.target.value })}
          style={{ 
            width: '100%', 
            padding: '10px 12px', 
            borderRadius: '6px', 
            border: '1px solid #d0d0d0',
            fontSize: '14px',
            color: '#333',
            backgroundColor: '#fff',
            minHeight: '80px',
            resize: 'vertical',
            fontFamily: 'inherit',
            boxSizing: 'border-box'
          }}
          placeholder="Describe the task..."
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
          Assignee
        </label>
        <input
          type="text"
          value={data.assignee || ''}
          onChange={(e) => onChange({ assignee: e.target.value })}
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
          placeholder="e.g., HR Executive"
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
          Due Date
        </label>
        <input
          type="date"
          value={data.dueDate || ''}
          onChange={(e) => onChange({ dueDate: e.target.value })}
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
          Custom Fields (Optional)
        </label>
        
        {data.customFields && Object.entries(data.customFields).map(([key, value]) => (
          <div key={key} style={{ 
            display: 'flex', 
            gap: '8px', 
            marginBottom: '8px',
            alignItems: 'center'
          }}>
            <span style={{ 
              flex: 1, 
              padding: '8px 12px', 
              backgroundColor: '#f0f0f0', 
              borderRadius: '6px',
              fontSize: '13px',
              color: '#333',
              border: '1px solid #e0e0e0'
            }}>
              <strong>{key}:</strong> {value}
            </span>
            <button 
              onClick={() => removeCustomField(key)} 
              style={{ 
                padding: '8px 12px',
                backgroundColor: '#ff4444',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 600
              }}
            >
              ✕
            </button>
          </div>
        ))}

        <div style={{ 
          display: 'flex', 
          gap: '8px', 
          marginTop: '12px',
          flexDirection: 'column'
        }}>
          <input
            type="text"
            placeholder="Key"
            value={customKey}
            onChange={(e) => setCustomKey(e.target.value)}
            style={{ 
              padding: '8px 12px', 
              borderRadius: '6px', 
              border: '1px solid #d0d0d0',
              fontSize: '13px',
              color: '#333',
              backgroundColor: '#fff'
            }}
          />
          <input
            type="text"
            placeholder="Value"
            value={customValue}
            onChange={(e) => setCustomValue(e.target.value)}
            style={{ 
              padding: '8px 12px', 
              borderRadius: '6px', 
              border: '1px solid #d0d0d0',
              fontSize: '13px',
              color: '#333',
              backgroundColor: '#fff'
            }}
          />
          <button 
            onClick={addCustomField} 
            style={{ 
              padding: '10px 16px',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 600
            }}
          >
            Add Custom Field
          </button>
        </div>
      </div>
    </div>
  );
};
