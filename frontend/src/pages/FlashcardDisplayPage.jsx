import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { saveDecks } from '../services/Storage';
import Modal from '../hooks/Modal';


export default function FlashcardDisplay() {
    const location = useLocation();
    const flashcards = location.state?.flashcards || [];

    const [currentIndex, setCurrentIndex] = useState(0);

    const [isFlipped, setIsFlipped] = useState(false);

    const [saveDialogOpen, setSaveDialogOpen] = useState(false);

    const currentCard = flashcards[currentIndex];

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleNext = () => {
        setIsFlipped(false);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    };

    const handlePrev = () => {
        setIsFlipped(false);
        setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
    }


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

        <div className="w-full max-w-2xl mx-auto p-6">

            {/* Action Buttons */}
            <div>
                <button
                    className={`mb-4 mr-2 px-4 py-2 bg-green-600 text-white rounded
                              hover:bg-green-700 transition-colors`}
                    onClick={() => { setSaveDialogOpen(true); }}>
                    Save Deck
                </button>
            </div>


            {/* The flashcard */}
            <div
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



            <div className="flex justify-center">
                <button
                    className={`h-6 w-6 my-4 mx-2 bg-blue-600 text-white rounded-full
                              font-medium flex items-center justify-center
                              hover:bg-blue-700 transition-colors`}
                    onClick={handlePrev}>
                    <span>←</span>
                </button>

                <div className="text-center">
                    <span className="text-gray-600 font-medium">Card {currentIndex + 1}/{flashcards.length}</span>
                </div>

                <button
                    className={`h-6 w-6 my-4 mx-2 bg-blue-600 text-white rounded-full
                              font-medium flex items-center justify-center
                              hover:bg-blue-700 transition-colors`}
                    onClick={handleNext}>
                    <span>→</span>
                </button>
            </div>

            <Modal
                open={saveDialogOpen}
                onClose={setSaveDialogOpen}
                cardCount={flashcards.length}
                onSave={saveDecks}
                flashcards={flashcards}
            />




        </div>
    );
};
