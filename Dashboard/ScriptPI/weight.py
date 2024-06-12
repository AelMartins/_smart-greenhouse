import random

def generate_weight_data(date_range):
    weight_data = []
    current_weight = 0  # Peso inicial
    for date in date_range:
        # Apenas gera peso às 12:00 de segunda-feira
        if date.weekday() == 0 and date.hour == 12 and date.minute == 0:
            # Incremento de peso aleatório entre 50g e 120g
            weight_increase = random.uniform(50, 100)
            current_weight += weight_increase
            weight_data.append(round(current_weight, 2))  # Arredondar para duas casas decimais
        else:
            weight_data.append(0)  # Outros horários têm peso zero
    
    return weight_data