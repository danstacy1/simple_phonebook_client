import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import UserInfoForm from '../shared/UserInfoForm'
import { updateUserInfoSuccess, updateUserInfoFailure } from '../shared/AutoDismissAlert/messages'

const EditUserInfoModal = (props) => {
    const { 
        user, show, handleClose, 
        updateUserInfo, msgAlert, triggerRefresh
    } = props
    
    const [userInfo, setUserInfo] = useState(props.userInfo)

    console.log('userInfo in edit modal', userInfo)

    const handleChange = (e) => {
        setUserInfo(prevUserInfo => {
            let updatedValue = e.target.value
            const updatedName = e.target.name

            console.log('this is the input type', e.target.type)

            if (e.target.type === 'number') {
                // this is looking at the input type, and changing it from the default, which is a string, into an actual number
                updatedValue = parseInt(e.target.value)
            }

            // this handles the checkbox, changing on to true etc
            if (updatedName === "forsale" && e.target.checked) {
                updatedValue = true
            } else if (updatedName === "forsale" && !e.target.checked) {
                updatedValue = false
            }

            const updatedUserInfo = {
                [updatedName]: updatedValue
            }
            return {
                ...prevUserInfo,
                ...updatedUserInfo
            }
        })
    }

    const handleSubmit = (e) => {
        // e equals the event
        e.preventDefault()

        updateUserInfo(user, userInfo)
            // if we're successful in the modal, we want the modal to close
            .then(() => handleClose())
            // send a success message to the user
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: updateUserInfoSuccess,
                    variant: 'success'
                })
            })
            // if everything is successful, we need to trigger our refresh for the show page
            // this is that setUpdated function in showUserInfo component
            // updated is in ShowUserInfo's useEffect's dependency array
            // changes to the updated boolean cause ShowUserInfo's useEffect to run again.
            .then(() => triggerRefresh())
            // if there is an error, tell the user about it
            .catch(() => 
                msgAlert({
                    heading: 'Oh No!',
                    message: updateUserInfoFailure,
                    variant: 'danger'
                })
            )
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <UserInfoForm 
                    userInfo={userInfo}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Update UserInfo"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditUserInfoModal