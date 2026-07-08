#El profesor nos dio este programa y nos encomendó perfeccionarlo y corregir los errores que tenga.
#También encomendó añadir un boton "Actualizar (actualiser)", que actualice el carnet.


import os #Para que el programa interactue con los archivos del ordenador.
import sys
from PyQt5.QtWidgets import (
    QApplication,
    QWidget,
    QLabel,
    QLineEdit,
    QPushButton,
    QListWidget,
    QVBoxLayout,
    QHBoxLayout,
    QFrame,
    QMessageBox
)

#Me he dado cuenta haciendo otras pruebas, que el campo del telefono, acepta letras, por eso hago estas modificaciones, para impedirlo, los números de teléfono, no contienen letras:
from PyQt5.QtCore import QRegExp, Qt
from PyQt5.QtGui import QRegExpValidator

#Función para limpiar todos los campos del formulario de una vez, en lugar de escribir .clear() para cada campo por separado.
def reset_campos():
    txtNom.clear()
    txtTel.clear()
    txtEmail.clear()
    qlabelMessage.clear()
    txtNom.clearFocus()


def ajouter_contact():
    nom = txtNom.text().strip()
    tel = txtTel.text().strip()
    email = txtEmail.text().strip()

    if not nom or not tel:
        qlabelMessage.setText(" ⚠️ Le nom et le téléphone sont obligatoires.")
        qlabelMessage.setStyleSheet("color: #e74c3c; font-weight: bold;")
        return
    
    import re #Me servirá para validar correos, con el formato internacional de los mismos.
    patron_email = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
    if email and not re.match(patron_email, email):
        qlabelMessage.setText("⚠️ L'adresse email n'est pas valide.")
        #Para darle forma y color al mensaje:
        qlabelMessage.setStyleSheet("color: #e74c3c; font-weight: bold;")
        #Para evitar que el programa no siga ejecutándose si el correo está, ponemos "return", porque si no, aunque el correo esté mal, seguirá ejecutándose y lo guardará en ese estado.
        return

    contact_str = f"{nom} - {tel}"
    if email:
        contact_str += f" - {email}"

    listeContacts.addItem(contact_str)

    with open("contacts.txt", "a", encoding="utf-8") as f:
         f.write(contact_str + "\n")

    qlabelMessage.setText("✅ Contact ajouté avec succès !")
    #Para darle forma y color al mensaje:
    qlabelMessage.setStyleSheet("color: #2ecc71; font-weight: bold;")

    #Para dejar el formulario vacío y listo, evitando que el usuario tenga que borrar cada campo a mano antes de escribir un nuevo contacto. Volvemos a llamar a la función.
    reset_campos()


def supprimer_contact():
    row = listeContacts.currentRow()

    if row < 0:
        QMessageBox.warning(fenetre, "Sélection", "Veuillez sélectionner un contact.")
        return
    
    reponse = QMessageBox.question(
        fenetre,
        "confirmation",
        "Êtes-vous sûr de vouloir supprimer ce contact ?",
        QMessageBox.Yes | QMessageBox.No
    )
    if reponse == QMessageBox.Yes:
        listeContacts.takeItem(row)
        
        #Despues de borrar el contacto, reescribimos el archivo con lo que queda en la lista visual:
        with open("contacts.txt", "w", encoding="utf-8") as f:
            for i in range(listeContacts.count()):
                f.write(listeContacts.item(i).text() + "\n")
        
        qlabelMessage.setText("🗑️ Contact supprimé.")
        #Para darle forma y color al mensaje:
        qlabelMessage.setStyleSheet("color: #e67e22; font-weight: bold;")


def rechercher_contact():
    texte = txtRecherche.text().lower().strip()

    for i in range(listeContacts.count()):
        element = listeContacts.item(i)
        if texte in element.text().lower():
            element.setHidden(False)
        else:
            element.setHidden(True)



def charger_contacts():
        #Si el archivo contacts.txt no existe todavía, que el programa no haga nada más (evita que el programa se rompa intentando abrir un archivo que no está)
        if not os.path.exists("contacts.txt"):
            return

        with open("contacts.txt", "r", encoding="utf-8") as f:
            for ligne in f:
                if ligne.strip():
                    listeContacts.addItem(ligne.strip())


def actualiser_contacts():
    listeContacts.clear()
    txtRecherche.clear()
    #Después de vaciar la lista visual, necesito que le programa vuelva a leer el archivo contacts.txt para rellenarlo con los datos actuales:
    charger_contacts()
    qlabelMessage.setText("🔄 Liste actualisée.")
    qlabelMessage.setStyleSheet("color: #3498db; font-weight: bold;")
        



app = QApplication(sys.argv)
fenetre = QWidget()
fenetre.setWindowTitle("Carnet de Contacts")
#Cambio el tamaño porque considero que el nuevo es el adecuado, para evitar que se amontone todo. 
fenetre.resize(450, 600)

title = QLabel("📒 CARNET DE CONTACTS")
title.setObjectName("title")
#Para centrar el texto de este titulo:
title.setAlignment(Qt.AlignCenter)

txtNom = QLineEdit()
#Para recordarle al usuario que este campo es obligatorio rellenarlo, añado el *:
txtNom.setPlaceholderText("Nom complet *")

txtTel = QLineEdit()
#Para recordarle al usuario que este campo es obligatorio rellenarlo, añado el *:
txtTel.setPlaceholderText("Téléphone *")

# Para que solo permita números (0-9), el signo + y espacios:
règle_téléphone = QRegExp(r"^[0-9+\s]*$")
#Con este validador, será imposible poner una letra en el campo de telefono:
validateur_tel = QRegExpValidator(règle_téléphone, txtTel)
txtTel.setValidator(validateur_tel)

txtEmail = QLineEdit()
txtEmail.setPlaceholderText("Email")

btnAjouter = QPushButton("➕ Ajouter Contact")

qlabelMessage = QLabel()
#Para centra el texto del mensaje (error, confirmación, etc.), así consigo que se vea bien alineado con el resto del formulario:
qlabelMessage.setAlignment(Qt.AlignCenter)

txtRecherche = QLineEdit()
txtRecherche.setPlaceholderText("🔍 Rechercher un contact...")

listeContacts = QListWidget()


btnSupprimer = QPushButton("🗑 Supprimer")
#Para poderle dar un estilo personalizado en CSS a este botón:
btnSupprimer.setObjectName("btnSupprimer")

btnQuitter = QPushButton("❌ Quitter")
#Para poderle dar un estilo personalizado en CSS a este botón:
btnQuitter.setObjectName("btnQuitter")

btnActualiser = QPushButton("🔄 Actualiser")
btnActualiser.setObjectName("btnActualiser")


formCard = QFrame()
formCard.setObjectName("card")


formLayout = QVBoxLayout()
formLayout.addWidget(txtNom)
formLayout.addWidget(txtTel)
formLayout.addWidget(txtEmail)
formLayout.addWidget(btnAjouter)
formLayout.addWidget(qlabelMessage)
formCard.setLayout(formLayout)


buttonsLayout = QHBoxLayout()
buttonsLayout.addWidget(btnActualiser)
buttonsLayout.addWidget(btnSupprimer)
buttonsLayout.addWidget(btnQuitter)


mainLayout = QVBoxLayout()
mainLayout.addWidget(title)
mainLayout.addWidget(formCard)
mainLayout.addWidget(txtRecherche)
mainLayout.addWidget(listeContacts)
mainLayout.addLayout(buttonsLayout)

btnAjouter.clicked.connect(ajouter_contact)
btnSupprimer.clicked.connect(supprimer_contact)
btnActualiser.clicked.connect(actualiser_contacts)
#Para darle función al botón quitar, ya que seguía siendo un boton vació, simplemente visual. Ahora funcionará, cerrará la venta:
btnQuitter.clicked.connect(fenetre.close)
txtRecherche.textChanged.connect(rechercher_contact)

fenetre.setStyleSheet("""
    
    QWidget {
        background-color: #f8f9fa;
        font-family: 'Segoe UI', Arial, sans-serif;
        font-size: 14px;
    }
    QLabel#title {
        font-size: 24px;
        font-weight: bold;
        color: #2c3e50;
        padding: 10px;
    }
    
    QFrame#card {
        background-color: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        padding: 12px;
    }
    
    QLineEdit {
        padding: 8px;
        border: 1px solid #cbd5e1;
        border-radius: 6px;
        background: white;
    }
    
    QLineEdit:focus {
        border: 1px solid #3498db;
    }
                      
    QListWidget {
        background: white;
        border: 1px solid #cbd5e1;
        border-radius: 6px;
        padding: 5px;
    }
                      
    QPushButton{
        background:#3498db;
        color:white;
        border:none;
        border-radius:6px;
        padding:10px;
        font-weight:bold;
    }
                      
    QPushButton:hover {
        background-color: #2980b9;
    }
                      
    QPushButton#btnSupprimer {
        background-color: #e74c3c;
    }               
    QPushButton#btnSupprimer:hover {
        background-color: #c0392b;
    }
                      
    QPushButton#btnQuitter {
        background-color: #95a5a6;
    }
    QPushButton#btnQuitter:hover {
        background-color: #7f8c8d;
    }
                      
    QPushButton#btnActualiser {
        background-color: #2ecc71;             
    }
    QPushButton#btnActualiser:hover {
        background-color: #27ae60;
    }
                      
""")
charger_contacts()
fenetre.setLayout(mainLayout)
fenetre.show()
sys.exit(app.exec_())




