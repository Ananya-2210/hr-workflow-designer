import React, { useCallback } from 'react';
import ReactFlow, { Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';
import { useWorkflow } from '../../context/WorkflowContext';
import { StartNode } from '../nodes/StartNode';
import { TaskNode } from '../nodes/TaskNode';
import { ApprovalNode } from '../nodes/ApprovalNode';
import { AutomatedStepNode } from '../nodes/AutomatedStepNode';
import { EndNode } from '../nodes/EndNode';

const nodeTypes = {
  start: StartNode,
  task: TaskNode,
  approval: ApprovalNode,
  automated: AutomatedStepNode,
  end: EndNode
};

export const WorkflowCanvas: React.FC = () => {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    setSelectedNode
  } = useWorkflow();

  const onNodeClick = useCallback((event: React.MouseEvent, node: any) => {
    setSelectedNode(node.id);
  }, [setSelectedNode]);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};
