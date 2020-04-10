import React, { useState } from 'react';
import styles from './search.module.css'
import axios from 'axios';
import {APIBase} from '../../config/constants';

function Search(props) {
    const [hasAWD, setHasAWD] = useState(false);
    const [hasBlindspotDetection, setHasBlindspotDetection] = useState(false);
    const [hasLaneDepartureWarning, setHasLaneDepartureWarning] = useState(false);
    const [hasLaneKeepAssist, setLaneKeepAssist] = useState(false);
    const [hasHUD, setHasHUD] = useState(false);
    const [hasAppleCar, setHasAppleCar] = useState(false);
    const [hasAndroidAuto, setHasAndroidAuto] = useState(false);
    const [hasEmergencyBraking, setHasEmergencyBraking] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [makes, setMakes] = useState([]);

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

        // axios.post('/find_by_attributes', searchParams).then(res=>{
        // setSearchResults(res.data.vehicles)
        // })
        setSearchResults([{ id: '12345', make: 'Hyundai', model: 'Kona', trim: 'Ultimate', year: '2020' }])
    }

    var renderSearchResults = () => {
        return searchResults.map(result => {
            return (
                <div key={result.id}>
                    <p>{result.make}</p>
                    <p>{result.model}</p>
                    <p>{result.year}</p>
                    <p>{result.trim}</p>
                </div>
            )
        })
    }
    var renderMakesSelect = async () =>{
        let res = await axios.get(`${APIBase}/vehicles/makes/`);
        // let res = await axios.get('http://127.0.0.1:8000/vehicles/makes/')
        if(res.status){

        }
        
    }
    renderMakesSelect()
    return (
        <div className={styles.search_master}>
            <button onClick={getSearchResults}>Search</button>
            <div className={styles.options_wrapper}>
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
            </div>
            {renderSearchResults()}
        </div>
    );
}
export default Search;


