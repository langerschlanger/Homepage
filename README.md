# Projektübersicht

Das ist eine einfache Website, auf der du deine Projekte anzeigen kannst.

## So bearbeitest du deine Projekte

Öffne die Datei:

`projekte.json`

Dort kannst du Projekte ändern oder neue hinzufügen.

Beispiel:

```json
{
  "name": "Mein Projekt",
  "beschreibung": "Kurze Beschreibung vom Projekt.",
  "link": "https://deinname.github.io/mein-projekt/",
  "kategorie": "Tool"
}
```

Wichtig:
- Zwischen mehreren Projekten muss ein Komma stehen.
- Der letzte Eintrag bekommt kein Komma danach.
- Links sollten mit `https://` beginnen.

## Dateien

- `index.html` = Grundaufbau der Website
- `style.css` = Aussehen der Website
- `script.js` = lädt die Projekte aus der JSON-Datei
- `projekte.json` = hier bearbeitest du deine Projekte
