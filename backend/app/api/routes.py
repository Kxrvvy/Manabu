from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.text_extractor import TextExtractor
from app.api.models import UploadResponse, ErrorResponse, FlashcardResponse, GenerateFlashcardsRequest
from app.services.ai_generator import AIGenerator


# create router
"""
   prefix = "/api" -> all routes will start with /api
   tags = ["file"] -> group routes under "file" tag 
"""
router = APIRouter(prefix="/api", tags=["file"])

# This endpoint allows POST request in which the path is with '/upload'.
# The response model tells FastAPI the response structure to expect.


@router.post("/upload", response_model=UploadResponse)
# File(...) File upload parameter, wherein the '...' indicates it's a required field.
async def upload_file(file: UploadFile = File(...)):
    """
    Endpoint to upload a file and extract text from it.

    Args:
        file (UploadFile): The file to be uploaded. 
    Returns:
        UploadResponse: The response containing extraction results. 
    """

    try:
        file_content = await file.read()  # Read the uploaded file content

        # Extract text based on file type
        extracted_text = TextExtractor.extract_text(
            file_content, file.filename)

        # Calculate Metadata
        word_count = len(extracted_text.split())
        char_counts = len(extracted_text)
        # split the filename when a '.' is encountered and get the last part as file extension
        file_type = file.filename.split('.')[-1].lower()

        # Return Success Response
        return UploadResponse(
            success=True,
            extracted_text=extracted_text,
            filename=file.filename,
            file_type=file_type,
            word_count=word_count,
            char_counts=char_counts
        )
    except ValueError as e:
        # Handle unsupported file type error
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"File Processing Error: {str(e)}")


@router.post("/generate-flashcards", response_model=FlashcardResponse)
async def generate_flashcards(request: GenerateFlashcardsRequest):
    """
    Endpoint to generate flashcards from the provided text.

    Args:
        text (str): The input text to generate flashcards from.
        count (int): The number of flashcards to generate. Default is 10.
    Returns:
        list: A list of generated flashcards.
    """
    
    try:
        
        text = request.text
        count = request.count  
        
        #validate input
        
        if not text or len(text.strip()) < 10:
            raise HTTPException(status_code=400, detail="Input text is too short or empty.")
        
        if count < 1 or count > 50:
            raise HTTPException(status_code=400, detail="Count must be between 1 and 50.")
        
        generator = AIGenerator(use_mock=True)  # Using mock mode for now
        
        #generate flashcard
        flashcards = generator.generate_mock_flashcards(text,count)
        
        return FlashcardResponse(
            success=True,
            flashcards=flashcards,
            count=len(flashcards),
            mode="mock"
        )
        
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Flashcard Generation Error: {str(e)}")