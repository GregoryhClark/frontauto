import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
// import Search from '../Search/Search';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        
    }
    render() {
        return (
            <div>
                <h1>Dashboard</h1>
                {/* <Search /> */}
            </div>
        );
    }
}

export default Dashboard;