import { Form, Button, Container } from 'react-bootstrap'

const UserInfoForm = (props) => {
    const { userInfo, handleChange, heading, handleSubmit } = props 
    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
        
                <Form.Label htmlFor="firstName">First Name</Form.Label>
                <Form.Control
                    placeholder="First Name"
                    name="firstName"
                    id="firstName"
                    value={ userInfo.firstName }
                    onChange={ handleChange }
                    />
                <Form.Label htmlFor="lastName">Last Name</Form.Label>
                <Form.Control
                    placeholder="Last Name"
                    name="lastName"
                    id="lastName"
                    value={ userInfo.lastName }
                    onChange={ handleChange }
                    />
                <Form.Label htmlFor="phoneNumber">Phone Number</Form.Label>
                <Form.Control
                    placeholder="###-###-####"
                    name="phoneNumber"
                    id="phoneNumber"
                    value={ userInfo.phoneNumber }
                    onChange={ handleChange }
                    />
                
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default UserInfoForm