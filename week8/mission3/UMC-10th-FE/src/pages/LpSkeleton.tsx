import React from 'react';

const LpSkeleton = () => (
  <div className="relative aspect-square rounded-md bg-[#1a1a1a] animate-pulse">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-800/50 to-transparent shadow-inner" />
  </div>
);

export default LpSkeleton; 