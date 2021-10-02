import React from "react";
import VendorCard from "../myComponents/VendorCard";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
export default class VendorsView extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      vendors: [
        'Fine Art', 
        'Fine Wine', 
        'Pat\'s Herbs', 
        'Annie\'s Coffee',
        'Supra Mart',
        'Wally\'s',
        'The Night Club',
        'Department Store',
        'Software',
        'Classical Music',
        'Ancient Texts',
        'Grocery Store',
      ]
    }
  }

  renderVendorList = () => {
    
    // Array of vendor card components
    var vendorCards = [];

    for(let i = 0; i < this.state.vendors.length; i++) {
      console.log('entered');
      vendorCards.push(
        <VendorCard
          key={i}
          cardHeader={'Vendor'}
          name={this.state.vendors[i]}
          description={'descriptionnnnn adsfasdfasdf asdfasdfasdf asdfadsgvcbcxvxcv xcvbxcvbxcvb xcvbxcvbbxc xcvb'}
        />
      )
    }

    return vendorCards;
  }
  
  render () {
    return (
      <Container className="p-5">
        <Row>
          {this.renderVendorList()}
        </Row>
      </Container>
    )
  }
}