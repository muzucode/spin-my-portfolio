import React from "react";
import Card from "react-bootstrap/esm/Card";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";



export default class VendorCard extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      description: ''
    }
  } 
  
  cardHeaderStyle = {
    color: '#7c7d7d'
  }
  
  render () {
    return (
      <Col md={3}>
        <Card className="mb-3">
          <Card.Header className="text-start" style={this.cardHeaderStyle}>
            {this.props.cardHeader}
          </Card.Header>
          <Card.Title className="text-start ps-3 pt-2 mb-0">
            {this.props.name}
          </Card.Title>
          <Card.Body className="text-start">
            {this.props.description}
          </Card.Body>
        </Card>
      </Col>
    )
  }
}