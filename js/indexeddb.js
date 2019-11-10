function databasePromise(idb) {
    var dbPromise = idb.open("dbligaklasemen", 1, function(upgradeDb) {
        if (!upgradeDb.objectStoreNames.contains(storeName)) {
            upgradeDb.createObjectStore(storeName, { keyPath: "id" });
        }
    });

    return dbPromise;
}

function getAllData() {
    return new Promise(function(resolve, reject) {
        databasePromise(idb)
            .then(function(db) {
                var tx = db.transaction(storeName, "readonly");
                var store = tx.objectStore(storeName);
                return store.getAll();
            })
            .then(function(data) {
                resolve(data);
            });
    });
}

function getDataById(id) {
    return new Promise(function(resolve, reject) {
        databasePromise(idb)
            .then(function(db) {
                var tx = db.transaction(storeName, "readonly");
                var store = tx.objectStore(storeName);
                return store.get(id);
            })
            .then(function(data) {
                resolve(data);
            });
    });
}

function createFavorite(data) {
    var dataTeam = {};
    dataTeam = {
        id: data.id,
        name: data.name,
        shortName: data.shortName,
        tla: data.tla,
        crestUrl: data.crestUrl,
        address: data.address,
        phone: data.phone,
        website: data.website,
        email: data.email,
        founded: data.founded,
        clubColors: data.clubColors,
        venue: data.venue,
        squad: data.squad,
        area: data.area,
        lastUpdated: data.lastUpdated,
        activeCompetitions: data.activeCompetitions
    }

    databasePromise(idb).then(db => {
        const tx = db.transaction(storeName, 'readwrite');
        tx.objectStore(storeName).add(dataTeam);
        return tx.complete;
    }).then(function() {
        document.getElementById("favoriteIcon").innerHTML = "favorite";
        M.toast({ html: 'Team masuk daftar favorite' });
    })

}


function deleteFavorite(storeName, data) {
    databasePromise(idb).then(function(db) {
        var tx = db.transaction(storeName, 'readwrite');
        var store = tx.objectStore(storeName);
        store.delete(data);
        return tx.complete;
    }).then(function() {
        document.getElementById("favoriteIcon").innerHTML = "favorite_border";
        M.toast({
            html: 'Team dihapus dari daftar favorit!'
        });
    });
}