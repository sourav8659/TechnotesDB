import React from 'react'
import {useParams} from 'react-router-dom'
// import {useSelector} from 'react-redux'
import PulseLoader from 'react-spinners/PulseLoader'
// import {selectUserById} from './usersApiSlice'
import {useGetUsersQuery} from './usersApiSlice'
import EditUserForm from "./EditUserForm"

const EditUser = () => {
    
    const {id}=useParams()
    // const user=useSelector(state => selectUserById(state,id))
    const {user}=useGetUsersQuery("usersList", {
        selectFromResult: ({data}) => ({
            user: data?.entities[id]
        })
    })
    
    if(!user)  return <PulseLoader color={"#FFF"} />
    
    // const content=user ? <EditUserForm user={user} /> : <p>Loading...</p>
    const content=<EditUserForm user={user} />
    return content
}

export default EditUser