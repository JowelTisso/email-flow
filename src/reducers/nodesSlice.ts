import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
} from "@xyflow/react";
import { initialEdges, initialNodes } from "../utils/Constants";

export interface MainState {
  nodes: Node[];
  edges: Edge[];
}

const initialState: MainState = {
  nodes: initialNodes,
  edges: initialEdges,
};

export const nodesSlice = createSlice({
  name: "nodes",
  initialState,
  reducers: {
    onNodesChange: (state, action: PayloadAction<NodeChange[]>) => {
      state.nodes = applyNodeChanges(action.payload, state.nodes);
    },
    onEdgesChange: (state, action: PayloadAction<EdgeChange[]>) => {
      state.edges = applyEdgeChanges(action.payload, state.edges);
    },
    onConnect: (state, action: PayloadAction<Connection>) => {
      state.edges = addEdge(action.payload, state.edges);
    },
    setNodes: (state, action: PayloadAction<Node[]>) => {
      state.nodes = action.payload;
    },
    setEdges: (state, action: PayloadAction<Edge[]>) => {
      state.edges = action.payload;
    },
  },
});

export const { onNodesChange, onEdgesChange, onConnect, setNodes, setEdges } =
  nodesSlice.actions;

export default nodesSlice.reducer;
