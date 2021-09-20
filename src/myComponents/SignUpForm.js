import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

export default function SignUpForm(props) {
  return (
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

  )
}