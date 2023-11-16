import React from 'react';
import { Link } from 'react-router-dom';

const SelectLanguage = () => {
  return (
    <div className="bg-blue-500 min-h-screen flex flex-col justify-center items-center">
      <h2 className="text-3xl font-semibold font-serif shadow-lg mb-4">Select a Programming Language</h2>
      <div className="grid grid-cols-2 gap-4">
        <Link to="/python" className="btn bg-gray-500 hover:bg-gray-600 text-white py-6 px-5 rounded-lg shadow-lg text-center">
          Python
        </Link>
        <Link to="/c" className="btn bg-red-500 hover:bg-red-600 text-white py-6 rounded-lg shadow-lg text-center">
          C++
        </Link>
        <Link to="/java" className="btn bg-yellow-500 hover:bg-yellow-600 text-white py-6 rounded-lg shadow-lg text-center">
          Java
        </Link>
        <Link to="/js" className="btn bg-green-500 hover:bg-green-600 text-white py-6 rounded-lg shadow-lg text-center">
          JavaScript
        </Link>
      </div>
    </div>
  );
};

export default SelectLanguage;
