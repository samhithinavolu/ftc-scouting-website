let teams = [
    { teamNumber: 12345, teamName: "Gear Heads" },
    { teamNumber: 67890, teamName: "Iron Eagles" },
    { teamNumber: 11111, teamName: "Circuit Breakers" },
    { teamNumber: 22222, teamName: "Robo Rangers" },
    { teamNumber: 33333, teamName: "Steel Titans" },
    { teamNumber: 44444, teamName: "Voltage Vikings" },
    { teamNumber: 55555, teamName: "Quantum Bolts" },
    { teamNumber: 99999, teamName: "Turbo Falcons" },
    { teamNumber: 25780, teamName: "CyberChaos" },
];

let scores = [];
let scoutingEntries = [];
let averages = [];

document.getElementById('teamsBtn').addEventListener("click", function() {
    showScreen('teamsScreen');
    displayTeams();
});

document.getElementById('logMatchBtn').addEventListener('click', () => showScreen('logMatchScreen'));

document.getElementById("rankingsBtn").addEventListener("click", function() {
    showScreen("rankingsScreen");
    displayRankings();
});

document.getElementById('teamsBackBtn').addEventListener('click', () => showScreen('homeScreen'));
document.getElementById('logMatchBackBtn').addEventListener('click', () => showScreen('homeScreen'));
document.getElementById('rankingsBackBtn').addEventListener('click', () => showScreen('homeScreen'));

document.getElementById('saveEntryBtn').addEventListener('click', () => logData());

document.getElementById("sortAutoBtn").addEventListener("click", function() {
    teams.sort((a, b) => getAverageAutoScore(b.teamNumber) - getAverageAutoScore(a.teamNumber));
    displayRankings();
});

document.getElementById("sortTeleBtn").addEventListener("click", function() {
    teams.sort((a, b) => getAverageTeleScore(b.teamNumber) - getAverageTeleScore(a.teamNumber));
    displayRankings();
});

document.getElementById("sortTotalBtn").addEventListener("click", function() {
    teams.sort((a, b) => {
        let totalA = parseFloat(getAverageAutoScore(a.teamNumber)) + parseFloat(getAverageTeleScore(a.teamNumber));
        let totalB = parseFloat(getAverageAutoScore(b.teamNumber)) + parseFloat(getAverageTeleScore(b.teamNumber));
        return totalB - totalA;
    });
    displayRankings();
});

document.getElementById("rankingsSearch").addEventListener("input", function() {
    let searchValue = document.getElementById("rankingsSearch").value;
    let rows = document.getElementById("rankingsBody").getElementsByTagName("tr");

    for (let i = 0; i < rows.length; i++) {
        let teamNumber = rows[i].getElementsByTagName("td")[1].innerHTML;
        if (searchValue !== "" && teamNumber.includes(searchValue)) {
            rows[i].classList.add("highlight");
        } else {
            rows[i].classList.remove("highlight");
        }
    }
});

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.add('hidden');
    });
    document.getElementById(screenId).classList.remove('hidden');
}

function logData() {
    let teamNumber = parseInt(document.getElementById("teamNumberInput").value);
    let matchNumber = parseInt(document.getElementById("matchNumberInput").value);
    let autoScore = parseInt(document.getElementById("autoScoreInput").value);
    let teleScore = parseInt(document.getElementById("teleScoreInput").value);
    let defenseRating = parseInt(document.getElementById("defenseRatingInput").value);
    let reliabilityRating = parseInt(document.getElementById("reliabilityRatingInput").value);

    scores.push({
        teamNumber: teamNumber,
        matchNumber: matchNumber,
        autoScore: autoScore,
        teleScore: teleScore
    });

    scoutingEntries.push({
        teamNumber: teamNumber,
        defenseRating: defenseRating,
        reliabilityRating: reliabilityRating,
        notes: notes
    });

    document.getElementById("teamNumberInput").value = "";
    document.getElementById("matchNumberInput").value = "";
    document.getElementById("autoScoreInput").value = "";
    document.getElementById("teleScoreInput").value = "";
    document.getElementById("defenseRatingInput").value = "";
    document.getElementById("reliabilityRatingInput").value = "";
    document.getElementById("notesInput").value = "";
}

function getAverageAutoScore(teamNumber) {
    let total = 0;
    let count = 0;
    for (let i = 0; i < scores.length; i++) {
        if (scores[i].teamNumber === teamNumber) {
            total += scores[i].autoScore;
            count++;
        }
    }
    return count === 0 ? 0 : (total / count).toFixed(1);
}

function getAverageTeleScore(teamNumber) {
    let total = 0;
    let count = 0;
    for (let i = 0; i < scores.length; i++) {
        if (scores[i].teamNumber === teamNumber) {
            total += scores[i].teleScore;
            count++;
        }
    }
    return count === 0 ? 0 : (total / count).toFixed(1);
}

function displayRankings() {
    let tbody = document.getElementById("rankingsBody");
    tbody.innerHTML = "";

    teams.forEach(function(team, index) {
        let avgAuto = getAverageAutoScore(team.teamNumber);
        let avgTele = getAverageTeleScore(team.teamNumber);
        let total = (parseFloat(avgAuto) + parseFloat(avgTele)).toFixed(1);

        tbody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${team.teamNumber}</td>
                <td>${team.teamName}</td>
                <td>${avgAuto}</td>
                <td>${avgTele}</td>
                <td>${total}</td>
            </tr>
        `;
    });
}

function displayTeams() {
    let tbody = document.getElementById("teamsBody");
    tbody.innerHTML = "";

    teams.forEach(function(team) {
        tbody.innerHTML += `
            <tr>
                <td>${team.teamNumber}</td>
                <td>${team.teamName}</td>
            </tr>
        `;
    });
}