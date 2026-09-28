function getArtifacts() {
    let artifacts = JSON.parse(localStorage.getItem('museum_artifacts'));
    
    if (!artifacts || artifacts.length === 0) {
        artifacts = [
            {
                id: 1,
                visitorOriginalImage: "Artifact1.jpg",
                imageName: "Artifact.image #01",
                imageUrl: "Artifact1.jpg",
                descriptionName: "Artifact.Description #01",
                title: "Abaniko ni Coco",
                description: "Sana all tulad nitong pamaypay. Kahit luma na at kupas na ang bulaklak, naka-frame pa rin at mukhang sosyal sa dingding. Ako nga, bago-bago pa, pero mukhang pagod na. Ito, dekada na ang binilang, pero alagang-alaga, pinupunasan pa araw-araw at ipinagmamalaki sa mga bisita...",
                audioName: "Artifact.audio #01",
                audioUrl: "", // Ilagay ang Drive direct link dito kung kinakailangan para sa default item
                views: 1,
                likes: 0,
                status: "Approved"
            }
        ];
        localStorage.setItem('museum_artifacts', JSON.stringify(artifacts));
    }
    
    return artifacts;
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

function saveNewArtifact(title, description, visitorImageName = "", audioDriveUrl = "") {
    let artifacts = getArtifacts();
    let nextNumber = artifacts.length + 1;

    // Awtomatikong i-convert ang buong Google Drive link patungong direct stream format
    let finalAudioUrl = audioDriveUrl;
    if (audioDriveUrl.includes("drive.google.com")) {
        let match = audioDriveUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
        if (match && match[1]) {
            finalAudioUrl = `https://docs.google.com/uc?export=download&id=${match[1]}`;
        }
    }

    let newEntry = {
        id: nextNumber,
        visitorOriginalImage: visitorImageName,
        imageName: `Artifact.image #${String(nextNumber).padStart(2, '0')}`,
        imageUrl: `Artifact${nextNumber}.jpg`,
        descriptionName: `Artifact.Description #${String(nextNumber).padStart(2, '0')}`,
        title: title,
        description: description,
        audioName: `Artifact.audio #${String(nextNumber).padStart(2, '0')}`,
        audioUrl: finalAudioUrl,
        views: 0,
        likes: 0,
        status: "Pending"
    };

    artifacts.push(newEntry);
    localStorage.setItem('museum_artifacts', JSON.stringify(artifacts));
    return nextNumber;
}
