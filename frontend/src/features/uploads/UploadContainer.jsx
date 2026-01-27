import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadFile, generateFlashcards } from "../../services/api";
import FileUpload from "./FileUpload";
import GenerateOptions from "./GenerateOptions";
import TextInput from "./TextInput";
import FlashcardDisplay from "../../pages/FlashcardDisplayPage";



export default function UploadContainer() {
    const navigate = useNavigate();
    // State to manage selected file and text input
    const [selectedFile, setSelectedFile] = useState(null);
    // State to manage text input
    const [textInput, setTextInput] = useState('');
    // State to manage active tab
    const [activeTab, setActiveTab] = useState('file'); // 'file' or 'text'
    // State to manage generated flashcards
    const [flashcards, setFlashcards] = useState(null);

    // State to manage generation options
    const [options, setOptions] = useState({
        count: 10,
        difficulty: 'mixed',
        frontLength: 'medium',
        backLength: 'medium'
    });

    // State to manage generation process
    const [isGenerating, setIsGenerating] = useState(false);

    // Handle the generation process
    const handleGenerate = async () => {

        if ((activeTab === 'file' && !selectedFile)) {
            alert("Please select a file to upload.");
            return;
        }

        if (activeTab === 'text') {
            const TrimmedText = textInput.trim();

            if (TrimmedText.length === 0) {
                alert("Please enter some text to generate flashcards.");
                return;
            }

            if (TrimmedText.length < 50) {
                alert("Please enter at least 50 characters of text.");
                return;
            }
        }

        setIsGenerating(true);

        try {
            let extractedText = "";

            if (activeTab === 'file') {
                console.log('📤 Uploading file to backend...');
                // Upload file and get extracted text
                const uploadResponse = await uploadFile(selectedFile);
                extractedText = uploadResponse.extracted_text;
                console.log(`✅ File uploaded and text extracted. \n text length: ${extractedText.length} characters.`);
            } else {
                extractedText = textInput;
                console.log(`📝 Using pasted text. \n text length: ${extractedText.length} characters.`);
            }

            console.log('⚙️ Generating flashcards...');
            const flashcardResponse = await generateFlashcards(extractedText, options);
            setFlashcards(flashcardResponse.flashcards)
            console.log('✅ Flashcards generated:', flashcardResponse);
            
            setFlashcards(flashcardResponse.flashcards);
            alert(`Successfully generated ${flashcardResponse.count} flashcards`);

            // Navigate to flashcards page with the generated data
            navigate('/flashcards', { state: { flashcards: flashcardResponse.flashcards } });

            
        } catch (error) {
            console.error("Error during generation:", error);

            if (error.response) {
                alert(`Error: ${error.response.data.message || 'An error occurred during generation.'}`);
            }
            else if (error.request) {
                alert("Error: No response from server. Please check your network connection.");
            }
            else {
                alert(`Error: ${error.message}`);
            }
        } finally {
            setIsGenerating(false);
        }
    };

    const canGenerate = activeTab === 'file'
        ? selectedFile !== null
        : textInput.trim().length >= 50;

    return (
        <div className="w-full max-w-3xl mx-auto p-6">


            {/* Header */}
            <div className="mb-8 text-center">
                <p className="text-gray-600">
                    Upload a document or paste your notes to automatically generate flashcards
                </p>
            </div>

            {/* Tab Buttons */}
            <div className="flex gap-2 mb-6">
                <button
                    onClick={() => setActiveTab('file')}
                    className={`
            flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-200
            ${activeTab === 'file'
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }
          `}
                >
                    <span className="mr-2">📄</span>
                    Upload File
                </button>

                <button
                    onClick={() => setActiveTab('text')}
                    className={`
            flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-200
            ${activeTab === 'text'
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }
          `}
                >
                    <span className="mr-2">📝</span>
                    Paste Text
                </button>
            </div>

            {/* Content Area - Switches based on active tab */}
            <div className="mb-6">
                {activeTab === 'file' ? (
                    <FileUpload
                        selectedFile={selectedFile}
                        onFileSelect={setSelectedFile}
                    />
                ) : (
                    <TextInput
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                    />
                )}
            </div>

            {/* Options Panel */}
            <div className="mb-6">
                <GenerateOptions
                    options={options}
                    onChange={setOptions}
                />
            </div>

            {/* Generate Button */}
            <button
                onClick={handleGenerate}
                disabled={!canGenerate || isGenerating}
                className={`
          w-full py-4 rounded-lg font-semibold text-lg
          transition-all duration-200
          ${canGenerate && !isGenerating
                        ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg cursor-pointer'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }
        `}
            >
                {isGenerating ? (
                    <span className="flex items-center justify-center">
                        <span className="animate-spin mr-2">⏳</span>
                        Generating...
                    </span>
                ) : (
                    'Generate Flashcards'
                )}
            </button>

            {/* Helper Text */}
            <p className="text-center text-sm text-gray-500 mt-4">
                {activeTab === 'file'
                    ? 'Select a PDF or TXT file to get started'
                    : `${textInput.length} / 25,000 characters ${textInput.length < 50 ? '(minimum 50)' : '✓'}`
                }
            </p>

        </div>

    );
}