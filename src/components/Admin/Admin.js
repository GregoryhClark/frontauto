import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './admin.module.css';
import { APIBase } from '../../config/constants';


const Admin = () => {
    const [newVehicle, setNewVehicle] = useState({});
    const [loadingMakes, setLoadingMakes] = useState(false);
    const [loadedMakes, setLoadedMakes] = useState(false);
    const [makes, setMakes] = useState([]);
    const [loadingModels, setLoadingModels] = useState(false);
    const [loadedModels, setLoadedModels] = useState(false);
    const [models, setModels] = useState([]);

    const [year, setYear] = useState('2021');

    useEffect(() => {
        if (!loadingMakes && !loadedMakes) {
            getMakes()
        }
    });

    var getMakes = async () => {
        setLoadingMakes(true)
        var res = await axios.get(`${APIBase}/vehicles/makes/`);
        setLoadedMakes(true);
        setLoadingMakes(false);
        setMakes(res.data)
    }

    var setNewField = (field, value) => {
        console.log('Up her', value)
        let newVehicleData = { ...newVehicle };
        // console.log(newVehicleData)
        newVehicleData[field] = value;
        console.log(newVehicleData)
        setNewVehicle(newVehicleData);
        // console.log(newVehicle)
        setTimeout(1000, console.log('sec', newVehicleData))
    }

    var getModelOptions = () => {
        var getModelStrings = () => {
            switch (newVehicle.make) {
                case 'toyota': {
                    return ['c-hr', 'corolla', 'tacoma', 'camry']
                }
                case 'hyundai': {
                    return ['kona', 'elantra', 'sonata']
                }
                case 'subaru': {
                    return ['impreza', 'crosstrek', 'forester']
                }
                case 'nissan': {
                    return ['rogue', 'kicks', 'versa']
                }
                case 'ford': {
                    return ['ranger', 'focus', 'f-150']
                }
                default: {
                    return ['error']
                }
            }
        }
        if (newVehicle.make) {
            return getModelStrings().map(model => {
                return (
                    <option key={model}>{model.toUpperCase()}</option>
                )
            })
        }
        return <option value=''>Select Make First</option>
    }
    var getYearOptions = () => {
        var years = [];
        for (let i = 2021; i > 1950; i--) {
            years.push(<option key={i} value={i.toString()}>{i}</option>);
        }
        return years;
    }
    var renderMakeOptions = () => {
        if (makes.length) {
            return makes.map(make => {
                return <option value={make.id} key={make.id}>{make.name}</option>
            })
        }
        return <option>Awaiting Makes...</option>

    }
    var selectMake = (id)=>{
        setNewField('make', id)
        getModels(id);
    }
    var getModels = async(id)=>{
        setLoadingModels(true)
        let res = axios.get(`${APIBase}/vehicles/models/?make=${id}`);
        if(res.data){
            setLoadingModels(false)
            setModels(res.data);
        }
    }
    var createVehicle = async () =>{
        if(newVehicle.make && newVehicle.model){
            var res = await axios.post(`${APIBase}/vehicles/vehicle`);
            console.log(res)
        }
    }
    return (
        <div>
            <div className={styles.selectWrapper}>
                <label>Make</label>
                <select
                    onChange={(e) => { selectMake(e.target.value) }}
                >
                    {renderMakeOptions()}
                </select>
            </div><div className={styles.selectWrapper}>
                <label>Model</label>
                <select onChange={(e) => { setNewField('model', e.target.value) }}>
                    {getModelOptions()}
                </select>
            </div><div className={styles.selectWrapper}>
                <label>Year</label>
                <select onChange={(e) => { setYear(e.target.value) }}>
                    {getYearOptions()}
                </select>
            </div>
            <button disabled={!newVehicle.make || !newVehicle.model} onClick={createVehicle}>Submit</button>
            {/* <div className={styles.selectWrapper}>
                <label>Trim</label>
                <select onChange={(e) => { setNewField('trim', e.target.value) }}>
                    <option value={'s'}>S</option>
                    <option value={'se'}>SE</option>
                    <option value={'sel'}>SEL</option>
                    <option value={'limited'}>Limited</option>
                    <option value={'ultimate'}>Ultimate</option>
                    <option value={'platinum'}>Platinum</option>
                </select>
            </div> */}
        </div>
    );
};

export default Admin;