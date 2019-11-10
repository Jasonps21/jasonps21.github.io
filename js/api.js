var baseUrl = "https://api.football-data.org/v2/"; // Url Data
var apiToken = '92f1f5a3413044948e36f28ec1c4aef4' // Token API
var kodeLiga = 2002 // Liga Jerman
var urlTim = `${baseUrl}teams/` // Endpoint Tim
var urlKlasemen = `${baseUrl}competitions/${kodeLiga}/standings?standingType=TOTAL` // Endpoint Tim
var storeName = "favorite_team"

// blok kode yang akan dipanggil jika fetch berhasil
function status(response) {
    if (response.status !== 200) {
        return Promsie.reject(new Error(response.statusText));
    } else {
        return Promise.resolve(response);
    }
}

// blok kode untuk memparsing json menjadi array javascript
function json(response) {
    return response.json();
}

// blok kode untuk menghandle kesalahan di blok catch
function error(error) {
    // Parameter error berasal dari Promise.reject()
    console.log("error " + error);
}

// Blok kode untuk melakukan request data json
function getKlasemen() {
    if ('caches' in window) {
        caches.match(urlKlasemen).then(function(response) {
            if (response) {
                response.json().then(function(data) {
                    klasemenHTML(data);
                });
            }
        });
    }

    fetch(urlKlasemen, {
            headers: {
                'X-Auth-Token': apiToken
            }
        })
        .then(status)
        .then(json)
        .then(function(data) {
            klasemenHTML(data);
        })
        .catch(error);
}

function getTeamById() {
    return new Promise(function(resolve, reject) {
        var urlParams = new URLSearchParams(window.location.search);
        var idParam = urlParams.get("id");

        if ("caches" in window) {
            caches.match(urlTim + idParam).then(function(response) {
                if (response) {
                    response.json().then(function(data) {
                        detailTeamHTML(data)
                        resolve(data);
                    });
                }
            });
        }

        fetch(urlTim + idParam, {
                headers: {
                    'X-Auth-Token': apiToken
                }
            })
            .then(status)
            .then(json)
            .then(function(data) {
                detailTeamHTML(data)
                resolve(data);
            })
            .catch(error);
    });
}

function detailTeamHTML(data) {
    var dataSquadHTML = ''
    var dataKompetisiHTML = ''
    var tabelSquadHTML = ''
    var tabelKompetisiHTML = ''
    data = JSON.parse(JSON.stringify(data).replace(/http:/i, 'https:'));

    document.getElementById("namaKlub").innerHTML = data.name;
    document.getElementById("logoKlub").src = data.crestUrl;
    document.getElementById("name").innerHTML = data.name;
    document.getElementById("shortName").innerHTML = data.shortName;
    document.getElementById("tla").innerHTML = data.tla;
    document.getElementById("address").innerHTML = data.address;
    document.getElementById("phone").innerHTML = data.phone;
    document.getElementById("website").innerHTML = data.website;
    document.getElementById("email").innerHTML = data.email;
    document.getElementById("founded").innerHTML = data.founded;
    document.getElementById("clubColors").innerHTML = data.clubColors;
    document.getElementById("venue").innerHTML = data.venue;
    document.getElementById("area").innerHTML = data.area['name'];
    document.getElementById("lastUpdate").innerHTML = convertUTCDate(new Date(data.lastUpdated));
    document.getElementById("preloader").innerHTML = '';

    data.squad.forEach(function(squad) {
        dataSquadHTML += `
                <tr>
                    <td >${squad.name}</td>
                    <td >${squad.position}</td>
                </tr>
        `
    });
    tabelSquadHTML += `<table> 
                        <thead>  
                            <tr>
                                <th>Nama</th>
                                <th>Posisi</th>
                            </tr>
                        </thead> 
                        <tbody> ${dataSquadHTML}  </tbody> </table>`

    document.getElementById("pemain").innerHTML = tabelSquadHTML;

    data.activeCompetitions.forEach(function(kompetisi) {
        dataKompetisiHTML += `
                <tr>
                    <td >${kompetisi.name}</td>
                    <td >${kompetisi.area['name']}</td>
                </tr>
        `
    });

    tabelKompetisiHTML += `<table> 
                            <thead>  
                                <tr>
                                    <th>Nama</th>
                                    <th>Area</th>
                                </tr>
                            </thead> 
                            <tbody> ${dataKompetisiHTML} </tbody> 
                        </table>`

    document.getElementById("kompetisi").innerHTML = tabelKompetisiHTML;
}

function TeamFavoriteHTML(data) {
    var teamFavHtml = ''
    data.forEach(function(teamData) {
        teamFavHtml += `
            <div class="col l6 m6 s12">
                <div class="card">                
                    <div class="card-content">
                        <div center-align>
                            <h5 class="center-align">
                                <span class="blue-text text-darken-2">  
                                    <a href="./detail.html?id=${teamData.id}">${teamData.name}</a>
                                </span>
                            </h5>          
                        </div>
                    </div>
                </div>
            </div>
        `
    });
    document.getElementById("favoritDiv").innerHTML = teamFavHtml;
}

function getDataFavHtml() {
    getAllData().then(function(data) { TeamFavoriteHTML(data); });
}

function klasemenHTML(data) {
    var tabelKlasemenHtml = ''
    data.standings.forEach(function(klasemen) {
        var dataTabelKlasemen = ''

        klasemen.table.forEach(function(club) {
            club = JSON.parse(JSON.stringify(club).replace(/http:/i, 'https:'));

            dataTabelKlasemen += `<tr>
                                    <td class="center-align">${club.position}</td>
                                    <td>
                                        <a href="./detail.html?id=${club.team.id}">
                                            <p class="hide-on-small-only">
                                                <img class="show-on-medium-and-up show-on-medium-and-down gbr-logo-team " src=${club.team.crestUrl}>
                                                ${club.team.name}
                                            </p>
                                            <p class="hide-on-med-and-up">
                                                <img src=${club.team.crestUrl} widht="30px" height="30px">
                                            </p>
                                        </a>
                                    </td>
                                    <td class="center-align">${club.playedGames}</td>
                                    <td class="center-align">${club.won}</td>
                                    <td class="center-align">${club.draw}</td>
                                    <td class="center-align">${club.lost}</td>
                                    <td class="center-align">${club.goalsFor}</td>
                                    <td class="center-align">${club.goalsAgainst}</td>
                                    <td class="center-align">${club.goalDifference}</td>
                                    <td class="center-align">${club.points}</td>
                                </tr>`
        })

        tabelKlasemenHtml += `  
      <table class="responsive-table striped " >
      <thead>
        <tr>
          <th class="center-align">Position</th>
          <th class="center-align">Team</th>
          <th class="center-align">Played</th>
          <th class="center-align">Won</th>
          <th class="center-align">Draw</th>
          <th class="center-align">Lost</th>
          <th class="center-align">GF</th>
          <th class="center-align">GA</th>
          <th class="center-align">GD</th>
          <th class="center-align">Points</th>
        </tr>
      </thead>
      <tbody>` + dataTabelKlasemen + `</tbody>
      </table>
    `

    });

    // Sisipkan komponen card ke dalam elemen dengan id tabelKlasemen
    document.getElementById("tabelKlasemen").innerHTML = tabelKlasemenHtml;
    document.getElementById("terakhirupdate").innerHTML = "Last Updated: " + convertUTCDate(new Date(data.competition.lastUpdated));
    document.getElementById("preloader").innerHTML = '';
}