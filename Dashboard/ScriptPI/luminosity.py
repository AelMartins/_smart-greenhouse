import random

def generate_luminosity_data(date_range):
    luminosity_data = []
    for date in date_range:
        # Variação diurna: mais luminosidade durante o dia, menos à noite
        if 6 <= date.hour < 18:  # Dia
            luminosity = random.uniform(500, 1000)  # Luminosidade alta durante o dia
        else:  # Noite
            luminosity = random.uniform(100, 300)  # Luminosidade baixa durante a noite
        luminosity_data.append(round(luminosity, 1))  # Arredondar para uma casa decimal
    
    return luminosity_data