import { useState,useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'

import LoadingScreen from '../shared/LoadingScreen'
import { getAllUserInfo } from '../../api/userInfo'
import messages from '../shared/AutoDismissAlert/messages'


// UserInfoIndex should make a request to the api
// To get all userInfo
// Then display them when it gets them

// style for our card container
const cardContainerStyle = {
display: 'flex',
flexFlow: 'row wrap',
justifyContent: 'center'
}

const UserInfoIndex = (props) => {
const [userInfo, setUserInfo] = useState(null)
const [error, setError] = useState(false)

const { msgAlert } = props

console.log('Props in UserInfoIndex', props)

useEffect(() => {
    console.log(props)
    getAllUserInfo()
        .then(res => setUserInfo(res.data.shoes))
        .catch(err => {
            msgAlert({
                heading: 'Error Getting UserInfo',
                message: messages.getUserInfoFailure,
                variant: 'danger',
            })
            setError(true)
        })    
    }, [])

    if (error) {
        return <p>Error!</p>
    }

    // If userInfo haven't been loaded yet, show a loading message
    if (!userInfo) {
        return <LoadingScreen />
    } else if (userInfo.length === 0) {
        return <p>There aren't any people here. Better add some.</p>
    }

    const userInfoCards = userInfo.map(userInfo => (
        <Card style={{ width: '30%', margin: 5}} key={ userInfo.id }>
            <Card.Header>{ userInfo.fullTitle }</Card.Header>
            <Card.Body>
                <Card.Text>
                    <Link to={`/userInfo/${userInfo.id}`}>Check out the { userInfo.name }s</Link>
                </Card.Text>
            </Card.Body>
        </Card>
    ))

    return (
        <div style={ cardContainerStyle }>
            { userInfoCards }
        </div>
    )
}

export default UserInfoIndex