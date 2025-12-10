import React from 'react';
import type { EndNodeData } from '../../types/nodes';

interface Props {
  data: EndNodeData;
  onChange: (data: Partial<EndNodeData>) => void;
}

export const EndNodeForm: React.FC<Props> = ({ data, onChange }) => {
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
          placeholder="Enter end title"
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
          End Message
        </label>
        <textarea
          value={data.endMessage || ''}
          onChange={(e) => onChange({ endMessage: e.target.value })}
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
          placeholder="e.g., Workflow completed successfully!"
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '10px',
          cursor: 'pointer',
          padding: '12px',
          backgroundColor: '#f8f9fa',
          borderRadius: '6px',
          border: '1px solid #e0e0e0'
        }}>
          <input
            type="checkbox"
            checked={data.summaryFlag || false}
            onChange={(e) => onChange({ summaryFlag: e.target.checked })}
            style={{ 
              width: '18px', 
              height: '18px',
              cursor: 'pointer'
            }}
          />
          <span style={{ 
            fontWeight: 600,
            fontSize: '13px',
            color: '#333'
          }}>
            Show Summary
          </span>
        </label>
        <small style={{ 
          color: '#666', 
          fontSize: '12px',
          display: 'block',
          marginTop: '8px',
          marginLeft: '4px'
        }}>
          Enable to display workflow summary at completion
        </small>
      </div>
    </div>
  );
};
