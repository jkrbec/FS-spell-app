// script.js

document.addEventListener('DOMContentLoaded', () => {
    const loadSpellsButton = document.getElementById('load-spells');
    const spellContainer = document.getElementById('spell-container');
    let spellsLoaded = false;

    loadSpellsButton.addEventListener('click', () => {
        if (spellsLoaded) {
            spellContainer.innerHTML = ''; // Clear the spells
            spellsLoaded = false; // Update flag
            loadSpellsButton.textContent = 'Load Spells'; // Update button text
        } else {
            fetchSpells();
        }
    });

    async function fetchSpells() {
        const apiUrl = 'https://hp-api.onrender.com/api/spells';
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const spells = await response.json();
            displaySpells(spells);
            spellsLoaded = true;
            loadSpellsButton.textContent = 'Hide Spells';
        } catch (error) {
            console.error('Could not fetch spells:', error);
        }
    }

    function displaySpells(spells) {
        spellContainer.innerHTML = ''; // Clear existing spells
        spells.forEach(spell => {
            const spellCard = document.createElement('div');
            spellCard.className = 'spell-card';
            spellCard.innerHTML = `
                <div class="spell-name">${spell.name}</div>
                <div class="spell-description">${spell.description}</div>
            `;
            spellContainer.appendChild(spellCard);
        });
    }
});
