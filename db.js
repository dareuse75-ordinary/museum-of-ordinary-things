// Asynchronous function para i-load ang mappings mula sa JSON files
async function loadMappings() {
    try {
        const [audioRes, imageRes] = await Promise.all([
            fetch('audio-mapping.json').catch(() => ({ json: () => ({}) })),
            fetch('image-mapping.json').catch(() => ({ json: () => ({}) }))
        ]);
        
        const audioMap = await audioRes.json();
        const imageMap = await imageRes.json();
        
        return { audioMap, imageMap };
    } catch (error) {
        console.error("Error loading mappings:", error);
        return { audioMap: {}, imageMap: {} };
    }
}

async function getArtifacts() {
    let artifacts = JSON.parse(localStorage.getItem('museum_artifacts'));
    const { audioMap, imageMap } = await loadMappings();
    
    if (!artifacts || artifacts.length === 0) {
        artifacts = [
            {
                id: 1,
                visitorOriginalImage: "Artifact1.jpg",
                imageName: "Artifact.image #01",
                imageUrl: "", // Ise-set mamaya galing sa image-mapping.json
                descriptionName: "Artifact.Description #01",
                title: "Abaniko ni Coco",
                description: "Sana all tulad nitong pamaypay. Kahit luma na at kupas na ang bulaklak, naka-frame pa rin at mukhang sosyal sa dingding. Ako nga, bago-bago pa, pero mukhang pagod na. Ito, dekada na ang binilang, pero alagang-alaga, pinupunasan pa araw-araw at ipinagmamalaki sa mga bisita...",
                audioName: "Artifact.audio #01",
                audioUrl: "", // Ise-set mamaya galing sa audio-mapping.json
                views: 1,
                likes: 0,
                status: "Approved"
            }
        ];
        localStorage.setItem('museum_artifacts', JSON.stringify(artifacts));
    }

    // I-inject ang mga link galing sa JSON mapping batay sa ID ng artifact
    artifacts = artifacts.map(item => {
        const stringId = String(item.id);
        return {
            ...item,
            imageUrl: imageMap[stringId] || item.imageUrl,
            audioUrl: audioMap[stringId] || item.audioUrl
        };
    });
    
    return artifacts;
}

function updateArtifactStatus(id, newStatus) {
    let artifacts = JSON.parse(localStorage.getItem('museum_artifacts')) || [];
    let index = artifacts.findIndex(item => item.id === id);
    if (index !== -1) {
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
        imageUrl: "", 
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
