import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import BetterTable from '../BetterTable/BetterTable';
import { APIBase } from '../../config/constants';

// import Search from '../Search/Search';

const Dashboard =()=>{
    const route = '/vehicles/vehicles';

    var setTableData = (dataArr) => {
        return dataArr.map(data => {
            return {
                year: data.year,
                make: data.make.name,
                v_model: data.v_model.name
            }
        })
    };
    const columns = React.useMemo(
        () => [
            {
                Header: 'Year',
                accessor: 'year',
                filterable:false,
                sortable:false
            },
            {
                Header: 'Make',
                accessor: 'make',
                filterable:false,
                sortable:false
            },
            {
                Header: 'Model',
                accessor: 'v_model',
                filterable:false,
                sortable:false
            }
        ],
        []
    );

        return (
            <div>
                <h1>Dashboard</h1>
                <BetterTable setTableData={setTableData} reqURL={`${APIBase}${route}`} columns={columns}/>

            </div>
        );
}

export default Dashboard;