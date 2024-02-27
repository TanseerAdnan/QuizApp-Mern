import React from 'react';
import { Link } from 'react-router-dom';
import colorTheme from '../style';

const SelectLanguage = () => {
  return (
    <div className={`bg-gradient-to-r ${colorTheme.primary} from-30% ${colorTheme.secondary} min-h-screen flex flex-col justify-center items-center`}>
      <div className="container mx-auto p-8 bg-gradient-to-r from-[#003049] from-20% to-[#14213d] rounded-lg shadow-md mt-32 mb-20 relative">
      <h2 style={{ fontFamily: 'Young Serif, serif' }} 
      className=" text-white text-center text-3xl font-semibold font-serif shadow-lg mb-4">Select a Programming Language</h2>
      <div className="grid grid-cols-2 gap-4">
        <Link to="/python" className={`btn bg-yellow-600 hover:bg-[#003049] text-white transition duration-300 ease-in-out py-6 px-5 rounded-lg shadow-lg text-center`}>
          Python
        </Link>
        <Link to="/c" className={`btn bg-yellow-600  hover:bg-[#003049]  text-white transition duration-300 ease-in-out py-6 rounded-lg shadow-lg text-center`}>
          C++
        </Link>
        <Link to="/java" className={`btn bg-yellow-600 hover:bg-[#003049] text-white transition duration-300 ease-in-out py-6 rounded-lg shadow-lg text-center`}>
          Java
        </Link>
        <Link to="/js" className={`btn bg-yellow-600 hover:bg-[#003049] text-white transition duration-300 ease-in-out py-6 rounded-lg shadow-lg text-center`}>
          JavaScript
        </Link>
      </div>
      </div>
    </div>

  );
};

export default SelectLanguage;
