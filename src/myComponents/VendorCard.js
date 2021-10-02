import React from "react";
import Card from "react-bootstrap/esm/Card";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Image from 'react-bootstrap/Image'
import VendorIcon from '../Assets/Misc/VendorIcon.png';



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
  venderIconStyle = {
    width: '100%'
  }
  
  render () {
    return (
      <Col md={4}>
        <Card className="mb-3">
          <Card.Header className="text-start" style={this.cardHeaderStyle}>
            {this.props.cardHeader}
          </Card.Header>
          {/* Master Row */}
          <Container className="p-1 m-0">
            <Row className="p-0 m-0">
              <Col xs={8} className="ps-3">
                <Card.Title className="text-start pt-2 mb-0">
                  {this.props.name}
                </Card.Title>
                <Card.Body className="text-start ps-0">
                  {this.props.description}
                </Card.Body>
              </Col>
              <Col className="ps-3">
                <Image style={this.venderIconStyle} src={VendorIcon}/>
              </Col>
            </Row>
          </Container>


        </Card>
      </Col>
    )
  }
}