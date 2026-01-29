import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadFile, generateFlashcards } from "../../services/Api";
import FileUpload from "./FileUpload";
import GenerateOptions from "./GenerateOptions";
import TextInput from "./TextInput";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Loader2 } from "lucide-react";




export default function UploadContainer() {
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);
    const [textInput, setTextInput] = useState('');
    const [activeTab, setActiveTab] = useState('file'); // 'file' or 'text'
    const [flashcards, setFlashcards] = useState(null);
    const [progress, setProgress] = useState(0);


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
        setProgress(0);

        let progressInterval = null;
        const startSmoothProgress = (targetProgress) => {
            if (progressInterval) clearInterval(progressInterval);

            progressInterval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= targetProgress) {
                        clearInterval(progressInterval);
                        return targetProgress;
                    }
                    // Increment by random amount for smooth feel
                    const increment = Math.random() * 5 + 2; // Random between 2-7
                    return Math.min(prev + increment, targetProgress);
                });
            }, 200); // Update every 200ms
        };

        try {
            let extractedText = "";

            startSmoothProgress(33);

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

            startSmoothProgress(67);
            console.log('⚙️ Generating flashcards...');
            const flashcardResponse = await generateFlashcards(extractedText, options);
            setFlashcards(flashcardResponse.flashcards)
            console.log('✅ Flashcards generated:', flashcardResponse);

            if (progressInterval) clearInterval(progressInterval);
            setProgress(100);
            setFlashcards(flashcardResponse.flashcards);

            await new Promise((resolve) => setTimeout(resolve, 500));

            // Navigate to flashcards page with the generated data
            navigate('/flashcards', { state: { flashcards: flashcardResponse.flashcards } });


        } catch (error) {
            console.error("Error during generation:", error);
            if (progressInterval) clearInterval(progressInterval);
            setProgress(0);

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
        : textInput.trim().length >= 100;

    return (
        <div className="w-full max-w-5xl mx-auto p-6">


            {/* Header */}
            <div className="step3 flex items-center gap-3 mb-4">
                <div className="step3Heading w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                    1
                </div>
                <h3 className="font-bold text-xl">Add Your Content</h3>
            </div>

            <div className="mb-2 text-center">
                <p className="text-gray-600">
                    Upload a document or paste your notes to automatically generate flashcards
                </p>
            </div>

            {/* Tab Buttons */}
            <div className="flex mb-6 border p-0.5 rounded-xl bg-gray-100 text-gray-700">
                <button
                    onClick={() => setActiveTab('file')}
                    className={`
                                flex-1 px-6 py-2 rounded-lg font-medium transition-all duration-200 cursor-pointer
                                ${activeTab === 'file'
                                    ? 'bg-gray-600 text-white shadow-md'
                                    : 'bg-gray-100 text-gray-700'
                                }
                    `}>
                    <span className="mr-2">📄</span>
                    Upload File
                </button>

                <button
                    onClick={() => setActiveTab('text')}
                    className={`
                            flex-1 px-6 py-2 rounded-lg font-medium transition-all duration-200 cursor-pointer
                            ${activeTab === 'text'
                                ? 'bg-gray-600 text-white shadow-md'
                                : 'bg-gray-100 text-gray-700'
                            }
                    `}>
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

            <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                <div className="step3 flex items-center gap-3 mt-9 mb-4">
                    <div className="step3Heading w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                        4
                    </div>
                    <h3 className="font-bold text-xl">Generate Flashcards</h3>
                </div>

                {isGenerating ? (
                    <div className="card-elevated rounded-2xl p-8 border border-border">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center animate-pulse">
                                {/* <Sparkles className="w-6 h-6 text-primary-foreground" /> */}
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground">Generating {options.count} Flashcards</h3>
                                <p className="text-sm text-muted-foreground">
                                    AI is analyzing your {activeTab === "file" ? "document" : "text"}...
                                </p>
                            </div>
                        </div>
                        <Progress value={progress} variant="gradient" />
                    </div>
                ) : (
                    <div className="card-elevated rounded-2xl p-7 border border-border">
                        <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                            <div>
                                <h3 className="font-semibold text-foreground text-start text-xl mb-1">Ready to Generate</h3>
                                <p className="text-sm text-muted-foreground">
                                    {/*Add this later: • ${selectedTypes.length} type${selectedTypes.length !== 1 ? "s" : ""}*/}
                                    {canGenerate
                                        ? `${activeTab === "file" ? selectedFile?.name : `${textInput.length} chars`} • ${options.count} cards • ${options.difficulty} difficulty `
                                        : "Add content and select question types to continue"}

                                </p>
                            </div>
                            <Button
                                size="lg"
                                disabled={!canGenerate || isGenerating}
                                onClick={handleGenerate}
                                className={`w-full sm:w-auto
                                            py-6 rounded-lg font-semibold text-lg
                                            transition-all duration-200
                                            ${canGenerate && !isGenerating
                                        ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg cursor-pointer'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }
                                        `}>
                                <Sparkles className="w-5 h-5 inline mr-2" />
                                Generate Cards
                                <ArrowRight className="w-5 h-5 inline ml-2" />
                            </Button>
                        </div>
                    </div>
                )}


            </div>
        </div>

    );
}