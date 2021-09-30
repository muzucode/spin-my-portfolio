import React from "react";
import Container from "react-bootstrap/esm/Container";
import SectionHeading from "../myComponents/SectionHeading";
import SpinAssetModule from "../myComponents/SpinAssetModule";
import {API} from 'aws-amplify';
import AAS from '../Services/AmplifyAuthService';
import AssetService from "../Services/AssetService";

export default class SpinAssetView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      asset: {

      },
      card: {
        title: 'Good luck!',
        subtitle: '',
        imgURL: 'None'
      },
      loadingAsset: false,
      assetImg: 'https://static.thenounproject.com/png/60319-200.png'
    };
  }


  handleSpin = async () => {

    // Set loadingAsset state
    this.setState({loadingAsset: true});

    // Generate random asset
    var asset = AssetService.randomAsset();

    // Send asset name to getAssetImage(),
    // then load an image based on the asset name
    this.getAssetImage(asset.name);

    // Create newAsset
    var newAsset = Object.assign(asset);

    // Get current auth user ID
    const userId = await AAS.currentUserId();

    // Assign nativeUserId to asset
    newAsset.nativeUserId = userId;

    // Create new date string
    var date = new Date();
    date = date.toLocaleString('en-US');

    // Assign date created to asset
    newAsset.date_created = date;

    // // Set state, log new state
    this.setState({asset: newAsset}, () => { console.log(this.state.asset)});

    // Post asset to api
    const response = API.post('OrangeAPI', '/users/addAsset', {
      body: newAsset
    })
      .then(res => {
        // Update card element state
        this.setState(prevState => ({
          card: {                 
            ...prevState.card,    
            title: newAsset.name,
            subtitle: `Rarity: ${newAsset.rarity}`,
            imgURL: 'None right now'
          },
          loadingAsset: false
        } 
        ));
        return res;
      });

    // Log API response
    console.log(await response);

    return newAsset;
  }

  getAssetImage = (name) => {
    this.setState({assetImg: AssetService.getAssetImageResource(name)});
  }
      


  render () {
    return (
      <Container>
        <SectionHeading title={'Spin an Asset'}/>
        <SpinAssetModule
          handleSpin={this.handleSpin}
          cardTitle={this.state.card.title}
          cardSubtitle={this.state.card.subtitle}
          loadingAsset={this.state.loadingAsset}
          assetImg={this.state.assetImg}
        />
      </Container>
    )
  }
}