// pages/index.tsx
import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className="bg-gray-100 flex items-left justify-top">
      <div className="text-left">
        <h1 className="text-4xl font-bold mb-4">EasyTask</h1>
        <p className="text-gray-600">This is a simple homepage!</p>
      </div>
    </div>
  );
};

export default HomePage;
