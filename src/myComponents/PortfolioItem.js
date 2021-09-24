import Card from "react-bootstrap/esm/Card";

export default function PortfolioItem(props) {
  return (
    <Card.Text>
      {props.portfolioName}
    </Card.Text>
  )
}