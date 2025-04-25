import React from 'react';

const Loading = ({ message, messageStyles }: { message: string, messageStyles?: string}) => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="flex items-center space-x-2 mb-4">
        {/* First dot */}
        <div className="w-4 h-4 bg-blue-500 rounded-full animate-dot-bounce" style={{ animationDelay: '0s' }}></div>
        {/* Second dot with delay */}
        <div className="w-4 h-4 bg-blue-500 rounded-full animate-dot-bounce" style={{ animationDelay: '0.2s' }}></div>
        {/* Third dot with more delay */}
        <div className="w-4 h-4 bg-blue-500 rounded-full animate-dot-bounce" style={{ animationDelay: '0.4s' }}></div>
      </div>
    <p className={`text-2xl text-orange-400 text-center ${messageStyles}`}>{message}</p>
  </div>
  );
};

export default Loading;
