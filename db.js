const MuseumDB = {
    storageKey: 'museum_ordinary_things_artifacts_v6',
    pendingKey: 'museum_ordinary_things_pending_v6',

    getArtifacts() {
        const stored = localStorage.getItem(this.storageKey);
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                // Kung may laman na array at hindi blangko, iyon ang gamitin
                if (Array.isArray(parsed) && parsed.length > 0) {
                    return parsed;
                }
            } catch (e) {
                console.error("Error parsing storage", e);
            }
        }
        
        // Kung blangko o walang laman ang localStorage, i-load ito:
        const defaultArtifacts = [
            {
                id: "Artifact #01",
                date: "Circa 2025",
                title: "Abaniko ni Coco",
                story1: "Isang lumang abaniko na gawa sa dahon ng saging na ginamit noong kasagsagan ng tag-init. Puno ito ng kwento ng pagpapahinga sa ilalim ng lilim ng punong mangga.",
                image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=60",
                views: 12,
                likes: 5,
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

            artifacts.unshift(itemToApprove);
            this.saveArtifacts(artifacts);
        }
    },

    rejectArtifact(id) {
        const pending = this.getPendingArtifacts();
        const filtered = pending.filter(a => a.id !== id);
        this.savePendingArtifacts(filtered);
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
