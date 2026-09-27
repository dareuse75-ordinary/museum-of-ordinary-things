// db.js - May kasamang function para sa pag-apruba ng artifact

function getArtifacts() {
    return JSON.parse(localStorage.getItem('museum_artifacts')) || [];
}

// Function para palitan ang status ng artifact (Approved / Pending)
function updateArtifactStatus(id, newStatus) {
    let artifacts = getArtifacts();
    let index = artifacts.findIndex(item => item.id === id);
    if (index !== -1) {
        artifacts[index].status = newStatus;
        localStorage.setItem('museum_artifacts', JSON.stringify(artifacts));
        return true;
    }
    return false;
}

// Function para mag-delete
function deleteArtifact(id) {
    let artifacts = getArtifacts();
    artifacts = artifacts.filter(item => item.id !== id);
    localStorage.setItem('museum_artifacts', JSON.stringify(artifacts));
}
