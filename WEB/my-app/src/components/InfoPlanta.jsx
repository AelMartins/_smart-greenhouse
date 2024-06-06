import './InfoPlanta.css';
import DataPlant from './DataPlant';



function InfoPlanta() {
  return (
    <div className="InfoPlanta">
      <div className="Panel">
        <h1>RELATÓRIO DA PLANTA</h1>
        <div className="subPanel">
          <div className="Grafico">
            <p className="textoTeste">GRAFICO AQUI Ó</p>
          </div>
          <div className="infoPlanta">
              <DataPlant />
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoPlanta;
