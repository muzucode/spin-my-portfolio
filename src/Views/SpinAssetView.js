import React from "react";
import Container from "react-bootstrap/esm/Container";
import SectionHeading from "../myComponents/SectionHeading";
import SpinAssetModule from "../myComponents/SpinAssetModule";
import {API} from 'aws-amplify';

export default class SpinAssetView extends React.Component {
  
  async handleSpin() {
    // TODO: generate random rarity number and post item to user's DB
    const response = await API.post('OrangeAPI', '/users/addAsset', {
      body: {
        asset: 'test asset'
      }
    });

    console.log(await response);
  }
  
  render () {
    return (
      <Container>
        <SectionHeading title={'Spin an Asset'}/>
        <SpinAssetModule
          handleSpin={this.handleSpin}  
        />
      </Container>
    )
  }
}