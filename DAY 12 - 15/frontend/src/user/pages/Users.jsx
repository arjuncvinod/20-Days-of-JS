import React, { useEffect, useState } from 'react';
import UserList from '../components/UsersList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';


function Users() {
    const {isLoading,sendRequest,error,clearError} = useHttpClient();
    const [loadedUsers, setLoadedUsers] = useState();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
               
                const responseData = await sendRequest(`${import.meta.env.VITE_API_URL}/api/users/`);
            
                setLoadedUsers(responseData.users);
            } catch (error) {
                console.log(error);
            } 
        };

        fetchUsers(); 
    }, [sendRequest]);



    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (
                <div className='center'>
                    <LoadingSpinner />
                </div>
            )}
            {!isLoading && loadedUsers && <UserList items={loadedUsers} />}
        </React.Fragment>
    );
}

export default Users;
