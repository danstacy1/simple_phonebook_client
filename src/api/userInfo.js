import apiUrl from '../apiConfig'
import axios from 'axios'

// READ => INDEX
export const getAllUserInfos = () => {
    return axios(`${apiUrl}/userInfos`)
}

// READ => SHOW
export const getOneUserInfo = (id) => {
    return axios(`${apiUrl}/userInfos/${id}`)
}

// CREATE
export const createUserInfo = (user, newUserInfo) => {
    // console.log('createUserInfo in api was hit')
    // console.log('this is user', user)
    // console.log('this is newUserInfo', newUserInfo)
    return axios({
		url: apiUrl + '/userInfos',
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
    // it's going to look like the userInfos in our database
    // we're going to refer to this as newUserInfo
    // console.log('this is user', user)
    console.log('this is updatedUserInfo', updatedUserInfo)
	return axios({
		url: `${apiUrl}/userInfos/${updatedUserInfo.id}`,
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
        url: `${apiUrl}/userInfos/${userInfoId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`,
        }
    })
}