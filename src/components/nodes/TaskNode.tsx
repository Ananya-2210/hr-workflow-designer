import React from 'react';
import { Handle, Position } from 'reactflow';
import type { TaskNodeData } from '../../types/nodes';

interface Props {
  data: TaskNodeData;
}

export const TaskNode: React.FC<Props> = ({ data }) => {
  return (
    <div style={{
      padding: '15px 20px',
      borderRadius: '8px',
      border: '2px solid #2196F3',
      backgroundColor: 'white',
      minWidth: '180px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      position: 'relative'
    }}>
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
