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
      // TODO: Save a local image and replace this vvvv
      assetImg: 'https://static.thenounproject.com/png/60319-200.png',
      timeSinceLastSpin: 0
    };
  }


  handleSpin = async () => {

    
    // Set loadingAsset state
    this.setState({loadingAsset: true});

    // Get current auth user ID
    const userId = await AAS.currentUserId();

    // Get current date in seconds
    var time = new Date().getTime();

    // Get time of last spin
    var timeOfLastSpin = await API.get('OrangeAPI', '/users/getTimeOfLastSpin', {
      'queryStringParameters' : {
        'userId' : userId
      }
    });

    // Log difference between time of last spin and 
    // the current time
    // Dividing by 60,000 is to convert milliseconds to minutes
    const timeSinceLastSpin = time/60000 - (await timeOfLastSpin.body/60000)

    // Set state of timeSinceLastSpin
    this.setState({'timeSinceLastSpin': timeSinceLastSpin})

    // If time since last spin is at least 5 minutes OR
    // timeSinceLastSpin is NaN, due to API get request returning no body data
    // (due to no previous spinsnd then performing math operations on undefined):
    // then: perform the spin
    // else: do not perform spin,

    
    if(timeSinceLastSpin >= 5 || Number.isNaN(timeSinceLastSpin)) {

      // Generate random asset
      var asset = AssetService.randomAsset();

      // Send asset name to getAssetImage(),
      // then load an image based on the asset name
      this.getAssetImage(asset.name);

      // Create newAsset
      var newAsset = Object.assign(asset);

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

      // Update new spin time
      const newSpinTime = await API.post('OrangeAPI', '/users/updateTimeOfLastSpin', {
        body: {
          'userId': userId,
          'timeOfLastSpin': time
        }
      });

      console.log(await newSpinTime);

      return newAsset;
    }
    else {
      console.log(Math.round(5-timeSinceLastSpin));
      this.setState(prevState => ({
        // Set card elements
        card:{
          ...prevState.card,
          title: 'Come back soon!',
          subtitle: `You may spin again in ${Math.round(5-timeSinceLastSpin)} minutes`
        },
        // Disable loading animation
        loadingAsset: false,
        // Set asset image to nothing
        assetImg: null
      }));
    }
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