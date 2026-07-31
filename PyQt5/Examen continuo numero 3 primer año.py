import os
import sys
import re
from PyQt5.QtWidgets import (
    QApplication,
    QWidget,
    QLabel,
    QLineEdit,
    QPushButton,
    QVBoxLayout,
    QHBoxLayout,
    QFrame,
    QMessageBox
)
from PyQt5.QtCore import QRegExp, Qt
from PyQt5.QtGui import QRegExpValidator


def valider_formulaire():
    nom = txtNom.text().strip()
    prenom = txtPrenom.text().strip()
    age = txtAge.text().strip()
    email = txtEmail.text().strip()
    telephone = txtTelephone.text().strip()

    
    if not nom or not prenom or not age or not email or not telephone:
        QMessageBox.warning(fenetre, "Erreur", "Tous les champs sont obligatoires.")
        return

    # Validation du email:
    patron_email = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
    if not re.match(patron_email, email):
        QMessageBox.warning(fenetre, "Erreur", "L'adresse email n'est pas valide.")
        return

    
    texte_resultat = (
        f"📋 Informations saisies :\n\n"
        f"Nom : {nom}\n"
        f"Prénom : {prenom}\n"
        f"Âge : {age} ans\n"
        f"Email : {email}\n"
        f"Téléphone : {telephone}"
    )

    lblResultat.setText(texte_resultat)




app = QApplication(sys.argv)

fenetre = QWidget()
fenetre.setWindowTitle("liste de contacts")
fenetre.resize(450, 550)


lblNom = QLabel("Nom :")
txtNom = QLineEdit() 

lblPrenom = QLabel("Prénom :")
txtPrenom = QLineEdit() 

lblAge = QLabel("Âge :")
txtAge = QLineEdit() 
# Pour l'âge, nous n'acceptons que les nombres entiers (maximum 2 chiffres).
txtAge.setValidator(QRegExpValidator(QRegExp(r"^[0-9]{1,2}$"), txtAge))

lblEmail = QLabel("Email :")
txtEmail = QLineEdit() 

lblTelephone = QLabel("Téléphone :")
txtTelephone = QLineEdit() 
# Pour les numéros de téléphone : uniquement des chiffres, aucun autre caractère:
txtTelephone.setValidator(QRegExpValidator(QRegExp(r"^[0-9]*$"), txtTelephone))

btnValider = QPushButton("Valider") #


cardResultat = QFrame()
cardResultat.setObjectName("cardResultat")

lblResultat = QLabel(" 📋 Informations saisies ")
lblResultat.setObjectName("lblResultat")
lblResultat.setWordWrap(True) 


layoutNom = QHBoxLayout()
layoutNom.addWidget(lblNom, 1) 
layoutNom.addWidget(txtNom, 4)

layoutPrenom = QHBoxLayout()
layoutPrenom.addWidget(lblPrenom, 1)
layoutPrenom.addWidget(txtPrenom, 4)

layoutAge = QHBoxLayout()
layoutAge.addWidget(lblAge, 1)
layoutAge.addWidget(txtAge, 4)

layoutEmail = QHBoxLayout()
layoutEmail.addWidget(lblEmail, 1)
layoutEmail.addWidget(txtEmail, 4)

layoutTel = QHBoxLayout()
layoutTel.addWidget(lblTelephone, 1)
layoutTel.addWidget(txtTelephone, 4)


layoutCard = QVBoxLayout()
layoutCard.addWidget(lblResultat) 
layoutCard.setAlignment(Qt.AlignTop)
cardResultat.setLayout(layoutCard)


mainLayout = QVBoxLayout()
mainLayout.addLayout(layoutNom)
mainLayout.addLayout(layoutPrenom)
mainLayout.addLayout(layoutAge)
mainLayout.addLayout(layoutEmail)
mainLayout.addLayout(layoutTel)
mainLayout.addWidget(btnValider)
mainLayout.addWidget(cardResultat)


btnValider.clicked.connect(valider_formulaire)


fenetre.setStyleSheet("""
    QWidget {
        background-color: #ffffff;
        font-family: 'Segoe UI', Arial, sans-serif;
        font-size: 14px;
        color: #2c3e50;
    }
    QLabel {
        font-weight: bold;
    }
    QLineEdit {
        padding: 6px;
        border: 1px solid #cbd5e1;
        border-radius: 4px;
        background-color: #f8fafc;
    }
    QLineEdit:focus {
        border: 1px solid #3498db;
        background-color: #f8fafc;
    }
    QPushButton {
        background-color: #257ebe;
        color: white;
        border: none;
        border-radius: 4px;
        padding: 10px;
        font-weight: bold;
        font-size: 15px;
        margin-top: 10px;
        margin-bottom: 10px;
    }
    QPushButton:hover {
        background-color: #1d6fa5;
    }
    QFrame#cardResultat {
        border: 2px solid #3498db;
        border-radius: 6px;
        background-color: #f4f9fc;
        padding: 10px;
    }
    QLabel#resultatTitle {
        color: #2c3e50;
        font-size: 15px;
        margin-bottom: 5px;
    }
""")

fenetre.setLayout(mainLayout)
fenetre.show()
sys.exit(app.exec_())