import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Database = () => {
    const [users, setUsers] = useState([]);
    const [userDeleted, setUserDeleted] = useState();
    const [userLeft, setUserleft] = useState([])

    useEffect(() => {
        axios.get('/api/database')
            .then(res => {
                console.log(res.data)
                setUsers(res.data)
            })
    }, [])

    const handleClick = () => {
        axios.delete('api/del')
        setUsers([])
        setUserDeleted('database is empty')
    }

    const delUser = (e) => {
        axios.delete(`/api/del/${e}`)
            .then(res => {
                let item = Object.values(res.data)
                setUserDeleted(item[0])
                setUserleft(item[1]);

            })
        if (users) {
            axios.get('/api/database')
                .then(res => {
                    setUsers(res.data)
                })
        } else {
            return setUserDeleted('database is empty')
        }


    }

    return (
        <div className='wrapper'>
            <h2 className='logo'>MY Abreviations Dictionary</h2>
            <button onClick={handleClick}>Delete the entire database</button>
            <div>{userDeleted}</div>
            <div>{userLeft && userLeft.map(usr => <p>{usr.id}</p>)}</div>
            <div>
                <ul>
                    {
                        users && users.map(user => {
                            return <li key={user.id}><button onClick={() => delUser(user.id)}>Delete User</button> = {user.abr} --- {user.words}</li>
                        })
                    }

                </ul>
            </div>
        </div>

    )
}

export default Database