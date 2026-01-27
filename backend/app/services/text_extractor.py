import PyPDF2
from io import BytesIO


class TextExtractor:
    @staticmethod
    def extract_from_pdf(file_content: bytes) -> str:
        """
        Extracts text from a PDF file.

        Args:
            file_content (bytes): The content of the PDF file in bytes.
        Returns:
            str: The extracted text from the PDF.
        """
        try:
            # Convert bytes to a file-like object
            pdf_file = BytesIO(file_content)
            pdf_reader = PyPDF2.PdfReader(pdf_file)  # parse the PDF file

            text = ""   # Initialize an empty string to hold the extracted text

            '''
            - Iterate through each page of the PDF
            - Get the page
            - Extract and add the text
            - Return the extracted text
            '''
            for page_num in range(len(pdf_reader.pages)):
                page = pdf_reader.pages[page_num]
                text += page.extract_text()
                return text.strip()
        except Exception as e:
            # raise an exception if any error occurs during extraction
            raise Exception(f"Error Extracting PDF: {str(e)}")

    @staticmethod
    def extract_from_text(file_content: bytes) -> str:
        """
        General method to extract text from a file.

        Args:
            file_content (bytes): The content of the file in bytes.
        Returns:
            str: The extracted text from the file.
        """

        try:
            text = file_content.decode('utf-8')  # Decode bytes to string
            return text.strip()  # Return the extracted text
        except Exception as e:
            # raise an exception if any error occurs during extraction
            raise Exception(f"Error Extracting Text: {str(e)}")

    @staticmethod
    def extract_text(file_content: bytes, file_type: str) -> str:
        """
        Extracts text from a file based on its type.

        Args:
            file_content (bytes): The content of the file in bytes.
            file_type (str): The type of the file ('pdf' or 'text').    
        Returns:
            str: The extracted text from the file.
        """

        file_extension = file_type.lower().split('.')[-1]  # Get the file extension

        if file_extension == 'pdf':
            return TextExtractor.extract_from_pdf(file_content)
        elif file_extension == 'txt':
            return TextExtractor.extract_from_text(file_content)
        else:
            raise ValueError(f"Unsupported File Type: {file_extension}")
