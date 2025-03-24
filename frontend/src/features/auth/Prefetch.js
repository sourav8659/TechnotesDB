import React, {useEffect} from 'react'
import {Outlet} from 'react-router-dom'
import {store} from '../../app/strore'
import {usersApiSlice} from '../users/usersApiSlice'
import {notesApiSlice} from '../notes/notesApiSlice'

const Prefetch = () => {
    
    useEffect(() => {
        // console.log('subscribing')
        // const notes=store.dispatch(notesApiSlice.endpoints.getNotes.initiate())
        // const users=store.dispatch(usersApiSlice.endpoints.getUsers.initiate())
        store.dispatch(notesApiSlice.util.prefetch('getNotes','notesList',{force: true}))
        store.dispatch(usersApiSlice.util.prefetch('getUsers','usersList',{force: true}))
        /* return () => {
            console.log('unsubscribing')
            notes.unsubscribe()
            users.unsubscribe()
        } */
    }, [])
    
    return <Outlet />
}

export default Prefetch