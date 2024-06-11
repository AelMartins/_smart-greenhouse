import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import './HomeUser.css'; 

const api = require('../utils/api');

const HomeUser = (data) => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const navigate = useNavigate();

  const defineUserName = (() => {
    const name = (user?.name || '').split(' ')[0];
    const formattedName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    return formattedName;
  })();

  const defineMessage = (message, set, time = 2500) => {
    set(message);
    setTimeout(() => set(''), time);
    console.log(JSON.stringify(message));
  };

  const [error, setError] = useState('');
  const [modalNewPlant, setModalNewPlant] = useState(false);
  const [messageNewPlant, setMessageNewPlant] = useState(null);
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPlantName, setNewPlantName] = useState('');
  const [modalDeletePlant, setModalDeletePlant] = useState(false);
  const [selectedPlantDelete, setSelectedPlantDelete] = useState(null);

  const fetchData = async () => {
    try {
      const res = await api.get(`/plants?user_id=${user?.id}`);
      setPlants(res.result);
    } catch (err) {
      defineMessage(err.message, setError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10 * 1000);
    return () => clearInterval(interval);
  }, []);

  const addNewPlant = async () => {
    if (!newPlantName) {
      defineMessage('Preencha os campos corretamente', setMessageNewPlant);
      return;
    }

    try {
      setMessageNewPlant({ msg: 'Carregando...' });

      await api.post('/plants', {
        user_id: user?.id,
        name: newPlantName,
      }).then(res => defineMessage({ msg: `${newPlantName} adicionada com sucesso` }, setMessageNewPlant, 1500));

      await fetchData();
      setNewPlantName('');
      setModalNewPlant(false);
    } catch (err) {
      defineMessage({
        error: true,
        msg: err.response?.data?.message || 'Erro ao adicionar planta',
      }, setMessageNewPlant);
    }
  };

  const deletePlant = async () => {
    try {
      await api.destroy(`/plants/${selectedPlantDelete.id}`);
      setPlants(plants.filter(plant => plant.id !== selectedPlantDelete.id));
      setModalDeletePlant(false);
      setSelectedPlantDelete(null);
    } catch (error) {
      defineMessage(error.response?.data || 'Erro ao deletar planta', setError);
    }
  };

  const handlerDataPlant = (plant_id, plant_name) => {
    // console.log('plant_id: ', plant_id);
    // console.log('plant_name: ', plant_name);
    setPlants({ plant_id, plant_name });
    navigate(`/dataPlant`, { plant_id, plant_name });
  }

  const renderItem = (item) => (
    <div className="card plant-card" key={item.id}>
      <p className="text-style" onClick={() => { handlerDataPlant(item.id, item.name); }}>{item.name}</p>
      <Button 
        variant="outlined" 
        color="secondary" 
        onClick={() => { 
          setSelectedPlantDelete(item);
          setModalDeletePlant(true); 
        }}
      >
        Excluir
      </Button>
    </div>
  );

  return (
    <div className="container background">
      <div className="container content">
        <div className="navibar">
          <p className="text-style title">Olá, {defineUserName}!</p>
          <button className="button-navibar" onClick={() => { setModalNewPlant(true); }}>
            Adicionar
          </button>
        </div>
        {loading ? (
          <p className="text-style loading">Carregando plantas...</p>
        ) : plants.length === 0 ? (
          <p className="text-style no-plants">Nenhuma plantinha cadastrada</p>
        ) : (
          <div className="list-plants">
            {plants.map(item => renderItem(item))}
          </div>
        )}
      </div>

      {modalDeletePlant && (
        <div className="modal">
          <div className="modal-content">
            <p className="modal-text">Deseja deletar {selectedPlantDelete?.name}?</p>
            <div className="modal-buttons">
              <Button variant="outlined" color="primary" onClick={() => { setModalDeletePlant(false); setSelectedPlantDelete(null); }}>
                Cancelar
              </Button>
              <Button variant="contained" color="secondary" onClick={deletePlant}>
                Deletar
              </Button>
            </div>
          </div>
        </div>
      )}

      {modalNewPlant && (
        <div className="modal">
          <div className="modal-content">
            <label className="label-text">Nome</label>
            <input
              value={newPlantName}
              className={`text-input ${error && 'error-input'}`}
              onChange={(e) => setNewPlantName(e.target.value)}
              placeholder="Nome da planta"
            />
            <p className={messageNewPlant?.error ? 'error-text' : 'loading-request-text'}>
              {messageNewPlant?.msg || ''}
            </p>
            <div className="modal-buttons">
              <Button variant="outlined" color="primary" onClick={() => { setModalNewPlant(false); setSelectedPlantDelete(null); }}>
                Cancelar
              </Button>
              <Button variant="contained" color="primary" onClick={addNewPlant}>
                Adicionar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeUser;
