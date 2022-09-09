import { useState, useEffect } from 'react'

import { useParams, useNavigate } from 'react-router-dom'
// this will allow us to see our parameters

import { Container, Card, Button } from 'react-bootstrap'

import LoadingScreen from '../shared/LoadingScreen'
import { getOneUserInfo, updateUserInfo, removeUserInfo } from '../../api/userInfo'
import messages from '../shared/AutoDismissAlert/messages'
import EditUserInfoModal from './EditUserInfoModal'


// We need to get the userInfo's id from the parameters
// Then we need to make a request to the api
// Then we need to display the results in this component

const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const ShowUserInfo = (props) => {
    const [userInfo, setUserInfo] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
    const [updated, setUpdated] = useState(false)

    const { id } = useParams()
    const navigate = useNavigate()
    // useNavigate returns a function
    // we can call that function to redirect the user wherever we want to

    const { user, msgAlert } = props
    console.log('user in props', user)
    console.log('the userInfo in showUserInfo', userInfo)
    // destructuring to get the id value from our route parameters
    useEffect(() => {
        getOneUserInfo(id)
            .then(res => setUserInfo(res.data.userInfo))
            .catch(err => {                   
                msgAlert({
                    heading: 'Error getting userInfo',
                    message: messages.getUserInfoFailure,
                    variant: 'danger'
                })
                navigate('/')
                //navigate back to the home page if there's an error fetching
            })
    }, [updated])

    // here we'll declare a function that runs which will remove the userInfo
    // this function's promise chain should send a message, and then go somewhere
    const removeTheUserInfo = () => {
        removeUserInfo(user, userInfo.id)
            // on success send a success message
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.removeUserInfoSuccess,
                    variant: 'success'
                })
            })
            // then navigate to index
            .then(() => {navigate('/')})
            // on failure send a failure message
            .catch(err => {                   
                msgAlert({
                    heading: 'Error removing userInfo',
                    message: messages.removeUserInfoFailure,
                    variant: 'danger'
                })
            })
    }

    if (!userInfo) {
        return <LoadingScreen />
    }

    return (
        <>
            <Container className="fluid">
                <Card>
                    <Card.Header>{ userInfo.fullTitle }</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <div><small>First Name: { userInfo.firstName }</small></div>
                            <div><small>Last Name: { userInfo.lastName }</small></div>
                            <div><small>Phone Number: { userInfo.phoneNumber }</small></div>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        {
                            userInfo.owner && user && userInfo.owner._id === user._id 
                            ?
                            <>
                                <Button onClick={() => setEditModalShow(true)} 
                                    className="m-2" 
                                    variant="warning"
                                >
                                    Edit User Info
                                </Button>
                                <Button onClick={() => removeTheUserInfo()}
                                    className="m-2"
                                    variant="danger"
                                >
                                    Delete User Info {userInfo.name}
                                </Button>
                            </>

                            :
                            null
                        }
                    </Card.Footer>
                </Card>
            </Container>
            <Container style={cardContainerLayout}>
            </Container>
            <EditUserInfoModal 
                user={user}
                userInfo={userInfo} 
                show={editModalShow} 
                updateUserInfo={updateUserInfo}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => setEditModalShow(false)} 
            />
        </>
    )
}

export default ShowUserInfo