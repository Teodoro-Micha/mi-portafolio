function verifierCandidature(event) {
    const nom = document.getElementById('nom').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const certif = document.getElementById('certif').checked;


    if (nom === "") {
        alert("Veuillez saisir votre nom complet.");
        event.preventDefault(); // Empêcher l'envoi du formulaire
        return false;
    }

    if (email === "") {
        alert("Veuillez saisir votre adresse e-mail.");
        event.preventDefault(); // Empêcher l'envoi du formulaire
        return false;
    }

    
    if (!email.includes('@')) {
        alert("L'adresse e-mail n'est pas valide (le symbole '@' est manquant).");
        event.preventDefault(); // Empêcher l'envoi du formulaire
        return false;
    }

    
    if (message.length < 10) {
        alert("Votre lettre de motivation doit contenir au moins 10 caractères.");
        event.preventDefault(); // Empêcher l'envoi du formulaire
        return false;
    }

    s
    if (!certif) {
        alert("Vous devez certifier que les informations sont exactes avant d'envoyer.");
        event.preventDefault(); // Empêcher l'envoi du formulaire
        return false;
    }

    
    return true;
}