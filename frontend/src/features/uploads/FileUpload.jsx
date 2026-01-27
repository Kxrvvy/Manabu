import { useRef, useState } from 'react';


export default function FileUpload({ selectedFiles, onFileSelect }) {
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState("");

    const fileInputRef = useRef(null);

    // When an item is dragged over the drop area
    const handleDragOver = (e) => {
        e.preventDefault();
    }

    // When an item is dragged over the drop area
    const handleDragEnter = (e) => {
        e.preventDefault();
        setIsDragging(true);
    }

    // When the dragged item leaves the drop area
    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    }

    // Validate file type and size
    const validateFile = (file) => {
        const isValidType =
            file.type === "application/pdf" ||
            file.type === "text/plain" ||
            file.name.endsWith(".pdf") ||
            file.name.endsWith(".txt");

        const maxSize = 15 * 1024 * 1024; // 15MB

        if (!isValidType) {
            setError("Invalid file type. Only PDF and TXT files are allowed.");
            return false;
        }

        if (file.size > maxSize) {
            setError("File size exceeds the 15MB limit.");
            return false;
        }

        return true;
    };

    // When a file is dropped into the drop area
    const handleDrop = (e) => {
        e.preventDefault(); // Prevent default behavior (Prevent file from being opened)
        setIsDragging(false);

        const fileList = e.dataTransfer.files[0]; // Get the first file


        if (!fileList) {
            setError("No files selected.");
            return;
        }

        if (validateFile(fileList)) {
            setError("");
            onFileSelect(fileList);
        } else {
            onFileSelect(null);
        }
    };

    // When the drop area is clicked
    const handleClick = () => {
        fileInputRef.current.click();
    };

    // When a file is selected via the file input
    const handleFileSelect = (e) => {
        const fileList = e.target.files[0];

        if (!fileList) return;

        if (validateFile(fileList)) {
            setError("");
            onFileSelect(fileList);
        } else {
            onFileSelect(null);
        }
    };

    // Format file size for display
    const formattedFileSize = (bytes) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    };


    return (
        <div className="w-full max-w-2xl mx-auto p-6">
            <div
                onClick={handleClick}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`
                border-2 border-dashed rounded-lg p-12 
                text-center cursor-pointer
                transition-all duration-200

                ${isDragging
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 bg-gray-50 hover:border-gray-400'}
                `}
            >

                <div className="text-6xl mb-4">📄</div>

                <p className="text-lg font-medium text-gray-700 mb-2">Drag & drop your files here </p>
                <p className="text-small text-gray-500">or click to browse</p>

                <p className="text-xs text-gray-400 mt-2">
                    Supports: PDF, TXT (Max 15MB)
                </p>
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.txt"
                onChange={handleFileSelect}
                className="hidden"
            />

            {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-500 mt-4">{error}</p>
                </div>
            )}

            {selectedFiles && !error && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-green-800">{selectedFiles.name}</p>
                            <p className="text-sm text-green-600">
                                {formattedFileSize(selectedFiles.size)}
                            </p>
                        </div>
                        <span className="text-2xl">✓</span>
                    </div>
                </div>
            )}

        </div>
    );
}