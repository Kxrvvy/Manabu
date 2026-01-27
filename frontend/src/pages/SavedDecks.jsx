import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loadDecks, deleteDeck } from '../services/Storage';




export default function SavedDecks() {

    const [decks, setDecks] = useState([]);
    const [deleteID, setDeleteID] = useState(null);

    const navigate = useNavigate();

    // Load Decks on Component Mount
    useEffect(() => {
        const storeDecks = loadDecks();
        setDecks(storeDecks);
    }, []);

    // Handle Deck Deletion
    const handleDelete = (deckID) => {
        deleteDeck(deckID);
        setDecks(decks.filter((deck) => deck.id !== deckID));
    }

    // Format Date Utility
    const formatDate = (dateString) => {
        if (!dateString) return 'Unknown';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-background pt-6 pb-16 px-4">
            <div className="headerContainer max-w-4xl mx-auto p-6 mb-6 bg-orange-500">
                <h3 className="text-4xl font-bold">Your Library</h3>
                <p>{decks.length} saved Decks.</p>
            </div>


            {decks.length === 0 ? (
                <div className="container bg-red-900 rounded-2xl p-12 text-center ">
                    <div className="logoContainer bg-yellow-200 w-20 h-20 flex items-center justify-center mx-auto mb-6">
                        logo here
                    </div>

                    <h3 className='font-display text-2xl font-bold mb-6'>No saved decks yet.</h3>
                    <p className="text-muted-foreground mb-6">Generate flashcards and save them to build your study library.</p>

                    <Link to="/generator">
                        <button className="btn btn-primary">
                            (logo)
                            Create Your First Deck
                        </button>
                    </Link>
                </div>
            ) : (
                <div className="cardContainer">
                    {decks.map((deck) => (
                        <div className='card'
                            key={deck.id}
                            onClick={() => navigate(`/flashcards/${deck.id}`, { state: { flashcards: deck.cards } })}>

                            <div className="cardHeader">
                                <div className="cardTitle">
                                    <span className='truncate'>{deck.title}</span>
                                    <button
                                        className="btn"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setDeleteID(deck.id);
                                            document.getElementById('my_modal_5').showModal()
                                        }}>
                                        Delete
                                    </button>
                                </div>
                            </div>

                            <div className="cardDescription flex items-center gap-4">
                                <span className='flex items-center gap-1'>
                                    {deck.cardCount} cards
                                </span>
                                <span className='flex items-center gap-1'>
                                    {formatDate(deck.createdAt)}
                                </span>
                            </div>

                            <div className="cardContent">
                                <button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                    Study Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}





            {/* Delete Confirmation Modal */}
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Delete this Deck?</h3>
                    <p className="py-4">This action cannot be undone. The deck will be permanently removed from your library.</p>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn" onClick={() => handleDelete(deleteID)}>Delete</button>
                            <button className="btn" onClick={() => setDeleteID(null)}>Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>

    );
};