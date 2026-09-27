const MuseumDB = {
    storageKey: 'museum_ordinary_things_artifacts_v11',
    pendingKey: 'museum_ordinary_things_pending_v11',

    getArtifacts() {
        const stored = localStorage.getItem(this.storageKey);
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    return parsed;
                }
            } catch (e) {
                console.error("Error parsing storage", e);
            }
        }
        
        const defaultArtifacts = [
            {
                id: "Artifact #01",
                date: "Circa 2025",
                title: "Abaniko ni Coco",
                story1: "Binili dahil \"ang cute pang-display.\" Ginamit nang dalawang beses, itinago nang sampung taon, tapos biglang naging antique. Tested sa init ng Baler at sa traffic ng EDSA. Parehong pumasa sa lakas ng hangin.",
                image: "abaniko.jpg",
                pinanggalingan: "",
                materyales: "",
                nagmamayari: "",
                tala: "",
                audio: "", // Dito maiimbak ang audio link
                views: 14,
                likes: 0,
                liked: false
            }
        ];
        this.saveArtifacts(defaultArtifacts);
        return defaultArtifacts;
    },

    saveArtifacts(artifacts) {
        localStorage.setItem(this.storageKey, JSON.stringify(artifacts));
    },

    getPendingArtifacts() {
        const stored = localStorage.getItem(this.pendingKey);
        if (stored) {
            try { return JSON.parse(stored); } catch(e) { return []; }
        }
        return [];
    },

    savePendingArtifacts(artifacts) {
        localStorage.setItem(this.pendingKey, JSON.stringify(artifacts));
    },

    addPendingArtifact(newArtifact) {
        const pending = this.getPendingArtifacts();
        newArtifact.views = 0;
        newArtifact.likes = 0;
        newArtifact.liked = false;
        pending.unshift(newArtifact);
        this.savePendingArtifacts(pending);
    },

    approveArtifact(id) {
        const pending = this.getPendingArtifacts();
        const index = pending.findIndex(a => a.id === id);
        if (index !== -1) {
            const itemToApprove = pending.splice(index, 1)[0];
            this.savePendingArtifacts(pending);

            const artifacts = this.getArtifacts();
            const nextNumber = artifacts.length + 1;
            const paddedNum = String(nextNumber).padStart(2, '0');
            itemToApprove.autoName = `Artifact #${paddedNum}`;
            itemToApprove.views = itemToApprove.views || 0;
            itemToApprove.likes = itemToApprove.likes || 0;
            itemToApprove.liked = false;
            itemToApprove.audio = "";

            artifacts.unshift(itemToApprove);
            this.saveArtifacts(artifacts);
        }
    },

    rejectArtifact(id) {
        const pending = this.getPendingArtifacts();
        const filtered = pending.filter(a => a.id !== id);
        this.savePendingArtifacts(filtered);
    },

    // Bagong function para i-save ang audio link ng isang artifact
    updateArtifactAudio(id, audioLink) {
        const artifacts = this.getArtifacts();
        const item = artifacts.find(a => a.id === id || a.title === id);
        if (item) {
            item.audio = audioLink;
            this.saveArtifacts(artifacts);
            return true;
        }
        return false;
    },

    toggleLike(id) {
        const artifacts = this.getArtifacts();
        const item = artifacts.find(a => a.id === id || a.title === id);
        if (item) {
            item.liked = !item.liked;
            item.likes += item.liked ? 1 : -1;
            this.saveArtifacts(artifacts);
        }
    },

    incrementView(id) {
        const artifacts = this.getArtifacts();
        const item = artifacts.find(a => a.id === id || a.title === id);
        if (item) {
            item.views = (item.views || 0) + 1;
            this.saveArtifacts(artifacts);
        }
    }
};
