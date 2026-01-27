import { Route, Routes, Link } from 'react-router-dom';
import FlashCardGenerator from './pages/FlashcardGenerator';
import './styles/App.css';
import Home from './pages/Home'
import SavedDecks from './pages/SavedDecks';



import FlashcardDisplay from './pages/FlashcardDisplayPage'






export default function App() {


  return (
    <>
      <nav className="bg-blue-600 p-4">
        <ul className="flex space-x-4">
          <li><Link to="/" className="text-white hover:text-blue-200">Home</Link></li>
          <li><Link to="/generator" className="text-white hover:text-blue-200">AI Flashcard Generator</Link></li>
          <li><Link to="/flashcards" className="text-white hover:text-blue-200">Flashcards</Link></li>
          <li><Link to="/library" className="text-white hover:text-blue-200">Library</Link></li>
        </ul>
      </nav>



      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/generator' element={<FlashCardGenerator />} />
        <Route path='/flashcards' element={<FlashcardDisplay />} />
        <Route path='/flashcards/:deckID' element={<FlashcardDisplay />} />
        <Route path='/library' element={<SavedDecks />}  />
      </Routes>
    </>
  )
}


