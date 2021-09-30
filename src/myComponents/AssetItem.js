import Image from "react-bootstrap/esm/Image";
import React from "react";
import Col from "react-bootstrap/esm/Col";
import AssetService from "../Services/AssetService";

export default class AssetItem extends React.Component {


  render () {
    console.log(this.props.name);
    return (
      <Col md={3} className="mb-5">
        {/* Link */}
        <a href={`/${this.props.assetId}`} >
          {/* Image */}
          <Image 
            className="assetItem mb-2 " 
            src={AssetService.getAssetImageResource(this.props.name)}
          />
        </a>
        {/* Name */}
        <div><b>{this.props.name}</b></div>
        {/* Rarity */}
        <div>Rarity: {this.props.rarity}</div>
        {/* Market Value */}
        <div><i>${this.props.marketValue}</i></div>
      </Col>
    )
  }
}