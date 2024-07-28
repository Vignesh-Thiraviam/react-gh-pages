// src/components/Task.js
import React from 'react';

const Task = ({ task, selectedValue }) => {
  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-md text-white w-full">
      <h2 className="text-xl font-bold">{task.title}</h2>
      <p>{task.description}</p>
      {selectedValue && <p className="mt-2">Selected Value: {selectedValue}</p>}
    </div>
  );
};

export default Task;
