import React, { useMemo, useState } from 'react';
import axios from 'axios';
import type { Edge, Node } from 'reactflow';
import type { WorkflowNodeData } from '../../types/nodes';
import type { SimulationResult } from '../../api/types';
import { serializeWorkflow } from '../../utils/workflowserializer';
import { useWorkflowValidation } from '../../hooks/useworkflowvalidation';

interface Props {
  nodes: Node<WorkflowNodeData>[];
  edges: Edge[];
}

export const WorkflowTestPanel: React.FC<Props> = ({ nodes, edges }) => {
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const serializedWorkflow = useMemo(() => serializeWorkflow(nodes, edges), [nodes, edges]);
  const validation = useWorkflowValidation(nodes, edges);

  const handleTest = async () => {
    if (!validation.valid) {
      setError('Fix validation errors before running the simulation.');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await axios.post('/api/simulate', serializedWorkflow);
      setResult(response.data);
    } catch (err: any) {
      // Fallback: run a client-side mock simulation to avoid blocking the UX
      const startNode = serializedWorkflow.nodes.find((n) => n.type === 'start');
      const adjacency = new Map<string, string[]>();
      serializedWorkflow.edges.forEach((edge) => {
        adjacency.set(edge.source, [...(adjacency.get(edge.source) || []), edge.target]);
      });
      const visited = new Set<string>();
      const ordered: typeof serializedWorkflow.nodes = [];
      const traverse = (nodeId?: string) => {
        if (!nodeId || visited.has(nodeId)) return;
        const node = serializedWorkflow.nodes.find((n) => n.id === nodeId);
        if (!node) return;
        visited.add(nodeId);
        ordered.push(node);
        (adjacency.get(nodeId) || []).forEach(traverse);
      };
      if (startNode) traverse(startNode.id);
      serializedWorkflow.nodes.forEach((node) => {
        if (!visited.has(node.id)) traverse(node.id);
      });

      const fallbackResult: SimulationResult = {
        success: true,
        steps: ordered.map((node) => ({
          nodeId: node.id,
          nodeType: node.type,
          title: node.data.title,
          status: node.type === 'automated' ? 'pending' : 'completed',
        })),
      };

      setResult(fallbackResult);
      const message = err?.message || 'Network error';
      setError(`Simulation failed on server, using local fallback. (${message})`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '16px 20px', borderTop: '1px solid #e5e5e5', background: '#fafafa' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '15px' }}>Test Workflow</h3>
          <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#666' }}>
            Validate and simulate your workflow against mock APIs.
          </p>
        </div>
        <button 
          onClick={handleTest} 
          disabled={loading || !nodes.length}
          style={{ 
            padding: '10px 14px',
            backgroundColor: validation.valid ? '#2563eb' : '#9ca3af',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: loading ? 'wait' : 'pointer',
            fontWeight: 600
          }}
        >
          {loading ? 'Running...' : 'Run Simulation'}
        </button>
      </div>

      <div style={{ marginTop: '12px' }}>
        {validation.errors.length > 0 ? (
          <div style={{ 
            background: '#fff1f2', 
            border: '1px solid #fecdd3', 
            borderRadius: '6px',
            padding: '10px 12px'
          }}>
            <strong style={{ color: '#be123c', fontSize: '13px' }}>Validation errors:</strong>
            <ul style={{ margin: '8px 0 0 16px', padding: 0, color: '#9f1239', fontSize: '12px' }}>
              {validation.errors.map((err) => (
                <li key={err}>{err}</li>
              ))}
            </ul>
          </div>
        ) : (
          <div style={{ 
            background: '#ecfdf3',
            border: '1px solid #a7f3d0',
            borderRadius: '6px',
            padding: '10px 12px',
            color: '#065f46',
            fontSize: '12px'
          }}>
            Workflow is valid and ready to simulate.
          </div>
        )}
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '8px',
        marginTop: '12px'
      }}>
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '8px 10px' }}>
          <div style={{ fontSize: '11px', color: '#6b7280' }}>Nodes</div>
          <div style={{ fontWeight: 700, color: '#111827' }}>{nodes.length}</div>
        </div>
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '8px 10px' }}>
          <div style={{ fontSize: '11px', color: '#6b7280' }}>Edges</div>
          <div style={{ fontWeight: 700, color: '#111827' }}>{edges.length}</div>
        </div>
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '8px 10px' }}>
          <div style={{ fontSize: '11px', color: '#6b7280' }}>Last saved</div>
          <div style={{ fontWeight: 700, color: '#111827' }}>
            {new Date(serializedWorkflow.createdAt).toLocaleTimeString()}
          </div>
        </div>
      </div>

      {error && (
        <div style={{ 
          marginTop: '12px',
          background: '#fef2f2',
          border: '1px solid #fecaca',
          color: '#b91c1c',
          padding: '10px 12px',
          borderRadius: '6px',
          fontSize: '12px'
        }}>
          {error}
        </div>
      )}

      {result && (
        <div style={{ marginTop: '16px' }}>
          <h4 style={{ margin: '0 0 8px', fontSize: '14px' }}>Execution Log</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {result.steps.map((step, index) => (
              <div 
                key={step.nodeId + index}
                style={{ 
                  padding: '10px', 
                  borderRadius: '6px', 
                  background: '#f9fafb', 
                  border: '1px solid #e5e7eb' 
                }}
              >
                <div style={{ fontWeight: 600, color: '#111827' }}>
                  Step {index + 1}: {step.title}
                </div>
                <div style={{ fontSize: '12px', color: '#4b5563' }}>
                  {step.nodeType} — {step.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
