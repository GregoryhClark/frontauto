import React from 'react';

const FilterSelect = (props) => {

    var options = props.options.map(option => {
        return <option key={option.id} value={option.id}>{option.text}</option>
    })
    return (
        <div>
            <label>{props.label}</label>
            {/* <select onChange={(e)=>{console.log(e.target.value);props.setFilter(props.label, e.target.value)}}>
                {options}
            </select> */}
            <input 
                onChange={(e)=>{console.log(e.target.value);props.setFilter(props.label, e.target.value)}}
            />
        </div>
    )
}

export default FilterSelect;