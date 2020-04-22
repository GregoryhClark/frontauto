import React from "react";
import axios from 'axios';
import { APIBase } from "../../config/constants";
// import styled from 'styled-components'
import { useTable } from 'react-table'

// const Styles = styled.div`
//   padding: 1rem;

//   table {
//     border-spacing: 0;
//     border: 1px solid black;

//     tr {
//       :last-child {
//         td {
//           border-bottom: 0;
//         }
//       }
//     }

//     th,
//     td {
//       margin: 0;
//       padding: 0.5rem;
//       border-bottom: 1px solid black;
//       border-right: 1px solid black;

//       :last-child {
//         border-right: 0;
//       }
//     }
//   }
// `

function RenderTable({ columns, data }) {
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data,
    })

    // var getData = async (page, pageSize, sorted, filtered, callback) => {
    //     let res = await axios.get(`${APIBase}/vehicles/vehicles/?page=${page}`);
    //     console.log(res)
    //     callback(res)
    // }

    // Render the UI for your table
    return (
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

function Table(props) {
    const columns = React.useMemo(
        () => [
            {
                Header: 'Year',
                accessor: 'year'
            },
            {
                Header: 'Make',
                accessor: 'make'
            },
            {
                Header: 'Model',
                accessor: 'v_model'
            }
        ],
        []
    );

    // var vehicleResults = [{year:"2020", make:"Tesla", v_model:"Model 3"}, {year:"2019", make:"Tesla", v_model:"Model 3"}, {year:"2018", make:"Tesla", v_model:"Model Y"}]
    var tableData = props.tableData ? props.tableData : [];
    var data = React.useMemo(
        () => tableData
    )
    var rightPageLimit = 3;
    var leftPageLimit = 2;
    var renderBeforeButtons = () => {

        // var pagesBefore = ()=>{
        var beforeBtns = [];
        for (let i = props.currentPage - 1; i > props.currentPage - rightPageLimit && i > 0; i--) {
            beforeBtns.unshift(<button style={{backgroundColor:"lightblue"}} onClick={()=>props.getPage(i)}>{i}</button>)
        }
        if(props.currentPage > rightPageLimit){
            if(props.currentPage !== rightPageLimit + 1){
                beforeBtns.unshift(<span>...</span>)
            }
            beforeBtns.unshift(<button style={{backgroundColor:"lightblue"}} onClick={()=>props.getPage(1)}>{1}</button>)
        }
        return beforeBtns;
        // }
        // var pagesAfter
        // return pagesBefore();
    }
    var renderLatterButtons = () => {
        let numPages = Math.ceil(props.count / props.page_size);
        var latterButtons = [];
        for (let i = props.currentPage + 1; i <= props.currentPage + leftPageLimit && i <= numPages; i++) {
            latterButtons.push(<button style={{backgroundColor:"lightblue"}} onClick={()=>props.getPage(i)}>{i}</button>)
        }
        if(props.currentPage<numPages-leftPageLimit){
            if(props.currentPage !== numPages-(leftPageLimit + 1)){
                latterButtons.push(<span>...</span>);
            }
            
            latterButtons.push(<button style={{backgroundColor:"lightblue"}} onClick={()=>props.getPage(numPages)}>{numPages}</button>)
        }
        return latterButtons;
    }

    return (
        // <Styles>
        //     <Table columns={columns} data={data} />
        // </Styles>
        <div>
            <RenderTable columns={columns} data={data} />
            <div>
                <button
                    disabled={!props.previousPage}
                    onClick={() => props.getTableData(props.previousPage)}
                >
                    Previous</button>
                {renderBeforeButtons()}
                <button disabled >{props.currentPage?props.currentPage:1}</button>
                {renderLatterButtons()}
                <button
                    disabled={!props.nextPage}
                    onClick={() => props.getTableData(props.nextPage)}
                >
                    Next</button>

            </div>
        </div>



    )
}

export default Table





