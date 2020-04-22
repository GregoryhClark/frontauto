import React, { useState, useEffect } from 'react';
import styles from './search.module.css'
import axios from 'axios';
import Table from '../Table/Table';
import { APIBase } from '../../config/constants';
import BetterTable from '../BetterTable/BetterTable';

function Search(props) {
    const [hasAWD, setHasAWD] = useState(false);
    const [hasBlindspotDetection, setHasBlindspotDetection] = useState(false);
    const [hasLaneDepartureWarning, setHasLaneDepartureWarning] = useState(false);
    const [hasLaneKeepAssist, setLaneKeepAssist] = useState(false);
    const [hasHUD, setHasHUD] = useState(false);
    const [hasAppleCar, setHasAppleCar] = useState(false);
    const [loadingMakes, setLoadingMakes] = useState(false);
    const [hasAndroidAuto, setHasAndroidAuto] = useState(false);
    const [hasEmergencyBraking, setHasEmergencyBraking] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [makes, setMakes] = useState([]);
    const [vModels, setVModels] = useState([]);
    const [filterParams, setFilterParams] = useState({});
    const [sortParams, setSortParams] = useState({});
    const [loadingModels, setLoadingModels] = useState(false)
    // const [tableData, setTableData] = useState([]);
    // const [nextPage, setNextPage] = useState('');
    // const [previousPage, setPreviousPage] = useState('');

    useEffect(() => {
        if (!loadingMakes && makes.length < 1) {
            getMakes()
        }
    });
    var getMakes = async () => {
        setLoadingMakes(true)
        var res = await axios.get(`${APIBase}/vehicles/makes/`);
        setLoadingMakes(false);
        setMakes(res.data)
    }

    var setTableData = (dataArr) => {
        return dataArr.map(data => {
            return {
                year: data.year,
                make: data.make.name,
                v_model: data.v_model.name
            }
        })
    }

    var getSearchResults = () => {
        var searchParams = {
            hasAWD,
            hasBlindspotDetection,
            hasLaneDepartureWarning,
            hasLaneKeepAssist,
            hasHUD,
            hasAppleCar,
            hasAndroidAuto,
            hasEmergencyBraking
        };

        axios.get(`${APIBase}/vehicles/vehicles/?page=1`).then(res => {
            console.log(res)
            setSearchResults({
                tableData: setTableData(res.data.results),
                nextPage: res.data.next,
                previousPage: res.data.previous,
                currentPage: res.data.cpage,
                count: res.data.count,
                page_size: res.data.page_size,
            })
        })
    }


    var getTableData = async (link) => {
        let res = await axios.get(link);
        setSearchResults({
            tableData: setTableData(res.data.results),
            nextPage: res.data.next,
            previousPage: res.data.previous,
            totalCount: res.data.count,
            currentPage: res.data.cpage,
            count: res.data.count,
            page_size: res.data.page_size
        })
    }
    var updateFilterParams = (key, val) => {
        if (key == 'make') {
            getModels(val);
        }
        var newParams = { ...filterParams };
        newParams[key] = val;
        setFilterParams(newParams);
    }

    var getPage = async (page) => {
        let res = await axios.get(`${APIBase}/vehicles/vehicles/?page=${page}`);
        setSearchResults({
            tableData: setTableData(res.data.results),
            nextPage: res.data.next,
            previousPage: res.data.previous,
            totalCount: res.data.count,
            currentPage: res.data.cpage,
            count: res.data.count,
            page_size: res.data.page_size
        })
    }
    var renderMakeOptions = () => {
        var options = [<option value={0} key={0}>Any</option>];
        makes.map(make => {
            options.push(<option key={make.id} value={make.id}>{make.name}</option>)
        })
        return options
    }
    var renderModelOptions = () => {
        var options = [<option value={0} key={0}>Any</option>];
        vModels.map(vModel => {
            options.push([<option value={vModel.id} key={vModel.id}>{vModel.name}</option>])
        })
        return options;
    }
    var renderYearOptions = () => {
        var years = [<option value={0} key={0}>Any</option>];
        for (let i = 2021; i > 1950; i--) {
            years.push(<option key={i} value={i.toString()}>{i}</option>);
        }
        return years;
    }
    var getModels = async (id) => {
        setLoadingModels(true)
        let res = await axios.get(`${APIBase}/vehicles/v_models/?make=${id}`);
        console.log(res)
        if (res.data) {
            setLoadingModels(false)
            setVModels(res.data);
        }
    }
    var sortOptions = () => {
        return [
            <option value={''}>Default</option>,
            <option value={'make'}>Make</option>,
            <option value={'v_model'}>Model</option>,
            <option value={'year'}>Year</option>]
    }
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
    return (
        <div className={styles.search_master}>
            {/* <button onClick={getSearchResults}>Search</button>
            <label>Make:</label><select onChange={(e) => updateFilterParams('make', e.target.value)}>{renderMakeOptions()}</select>
            <label>Model:</label><select onChange={(e) => updateFilterParams('v_model', e.target.value)}>{renderModelOptions()}</select>
            <label>Year:</label><select onChange={(e) => updateFilterParams('year', e.target.value)}>{renderYearOptions()}</select>

            <label>Sort by:</label>
    <select>{sortOptions()}</select> */}

            {/* 
            <Table
                getPage={getPage}
                tableData={searchResults.tableData}
                getTableData={getTableData}
                previousPage={searchResults.previousPage}
                nextPage={searchResults.nextPage}
                currentPage={searchResults.currentPage}
                count={searchResults.count}
                page_size={searchResults.page_size}
            /> */}
            {/* <div className={styles.options_wrapper}>
                <div className={styles.checkbox_wrapper}>
                    <label>AWD</label>
                    <input
                        type="checkbox"
                        checked={hasAWD}
                        onChange={(e) => { setHasAWD(e.target.checked) }}
                    />
                </div>
                <div className={styles.checkbox_wrapper}>
                    <label>Blind Spot Detection</label>
                    <input
                        type="checkbox"
                        checked={hasBlindspotDetection}
                        onChange={(e) => { setHasBlindspotDetection(e.target.checked) }}
                    />
                </div>
                <div className={styles.checkbox_wrapper}>
                    <label>Lane Departure Warning</label>
                    <input
                        type="checkbox"
                        checked={hasLaneDepartureWarning}
                        onChange={(e) => { setHasLaneDepartureWarning(e.target.checked) }}
                    />
                </div>
                <div className={styles.checkbox_wrapper}>
                    <label>Lane Keep Assist</label>
                    <input
                        type="checkbox"
                        checked={hasLaneKeepAssist}
                        onChange={(e) => { setLaneKeepAssist(e.target.checked) }}
                    />
                </div>
                <div className={styles.checkbox_wrapper}>
                    <label>HUD</label>
                    <input
                        type="checkbox"
                        checked={hasHUD}
                        onChange={(e) => { setHasHUD(e.target.checked) }}
                    />
                </div>
                <div className={styles.checkbox_wrapper}>
                    <label>Apple Car</label>
                    <input type="checkbox"
                        checked={hasAppleCar}
                        onChange={(e) => { setHasAppleCar(e.target.checked) }}
                    />
                </div>
                <div className={styles.checkbox_wrapper}>
                    <label>Android Auto</label>
                    <input type="checkbox"
                        checked={hasAndroidAuto}
                        onChange={(e) => { setHasAndroidAuto(e.target.checked) }}
                    />
                </div>
                <div className={styles.checkbox_wrapper}>
                    <label>Emergency Braking</label>
                    <input type="checkbox"
                        checked={hasEmergencyBraking}
                        onChange={(e) => { setHasEmergencyBraking(e.target.checked) }}
                    />
                </div>
            </div> */}
            <BetterTable setTableData={setTableData} reqURL={`${APIBase}/vehicles/vehicles`} columns={columns} />
        </div>
    );
}
export default Search;


