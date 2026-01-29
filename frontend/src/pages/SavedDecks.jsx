import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loadDecks, deleteDeck } from '../services/Storage';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { BookOpen, Trash2, Play, Plus, Clock, Layers } from "lucide-react";




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
        <div className="min-h-screen bg-background pt-6 pb-16 px-4 mt-16 ">
            <div className="headerContainer max-w-4xl mx-auto p-6 mb-3 flex flex-col items-center justify-center">
                <h3 className="text-7xl text-black font-bold">Your Library</h3>
                <p className='text-2xl text-gray-400'>{decks.length} saved Decks.</p>
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
                <div className="grid gap-4 md:grid-cols-3 animate-fade-in ">
                    {decks.map((deck) => (
                        <Card key={deck.id}
                              onClick={() => navigate(`/flashcards/${deck.id}`, { state: { flashcards: deck.cards } })}
                              className="card-elevated border-border hover:border-primary/50 transition-all duration-300 cursor-pointer group">
                                
                            <CardHeader className="pb-2 text-black">
                                <CardTitle className="flex items-center justify-between font-bold text-2xl">
                                    <span className='truncate'>{deck.title}</span>
                                    <Button
                                        className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setDeleteID(deck.id);
                                            document.getElementById('Delete').showModal()
                                        }}>
                                        <Trash2 />
                                       
                                    </Button>
                                </CardTitle>

                                <CardDescription className="flex items-center gap-4 text-foreground">
                                    <span className='flex items-center gap-1 text-foreground'>
                                        <Layers className='w-3.5 h-3.5' />
                                        {deck.cardCount} cards
                                    </span>
                                    <span className='flex items-center gap-1'>
                                        <Clock className="w-3.5 h-3.5" />
                                        {formatDate(deck.createdAt)}
                                    </span>
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button variant="outline" className="text-black w-full hover:bg-primary hover:text-primary-foreground transition-colors">
                                    Study Now
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}





            {/* Delete Confirmation Modal */}
            <dialog id="Delete" className="modal modal-bottom sm:modal-middle">
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