import React, { Component } from 'react';
import { firestore, createUserProfileDocument } from '../firebase.js';

import Posts from './Posts';
import { collectIdsAndDocs } from '../utilities.js';
import Authentication from './Authentication.jsx';
import { auth } from '../firebase';

class Application extends Component {
    render() {
        return (
            <main className="Application">
                <h1>Think Piece</h1>
                <Authentication />
                <Posts />
            </main>
        );
    }
}

export default Application;
