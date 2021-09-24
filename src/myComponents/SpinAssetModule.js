import React from "react";
import Card from "react-bootstrap/esm/Card";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button"

export default function SpinAssetModule (props) {

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={4}>
          <Card className="centeralign px-4 pb-4">
            <Card.Body>
              <Card.Title>
                Spin!
              </Card.Title>  
              <Card.Subtitle>
                Good luck!
              </Card.Subtitle>
              <Card.Img  className="my-5 w-50" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Noun_Project_question_mark_icon_1101884_cc.svg/480px-Noun_Project_question_mark_icon_1101884_cc.svg.png"/>
            </Card.Body>
            <Button 
              variant="dark"
              onClick={props.handleSpin}    
            >
                Spin.
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}