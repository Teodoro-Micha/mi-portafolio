
def convert_temp(temp, scale):
    if scale == "C":
        # Conversión de Celsius a Fahrenheit
        result = (temp * 9/5) + 32
        print(f"{temp}°C equivale a {result}°F")
    elif scale == "F":
        # Conversión de Fahrenheit a Celsius
        result = (temp - 32) * 5/9
        print(f"{temp}°F equivale a {result}°C")
    else:
        # Mensaje de error para escalas no válidas
        print("Error: La escala debe ser 'C' (Celsius) o 'F' (Fahrenheit).")

# Ejemplos de uso:
convert_temp(25, "C")  # Debería dar 77.0°F
convert_temp(98.6, "F") # Debería dar 37.0°C
convert_temp(100, "X")  # Mensaje de error