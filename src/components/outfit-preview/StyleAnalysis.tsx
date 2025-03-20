
import React from 'react';

const StyleAnalysis = () => {
  return (
    <div className="bg-outfitopia-darkgray rounded-xl p-4 mb-6">
      <h3 className="text-lg font-medium text-white mb-2">Outfit Style Analysis</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-outfitopia-gray mb-1">Style Match</p>
          <div className="w-full bg-black/30 rounded-full h-2 mb-2">
            <div className="outfitopia-gradient h-2 rounded-full" style={{ width: '85%' }}></div>
          </div>
          <p className="text-sm text-white">85% match</p>
        </div>
        <div>
          <p className="text-outfitopia-gray mb-1">Fit Rating</p>
          <div className="w-full bg-black/30 rounded-full h-2 mb-2">
            <div className="outfitopia-gradient h-2 rounded-full" style={{ width: '92%' }}></div>
          </div>
          <p className="text-sm text-white">92% perfect</p>
        </div>
      </div>
    </div>
  );
};

export default StyleAnalysis;
