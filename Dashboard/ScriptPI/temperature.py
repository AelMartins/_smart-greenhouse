import random

# Temperaturas médias mensais aproximadas para São Paulo
monthly_avg_temp = {
    1: 23, 2: 24, 3: 23, 4: 21, 5: 19, 6: 17, 
    7: 17, 8: 19, 9: 20, 10: 21, 11: 22, 12: 23
}

def generate_temperature_data(date_range):
    temperature_data = []
    for date in date_range:
        # Temperatura média mensal
        base_temp = monthly_avg_temp[date.month]
        
        # Variação diurna: mais frio de madrugada e mais quente à tarde
        if 0 <= date.hour < 6:  # Madrugada
            diurnal_variation = random.uniform(-5, -2)
        elif 6 <= date.hour < 12:  # Manhã
            diurnal_variation = random.uniform(0, 3)
        elif 12 <= date.hour < 18:  # Tarde
            diurnal_variation = random.uniform(2, 5)
        else:  # Noite
            diurnal_variation = random.uniform(-2, 0)
        
        # Ajuste sazonal com uma pequena variação aleatória
        daily_variation = random.uniform(-1, 1)
        
        # Temperatura final
        temp = base_temp + diurnal_variation + daily_variation
        temp = round(temp, 1)  # Arredondar para uma casa decimal
        temperature_data.append(temp)
    
    return temperature_data