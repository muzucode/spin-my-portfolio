import React from 'react';
import Amplify, { Auth, API } from 'aws-amplify';
import awsconfig from '../aws-exports';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container'
import AAS from '../Services/AmplifyAuthService';
import SectionHeading from '../myComponents/SectionHeading';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner'

Amplify.configure(awsconfig);


export default class Portfolio extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      assets: [],
      loggedIn: false,
      isLoadingPortfolio: false
    }
  }

  componentDidMount() {
    this.getAssetsFromDB();
    this.isLoggedIn();
  }

  isLoggedIn = () => {
    Auth.currentAuthenticatedUser()
      .then(res => {
        this.setState({loggedIn: true});
        return res;
      })
      .catch(err => {
        this.setState({loggedIn: false});
      })
    
  }

  getAssetsFromDB = async () => {

    // Set isLoadingPortfolio to true as waiting for DB response
    this.setState({isLoadingPortfolio: true});

    // Get current userId
    const userId = await AAS.currentUserId();

    // Get all assets with nativeUserId from DB
    const allAssets = await API.get('OrangeAPI', '/users/getAllAssetsByUserId', {
      queryStringParameters: {  // OPTIONAL
        'nativeUserId': userId,
      }
    });

    // If allAssets has a response, 
    // set loading state as false (not loading anymore)
    if(allAssets) this.setState({isLoadingPortfolio: false});

    // Log assets from DB
    console.log(await allAssets);

    // Create array of asset names
    var myAssets = [];

    // Push asset names to assetNames array
    allAssets.body.forEach(a => {
      myAssets.push(a);
    });

    // Sort assets by rarity
    myAssets = myAssets.sort(function(a, b) {
      var keyA = a.rarity,
        keyB = b.rarity;
      // Compare the 2 dates
      if (keyA < keyB) return 1;
      if (keyA > keyB) return -1;
      return 0;
    });

    // Set assets state to assetNames array
    this.setState({assets: myAssets});
  }

  renderAssets = () => {
    // Create asset elements array
    var assetElements = [];

    // Set isLoadingPortfolio to false, since its being rendered


    // Loop through assets state (set this in getAssetsFromDB)
    for (var i = 0; i < this.state.assets.length; i++) {
      // Generate rand for testing 
      var rand = Math.round(Math.random() * 10000);

      // Add element
      assetElements.push(
      <ListGroup.Item 
        key={i}
      >
        {/* Aligns content to the left */}
        <Row className="ps-3">
          <Col md={4} className="text-start"><b>Name: </b>{this.state.assets[i].name}</Col>
          <Col md={4} className="text-start"><b>Rarity: </b>{this.state.assets[i].rarity}</Col>
          <Col md={4} className="text-start"><b>Market: </b>{'$' + rand}</Col>
        </Row>
      </ListGroup.Item>);
    }

    return assetElements;
  }

  renderLoadingAnimation = () => {
    if(this.state.isLoadingPortfolio) {
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


  render () {
    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col md={8}>
            <SectionHeading title={'My Portfolio'}/>
            <Card className="centeralign p-4">
              <Card.Title>{this.state.loggedIn ? 'Assets' : 'No user found'}</Card.Title>
              <Card.Body>

                {/* Loading animation if isLoadingPortfolio */}
                {this.renderLoadingAnimation()}

                {/* Render assets */}
                <ListGroup>
                  {this.renderAssets()}
                </ListGroup>       

              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }
}

