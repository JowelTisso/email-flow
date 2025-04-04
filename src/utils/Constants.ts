export const initialNodes = [
  { id: "1", type: "addLead", position: { x: 420, y: 120 }, draggable: false },
  {
    id: "2",
    type: "plainText",
    position: { x: 420, y: 300 },
    data: { label: "Sequence Start Point" },
    draggable: false,
  },
  {
    id: "4",
    type: "addBlock",
    position: { x: 520, y: 420 },
    draggable: false,
  },
];
export const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];
