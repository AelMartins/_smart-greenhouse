import pandas as pd
from datetime import datetime
from temperature import generate_temperature_data
from humidity import generate_humidity_data
from weight import generate_weight_data
from luminosity import generate_luminosity_data

# Configurações iniciais
start_date = datetime(2024, 1, 1, 0, 0)
end_date = datetime(2024, 12, 31, 23, 59)
date_range = pd.date_range(start_date, end_date, freq='H')

# Gerar dados
temperature_data = generate_temperature_data(date_range)
humidity_data = generate_humidity_data(date_range)
weight_data = generate_weight_data(date_range)
luminosity_data = generate_luminosity_data(date_range)

# Criar DataFrame
data = {
    'Data': date_range.date,
    'Hora': date_range.time,
    'Temperatura (°C)': temperature_data,
    'Umidade (%)': humidity_data,
    'Peso (g)': weight_data,
    'Luminosidade (lumens)': luminosity_data
}
df = pd.DataFrame(data)

# Salvar em Excel
df.to_csv('dados-planta.csv', index=False)
