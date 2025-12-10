import type { Edge, Node } from 'reactflow';
import type { NodeType, WorkflowNodeData } from './nodes';

export interface SerializedNode {
  id: string;
  type: NodeType;
  data: WorkflowNodeData;
}

export interface SerializedEdge {
  id?: string;
  source: string;
  target: string;
  label?: string;
}

export interface SerializedWorkflow {
  nodes: SerializedNode[];
  edges: SerializedEdge[];
  createdAt: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings?: string[];
}

export type WorkflowNodes = Node<WorkflowNodeData>[];
export type WorkflowEdges = Edge[];
