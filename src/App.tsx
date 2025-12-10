import React from 'react';
import { ReactFlowProvider } from 'reactflow';
import { WorkflowProvider } from './context/WorkflowContext';
import { WorkflowCanvas } from './components/Canvas/WorkflowCanvas';
import { Sidebar } from './components/Canvas/Sidebar';
import { NodeEditorPanel } from './components/NodeEditor/NodeEditorPanel';
import './App.css';

function App() {
  return (
    <ReactFlowProvider>
      <WorkflowProvider>
        <div style={{ 
          display: 'flex', 
          height: '100vh', 
          width: '100vw',
          overflow: 'hidden',  // Prevent any scrolling
          margin: 0,
          padding: 0,
          boxSizing: 'border-box'
        }}>
          {/* Left Sidebar - Smaller width */}
          <div style={{ 
            width: '200px',  // Changed from 240px to 200px
            flexShrink: 0,
            height: '100vh',
            overflowY: 'auto',
            boxSizing: 'border-box'
          }}>
            <Sidebar />
          </div>
          
          {/* Main Canvas - Flex takes remaining space */}
          <div style={{ 
            flex: 1, 
            height: '100vh', 
            position: 'relative',
            minWidth: 0,  // Important for flex to shrink properly
            overflow: 'hidden',
            boxSizing: 'border-box'
          }}>
            <WorkflowCanvas />
          </div>
          
          {/* Right Editor Panel - Smaller width */}
          <div style={{ 
            width: '280px',  // Changed from 320px to 280px
            flexShrink: 0,
            height: '100vh',
            overflowY: 'auto',
            backgroundColor: '#fff',
            borderLeft: '1px solid #444',
            boxSizing: 'border-box'
          }}>
            <NodeEditorPanel />
          </div>
        </div>
      </WorkflowProvider>
    </ReactFlowProvider>
  );
}

export default App;
