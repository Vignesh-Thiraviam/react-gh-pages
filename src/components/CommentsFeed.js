import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setComments } from './utils/commentSlice';

const CommentsFeed = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const commentsFromRedux = useSelector((state) => state.comments.comments);
    console.log("Redux comments " + JSON.stringify(commentsFromRedux));
    const dispatch = useDispatch();
  

    useEffect(() => {
        // Fetch comments from the API
        fetchComments();
            // Set up interval to fetch data every 10 seconds
        const intervalId = setInterval(fetchComments, 5000);

        // Clear the interval when the component is unmounted
        return () => clearInterval(intervalId);

    }, []); // Empty dependency array means this effect runs once on mount

    const fetchComments = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/comments`); // Replace with your API URL
            if (!response.ok) {
                throw new Error('Failed to fetch comments');
            }
            const data = await response.json();
            console.log("Latest comments " + JSON.stringify(data));
            dispatch(setComments(data));
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    if (loading) {
        return <p className="text-center text-gray-500">Loading comments...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">Error: {error}</p>;
    }

    return (
        <div
            className="max-h-96 w-full overflow-y-auto bg-white p-4 rounded-lg shadow-md"
            style={{
                maxWidth: '600px',
                scrollbarWidth: 'thin', // For Firefox
                scrollbarColor: '#888 #f1f1f1', // For Firefox
            }}
        >
            <h2 className="text-xl text-green-500 font-bold text-center mb-4">💬 Chatter Box 🗣️</h2>
            {commentsFromRedux.length === 0 ? (
                <p className="text-green-500 text-center">No comments yet.</p>
            ) : (
                commentsFromRedux.map((comment, index) => (
                    <div
                        key={index}
                        className="p-4 my-2 rounded-lg shadow-lg bg-gradient-to-r from-green-100 to-blue-100 hover:from-green-200 hover:to-blue-200 transition-all duration-300 ease-in-out transform hover:scale-105"
                    >
                        <p className="text-gray-800">{comment.text}</p>
                        <span className="text-sm text-gray-600 font-semibold">{comment.playerName}</span>
                    </div>
                ))
            )}
            {/* Inline styles to customize scrollbar for WebKit browsers */}
            <style jsx>{`
                div::-webkit-scrollbar {
                    width: 8px;
                }
                div::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 10px;
                }
                div::-webkit-scrollbar-thumb {
                    background-color: #888;
                    border-radius: 10px;
                    border: 2px solid #f1f1f1;
                }
                div::-webkit-scrollbar-thumb:hover {
                    background-color: #555;
                }
            `}</style>
        </div>
    );
};

export default CommentsFeed;
