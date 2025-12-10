# HR Workflow Designer (React + React Flow)

A prototype workflow designer for HR admins to visually create and test workflows
(onboarding, leave approvals, document verification, etc.). Built with React,
TypeScript, Vite, and React Flow, backed by a mock API (MSW + JSON server data).

## Features
- Drag-and-drop canvas with Start, Task, Approval, Automated, and End nodes
- Node property editor with dynamic forms and custom fields
- Mock automation catalog (`/api/automations`) and workflow simulator (`/api/simulate`)
- Validation layer (start/end presence, dangling nodes, cycles, direction rules)
- Workflow test panel that serializes the graph and shows execution logs

## Getting Started
```bash
npm install
npm run dev         # starts Vite with MSW mocks
# optional: npm run api  # start json-server on :3001 if you want standalone mock data
```

Open http://localhost:5173 (default Vite port).

## How It Works
- **Canvas**: React Flow handles node rendering and connections. Drag from sidebar or
  click to add. Delete via Delete/Backspace. Selection updates the editor.
- **Node editor**: Right panel surfaces the correct form per node type. Automated
  nodes fetch actions from the mock API and render dynamic parameter inputs.
- **Validation**: Live checks for start/end, incoming/outgoing constraints, cycles,
  and disconnected nodes. Errors are shown in the test panel.
- **Simulation**: The workflow is serialized and POSTed to `/api/simulate`. The mock
  handler walks the graph starting from the Start node and returns a step log.

## Assumptions / Next Steps
- Single start node is expected; multiple starts are flagged as invalid.
- No persistence layer; exporting/importing JSON would be the next easy win.
- UI is functional-first; could be refined with a design system and richer edge
  semantics (conditions, branching paths).
