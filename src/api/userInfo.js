import apiUrl from '../apiConfig'
import axios from 'axios'

// READ => INDEX
export const getAllUserInfo = () => {
    return axios(`${apiUrl}/userInfo`)
}

// READ => SHOW
export const getOneUserInfo = (id) => {
    return axios(`${apiUrl}/userInfo/${id}`)
}

// CREATE
export const createUserInfo = (user, newUserInfo) => {
    // console.log('createUserInfo in api was hit')
    // console.log('this is user', user)
    // console.log('this is newUserInfo', newUserInfo)
    return axios({
		url: apiUrl + '/userInfo',
		method: 'POST',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { userInfo:  newUserInfo },
	})
}

// UPDATE
export const updateUserInfo = (user, updatedUserInfo) => {
    // console.log('createUserInfo in api was hit')
    // in our createUserInfo form, we're building an object
    // when we pass that object into the api createUserInfo function,
    // it's going to look like the userInfo in our database
    // we're going to refer to this as newUserInfo
    // console.log('this is user', user)
    console.log('this is updatedUserInfo', updatedUserInfo)
	return axios({
		url: `${apiUrl}/userInfo/${updatedUserInfo.id}`,
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { userInfo: updatedUserInfo }
	})
} 

// DELETE
export const removeUserInfo = (user, userInfoId) => {
    return axios({
        url: `${apiUrl}/userInfo/${userInfoId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`,
        }
    })
}