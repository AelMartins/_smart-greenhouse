import React, { useEffect, useState } from 'react';

const DataPlant = (props) => {
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

            let { weight, illumination, celsius, humidity } = res.result;

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
            <div className="dataPlant">
                <img src="../images/home_page/ligthning.png" alt="Lightning" />
                <p className="label_text_style">{dataPlant.illumination}</p>
            </div>
            <div className="dataPlant">
                <img src="../images/home_page/plant.png" alt="Plant" />
                {error ? (
                    <p className="errorText">{error}</p>
                ) : (
                    <p className="label_text_style">{dataPlant.weight}</p>
                )}
            </div>
            <div className="dataPlant">
                <div>
                    <img src="../images/home_page/thermometer.png" alt="Thermometer" />
                    <p className="label_text_style">{dataPlant.celsius}</p>
                </div>
                <div>
                    <img src="../images/home_page/sensor.png" alt="Sensor" />
                    <p className="label_text_style">{dataPlant.humidity}</p>
                </div>
            </div>
        </div>
    );
};

export default DataPlant;
