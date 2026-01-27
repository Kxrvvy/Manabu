import React from "react";
import { loadDecks } from "../services/Storage";




export default function Modal({ open, onClose, onSave, cardCount, flashcards}) {
    const [deckName, setDeckName] = React.useState('');

    const handleSave = () => {
        if (deckName.trim()) {

            //New Deck
            const newDeck = {
                id : Date.now(),
                title : deckName.trim(),
                cards : flashcards,
                cardCount : cardCount,
                createdAt : new Date().toISOString()

            }

            const existingDecks = loadDecks();

            const updatedDecks = [...existingDecks, newDeck];


            onSave(updatedDecks);
            setDeckName('');
            onClose(false);
        }
    };

    return (
        <>
            {/* Save Deck Modal */}
            <dialog open={open} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <div className="DialogHeader">
                        <h3 className="font-bold text-lg">Save Deck</h3>
                    <p className="py-4">Save these {cardCount} flashcards as a deck for later study.</p>
                    </div>

                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Deck Name</label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                value = {deckName}
                                onChange = {(e) => setDeckName(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSave()}
                                autofocus
                            />
                        </div>
                    </div>
                    
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn" onClick={handleSave} disabled={!deckName.trim()}>Save</button>
                            <button className="btn" onClick={() => onClose(false)}>Cancel</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>        
    );

}