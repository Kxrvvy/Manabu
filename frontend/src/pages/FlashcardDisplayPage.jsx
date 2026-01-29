import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { saveDecks } from '../services/Storage';
import Modal from '../features/Modal';
import { Button } from '@/components/ui/button';
import { Save, BookOpen } from "lucide-react";
import SavedDecks from './SavedDecks';
import { Trophy, Upload, RefreshCcw, ChevronRight } from 'lucide-react';



export default function FlashcardDisplay() {
    const location = useLocation();
    const flashcards = location.state?.flashcards || [];

    const [currentIndex, setCurrentIndex] = useState(0);

    const [isFlipped, setIsFlipped] = useState(false);
    const [completeCards, setCompleteCards] = useState([]);
    const [saveDialogOpen, setSaveDialogOpen] = useState(false);

    const currentCard = flashcards[currentIndex];

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleNext = () => {
        setIsFlipped(false);
        if (!completeCards.includes(currentIndex)) {
            setCompleteCards([...completeCards, currentIndex]);
        }
        if (currentIndex < flashcards.length - 1) {
            setCurrentIndex((prevIndex) => (prevIndex + 1));
        }
    };

    const handlePrev = () => {
        setIsFlipped(false);
        if (currentIndex > 0) {
            setCurrentIndex((prevIndex) => (prevIndex - 1));
        }
    }

    const resetDeck = () => {
        setCurrentIndex(0);
        setCompleteCards([]);
        setIsFlipped(false);
    }

    const isComplete = completeCards.length === flashcards.length;

    if (!flashcards || flashcards.length === 0) {
        return (
            <div className="w-full max-w-2xl mx-auto p-6 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">No Flashcards</h2>
                <p className="text-gray-600">Please generate some flashcards first.</p>
                <Link to="/generator" className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Go to Generator
                </Link>
            </div>
        );
    }


    return (
        <div className='min-h-screen bg-gray-100 pt-28 pb-16 px-4 '>
            <div className="w-full max-w-2xl mx-auto p-6">

                {/* Header */}
                <div className='text-center mb-2 animate-fade-in'>
                    <h2 className='font-display font-bold text-4xl mb-2 text-black'>
                        <>Study <span>Session</span></>
                    </h2>
                    <p className="text-gray-400">Review your flashcards and test your knowledge.</p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-center">
                    <Link to="/library">
                        <Button variant='outline'
                            className={`mb-4 mt-10 px-4 py-2 text-white rounded
                                        border-black text-black mr-2
                                        hover:bg-green-700 transition-colors
                                       `}>
                            <BookOpen className="w-4 h-4" />
                            My Library
                        </Button>
                    </Link>

                    <Button
                        variant='outline'
                        className={`mb-4 mt-10 px-4 py-2 text-white rounded
                                    border-black text-black
                                    hover:bg-green-700 transition-colors
                                `}
                        onClick={() => { setSaveDialogOpen(true); }}>
                        <Save className="w-4 h-4" />
                        Save Deck
                    </Button>
                </div>


                {/* The flashcard */}

                <div className="mb-8 animate-scale-in" style={{ animationDelay: "0.2s" }}>
                    {isComplete ? (
                        <div className="card-elevated text-center rounded-xl p-12 border border-border bg-white">
                            <div className='w-20 h-20 rounded-full bg-gradient-to-br from-accent to-orange-500 flex items-center justify-center mx-auto mb-6 shadow-glow-accent'>
                                <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                            </div>

                            <h2 className="font-display text-2xl font-bold mb-2">Session Complete</h2>
                            <p className="text-muted-foreground mb-6">
                                You've reviewed all {flashcards.length} flashcards
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                                <Button onClick={resetDeck}>
                                    <RefreshCcw />
                                    Study Again
                                </Button>
                                <Link to="/generator">
                                    <Button>
                                        <Upload />
                                        Generate More
                                    </Button>
                                </Link>
                            </div>
                        </div>

                    ) : (<div
                        onClick={handleFlip}
                        className={`bg-white rounded-xl shadow-lg p-12 min-h-64 
                            flex items-center justify-center cursor-pointer
                            hover:shadow-2xl transition-shadow duration-200
                            border-10 border-red-500`}>

                        {/*Question & Answer*/}
                        <div className="text-black text-center">
                            <p className="text-2xl font-medium text-gray-800 mb-4">
                                {isFlipped ? currentCard.back : currentCard.front}
                            </p>
                            <p className="text-sm text-gray-400">
                                {isFlipped ? 'Click to see the question' : 'Click to see the answer'}
                            </p>
                        </div>
                    </div>
                    )}
                </div>




                {!isComplete && (
                    <div className="flex items-center justify-between animate-fade-in" style={{ animationDelay: "0.3s" }}>
                        <Button
                            className="cursor-pointer"
                            onClick={handlePrev}>
                            <span>Previous</span>
                        </Button>

                        <div className="flex items-center gap-2">
                            {flashcards.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentIndex
                                        ? "bg-primary w-6"
                                        : completeCards.includes(index)
                                            ? "bg-success"
                                            : "bg-gray-300 hover:bg-gray-400"
                                        }`}
                                />
                            ))}
                        </div>

                        <Button className="cursor-pointer" size="lg" onClick={handleNext}>
                            {currentIndex === flashcards.length - 1 ? "Complete" : "Next"}
                            <ChevronRight className="w-5 h-5" />
                        </Button>
                    </div>
                )}

                {/* Card Counter */}
                {!isComplete && (
                    <p className="text-center text-sm mt-6 animate-fade-in text-gray-500">
                        Card {currentIndex + 1} of {flashcards.length}
                    </p>
                )}



                <Modal
                    open={saveDialogOpen}
                    onClose={setSaveDialogOpen}
                    cardCount={flashcards.length}
                    onSave={saveDecks}
                    flashcards={flashcards}
                />
            </div>
        </div>

    );
};
