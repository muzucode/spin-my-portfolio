import React from "react"
import Container from "react-bootstrap/esm/Container";
import Leaderboard from "../myComponents/Leaderboard";
import SectionHeading from "../myComponents/SectionHeading";

export default class LeaderboardsView extends React.Component {
  
  // TODO: get leaders from dynamodb based on portfolio net worth
  // calculate the net worth for a user every time they roll an item
  
  render () {
    return (
      <Container>
        <SectionHeading title={'Leaderboards'}/>
        <Leaderboard/>
      </Container>
    )
  }
}