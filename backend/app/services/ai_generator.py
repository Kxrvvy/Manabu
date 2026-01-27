from typing import List, Dict
import random
import json


class AIGenerator:
    """
    Service to generate flashcards, quizzes, and summaries.
    Currently using MOCK data (no API calls).
    Can be easily switched to real AI later.
    """

    def __init__(self, use_mock: bool = True):
        """
        Initialize the AI Generator.
        Args:
            use_mock: If True, use mock data. If False, use real AI API.
        """
        self.use_mock = use_mock

    def generate_flashcards(self, text: str, count: int = 10) -> List[Dict]:
        """
        Generate flashcards from the given text.

        Args:
            text: The input text to generate flashcards from.
            count: Number of flashcards to generate.
        Returns:
            List of flashcards, each represented as a dictionary with 'question' and 'answer'.
        """
        if self.use_mock:
            return self.generate_mock_flashcards(text, count)
        else:
            # TODO : Implement real AI API call

            return self.generate_AI_flashcards(text, count)

    def generate_mock_flashcards(self, text: str, count: int) -> List[Dict]:
        """
        Generate mock flashcards for testing.
        These look realistic but don't actually analyze the text.
        """
        # Sample flashcard templates
        templates = [
            {
                "front": "What is the main topic discussed in this text?",
                "back": "The text discusses various concepts and ideas that are important for understanding the subject matter.",
                "difficulty": "easy"
            },
            {
                "front": "Define the key term mentioned in the passage.",
                "back": "The key term refers to a fundamental concept that is central to the topic being discussed.",
                "difficulty": "medium"
            },
            {
                "front": "Explain the relationship between the concepts presented.",
                "back": "The concepts are interconnected and build upon each other to create a comprehensive understanding.",
                "difficulty": "medium"
            },
            {
                "front": "What are the practical applications of this knowledge?",
                "back": "This knowledge can be applied in various real-world scenarios to solve problems and improve understanding.",
                "difficulty": "hard"
            },
            {
                "front": "Compare and contrast the ideas presented in the text.",
                "back": "The ideas share some similarities but differ in their approach and implementation details.",
                "difficulty": "hard"
            },
            {
                "front": "What is the significance of this topic?",
                "back": "This topic is significant because it forms the foundation for more advanced concepts and applications.",
                "difficulty": "easy"
            },
            {
                "front": "Identify the main argument or thesis.",
                "back": "The main argument centers on the importance of understanding core principles before advancing to complex topics.",
                "difficulty": "medium"
            },
            {
                "front": "What examples support the main points?",
                "back": "Several examples are provided throughout the text to illustrate key concepts and make them more relatable.",
                "difficulty": "easy"
            },
            {
                "front": "How does this relate to other topics in the field?",
                "back": "This topic connects to broader themes and concepts, providing context within the larger field of study.",
                "difficulty": "hard"
            },
            {
                "front": "What are the key takeaways from this material?",
                "back": "The key takeaways include understanding fundamental principles, recognizing patterns, and applying knowledge effectively.",
                "difficulty": "medium"
            }
        ]

        # Empty list to hold generated flashcards
        flashcards = []
        # Count the number of words in the input text
        word_count = len(text.split())

        # Limit the number of flashcards to the available templates
        actual_count = min(count, len(templates))

        # Randomly select flashcards from the templates
        selected_templates = random.sample(templates, actual_count)

        for i, template in enumerate(selected_templates):
            flashcard = {
                "id": f"card {i+1}",
                "front": template["front"],
                "back": template["back"],
                "difficulty": template["difficulty"],
                "tags": self._extract_mock_tags(text),
                "source": "mock_generator"
            }
            flashcards.append(flashcard)
        return flashcards

    def _extract_mock_tags(self, text: str) -> List[str]:
        """
        Mock method to extract tags from text.
        In a real implementation, this would analyze the text.
        """
        word_count = len(text.split())
        tags = []

        if word_count < 100:
            return ["concept", "basics"]
        elif word_count < 500:
            return ["concept", "intermediate", "theory"]
        else:
            return ["concept", "advanced", "theory", "application"]

    def generate_AI_flashcards(self, text: str, count: int) -> List[Dict]:
        """
        Placeholder for real AI flashcard generation.
        To be implemented with actual AI API calls.
        """
        raise NotImplementedError(
            "AI flashcard generation not implemented yet. Use mock mode.")

    def generate_summary(self, text: str, length: str = "medium") -> Dict:
        """
        Generate a summary of the given text.

        Args:
            text: The input text to summarize.
            length: Desired length of the summary ('short', 'medium', 'long').
        Returns:
            A dictionary containing the summary and its length.
        """

        if self.use_mock:
            return self._generate_mock_summary(text, length)
        else:
            # TODO : Implement real AI API call
            raise NotImplementedError(
                "AI summary generation not implemented yet. Use mock mode.")

    def _generate_mock_summary(self, text: str, length: str) -> Dict:
        """
        Generate a mock summary for testing.
        """
        word_count = len(text.split())

        # Different summaries based on length
        summaries = {
            "short": f"This text contains approximately {word_count} words covering important concepts and ideas.",
            "medium": f"This text contains approximately {word_count} words. It discusses various topics and presents key information that is essential for understanding the subject matter. The content provides a foundation for further learning.",
            "long": f"This comprehensive text contains approximately {word_count} words and covers a wide range of topics. It presents detailed information, examples, and explanations that build upon each other. The material is structured to provide both foundational knowledge and advanced concepts, making it suitable for learners at different levels."
        }

        return {
            "summary": summaries.get(length, summaries["medium"]),
            "key_points": [
                "Understanding the fundamental concepts is essential",
                "The material builds progressively from basic to advanced topics",
                "Practical applications are provided throughout",
                "Multiple perspectives are considered"
            ],
            "word_count": word_count
        }
