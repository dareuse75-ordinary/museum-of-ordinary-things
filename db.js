// db.js - May kasamang default artifact para laging may laman kahit bagong bukas ang browser

function getArtifacts() {
    let artifacts = JSON.parse(localStorage.getItem('museum_artifacts'));
    
    // Kung walang laman ang localStorage, awtomatiko nating ilalagay ang iyong default artifact
    if (!artifacts || artifacts.length === 0) {
        artifacts = [
            {
                id: 1,
                visitorOriginalImage: "Artifact1.jpg",
                imageName: "Artifact.image #01",
                imageUrl: "Artifact1.jpg",
                descriptionName: "Artifact.Description #01",
                title: "Abaniko ni Coco",
                description: "Sana all tulad nitong pamaypay. Kahit luma na at kupas na ang bulaklak, naka-frame pa rin at mukhang sosyal sa dingding. Ako nga, bago-bago paman, pero mukhang pagod na. Ito, dekada na ang binilang, pero alagang-alaga, pinupunasan pa araw-araw at ipinagmamalaki sa mga bisita...",
                audioName: "Artifact.audio #01",
                audioUrl: "Artifact1.mp3",
                views: 1,
                likes: 0,
                status: "Approved" // Naka-approve na agad para lumitaw sa archives
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

function saveNewArtifact(title, description, visitorImageName = "") {
    let artifacts = getArtifacts();
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
        audioUrl: `Artifact${nextNumber}.mp3`,
        views: 0,
        likes: 0,
        status: "Pending"
    };

    artifacts.push(newEntry);
    localStorage.setItem('museum_artifacts', JSON.stringify(artifacts));
    return nextNumber;
}
