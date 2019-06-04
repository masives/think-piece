import React, { useContext } from 'react';

import CurrentUser from './CurrentUser';
import SignInAndSignUp from './SignInAndSignUp';
import { AuthContext } from '../providers/AuthProvider';

const Authentication = ({ loading }) => {
    if (loading) return null;
    const user = useContext(AuthContext);

    return <div>{user ? <CurrentUser {...user} /> : <SignInAndSignUp />}</div>;
};

export default Authentication;
