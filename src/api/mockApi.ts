import { http, HttpResponse } from 'msw';
import type { AutomationAction, SimulationResult } from './types';
import type { SerializedWorkflow } from '../types/workflow';

const automations: AutomationAction[] = [
  { id: 'send_email', label: 'Send Email', params: ['to', 'subject', 'body'] },
  { id: 'generate_doc', label: 'Generate Document', params: ['template', 'recipient'] },
  { id: 'send_slack', label: 'Send Slack Message', params: ['channel', 'message'] },
  { id: 'create_ticket', label: 'Create Ticket', params: ['priority', 'description'] }
];

export const handlers = [
  http.get('/api/automations', () => {
    return HttpResponse.json(automations);
  }),

  http.post('/api/simulate', async ({ request }) => {
    const workflow = (await request.json()) as SerializedWorkflow;

    // Topological-ish traversal starting at the start node
    const startNode = workflow.nodes.find((n) => n.type === 'start');
    const adjacency = new Map<string, string[]>();
    workflow.edges.forEach((edge) => {
      adjacency.set(edge.source, [...(adjacency.get(edge.source) || []), edge.target]);
    });

    const visited = new Set<string>();
    const ordered: typeof workflow.nodes = [];

    const traverse = (nodeId?: string) => {
      if (!nodeId || visited.has(nodeId)) return;
      const node = workflow.nodes.find((n) => n.id === nodeId);
      if (!node) return;
      visited.add(nodeId);
      ordered.push(node);
      (adjacency.get(nodeId) || []).forEach(traverse);
    };

    if (startNode) {
      traverse(startNode.id);
    }

    // Fallback to any unvisited nodes to make sure we simulate everything
    workflow.nodes.forEach((node) => {
      if (!visited.has(node.id)) {
        traverse(node.id);
      }
    });

    const result: SimulationResult = {
      success: true,
      steps: ordered.map((node) => ({
        nodeId: node.id,
        nodeType: node.type,
        title: node.data.title,
        status: node.type === 'automated' ? 'pending' : 'completed',
      })),
    };
    
    return HttpResponse.json(result);
  })
];
