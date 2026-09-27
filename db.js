// db.js - Mock database at Auto-increment naming function na may suporta sa pag-edit ng image file

function getArtifacts() {
    let artifacts = JSON.parse(localStorage.getItem('museum_artifacts')) || [];
    return artifacts;
}

// Function para mag-save ng bagong artifact
function saveNewArtifact(title, description, imageFileUrl) {
    let artifacts = getArtifacts();
    
    let nextNumber = artifacts.length + 1;
    let formattedNum = String(nextNumber).padStart(2, '0');

    let newEntry = {
        id: nextNumber,
        imageName: `Artifact.image #${formattedNum}`,
        imageUrl: imageFileUrl, // Dito nakalagay ang file ng image na pwedeng palitan o i-edit
        descriptionName: `Artifact.Description #${formattedNum}`,
        title: title,
        description: description,
        audioName: `Artifact.audio #${formattedNum}`,
        audioUrl: "", // Manual na ilalagay ng Admin galing Google Drive
        views: 0,
        likes: 0,
        status: "Pending"
    };

    artifacts.push(newEntry);
    localStorage.setItem('museum_artifacts', JSON.stringify(artifacts));
    return formattedNum;
}

// Function para ma-update/ma-edit ng Admin o sa Donate ang image file at iba pang detalye
function updateArtifactImage(id, newImageFileUrl) {
    let artifacts = getArtifacts();
    let index = artifacts.findIndex(item => item.id === id);
    
    if (index !== -1) {
        artifacts[index].imageUrl = newImageFileUrl;
        localStorage.setItem('museum_artifacts', JSON.stringify(artifacts));
        return true;
    }
    return false;
}
