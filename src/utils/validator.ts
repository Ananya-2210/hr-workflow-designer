import type { Edge, Node } from 'reactflow';
import type { WorkflowNodeData } from '../types/nodes';
import type { ValidationResult } from '../types/workflow';

const findCycles = (nodes: Node<WorkflowNodeData>[], edges: Edge[]) => {
  const adjacency = new Map<string, string[]>();
  edges.forEach((edge) => {
    adjacency.set(edge.source, [...(adjacency.get(edge.source) || []), edge.target]);
  });

  const visiting = new Set<string>();
  const visited = new Set<string>();
  const cycles: string[] = [];

  const dfs = (nodeId: string, path: string[]) => {
    if (visiting.has(nodeId)) {
      cycles.push([...path, nodeId].join(' -> '));
      return;
    }
    if (visited.has(nodeId)) return;
    visiting.add(nodeId);
    const next = adjacency.get(nodeId) || [];
    next.forEach((child) => dfs(child, [...path, nodeId]));
    visiting.delete(nodeId);
    visited.add(nodeId);
  };

  nodes.forEach((n) => dfs(n.id, []));
  return cycles;
};

const findDisconnectedNodes = (
  nodes: Node<WorkflowNodeData>[],
  edges: Edge[],
  startId: string | undefined
) => {
  if (!startId) return nodes.map((n) => n.id);

  const adjacency = new Map<string, string[]>();
  edges.forEach((edge) => {
    adjacency.set(edge.source, [...(adjacency.get(edge.source) || []), edge.target]);
  });

  const visited = new Set<string>();
  const queue = [startId];
  while (queue.length) {
    const current = queue.shift();
    if (!current || visited.has(current)) continue;
    visited.add(current);
    (adjacency.get(current) || []).forEach((child) => queue.push(child));
  }

  return nodes.filter((n) => !visited.has(n.id)).map((n) => n.id);
};

export const validateWorkflow = (
  nodes: Node<WorkflowNodeData>[],
  edges: Edge[]
): ValidationResult => {
  const errors: string[] = [];

  const startNodes = nodes.filter((n) => n.type === 'start');
  const endNodes = nodes.filter((n) => n.type === 'end');

  if (startNodes.length === 0) {
    errors.push('Add a Start node to begin the workflow.');
  } else if (startNodes.length > 1) {
    errors.push('Only one Start node is supported.');
  }

  if (endNodes.length === 0) {
    errors.push('Add an End node to finish the workflow.');
  }

  const incomingCount = new Map<string, number>();
  const outgoingCount = new Map<string, number>();

  edges.forEach((edge) => {
    incomingCount.set(edge.target, (incomingCount.get(edge.target) || 0) + 1);
    outgoingCount.set(edge.source, (outgoingCount.get(edge.source) || 0) + 1);
  });

  nodes.forEach((node) => {
    const incoming = incomingCount.get(node.id) || 0;
    const outgoing = outgoingCount.get(node.id) || 0;

    if (node.type === 'start' && incoming > 0) {
      errors.push('Start node cannot have incoming connections.');
    }

    if (node.type === 'end' && outgoing > 0) {
      errors.push('End node cannot have outgoing connections.');
    }

    if (node.type !== 'start' && incoming === 0) {
      errors.push(`"${node.data.title}" is missing an incoming connection.`);
    }

    if (node.type !== 'end' && outgoing === 0) {
      errors.push(`"${node.data.title}" needs an outgoing connection.`);
    }
  });

  const startId = startNodes[0]?.id;
  const disconnected = findDisconnectedNodes(nodes, edges, startId);
  if (disconnected.length) {
    errors.push(`Disconnected nodes: ${disconnected.join(', ')}`);
  }

  const cycles = findCycles(nodes, edges);
  if (cycles.length) {
    errors.push(`Detected workflow cycle(s): ${cycles.join(' | ')}`);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};
