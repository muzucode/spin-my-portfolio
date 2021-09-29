import Container from "react-bootstrap/esm/Container";
import Image from "react-bootstrap/esm/Image";
import React from "react";
import Col from "react-bootstrap/esm/Col";

export default class AssetItem extends React.Component {

  render () {
    return (
      <Col md={3} className="mb-5">
        {/* Link */}
        <a href={`/${this.props.assetId}`} ><Image className="assetItem mb-2" src="https://i.pinimg.com/originals/9d/ff/72/9dff72a7f4e082be0150145258a82d16.png"/></a>
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