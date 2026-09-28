// Database script para sa Museum of Ordinary Things na may Google Drive mapping
const IMAGE_MAP = {
    "1": "https://lh3.googleusercontent.com/d/1Wqqw5rSItBovn6gklxDDFTHjuxm2KNNV"
};

const AUDIO_MAP = {
    // Ilagay dito ang audio Google Drive ID kung kinakailangan
};

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
                audioUrl: "", 
                views: 1,
                likes: 0,
                status: "Approved"
            }
        ];
        localStorage.setItem('museum_artifacts', JSON.stringify(artifacts));
    }
    
    // I-aplay ang mga link mula sa mapping batay sa ID
    artifacts = artifacts.map(item => {
        const stringId = String(item.id);
        return {
            ...item,
            imageUrl: IMAGE_MAP[stringId] || item.imageUrl,
            audioUrl: AUDIO_MAP[stringId] || item.audioUrl
        };
    });
    
    return artifacts;
}

function updateArtifactStatus(id, newStatus) {
    let artifacts = JSON.parse(localStorage.getItem('museum_artifacts')) || [];
'    let index = artifacts.findIndex(item => item.id === id);
'    if (index !== -1) {
        artifacts[index].status = newStatus;
        localStorage.setItem('museum_artifacts', JSON.stringify(artifacts));
        return true;
    }
    return false;
}

function deleteArtifact(id) {
    let artifacts = JSON.parse(localStorage.getItem('museum_artifacts')) || [];
    artifacts = artifacts.filter(item => item.id !== id);
    localStorage.setItem('museum_artifacts', JSON.stringify(artifacts));
}

function saveNewArtifact(title, description, visitorImageName = "", audioDriveUrl = "") {
    let artifacts = JSON.parse(localStorage.getItem('museum_artifacts')) || [];
    let nextNumber = artifacts.length + 1;

    let newEntry = {
        id: nextNumber,
        visitorOriginalImage: visitorImageName,
        imageName: `Artifact.image #${String(nextNumber).padStart(2, '0')}`,
        imageUrl: `Artifact${nextNumber}.jpg`,
        descriptionName: `Artifact.Description #${String(nextNumber).padStart(2, '0')}`,
        title: title,
        description: description,
        audioName: `Artifact.audio #${String(nextNumber).padStart(2, '0')}`,
        audioUrl: audioDriveUrl,
        views: 0,
        likes: 0,
        status: "Pending"
    };

    artifacts.push(newEntry);
    localStorage.setItem('museum_artifacts', JSON.stringify(artifacts));
    return nextNumber;
}
