const MuseumDB = {
    storageKey: 'museum_ordinary_things_artifacts_v6',
    pendingKey: 'museum_ordinary_things_pending_v6',

    // Kunin ang mga aprubadong artifact
    getArtifacts() {
        const stored = localStorage.getItem(this.storageKey);
        if (stored) {
            return JSON.parse(stored);
        }
        return [];
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

    // Kapag nag-donate, mapupunta muna sa pending list
    addPendingArtifact(newArtifact) {
        const pending = this.getPendingArtifacts();
        pending.unshift(newArtifact);
        this.savePendingArtifacts(pending);
    },

    // Pag-apruba: Ililipat mula pending patungo sa active/approved artifacts
    approveArtifact(id) {
        const pending = this.getPendingArtifacts();
        const index = pending.findIndex(a => a.id === id);
        if (index !== -1) {
            const itemToApprove = pending.splice(index, 1)[0];
            this.savePendingArtifacts(pending);

            const artifacts = this.getArtifacts();
            artifacts.unshift(itemToApprove);
            this.saveArtifacts(artifacts);
        }
    },

    // Pagtanggi o pag-delete ng pending item
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
