import { useMemo } from 'react';
import type { Edge, Node } from 'reactflow';
import type { WorkflowNodeData } from '../types/nodes';
import { validateWorkflow } from '../utils/validator';

export const useWorkflowValidation = (
  nodes: Node<WorkflowNodeData>[],
  edges: Edge[]
) => {
  return useMemo(() => validateWorkflow(nodes, edges), [nodes, edges]);
};
