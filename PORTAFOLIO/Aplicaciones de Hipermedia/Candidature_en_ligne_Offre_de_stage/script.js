function verifierCandidature(event) {
    if (event) event.preventDefault();

    const nom = document.getElementById("nom").value.trim();
    const prenom = document.getElementById("prenom").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const certif = document.getElementById("certif").checked;
    const domaine = document.getElementById("domaine").value;
    const dureeSelected = document.querySelector('input[name="duree"]:checked');
    const cvInput = document.getElementById("cv");
    


    if (nom === "") {
        alert("Veuillez saisir votre nom.");
        event.preventDefault(); // Empêcher l'envoi du formulaire
        return false;
    }

    if (prenom === "") {
        alert("Veuillez saisir votre prenom.");
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

    if (domaine === "") {
            alert("Veuillez sélectionner un département pour le stage.");
            return;
    }

    if (!dureeSelected) {
            alert("Veuillez choisir une durée pour votre stage.");
            return;
    }

    if (!cvInput || cvInput.files.length === 0) {
    alert("Veuillez joindre votre Curriculum Vitae (CV).");
    return;
    }

    if (message === "") {
        alert("Veuillez rédiger une lettre de motivation.");
        return false;
    }
    
    if (message.length < 10) {
        alert("Votre lettre de motivation doit contenir au moins 10 caractères.");
        event.preventDefault(); // Empêcher l'envoi du formulaire
        return false;
    }

    if (!certif) {
        alert("Vous devez certifier que les informations sont exactes avant d'envoyer.");
        event.preventDefault(); // Empêcher l'envoi du formulaire
        return false;
    }

    alert('Votre candidature a été envoyée avec succès !');
    return true;
}

// 2. Boton RÉINITIALISER
document.addEventListener("DOMContentLoaded", () => {
    const botonReinitialiser = document.getElementById("boton_reinitialiser");

    botonReinitialiser.addEventListener("click", () => {
        if (confirm("Êtes-vous sûr de vouloir réinitialiser le formulaire ?")) {
        
        document.querySelector(".application-form").reset();
        }
    });      
});
