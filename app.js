// L’ajout de nouveaux rendez-vous

// L’enregistrement dans localStorage

// L’affichage dynamique dans le tableau

// La suppression d’un rendez-vous en un clic


let patients = JSON.parse(localStorage.getItem('patients'))  || []
const namePatient = document.getElementById(('nom-patient'))
const dateTime = document.getElementById(('date-heure'))
const reason = document.getElementById(('Motif'))
const btnAdd = document.getElementById(('btn-add'))
const patientsList = document.getElementById(('patients-list'))

// fonction pour sauvegarder dans localStorage
function savePatients() {
    localStorage.setItem('patients',JSON.stringify(patients))
}


// fonction pour afficher les patients
function renderPatients(){
    patientsList.innerHTML = ''
    patients.forEach((patient, index) => {
        const tr =document.createElement('tr')
        tr.classList.add('patient-row')

        tr.innerHTML =  `
                        <td class="p-2 border">${patient.nom}</td>
                        <td class="p-2 border">${patient.date}</td>
                        <td class="p-2 border">${patient.motif}</td>
                        <td class="p-2 border text-center">
                            <button class="btn-delete text-red-500 hover:text-red-700">
                                Supprimer
                            </button>
                        </td> `
                        patientsList.appendChild(tr)
    })}

//  Suppression 
patientsList.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-delete")) {
        const index = e.target.dataset.index;
        patients.splice(index, 1);
        savePatients();
        renderPatients();
    }
});

// Ajouter un nouveau patient
btnAdd.addEventListener("click", () => {
    const nom = namePatient.value.trim();
    const date = dateTime.value;
    const motif = reason.value.trim();

    if (nom === "" || date === "" || motif === "") {
        alert("Veuillez remplir tous les champs.");
        return;
    }

    const nouveauPatient = {
        nom,
        date,
        motif
    };

    patients.push(nouveauPatient);
    savePatients();
    renderPatients();

    // Réinitialiser les champs
    namePatient.value = "";
    dateTime.value = "";
    reason.value = "";
});

// Afficher les rendez-vous dès le chargement
renderPatients();