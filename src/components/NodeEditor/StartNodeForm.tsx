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
          placeholder="Enter node title"
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
          Metadata (Optional)
        </label>
        
        {data.metadata && Object.entries(data.metadata).map(([key, value]) => (
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
              onClick={() => removeMetadata(key)} 
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
            value={metadataKey}
            onChange={(e) => setMetadataKey(e.target.value)}
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
            value={metadataValue}
            onChange={(e) => setMetadataValue(e.target.value)}
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
            onClick={addMetadata} 
            style={{ 
              padding: '10px 16px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 600
            }}
          >
            Add Metadata
          </button>
        </div>
      </div>
    </div>
  );
};
