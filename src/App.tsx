import React from 'react';
import { ReactFlowProvider } from 'reactflow';
import { WorkflowProvider } from './context/WorkflowContext';
import { WorkflowCanvas } from './components/Canvas/WorkflowCanvas';
import { Sidebar } from './components/Canvas/Sidebar';
import { NodeEditorPanel } from './components/NodeEditor/NodeEditorPanel';
import { WorkflowTestPanel } from './components/TestPanel/WorkflowTestPanel';
import { useWorkflow } from './context/WorkflowContext';
import './App.css';

const RightPanel: React.FC = () => {
  const { nodes, edges } = useWorkflow();

  return (
    <div className="panel">
      <div className="panel-scroll">
        <NodeEditorPanel />
      </div>
      <WorkflowTestPanel nodes={nodes} edges={edges} />
    </div>
  );
};

function App() {
  return (
    <ReactFlowProvider>
      <WorkflowProvider>
        <div className="app-shell">
          {/* Left Sidebar */}
          <div className="sidebar">
            <Sidebar />
          </div>
          
          {/* Main Canvas */}
          <div className="canvas-area">
            <WorkflowCanvas />
          </div>
          
          {/* Right Editor Panel */}
          <div className="panel-area">
            <RightPanel />
          </div>
        </div>
      </WorkflowProvider>
    </ReactFlowProvider>
  );
}

export default App;
