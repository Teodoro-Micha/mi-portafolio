#TARIFA DE CINE

def Tarifa_de_Cine(edad,fin_de_semana):
    if edad < 0 or edad > 120:
        return "Edad invalida"
    elif edad < 12:
        tarifa_base = 30

    elif edad >=12 and edad <= 25:
        tarifa_base = 50

    elif edad >= 26 and edad <= 60:
        tarifa_base = 70

    elif edad > 60:
        tarifa_base = 40

    if fin_de_semana == "N":
        precio_final = tarifa_base
        return f"Debes pagar {precio_final} dh"
    elif fin_de_semana == "S":
        precio_final = tarifa_base+20
        return f"Debes pagar {precio_final} dh"
    else:
        return "Debes responder solo con una (S) o una (N): "
        
edad = int(input("Hola, por favor introduce tu edad: "))
fin_de_semana = str(input("¿La función es un fin de semana? Responde (S) para sí y (N), para no:"))


resultado = Tarifa_de_Cine(edad,fin_de_semana)

print(resultado)



