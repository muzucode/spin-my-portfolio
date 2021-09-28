import React from 'react';
import Amplify, { Auth, API } from 'aws-amplify';
import awsconfig from './aws-exports';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container'
import AAS from './Services/AmplifyAuthService';
import SectionHeading from './myComponents/SectionHeading';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


Amplify.configure(awsconfig);


export default class Portfolio extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      assets: []
    }
  }

  componentDidMount() {
    this.getAssetsFromDB();
  }

  getCurrentUser() {
    const user = Auth.currentAuthenticatedUser()
    .then(res => {
      console.log(res);
      // Set currentUser state
      this.setState({currentUser : res});
      return res;
    });

    return user;
  }

  getAssetsFromDB = async () => {

    // Get current userId
    const userId = await AAS.currentUserId();

    // Get all assets with nativeUserId from DB
    const allAssets = await API.get('OrangeAPI', '/users/getAllAssetsByUserId', {
      queryStringParameters: {  // OPTIONAL
        'nativeUserId': userId,
      }
    });

    // Log assets from DB
    console.log(await allAssets);

    // Create array of asset names
    var assetNames = [];

    // Push asset names to assetNames array
    allAssets.body.forEach(a => {
      assetNames.push(a.name);
    });

    // Set assets state to assetNames array
    this.setState({assets: assetNames});


  }

  renderAssets = () => {
    // Create asset elements array
    var assetElements = [];

    // Loop through assets state (set this in getAssetsFromDB)
    for (var i = 0; i < this.state.assets.length; i++) {
      // Add element
      assetElements.push(<div key={i}>{this.state.assets[i]}</div>);
    }

    return assetElements;
  }

  // TODO: Render a loading animation if the state.assets is empty

  render () {
    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col md={8}>
            <SectionHeading title={'My Portfolio'}/>
            <Card className="centeralign p-4">
              <Card.Title>Assets:</Card.Title>
              <Card.Body>       
                {this.renderAssets()}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }
}

