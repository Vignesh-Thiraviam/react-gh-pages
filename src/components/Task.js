// src/components/Task.js
import React from 'react';

const Task = ({ task, selectedValue }) => {
  return (
    <div className="bg-white p-6 border border-gray-300 rounded-lg shadow-lg max-w-md w-full my-4">
      <h3 className="text-2xl font-bold mb-2">{task.title}</h3>
      <p className="text-blue-700 mb-4">{task.description}</p>
      <p className="text-lg text-blue-700">Estimated Points: <span className="font-semibold text-blue-400">{selectedValue || 'None'}</span></p>
    </div>
  );
};

export default Task;
