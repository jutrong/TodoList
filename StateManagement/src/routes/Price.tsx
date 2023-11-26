import styled from "styled-components";
import { GetTicker } from "../interfaces/GetTicker";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-flow: 1fr;
`;

const ItemHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Item = styled.div<{ price?: number }>`
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Price = ({ tickerData }: { tickerData?: GetTicker }) => {
  return (
    <Container>
      <ItemHeader>1h</ItemHeader>
      <ItemHeader>24h</ItemHeader>
      <ItemHeader>Week</ItemHeader>
      <ItemHeader>Month</ItemHeader>
      <Item>{tickerData?.quotes.USD.percent_change_1h}%</Item>
      <Item>{tickerData?.quotes.USD.percent_change_24h}%</Item>
      <Item>{tickerData?.quotes.USD.percent_change_7d}%</Item>
      <Item>{tickerData?.quotes.USD.percent_change_30d}%</Item>
    </Container>
  );
};

export default Price;
