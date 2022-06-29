import styled from "styled-components";
import { ContainerCalculateForm } from "./components/ContainerCalculateFrom/ContainerCalculateForm";
import { useAppSelector } from "./store/hooks/hooks";
import { getCurrencyStatus } from "./store/selectors/currencySelectors";

function App() {
  const status = useAppSelector(getCurrencyStatus);

  if (status === "loading") {
    return <p>loading</p>;
  }
  if (status === "error") {
    return <p>error</p>;
  }

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
