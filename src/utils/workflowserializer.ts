import type { Edge, Node } from 'reactflow';
import type { WorkflowNodeData } from '../types/nodes';
import type { SerializedWorkflow, SerializedNode, SerializedEdge } from '../types/workflow';

/**
 * Normalize the React Flow graph into a serializable workflow payload.
 */
export const serializeWorkflow = (
  nodes: Node<WorkflowNodeData>[],
  edges: Edge[]
): SerializedWorkflow => {
  const serializedNodes: SerializedNode[] = nodes.map((node) => ({
    id: node.id,
    type: node.type as SerializedNode['type'],
    data: node.data,
  }));

  const serializedEdges: SerializedEdge[] = edges.map((edge) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    label: edge.label,
  }));

  return {
    nodes: serializedNodes,
    edges: serializedEdges,
    createdAt: new Date().toISOString(),
  };
};
