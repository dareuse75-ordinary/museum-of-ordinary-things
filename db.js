const MuseumDB = {
    storageKey: 'museum_ordinary_things_artifacts_v6',
    pendingKey: 'museum_ordinary_things_pending_v6',

    // Kunin ang mga aprubadong artifact
    getArtifacts() {
        const stored = localStorage.getItem(this.storageKey);
        if (stored) {
            return JSON.parse(stored);
        }
        
        // Kung walang laman ang localStorage, ibalik ang default artifact na ito para may lumabas sa Homepage!
        const defaultArtifacts = [
            {
                id: "Artifact #01",
                date: "Circa 2025",
                title: "Abaniko ni Coco",
                story1: "Isang lumang abaniko na gawa sa dahon ng saging na ginamit noong kasagsagan ng tag-init. Puno ito ng kwento ng pagpapahinga sa ilalim ng lilim ng punong mangga.",
                image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=60"
            }
        ];
        this.saveArtifacts(defaultArtifacts);
        return defaultArtifacts;
    },

    saveArtifacts(artifacts) {
        localStorage.setItem(this.storageKey, JSON.stringify(artifacts));
    },

    // Kunin ang mga naka-pending para sa approval
    getPendingArtifacts() {
        const stored = localStorage.getItem(this.pendingKey);
        if (stored) {
            return JSON.parse(stored);
        }
        return [];
    },

    savePendingArtifacts(artifacts) {
        localStorage.setItem(this.pendingKey, JSON.stringify(artifacts));
    },

    addPendingArtifact(newArtifact) {
        const pending = this.getPendingArtifacts();
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
        const item = artifacts.find(a => a.id === id);
        if (item) {
            item.liked = !item.liked;
            item.likes += item.liked ? 1 : -1;
            this.saveArtifacts(artifacts);
        }
    },

    incrementView(id) {
        const artifacts = this.getArtifacts();
        const item = artifacts.find(a => a.id === id);
        if (item) {
            item.views += 1;
            this.saveArtifacts(artifacts);
        }
    }
};
