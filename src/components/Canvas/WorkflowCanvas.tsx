import React, { useCallback } from 'react';
import ReactFlow, { Background, Controls, useReactFlow } from 'reactflow';
import 'reactflow/dist/style.css';
import { useWorkflow } from '../../context/WorkflowContext';
import { StartNode } from '../nodes/StartNode';
import { TaskNode } from '../nodes/TaskNode';
import { ApprovalNode } from '../nodes/ApprovalNode';
import { AutomatedStepNode } from '../nodes/AutomatedStepNode';
import { EndNode } from '../nodes/EndNode';
import { useNodeSelection } from '../../hooks/usenodeselection';
import type { NodeType } from '../../types/nodes';

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
    setSelectedNode,
    onNodesDelete,
    onEdgesDelete,
    addNode
  } = useWorkflow();
  const { project } = useReactFlow();
  const { handleSelectionChange, clearSelection } = useNodeSelection();

  const onNodeClick = useCallback((event: React.MouseEvent, node: any) => {
    setSelectedNode(node.id);
  }, [setSelectedNode]);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow') as NodeType;
      if (!type) return;

      const bounds = (event.currentTarget as HTMLDivElement).getBoundingClientRect();
      const position = project({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });

      addNode(type, position);
    },
    [addNode, project]
  );

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onNodesDelete={onNodesDelete}
        onEdgesDelete={onEdgesDelete}
        nodeTypes={nodeTypes}
        onSelectionChange={({ nodes: selectedNodes }) =>
          handleSelectionChange(selectedNodes)
        }
        onPaneClick={clearSelection}
        onDrop={onDrop}
        onDragOver={onDragOver}
        deleteKeyCode={["Backspace", "Delete"]}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};
