inventario = {
    "Manzanas": 684,
    "Leche": 707,
    "Pan": 1084,
    "Aceitunas": 320
}

def ver_inventario():
    print("\n INVENTARIO ACTUAL ")
    for producto, cantidad in inventario.items():
        print(f"producto: {producto} | Stock: {cantidad} unidades")


def agregar_stock():
    #"capitalize" hace que el texto que se introduzca aparezca con la primera letra mayúscula y el resto en minúsculas:
    producto = input("Nombre del producto: ").capitalize()
    cantidad = int(input("¿Cuántas unidades vas a añadir?: "))

    # "get" busca el producto; si no existe, empieza en 0 y le suma la cantidad:
    inventario[producto] = inventario.get(producto, 0) + cantidad
    print(f"¡Inventario actualizado! Ahora tienes {inventario[producto]} unidades de {producto}.")


def registrar_venta():
    producto = input("¿Qué producto vas a vender?: ").capitalize()

    if producto in inventario:
        cantidad = int(input(f"¿Cuántas unidades vendes? (Disponibles: {inventario[producto]}): "))

        # Comprobamos si tenemos suficiente stock:
        if cantidad <= inventario[producto]:
            inventario[producto] -= cantidad
            print(f"¡Venta registrada! Quedan {inventario[producto]} unidades de {producto}.")
        else:
            print("Error: No tienes suficiente stock para realizar la venta.")
    else:
        print("Ese producto no existe en el inventario.")

while True:
    print("\n ¿QUÉ QUIERES HACER? ")
    print("1. Ver stock de productos")
    print("2. Agregar o actualizar stock")
    print("3. Registrar una venta")
    print("4. Salir")

    opcion = input("Elige una opción (1-4): ")

    if opcion == "1":
        ver_inventario()
    elif opcion == "2":
        agregar_stock()
    elif opcion == "3":
        registrar_venta()
    elif opcion == "4":
        print("¡Saliendo del programa!")
        break
    else:
        print("Opción incorrecta. Prueba otra vez.")
