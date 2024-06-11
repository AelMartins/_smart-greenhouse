import React, { useEffect, useState } from 'react';
import lightningImage from '../images/home_page/ligthning.png'; // Importa a imagem diretamente
import plantImage from '../images/home_page/plant.png'; // Importa a imagem diretamente
import sensorImage from '../images/home_page/sensor.png'; // Importa a imagem diretamente
import thermometerImage from '../images/home_page/thermometer.png'; // Importa a imagem diretamente
import './DataPlant.css';


const DataPlant = (props) => {
    console.log(props)
    const [dataPlant, setDataPlant] = useState({});
    const [error, setError] = useState(null);
    const { plant_id, plant_name } = props.route?.params || {};

    const fetchData = async () => {
        try {
            // Simulação de dados
            const res = {
                result: {
                    
                    weight: 1500,
                    illumination: 80,
                    celsius: 25,
                    humidity: 60
                }
            };

            let { plant_name, weight, illumination, celsius, humidity } = res.result;

            if (weight < 1000) {
                weight = `${weight} g`;
            } else {
                const weightInKg = (weight / 1000).toFixed(2);
                weight = `${weightInKg} kg`;
            }

            const result = {
                weight,
                illumination: `${illumination}%`,
                celsius: `${celsius}ºC`,
                humidity: `${humidity}% MC`
            };

            setDataPlant(result);
            setError(null);
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

    return (
        <div className="container">
            <h1>{plant_name}</h1>
            <div className="panel">
                <div className="imageContainer">
                    <img src={plantImage} alt="Plant" className="plantImage" />
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
                    <div className="dataPlant">
                        {error ? (
                            <p className="errorText">{error}</p>
                        ) : (
                            <p className="label_text_style">{dataPlant.weight}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataPlant;
