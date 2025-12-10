import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import type { TaskNodeData } from '../../types/nodes';

interface Props {
  data: TaskNodeData;
  selected?: boolean;
}

export const TaskNode: React.FC<Props> = ({ data, selected }) => {
  const [hovered, setHovered] = useState(false);
  const elevate = selected || hovered;
  return (
    <div style={{
      padding: '16px 20px',
      borderRadius: '12px',
      border: '1.5px solid #2196f3',
      background: 'linear-gradient(135deg, #ffffff 0%, #f5f9ff 100%)',
      minWidth: '200px',
      boxShadow: elevate ? '0 18px 34px rgba(33, 150, 243, 0.22)' : '0 14px 30px rgba(33, 150, 243, 0.18)',
      position: 'relative',
      transition: 'transform 0.15s ease, box-shadow 0.15s ease',
      transform: elevate ? 'translateY(-2px) scale(1.01)' : 'translateY(0) scale(1)',
      borderColor: elevate ? '#1d4ed8' : '#2196f3'
    }}
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
    >
      {/* Target Handle at Top */}
      <Handle 
        type="target" 
        position={Position.Top}
        id="target"
        style={{ 
          background: '#2196F3',
          width: '16px',
          height: '16px',
          border: '3px solid white',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          cursor: 'crosshair'
        }} 
      />
      
      <div style={{ fontWeight: 'bold', color: '#1976D2', marginBottom: '8px', fontSize: '14px' }}>
        📋 {data.title}
      </div>
      
      {data.description && (
        <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px', lineHeight: '1.4' }}>
          {data.description.length > 50 ? data.description.substring(0, 50) + '...' : data.description}
        </div>
      )}
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
        {data.assignee && (
          <div style={{ fontSize: '11px', color: '#555', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span>👤</span>
            <span>{data.assignee}</span>
          </div>
        )}
        {data.dueDate && (
          <div style={{ fontSize: '11px', color: '#555', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span>📅</span>
            <span>{data.dueDate}</span>
          </div>
        )}
      </div>
      
      {/* Custom Fields Display - NEW CODE */}
      {data.customFields && Object.keys(data.customFields).length > 0 && (
        <div style={{ 
          marginTop: '10px', 
          paddingTop: '8px', 
          borderTop: '1px solid #e0e0e0' 
        }}>
          {Object.entries(data.customFields).map(([key, value]) => (
            <div key={key} style={{ 
              fontSize: '11px', 
              color: '#666',
              marginBottom: '3px'
            }}>
              <span style={{ fontWeight: 600 }}>{key}:</span> {value}
            </div>
          ))}
        </div>
      )}
      
      {/* Source Handle at Bottom */}
      <Handle 
        type="source" 
        position={Position.Bottom}
        id="source"
        style={{ 
          background: '#2196F3',
          width: '16px',
          height: '16px',
          border: '3px solid white',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          cursor: 'crosshair'
        }} 
      />
    </div>
  );
};
