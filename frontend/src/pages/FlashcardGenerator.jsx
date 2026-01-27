
import FileUpload from "../features/uploads/FileUpload.jsx";
import UploadContainer from "../features/uploads/UploadContainer.jsx";

export default function FlashCardGenerator() {




  return (
    <>
      <div className="bg-blue-100 p-8 py-4 ">
        <header className="text-4xl my-8">AI Flashcard Generator</header>
        <p>Welcome to the Ai Flashcard Generator that will help you to create flashcards
          from any text you provide! Simply input your text, and the AI will generate
          flashcards to aid your learning process.
        </p>
      </div>
      <UploadContainer />

    </>

  )
}