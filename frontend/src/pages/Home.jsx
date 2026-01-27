import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to AI Flashcard Generator
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Create and study flashcards powered by AI. Upload documents or paste text to generate personalized flashcards.
        </p>
        <Link
          to="/generator"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}