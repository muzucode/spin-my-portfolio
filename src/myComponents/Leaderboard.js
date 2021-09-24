import Card from "react-bootstrap/esm/Card";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import React from "react";
import ListGroup from 'react-bootstrap/ListGroup';

export default class Leaderboard extends React.Component {
  
  renderTopPortfolios = () => {

    const getTopPortfolios = () => {
      // TODO: fetch top portfolios from DB

      // Placeholder portfolios
      var portfolios = [
        {
          username: 'TheBigBoom',
          netWorth: 178000
        },
        {
          username: 'RoosterMonkey',
          netWorth: 20000000
        },
        {
          username: 'TheBigBoom',
          netWorth: 178000
        },
        {
          username: 'RoosterMonkey',
          netWorth: 20000000
        },
        {
          username: 'TheBigBoom',
          netWorth: 178000
        },
        {
          username: 'RoosterMonkey',
          netWorth: 20000000
        },
        {
          username: 'TheBigBoom',
          netWorth: 178000
        },
        {
          username: 'RoosterMonkey',
          netWorth: 20000000
        },
        {
          username: 'TheBigBoom',
          netWorth: 178000
        },
        {
          username: 'RoosterMonkey',
          netWorth: 20000000
        },        
      ];

      return portfolios
    };
    

    const portfolios = getTopPortfolios();
    // TODO: load each portfolio


    return (
      <Container>
        <ListGroup>
          {/* List each portfolio */}
          {portfolios.map((value, index) => {
            return (
              <ListGroup.Item key={index}>{value.username}</ListGroup.Item>
            )
          })}
        </ListGroup>
      </Container>
    )
  }
  
  render () {
    return (
      <Container className>
        <Row className="justify-content-md-center">
          <Col md={4}>
            <Card className="centeralign">
              <Card.Body>
                <Card.Title className="my-3">
                  Top 10 Portfolios
                </Card.Title>
                {this.renderTopPortfolios()}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }
}