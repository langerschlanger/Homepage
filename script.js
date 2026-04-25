const projektListe = document.getElementById("projektListe");
const suche = document.getElementById("suche");
const kategorieFilter = document.getElementById("kategorieFilter");
const keineProjekte = document.getElementById("keineProjekte");

let projekte = [];

async function ladeProjekte() {
  try {
    const antwort = await fetch("projekte.json");
    projekte = await antwort.json();

    kategorienEinfügen();
    projekteAnzeigen();
  } catch (fehler) {
    projektListe.innerHTML = `
      <div class="card">
        <div class="card-content">
          <span class="tag">Fehler</span>
          <h2>Projekte konnten nicht geladen werden</h2>
          <p>Prüfe, ob die Datei projekte.json existiert und richtig geschrieben ist.</p>
        </div>
      </div>
    `;
  }
}

function kategorienEinfügen() {
  const kategorien = [...new Set(projekte.map(projekt => projekt.kategorie || "Sonstiges"))];

  kategorien.forEach(kategorie => {
    const option = document.createElement("option");
    option.value = kategorie;
    option.textContent = kategorie;
    kategorieFilter.appendChild(option);
  });
}

function projekteAnzeigen() {
  const suchtext = suche.value.toLowerCase().trim();
  const aktiveKategorie = kategorieFilter.value;

  const gefiltert = projekte.filter(projekt => {
    const name = projekt.name.toLowerCase();
    const beschreibung = projekt.beschreibung.toLowerCase();
    const kategorie = projekt.kategorie || "Sonstiges";

    const passtZurSuche =
      name.includes(suchtext) ||
      beschreibung.includes(suchtext) ||
      kategorie.toLowerCase().includes(suchtext);

    const passtZurKategorie =
      aktiveKategorie === "alle" || kategorie === aktiveKategorie;

    return passtZurSuche && passtZurKategorie;
  });

  projektListe.innerHTML = "";

  gefiltert.forEach(projekt => {
    const karte = document.createElement("article");
    karte.className = "card";

    karte.innerHTML = `
      <div class="card-content">
        <span class="tag">${projekt.kategorie || "Sonstiges"}</span>
        <h2>${projekt.name}</h2>
        <p>${projekt.beschreibung}</p>
        <a class="button" href="${projekt.link}" target="_blank" rel="noopener noreferrer">
          Projekt öffnen →
        </a>
      </div>
    `;

    projektListe.appendChild(karte);
  });

  keineProjekte.classList.toggle("hidden", gefiltert.length !== 0);
}

suche.addEventListener("input", projekteAnzeigen);
kategorieFilter.addEventListener("change", projekteAnzeigen);

ladeProjekte();
