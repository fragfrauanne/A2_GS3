const tasks = [
    { question: "Mmh, Eis! Ich möchte auch _____.", answer: "eins" },
    { question: "Noch einen Computer? Wir haben doch schon _____.", answer: "einen" },
    { question: "Hast du einen Stift? - Nein, aber da liegt doch _____.", answer: "einer" },
    { question: "Die Marmelade ist im Kühlschrank. - Nein, da ist k_____.", answer: "keine" },
    { question: "Eier? Ja, ich habe noch _____ bekommen.", answer: "welche" },
    { question: "Hast du eine Zigarette? - Nein, ich habe leider auch k_____ mehr.", answer: "keine" },
    { question: "Ich nehme einen Apfelsaft. Möchtest du auch _____?", answer: "einen" },
    { question: "Kleingeld? Tut mir leid, ich habe auch k_____.", answer: "keins" },
    { question: "Brauchen wir noch Orangen? - Nein, wir haben noch _____.", answer: "welche" },
    { question: "Gibt es noch Stühle? - Ja, hier sind _____.", answer: "welche" },
    { question: "Bitte bring Tomaten mit, wir haben k_____ mehr.", answer: "keine" },
    { question: "Brauchen wir noch einen Schirm? - Nein danke, ich habe _____ im Auto.", answer: "einen" },
    { question: "Die Tassen sind in der Spülmaschine. - Nein, da sind k_____ mehr.", answer: "keine" },
    { question: "Das Salz steht auf dem Tisch. - Nein, da ist k_____.", answer: "keins" },
    { question: "Hier gibt es keinen Parkplatz mehr. - Doch, sieh mal, da vorne ist _____.", answer: "einer" },
    { question: "Ein rotes Hemd? Ich habe doch schon _____.", answer: "eins" },
    { question: "Wir brauchen noch einen Stuhl. - Vielleicht ist im Wohnzimmer noch _____.", answer: "einer" },
    { question: "Ich hole noch Gabeln. - Da sind doch schon _____.", answer: "welche" }
];

const container = document.getElementById("cardsContainer");
const fireworks = document.getElementById("fireworks");

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createCards(tasks) {
    container.innerHTML = "";

    shuffle(tasks).forEach(task => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">${task.question}</div>
                <div class="card-back">
                    <p>${task.answer}</p>
                    <div>
                        <button class="correctBtn">✅</button>
                        <button class="wrongBtn">❌</button>
                    </div>
                </div>
            </div>
        `;

        // Klicken auf die Karte dreht sie um, wenn sie noch nicht umgedreht ist
        card.addEventListener("click", () => {
            if (!card.classList.contains("flipped")) {
                card.classList.add("flipped");
            }
        });

        // Beim "Richtig"-Button entfernen wir die Karte
        card.querySelector(".correctBtn").onclick = (e) => {
            e.stopPropagation(); // Verhindert, dass das Klicken auf den Button auch das Klicken auf die Karte auslöst
            card.remove();
            checkEnd();
        };

        // Beim "Falsch"-Button soll die Karte nach 1 Sekunde wieder umgedreht und neu positioniert werden
        card.querySelector(".wrongBtn").onclick = (e) => {
            e.stopPropagation();
            setTimeout(() => {
                card.classList.remove("flipped");
                repositionCard(card);
            }, 1000);
        };

        container.appendChild(card);
    });
}

// Diese Funktion entfernt die Karte aus dem Container und fügt sie an einer zufälligen Position wieder ein.
function repositionCard(card) {
    // Zuerst entfernen wir die Karte aus dem Container
    container.removeChild(card);
    // Bestimme die Anzahl der aktuell vorhandenen Karten
    const children = container.children;
    // Wähle einen zufälligen Index zwischen 0 und der Anzahl der vorhandenen Karten (inklusive Möglichkeit, am Ende einzufügen)
    const randomIndex = Math.floor(Math.random() * (children.length + 1));
    if (randomIndex === children.length) {
        container.appendChild(card);
    } else {
        container.insertBefore(card, children[randomIndex]);
    }
}

// Überprüft, ob alle Karten entfernt wurden und das Feuerwerk angezeigt werden soll.
function checkEnd() {
    if (container.children.length === 0) {
        fireworks.style.display = "block";
        setTimeout(() => { fireworks.style.display = "none"; }, 4000);
    }
}

createCards(tasks);