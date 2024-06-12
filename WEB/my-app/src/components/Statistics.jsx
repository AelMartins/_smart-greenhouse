import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Container, Typography, MenuItem, FormControl, Select, CircularProgress, Box, Button } from '@mui/material';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { useNavigate } from 'react-router-dom';

const api = require('../utils/api');

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend
);

const Statistics = () => {
    const navigate = useNavigate();

    const plant_id = sessionStorage.getItem('plant_id');
    const plant_name = sessionStorage.getItem('plant_name');

    const defaultDataChart = {
        labels: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'],
        datasets: [{ data: [0, 0, 0, 0, 0] }]
    }

    const [message, setMessage] = useState(null)
    const [loading, setLoading] = useState(true)
    const [dataChart, setDataChart] = useState(defaultDataChart)
    const [selectedChartData, setSelectedChartData] = useState('weight')

    const fetchData = async () => {
        try {
            const res = await api.get(`/data-plants/chart/${selectedChartData}?plant_id=${plant_id}`);
            if (res.result.data.length > 0) {
                setDataChart({
                    labels: res.result.labels || defaultDataChart.labels,
                    datasets: res.result.data.length > 0 ? [{ data: res.result.data }] : defaultDataChart.datasets
                });
                setMessage(null);
            } else {
                throw new Error('Nenhum dado registrado');
            }
        } catch (error) {
            const messageError = error.response?.data?.message || error.message;
            setMessage(messageError);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 10 * 1000);
        return () => clearInterval(interval);
    }, [selectedChartData, fetchData]);

    const handlePickerChange = (event) => {
        setSelectedChartData(event.target.value);
        setLoading(true);
    }

    const handleGoToDataPlant = () => {
        navigate('/dataPlant'); 
    }

    return (
        <Box sx={{ backgroundColor: '#2D9831', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Container sx={{ borderRadius: 10, backgroundColor: 'white', width: '95%', height: '85%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '10%', padding: 2 }}>
                    <Typography variant="h5" sx={{ color: '#2D9831', fontWeight: 'bold' }}>
                        Dados de {plant_name}:
                    </Typography>
                    {loading ? (
                        <CircularProgress />
                    ) : !message ? (
                        <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                            <Select
                                value={selectedChartData}
                                onChange={handlePickerChange}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Sem valor' }}
                                sx={{ backgroundColor: '#4fb055', borderRadius: 1, color: 'white' }}
                            >
                                <MenuItem value="weight">Peso</MenuItem>
                                <MenuItem value="humidity">Umidade</MenuItem>
                                <MenuItem value="illumination">Iluminação</MenuItem>
                                <MenuItem value="celsius">Temperatura</MenuItem>
                            </Select>
                        </FormControl>
                    ) : (
                        <Typography sx={{ color: '#2D9831' }}>{message}</Typography>
                    )}
                </Box>

                <Box sx={{ height: '78%' }}>
                    <Line
                        data={dataChart}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    display: false
                                }
                            },
                            elements: {
                                point: {
                                    radius: 5,
                                    borderWidth: 1,
                                    borderColor: '#2D9831'
                                }
                            }
                        }}
                    />
                </Box>
                <Button onClick={handleGoToDataPlant}>Ver Dados da Planta</Button> {/* Botão para a rota '/data-plant' */}
            </Container>
        </Box>
    );
};

export default Statistics;
