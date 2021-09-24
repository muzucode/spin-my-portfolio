import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/esm/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function SignUpForm(props) {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <Card className="centeralign">
            <Card.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Username</Form.Label>
                  <Form.Control 
                    value={props.usernameValue}
                    placeholder="Enter username"
                    onChange={props.onChangeUser}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control 
                    type="password"
                    value={props.passwordValue}
                    placeholder="Password"
                    onChange={props.onChangePass}
                  />
                </Form.Group>
                <Button 
                  className="btnFormSend"
                  variant="outline-success"
                  onClick={() => {props.handleSignUp()}}
                  >
                  Sign Up
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}