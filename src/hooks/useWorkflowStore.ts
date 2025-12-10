import { useState, useCallback, useEffect, useRef } from 'react';
import { addEdge, applyNodeChanges, applyEdgeChanges } from 'reactflow';
import type { Node, Edge, Connection, NodeChange, EdgeChange } from 'reactflow';
import type { WorkflowNodeData, NodeType } from '../types/nodes';

export const useWorkflowStore = () => {
  const [nodes, setNodes] = useState<Node<WorkflowNodeData>[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const onNodesChange = useCallback((changes: NodeChange[]) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  }, []);

  const onEdgesChange = useCallback((changes: EdgeChange[]) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  }, []);

  const onConnect = useCallback((connection: Connection) => {
    setEdges((eds) => addEdge(connection, eds));
  }, []);

  const addNode = useCallback((type: NodeType, position: { x: number; y: number } = { x: 250, y: 250 }) => {
    const nodeId = `${type}-${Date.now()}`;
    let nodeData: WorkflowNodeData;

    // Create proper typed data based on node type
    switch (type) {
      case 'start':
        nodeData = { id: nodeId, type: 'start', title: 'Start Node', metadata: {} };
        break;
      case 'task':
        nodeData = { id: nodeId, type: 'task', title: 'Task Node' };
        break;
      case 'approval':
        nodeData = { id: nodeId, type: 'approval', title: 'Approval Node' };
        break;
      case 'automated':
        nodeData = { id: nodeId, type: 'automated', title: 'Automated Step' };
        break;
      case 'end':
        nodeData = { id: nodeId, type: 'end', title: 'End Node' };
        break;
      default:
        nodeData = { id: nodeId, type: 'task', title: 'Task Node' };
    }

    const newNode: Node<WorkflowNodeData> = {
      id: nodeId,
      type,
      position,
      data: nodeData
    };
    
    setNodes((nds) => [...nds, newNode]);
    return nodeId;
  }, []);

  const updateNodeData = useCallback((nodeId: string, data: Partial<WorkflowNodeData>) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId ? { ...node, data: { ...node.data, ...data } } : node
      )
    );
  }, []);

  const deleteNode = useCallback((nodeId: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
    if (selectedNode === nodeId) {
      setSelectedNode(null);
    }
  }, [selectedNode]);

  // NEW: Handle multiple node deletions (for Delete key)
  const onNodesDelete = useCallback((deleted: Node[]) => {
    const deletedIds = deleted.map(node => node.id);
    setNodes((nds) => nds.filter((node) => !deletedIds.includes(node.id)));
    setEdges((eds) => eds.filter((edge) => 
      !deletedIds.includes(edge.source) && !deletedIds.includes(edge.target)
    ));
    // Clear selection if deleted node was selected
    if (selectedNode && deletedIds.includes(selectedNode)) {
      setSelectedNode(null);
    }
  }, [selectedNode]);

  // NEW: Handle edge deletions (for Delete key on edges)
  const onEdgesDelete = useCallback((deleted: Edge[]) => {
    const deletedIds = deleted.map(edge => edge.id);
    setEdges((eds) => eds.filter((edge) => !deletedIds.includes(edge.id)));
  }, []);

  // Seed a minimal workflow so users see validation pass out-of-the-box.
  const seeded = useRef(false);
  useEffect(() => {
    if (seeded.current || nodes.length > 0) return;
    const startId = addNode('start', { x: 150, y: 200 });
    const endId = addNode('end', { x: 500, y: 200 });
    setEdges((eds) => [...eds, { id: `seed-${Date.now()}`, source: startId, target: endId }]);
    seeded.current = true;
  }, [addNode, nodes.length]);

  return {
    nodes,
    edges,
    selectedNode,
    setSelectedNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
    updateNodeData,
    deleteNode,
    onNodesDelete,  // NEW
    onEdgesDelete   // NEW
  };
};
