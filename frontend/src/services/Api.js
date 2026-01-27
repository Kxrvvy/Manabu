import axios from 'axios';


const API_BASE_URL = 'http://127.0.0.1:8000'; // Adjust the base URL as needed
/*
@param {File} file - The file to be uploaded
@returns {Promise} - Axios response promise
*/


export const uploadFile = async (file) => {
    
    try{
        const formData = new FormData();
        formData.append('file', file);

        const response = await axios.post(`${API_BASE_URL}/api/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;

    }catch (error){
        console.error("Error uploading file:", error);
        throw error;
    }
};

/**
 * Generate flashcards from text
 * @param {string} text - The source text
 * @param {object} options - Generation options (count, difficulty, etc.)
 * @returns {Promise} - Response with generated flashcards
 */

export const generateFlashcards = async (text, options) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/generate-flashcards`, {
            text: text,
            options: options,
            difficulty: options.difficulty,
            frontLength: options.frontLength,
            backLength: options.backLength
        });
        return response.data;
    } catch (error) {
        console.error("Error generating flashcards from text:", error);
        throw error;
    }
};

