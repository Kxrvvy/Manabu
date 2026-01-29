import { Route, Routes, Link } from 'react-router-dom';
import FlashCardGenerator from './pages/FlashcardGenerator';
import './styles/App.css';
import Home from './pages/Home'
import SavedDecks from './pages/SavedDecks';
import NavBar from './features/NavBar';



import FlashcardDisplay from './pages/FlashcardDisplayPage'






export default function App() {


  return (
    <>
      
      <NavBar />
      
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


