import { useCallback } from 'react';
import type { Node } from 'reactflow';
import { useWorkflow } from '../context/WorkflowContext';

export const useNodeSelection = () => {
  const { setSelectedNode } = useWorkflow();

  const handleSelectionChange = useCallback(
    (selectedNodes: Node[]) => {
      setSelectedNode(selectedNodes[0]?.id ?? null);
    },
    [setSelectedNode]
  );

  const clearSelection = useCallback(() => setSelectedNode(null), [setSelectedNode]);

  return { handleSelectionChange, clearSelection };
};
