// db.js - Gamit ang simpleng format na Artifact1.jpg at Artifact1.mp3

function getArtifacts() {
    return JSON.parse(localStorage.getItem('museum_artifacts')) || [];
}

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

function deleteArtifact(id) {
    let artifacts = getArtifacts();
    artifacts = artifacts.filter(item => item.id !== id);
    localStorage.setItem('museum_artifacts', JSON.stringify(artifacts));
}

// Function para sa pag-save ng bagong artifact gamit ang simpleng pangalan
function saveNewArtifact(title, description) {
    let artifacts = getArtifacts();
    let nextNumber = artifacts.length + 1;

    let newEntry = {
        id: nextNumber,
        imageName: `Artifact.image #${String(nextNumber).padStart(2, '0')}`,
        imageUrl: `Artifact${nextNumber}.jpg`, // Halimbawa: Artifact1.jpg
        descriptionName: `Artifact.Description #${String(nextNumber).padStart(2, '0')}`,
        title: title,
        description: description,
        audioName: `Artifact.audio #${String(nextNumber).padStart(2, '0')}`,
        audioUrl: `Artifact${nextNumber}.mp3`, // Halimbawa: Artifact1.mp3
        views: 0,
        likes: 0,
        status: "Pending"
    };

    artifacts.push(newEntry);
    localStorage.setItem('museum_artifacts', JSON.stringify(artifacts));
    return nextNumber;
}
