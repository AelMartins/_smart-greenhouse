import random

def generate_humidity_data(date_range):
    humidity_data = []
    for date in date_range:
        # Umidade média mensal aproximada
        monthly_avg_humidity = {
            1: 70, 2: 70, 3: 70, 4: 65, 5: 60, 6: 55, 
            7: 55, 8: 55, 9: 60, 10: 65, 11: 70, 12: 70
        }
        base_humidity = monthly_avg_humidity[date.month]

        # Variação diurna: mais alta de madrugada e manhã, mais baixa à tarde
        if 0 <= date.hour < 6:  # Madrugada
            diurnal_variation = random.uniform(5, 10)
        elif 6 <= date.hour < 12:  # Manhã
            diurnal_variation = random.uniform(0, 5)
        elif 12 <= date.hour < 18:  # Tarde
            diurnal_variation = random.uniform(-10, -5)
        else:  # Noite
            diurnal_variation = random.uniform(0, 5)

        # Ajuste diário aleatório
        daily_variation = random.uniform(-5, 5)
        
        # Umidade final
        humidity = base_humidity + diurnal_variation + daily_variation
        humidity = max(40, min(80, round(humidity, 1)))  # Limitar entre 40% e 80%
        humidity_data.append(humidity)
    
    return humidity_data