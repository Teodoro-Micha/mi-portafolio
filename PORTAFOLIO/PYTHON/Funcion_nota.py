def obtener_mencion(nota):
    if nota > 20 or nota<0:
        return "esta nota no es valida, debes introducir una nota entre 0 y 20"
    elif nota<10:
        return "has suspendido"
    elif nota>9 and nota<=11.9:
        return "es un aprobado justo"
    elif nota>=12 and nota<=13.9:
        return "Bastante bien"
    elif nota>=14 and nota<=15.9:
        return "notable"
    elif nota>=16 and nota<=20:
        return "sobresaliente"


nota_usuario = float(input("introduce la nota media que has obtenido en este curso (sobre 20): "))

resultado = obtener_mencion(nota_usuario)

print(resultado)





