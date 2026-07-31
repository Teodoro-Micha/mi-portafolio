#exercice 2 de CC2
#PRENOM: Nzon Nchama
#NOM: Teodoro Micha


carnet = {
    "Teodoro Micha": "0612345678",
    "Micha Nzo": "0789101112",
    "Nzo Nchama": "0689741369",
    "Nchama Djárdel": "0788321654"
}

while True:
    print("1. Ajouter un contact")
    print("2. Supprimer un contact")
    print("3. Afficher les contacts")
    print("4. Modifier un contact")
    
    choix = input("Choisissez une option (1-4) : ")
    
    
    # 1. AJOUTER
    if choix == "1":
        prenom = input("Entrez le prénom : ")
        nom = input("Entrez le nom : ")
        
        nom_complet = f"{prenom} {nom}"
        numero = input("Entrez le numéro : ")
        
        carnet[nom_complet] = numero
        print(f"{nom_complet} ajouté !")

    # 2. SUPPRIMER
    elif choix == "2":
        prenom = input("Entrez le prénom du contact à supprimer : ")
        nom = input("Entrez le nom : ")
        nom_complet = f"{prenom} {nom}"
        
        if nom_complet in carnet:
            del carnet[nom_complet]
            print(f"{nom_complet} a été supprimé.")
        else:
            print("Contact introuvable.")

    # 3. AFFICHER
    elif choix == "3":
        if len(carnet) == 0:
            print("Le carnet est vide.")
        else:
            for nom_complet in carnet:
                print(f"{nom_complet}: {carnet[nom_complet]}")

    # 4. MODIFIER
    elif choix == "4":
        prenom = input("Entrez le prénom du contact à modifier : ")
        nom = input("Entrez le nom : ")
        nom_complet = f"{prenom} {nom}"
        
        if nom_complet in carnet:
            print(f"Numéro actuel : {carnet[nom_complet]}")
            nouveau_numero = input("Entrez le nouveau numéro : ")
            
            carnet[nom_complet] = nouveau_numero
            print("numéro modifié")
        else:
            print("Contact introuvable.")
            
    else:
        print("Option invalide. Choisissez entre 1 et 4.")