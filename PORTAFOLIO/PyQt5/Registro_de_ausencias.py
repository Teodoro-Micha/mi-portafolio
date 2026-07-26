import sys
from PyQt5.QtWidgets import(QApplication, QWidget, QLabel, QLineEdit, QPushButton, QVBoxLayout, QHBoxLayout, QMessageBox, QTableWidget, QTableWidgetItem, QHeaderView)

from PyQt5.QtCore import Qt

class Registro_Ausencias_App(QWidget):
    def __init__(self):
        super().__init__()
        # Creamos el diccionario para almacenar los datos (Nombre: Faltas):
        self.Registro_faltas ={}
        self.init_ui()

    def init_ui(self):
        # Configuramos la Ventana Principal:
        self.windowTitle("Control de Asistencia")
        self.resize(450, 500)

        self.etiqueta_nombre = QLabel("Nombre del Alumno:")
        self.texto_nombre = QLineEdit()
        self.texto_nombre.setPlaceholderText("Ejemplo: Teodoro")

        self.etiqueta_faltas = QLabel("Número de faltas:")
        self.texto_faltas = QLineEdit()
        self.texto_faltas.setPlaceholderText("Un número entero")

        self.boton_guardar = QPushButton("Registrar alumno")
        self.boton_calcular = QPushButton("Resultados")

        # Mostramos alumnos introducidos:
        self.tabla = QTableWidget()
        self.tabla.setColumnCount(2)
        self.tabla.setHorizontalHeader(["ALUMNO", "FALTAS"])
        self.tabla.horizontalHeader().setSectionResizeMode(QHeaderView.Stretch)


        # Mostramos los resultados finales:
        self.etiqueta_total = QLabel("Cantidad de ausencia: ")
        self.etiqueta_top = QLabel("Los más ausentes: ")

        self.etiqueta_total.setStyleSheet("font-weight: bold; color: #2c3e50;")
        self.etiqueta_top.setStyleSheet("font-weight: bold; color: #c0392b;")

        organizador_principal = QVBoxLayout()
        organizador_entradas = QHBoxLayout()

        organizador_entradas.addWidget(self.etiqueta_nombre)
        organizador_entradas.addWidget(self.texto_nombre)
        organizador_entradas.addWidget(self.etiqueta_faltas)
        organizador_entradas.addWidget(self.texto_faltas)

        organizador_principal.addLayout(organizador_entradas)
        organizador_principal.addWidget(self.boton_guardar)
        organizador_principal.addWidget(self.tabla)
        organizador_principal.addWidget(self.boton_calcular)
        organizador_principal.addWidget(self.etiqueta_total)
        organizador_principal.addWidget(self.etiqueta_top)

        self.setLayout(organizador_principal)


        # Conectamos los Botones a las Funciones:
        self.boton_guardar.clicked.connect(self.guardar_alumno)
        self.boton_calcular.clicked.connect(self.calcular_resultados)


    def guardar_alumno(self):
        nombre_crudo = self.texto_nombre.text().strip()
        faltas_crudas = self.texto_faltas.text().strip()

        # Ponemos validación para evitar campos vacíos:
        if not nombre_crudo or not faltas_crudas:
            QMessageBox.warning(self, "Campos vacíos", "Por favor, rellena ambos campos.")
            return

        nombre = nombre_crudo.capitalize()

        try:
            faltas = int(faltas_crudas)
        except ValueError:
            QMessageBox.critical(self, "Error de tipo", "El número de faltas debe ser un número entero.")
            return

        self.registro_faltas[nombre] = faltas

        # Actualizamos la tabla:
        fila = self.tabla.rowCount()
        self.tabla.insertRow(fila)
        self.tabla.setItem(fila, 0, QTableWidgetItem(nombre))
        self.tabla.setItem(fila, 1, QTableWidgetItem(str(faltas)))

        self.texto_nombre.clear()
        self.texto_text = self.texto_faltas.clear()
        self.texto_nombre.setFocus()


    def calcular_resultados(self):





    
