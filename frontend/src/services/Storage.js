

const STORAGE_KEY = 'flashcard_decks';

export const loadDecks = () => {
    try {
        const storageDeck = localStorage.getItem(STORAGE_KEY);

        return storageDeck ? JSON.parse(storageDeck) : [];
    } catch (error) {
        console.error("Error loading decks from storage:", error);
        return [];
    }

}

export const saveDecks = (decks) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
        return true;

    } catch (error) {
        console.error("Error saving decks to storage:", error);
        return false;
    }
}


export const deleteDeck = (deckID) => {
    try {
        const allDecks = loadDecks();

        const updatedDecks = allDecks.filter((deck) => deck.id !== deckID);

        saveDecks(updatedDecks);
        return true;

    } catch (error) {
        console.error("Error clearing decks from storage:", error);
        return false;
    }
}