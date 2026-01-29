

export default function TextInput({ value, onChange }) {
    return (
        <div>
            <textarea 
                value = {value}
                onChange = {onChange}
                placeholder = "Enter text here to generate flashcards..."
                className = "w-full h-64 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                maxLength = {25000}
            ></textarea>

            <div>
                {value.length} / 25000 characters {value.length < 100 ? '(minimum 100)' : '✓'}
            </div>
        </div>
    );
}