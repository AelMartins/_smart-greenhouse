import React, { useEffect, useState } from 'react';
import lightningImage from '../images/home_page/ligthning.png';
import plantImage from '../images/home_page/plant.png';
import sensorImage from '../images/home_page/sensor.png';
import thermometerImage from '../images/home_page/thermometer.png';
import { useNavigate } from 'react-router-dom';
import './DataPlant.css';

const api = require('../utils/api');

const DataPlant = () => {

    const navigate = useNavigate();

    const plant_id = sessionStorage.getItem('plant_id');
    const plant_name = sessionStorage.getItem('plant_name');

    console.log('plant_id', plant_id);
    console.log('plant_name', plant_name);

    const [dataPlant, setDataPlant] = useState({});
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const res = await api.get(`/data-plants/last-data/${plant_id}`);
            let { weight, illumination, celsius, humidity } = res.result;

            if (Object.values(res.result).every(key => key === null)) {
                throw new Error('Nenhum dado encontrado');
            } else {
                if (weight?.value < 1000) {
                    weight = weight?.value ? `${weight?.value} g` : '';
                } else {
                    const weightInKg = ((weight?.value || 0) / 1000).toFixed(2);
                    weight = weight?.value ? `${weightInKg} kg` : '';
                }

                const result = {
                    weight,
                    celsius: celsius?.value ? `${celsius?.value}ºC` : '',
                    humidity: humidity?.value ? `${humidity?.value}% MC` : '',
                    illumination: illumination?.value ? `${illumination?.value}%` : '',
                };

                setDataPlant(result);
                setError(null);
            }
        } catch (error) {
            setError(error.message);
            console.error(error.message);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 10 * 1000);
        return () => clearInterval(interval);
    }, []);

    const handleGoToGraf = () => {
        navigate('/graf'); // Redireciona para a rota '/graf'
    };

    return (
        <div className="container">
            <h1>{plant_name}</h1>
            <div className="panel">
                <div className="imageContainer">
                    <img src={plantImage} alt="Plant" className="plantImage" />
                    <p className="weightText">{dataPlant.weight}</p>
                </div>
                <div className="infoContainer">
                    <div className="dataPlant">
                        <img src={lightningImage} alt="Lightning" />
                        <p className="label_text_style">{dataPlant.illumination}</p>
                    </div>
                    <div className="dataPlant">
                        <img src={thermometerImage} alt="Thermometer" />
                        <p className="label_text_style">{dataPlant.celsius}</p>
                    </div>
                    <div className="dataPlant">
                        <img src={sensorImage} alt="Sensor" />
                        {error ? (
                            <p className="errorText">{error}</p>
                        ) : (
                            <p className="label_text_style">{dataPlant.humidity}</p>
                        )}
                    </div>
                </div>
            </div>
            <button className="button" onClick={handleGoToGraf}>Ver Gráfico</button> {/* Botão para a rota '/graf' */}
        </div>
    );
};

export default DataPlant;
