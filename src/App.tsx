import styled from "styled-components";
import { ContainerCalculateForm } from "./components/ContainerCalculateFrom/ContainerCalculateForm";

function App() {
  return (
    <StyledApp className="App">
      <ContainerCalculateForm />
    </StyledApp>
  );
}

export default App;

const StyledApp = styled.div`
  max-width: 1170px;
  width: 100%;

  padding: 40px 0;
`;
