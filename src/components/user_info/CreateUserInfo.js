import { useState } from 'react'
import { createUserInfo } from '../../api/userInfo'
import { useNavigate } from 'react-router-dom'
import { createUserInfoSuccess, createUserInfoFailure } from '../shared/AutoDismissAlert/messages'
import UserInfoForm from '../shared/UserInfoForm'

const CreateUserInfo = (props) => {
    // console.log('these are the props in createUserInfo\n', props)
    const { user, msgAlert } = props

    const navigate = useNavigate()

    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
    })

    console.log('this is the userInfo in createUserInfo', userInfo)


    const handleChange = (e) => {
        setUserInfo(prevUserInfo => {
            let updatedValue = e.target.value
            const updatedName = e.target.name
            console.log('this is the input type', e.target.type)

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
        e.preventDefault()
        console.log('this is the user', user)
        console.log('this is the userInfo', userInfo)
        createUserInfo(user, userInfo)
            .then(res => { navigate(`/userInfo/${res.data.userInfo._id}`)})
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: createUserInfoSuccess,
                    variant: 'success'
                })
            })
            .catch(() => 
                msgAlert({
                    heading: 'Oh No!',
                    message: createUserInfoFailure,
                    variant: 'danger'
                })
            )
    }


    return (
        <UserInfoForm 
        userInfo={ userInfo } 
            handleChange={ handleChange }
            handleSubmit={ handleSubmit }
            heading="Add a new userInfo!"
        />
    )
}

export default CreateUserInfo