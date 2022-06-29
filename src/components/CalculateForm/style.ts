import styled from "styled-components";

export const StyledForm = styled.form`
  max-width: 300px;
  width: 100%;
  padding: 30px;

  display: grid;
  row-gap: 20px;
`;

export const ContainerInput = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const CurrencyName = styled.p`
  font-size: 18px;
  line-height: 21px;
  font-weight: 600;
`;
