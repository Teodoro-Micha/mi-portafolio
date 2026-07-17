total_alumnos = int(input("¿Cuántos alumnos quieres introducir?:"))

registro_faltas = {}

for i in range(total_alumnos):
    print(f"\nALUMNO {i+1}")
    nombre = input("Nombre del alumno: ").capitalize()
    faltas = int(input(f"Número de faltas de {nombre}: "))

# Guardamos en el diccionario:
    registro_faltas[nombre] = faltas

total_faltas_clase = sum(registro_faltas.values())

max_faltas = max(registro_faltas.values())

# Buscamos qué alumno o alumnos tienen ese número máximo (por si hay empate):
alumnos_mas_faltas = []
for alumno, faltas in registro_faltas.items():
    if faltas == max_faltas:
        alumnos_mas_faltas.append(alumno)

print(" RESUMEN DE ASISTENCIA ")
# Mostramos la lista completa de faltas por alumno:
for alumno, faltas in registro_faltas.items():
    print(f"{alumno}, tiene {faltas} faltas")

print(f"La cantidad de faltas totales en la clase es de {total_faltas_clase}")

#(.join) sirve para unir los elementos de la lista (Alumnos_mas_faltas) con comas y espacio (", ") como se lo hemos indcado
Nombre_top = ", ".join(alumnos_mas_faltas)
print(f"Los alumnos con más faltas son: {Nombre_top}, con {max_faltas} faltas")
