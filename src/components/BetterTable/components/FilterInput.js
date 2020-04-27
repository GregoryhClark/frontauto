import React from 'react';
import styles from '../BetterTable.module.css'

const FilterInput = (props) => {

    return (
        <div  className = {styles.filterWrapper}>
            <label className = {styles.filterLabel}>{props.title}</label>
            <input 
             className = {styles.filterInput}
                onChange={(e)=>{console.log(e.target.value);props.setFilter(props.accessor, e.target.value)}}
            />
        </div>
    )
}

export default FilterInput;