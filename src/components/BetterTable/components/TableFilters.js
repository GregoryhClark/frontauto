import React from 'react';
import FilterInput from './FilterInput';
import styles from '../BetterTable.module.css';

const TableFilters = (props) =>{
    const getQueryParams = (filterData) =>{
        var params = '';
        for(var key in filterData){
            console.log("I DON'T EXIST",key, filterData[key])
            params = params + `?${key}=${filterData[key]}`
        } 
        return params !== '/'? params:'';
    }
    const runSearch = () =>{
        console.log("TABFIL6",props.filterData)
        props.filterData({pageIndex:0, queryParams:getQueryParams(props.filterData)})
    }

    const renderOptions = ()=>{
        var result = [];
        for (let i = 0; i < props.columns.length; i++){
            let option = props.columns[i]
            if (option.filterable){
                result.push(<FilterInput title={option.Header} accessor={option.accessor} setFilter={props.setFilter}/>)
            }
        }
        return result;
    }
    return renderOptions().length?(
        <div className={styles.filtersWrapper}>
            <div className={styles.filters}>
            {renderOptions()}
            </div>
            <button className={styles.filterBtn}onClick={runSearch}>Apply Filters</button>
        </div>
    ):null;
}

export default TableFilters;