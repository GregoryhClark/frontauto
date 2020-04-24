import React from 'react';
import FilterSelect from './FilterSelect';

const TableFilters = (props) =>{
    return (
        <div>
            <FilterSelect options={[{id:1, text:'Honda'}, {id:2,text:'Tesla'}]} label={"Make"} setFilter={props.setFilter}/>
            <button onClick={()=>props.fetchData()}>Apply</button>
        </div>
    )
}

export default TableFilters;