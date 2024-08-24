import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { IoMdSend } from 'react-icons/io';

const Comments = ({ selectedPlayer }) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [isEditing, setIsEditing] = useState(false);
    const [comment, setComment] = useState('');
    const maxLength = 1000;

    const handleInputChange = (e) => {
        const value = e.target.value;
        if (value.length <= maxLength) {
            setComment(value);
            setIsEditing(true);
        }
    };

    const handleSaveClick = async () => {
        // Handle saving the comment
        console.log("Handling save click for comment: " + comment);
        setComment(''); 
        setIsEditing(false);

        const payload = 
        { 
            text: comment,
            playerName: selectedPlayer.playerName
        };
                
        console.log("data to save comment");
        console.log(JSON.stringify(payload));
    
        try {
        const response = await fetch(`${apiUrl}/api/comments`, {
            method: 'POST', // Change the method to PUT
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
    
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    
        const result = await response.json();
        console.log('Success:', result);
        return result;
    
        // Handle the response or update state if needed
        } catch (error) {
        console.error('Error:', error);
        }

    };

    const handleCancelClick = () => {
        setComment(''); // Reset the comment
        setIsEditing(false);
    };

    return (
        <div className="flex flex-col space-y-2">
            <div className="flex items-start space-x-2">
                <textarea
                    value={comment}
                    onChange={handleInputChange}
                    placeholder="Add a comment..."
                    className="flex-grow bg-gray-100 text-gray-900 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                    rows={2} // Shortens the height of the textarea
                    style={{ width: '500px' }} // Increases the width of the textarea
                />
                <div className="flex space-x-2">
                    {isEditing && (
                        <button 
                            onClick={handleCancelClick} 
                            className="flex items-center justify-center p-2 text-red-500 hover:text-red-700"
                            aria-label="Cancel"
                        >
                            <FaTimes size={20} />
                        </button>
                    )}
                    <button 
                        onClick={handleSaveClick} 
                        className={`flex items-center justify-center p-2 ${isEditing ? 'text-blue-500 hover:text-blue-700' : 'text-green-600 hover:text-green-800'}`}
                        aria-label="Send"
                    >
                        <IoMdSend size={24} />
                    </button>
                </div>
            </div>
            <div className="text-sm text-white-500 ">
                {comment.length}/{maxLength} characters
            </div>
        </div>
    );
};

export default Comments;
