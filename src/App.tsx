import { ReactFlow } from "@xyflow/react";
import "./App.css";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

function App() {
  const initialNodes = [
    { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
    { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
  ];
  const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

  return (
    <Wrapper>
      <ReactFlow nodes={initialNodes} edges={initialEdges} />
    </Wrapper>
  );
}

export default App;
