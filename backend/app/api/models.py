from pydantic import BaseModel
from typing import Optional


class UploadResponse(BaseModel):
    success: bool
    extracted_text: str
    filename: str
    file_type: str
    word_count: int
    char_counts: int


class ErrorResponse(BaseModel):
    success: bool
    error_message: str
    details: Optional[str] = None


class Flashcard(BaseModel):
    """
    Model for a single flashcard.
    """
    id: str
    front: str
    back: str
    difficulty: str = "medium"
    tags: list[str] = []
    source: str = "mock_generator"

class GenerateFlashcardsRequest(BaseModel):
    text: str
    count: int = 10
    difficulty: str = "mixed"
    front_length: str = "medium"
    back_length: str = "medium"

class FlashcardResponse(BaseModel):
    """
    Response model for flashcard generation.
    """
    success: bool
    flashcards: list[Flashcard]
    count: int
    mode: str