#El profesor nos dio este programa y nos encomendó perfeccionarlo y corregir los errores que tenga.

import os
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

from PyQt5.QtCore import Qt

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

    contact = {nom} - {tel}
    if email:
        contact += f" - {email}"

    listeContacts.addItem(str(contact))

    with open("contacts.txt", "a", encoding="utf-8") as f:
         f.write(contact + "\n")

    qlabelMessage.setText("✅ Contact ajouté avec succès !")
    qlabelMessage.setStyleSheet("color: #2ecc71; font-weight: bold;")

    #Para dejar el formulario vacío y listo, evitando que el usuario tenga que borrar cada campo a mano antes de escribir un nuevo contacto. Volvemos a llamar a la función.
    reset_campos


def supprimer_contact():

    row = listeContacts.currentRow()

    if row < 0:
        QMessageBox.warning(fenetre, "Sélection", "Veuillez sélectionner un contact.")
        return
    
    reponse = QMessageBox.question(
        fenetre,
        "confirmation",
        "Êtes-vous sûr de vouloir supprimer ce contact ?",
        QMessageBox.OUI | QMessageBox.NON
    )
    if reponse == QMessageBox.OUI:
        listeContacts.takeItem(row)
        
        #Despues de borrar el contacto, reescribimos el archivo con lo que queda en la lista visual
        with open("contacts.txt", "w", encoding="utf-8") as f:
            for i in range(listeContacts.count()):
                f.write(listeContacts.item(i).text() + "\n")
        
        qlabelMessage.setText("🗑️ Contact supprimé.")
        qlabelMessage.setStyleSheet("color: #e67e22; font-weight: bold;")


def rechercher_contact():
    texte = txtRecherche.text().lower().strip()

    for i in range(listeContacts.count()):
        element = listeContacts.item(i)
        if texte in element.text().lower():
            element.setHidden(False)
        else:
            element.setHidden(True)

#HASTA AQUI HE CORREGIDO, POR AHORA.

def charger_contacts():
        with open("contacts.txt", "r", encoding="utf-8") as f:

            for ligne in f:
                listeContacts.addItem(ligne.strip())
        



app = QApplication(sys.argv)

fenetre = QWidget()
fenetre.setWindowTitle("Carnet de Contacts")
fenetre.resize(200, 150)

title = QLabel("📒 CARNET DE CONTACTS")

title.setObjectName("title")

txtNom = QLineEdit()
txtNom.setPlaceholderText("Nom complet")

txtTel = QLineEdit()
txtTel.setPlaceholderText("Téléphone")

txtEmail = QLineEdit()
txtEmail.setPlaceholderText("Email")

btnAjouter = QPushButton("➕ Ajouter Contact")

qlabelMessage = QLabel()
txtRecherche = QLineEdit()
txtRecherche.setPlaceholderText("🔍 Rechercher un contact...")

listeContacts = QListWidget()



btnSupprimer = QPushButton("🗑 Supprimer")
btnQuitter = QPushButton("❌ Quitter")



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
txtRecherche.textChanged.connect(rechercher_contact)

fenetre.setStyleSheet("""
    QFrame#card{
                 background-color:red;     }
    QWidget{
        background-color:#f4f6f9;
        font-family:'Segoe UI';
    }
    QLabel#title{
        font-size:34px;
        font-weight:bold;
        color:#2c3e50;
        padding:20px;
    }
    QPushButton{
        background:#3498db;
        color:white;
        border:none;
        border-radius:12px;
        padding:15px;
        font-size:18px;
        font-weight:bold;
        min-height:25px;
    }
    
""")
charger_contacts()
fenetre.setLayout(mainLayout)
fenetre.show()
sys.exit(app.exec_())




