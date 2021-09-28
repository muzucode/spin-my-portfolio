import React from "react";
import Card from "react-bootstrap/esm/Card";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";
import Spinner from 'react-bootstrap/esm/Spinner'

export default class SpinAssetModule extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {

  }

  renderLoadingAnimation = () => {
    if(this.props.loadingAsset) {
      return(
      <Spinner 
        animation="border"
        className="my-5"
      />);
    } 
    else {
      return null;
    }
  }

  renderAssetImage = () => {
    if(!this.props.loadingAsset){
      return (
        <Card.Img
          // Src is equal to the prop
          src={this.props.assetImg}
          className="w-50 my-4"
        />
      )
    }
    else {
      return null
    }

  }

  render () {
    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col md={4}>
            <Card className="centeralign px-4 pb-4">
              <Card.Body>
                <Card.Title>
                  {this.props.cardTitle}
                </Card.Title>  
                <Card.Subtitle>
                  {this.props.cardSubtitle}
                </Card.Subtitle>

                {/* Render Card.Img */}
                {this.renderAssetImage()}

                {/* Loading animation if isLoading */}
                {this.renderLoadingAnimation()}

              </Card.Body>
              <Button 
                variant="dark"
                onClick={this.props.handleSpin}    
              >
                  Spin.
              </Button>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }

}