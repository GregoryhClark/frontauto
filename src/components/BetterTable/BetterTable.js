import React from 'react'
import styled from 'styled-components'
import { useTable, usePagination } from 'react-table'
import axios from 'axios';

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 3px solid #eee;

    tbody{
        border: 1px solid blue;
        background-color:white;
        box-shadow: 0 0 0 1px black;
    }
    tr:nth-child(even){
        background-color:#f0f0f0;
        // background-color:#f5f5ff;
    }
    tr: hover{
        background-color:#f5f5ff;
    }

    thead {
        box-shadow: 0 0 0 1px black;

    }
    th {
        background-color: #f5f7f7;
        padding: .25em;
        font-weight: 600;
        font-size: 12px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
    }
    // th :after{
    //     border-right: 1px solid rgba(189, 195, 199, 0.5);
    // content: " ";
    // height: 16px;
    // margin-top: 8px;
    // position: absolute;
    // text-indent: -2000px;
    // top: 0;
    // }
    td {
      margin: 0;
      padding: 0.5rem;
      :first-child{
        border-right: 1px solid black;
    }
    :last-child{
        border-right: 0;
    }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`

// inner table border : border: 1px solid #BDC3C7;

function Table({
    columns,
    data,
    fetchData,
    loading,
    pageCount: controlledPageCount,
    rowCount,
}) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        // Get the state from the instance
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 },
            manualPagination: true,
            pageCount: controlledPageCount,
        },
        usePagination
    )

    // Listen for changes in pagination and use the state to fetch new data
    React.useEffect(() => {
        fetchData({ pageIndex, pageSize, rowCount })
    }, [fetchData, pageIndex, pageSize, rowCount])

    return (
        <>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? ' 🔽'
                                                : ' 🔼'
                                            : ''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                    <tr>
                        {loading ? (
                            // Use our custom loading state to show a loading indicator
                            <td colSpan="10000">Loading...</td>
                        ) : (
                                <td colSpan="10000">
                                    Showing {page.length} of {rowCount}{' '}
                results
                                </td>
                            )}
                    </tr>
                </tbody>
            </table>

            <div className="pagination">
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>{' '}
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {'<'}
                </button>{' '}
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {'>'}
                </button>{' '}
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                </button>{' '}
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>
                <span>
                    | Go to page:{' '}
                    <input
                        type="number"
                        min={1}
                        defaultValue={pageIndex + 1}
                        onChange={e => {
                            const page = e.target.value ? Number(e.target.value) : 0
                            gotoPage(page - 1)
                        }}
                        style={{ width: '100px' }}
                    />
                </span>{' '}
                {/* This could be added later, but it would need to be added as a parameter in the viewset. */}
                {/* <select
                    value={pageSize}
                    onChange={e => {
                        setPageSize(Number(e.target.value))
                    }}
                >
                    {[10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select> */}
            </div>
        </>
    )
}

function BetterTable(props) {

    const [data, setData] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [pageCount, setPageCount] = React.useState(0)
    const fetchIdRef = React.useRef(0)
    const [rowCount, setRowCount] = React.useState(0)

    const fetchData = React.useCallback(async ({ pageIndex, pageSize }) => {

        // Give this fetch an ID
        const fetchId = ++fetchIdRef.current
        console.log("ID", fetchId)

        setLoading(true)
        //Only update the data if this is the latest fetch
        let res = await axios.get(`${props.reqURL}/?page=${pageIndex + 1}`);

        if (fetchId === fetchIdRef.current) {
            setPageCount(Math.ceil(res.data.count / res.data.page_size))
            setData(props.setTableData(res.data.results))
            setRowCount(res.data.count)
            setLoading(false)
        }
    }, [])

    return (
        <div style={{ border: "3px solid #eee", padding: "10px" }}>
            <Styles>
                <Table
                    columns={props.columns}
                    data={data}
                    fetchData={fetchData}
                    loading={loading}
                    pageCount={pageCount}
                    rowCount={rowCount}
                />
            </Styles>
        </div>

    )
}

export default BetterTable
