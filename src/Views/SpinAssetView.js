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
        title: 'Spin!',
        subtitle: 'Good luck!',
        imgURL: 'None'
      }
    };
  }


  handleSpin = async () => {

    // Generate random asset
    var asset = AssetService.randomAsset();

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
    const response = await API.post('OrangeAPI', '/users/addAsset', {
      body: newAsset
    });

    // Log API response
    console.log(await response);

    // Set state of the card to update its contents
    this.setState(prevState => ({
      card: {                 
        ...prevState.card,    
        title: newAsset.name,
        subtitle: `Rarity: ${newAsset.rarity}`,
        imgURL: 'None right now'
      }
    }));

    // Update card title element (asset name)
    // Update card subtitle element (asset rarity)
    // Update asset image element (asset image URL)
    return newAsset;
  }


  render () {
    return (
      <Container>
        <SectionHeading title={'Spin an Asset'}/>
        <SpinAssetModule
          handleSpin={this.handleSpin}
          cardTitle={this.state.card.title}
          cardSubtitle={this.state.card.subtitle}
        />
      </Container>
    )
  }
}