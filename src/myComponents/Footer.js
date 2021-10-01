import React from 'react';
import Image from 'react-bootstrap/Image';
import SocratesImg from '../Assets/Misc/Socrates.png'


var style = {
  backgroundColor: "#222222",
  borderTop: "1px solid #222222",
  textAlign: "left",
  padding: "20px 20px 20px 40px",
  left: "0",
  display: "flex",
  flexFlow: "row",
  bottom: '0px',
  width: '100%',
  height: '100px',
  position: 'fixed'
}

var footerImg = {
  height:'50px'
}

var footerText = {
  color: "white",
  fontStyle: "italic"
}



export default class Footer extends React.Component {

  renderPhilosopherQuote = () => {
    return "He is richest who is content with the least, for content is the wealth of nature."
  }

  render () {
    return (
      <div style={style}>
        <Image alt={'Socrates'} style={footerImg} src={SocratesImg}></Image>
        <div style={footerText}>{this.renderPhilosopherQuote()}</div>
      </div>
    )
  }
};