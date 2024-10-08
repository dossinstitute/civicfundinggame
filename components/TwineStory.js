"use client";

import { useState, useEffect } from 'react';
import fundingStory from '../data/funding.json';
import proposalStory from '../data/proposal.json';
import eigenlayerStory from '../data/eigenlayer.json';
import ssvInstructionStory from '../data/ssv_instructions.json';
import validatorStory from '../data/validator.json';  // Importing the new validator.json file
import ReactMarkdown from 'react-markdown';

export default function TwineStory({ storyType }) {
  const [currentStory, setCurrentStory] = useState(() => {
    switch (storyType) {
      case 'funding':
        return fundingStory;
      case 'proposal':
        return proposalStory;
      case 'eigenlayer':
        return eigenlayerStory;
      case 'ssv_instructions':
        return ssvInstructionStory;
      case 'validator':   // Adding the validator case
        return validatorStory;
      default:
        return fundingStory;
    }
  });

  const [currentPassage, setCurrentPassage] = useState(currentStory.startnode);

  useEffect(() => {
    console.log('Current Story:', currentStory);
    console.log('Current Passage ID:', currentPassage);
  }, [currentStory, currentPassage]);

  const passage = currentStory.passages.find((p) => p.id === currentPassage);

  useEffect(() => {
    console.log('Found Passage:', passage);
  }, [passage]);

  if (!passage) {
    console.error(`Error: Passage with ID "${currentPassage}" not found`);
    return <div>Error: Passage not found</div>;
  }

  const handleNavigation = (target) => {
    console.log(`Attempting to navigate to passage ID: ${target}`);

    if (target === '1') {
      setCurrentStory(fundingStory);
      setCurrentPassage('1');
    } else if (['5', '6', '7', '8', '10'].includes(target)) {
      setCurrentStory(proposalStory);
      setCurrentPassage(target);
    } else if (['11', '12', '13', '14', '15', '16', '17'].includes(target)) {
      setCurrentStory(eigenlayerStory);
      setCurrentPassage(target);
    } else if (['18', '19', '20', '21', '22', '23', '24'].includes(target)) {
      setCurrentStory(ssvInstructionStory);
      setCurrentPassage(target);
    } else if (['50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60'].includes(target)) { // Navigation for validator.json
      setCurrentStory(validatorStory);
      setCurrentPassage(target);
    } else {
      setCurrentPassage(target);
    }
  };

  return (
    <div
      className="p-6 min-h-screen flex flex-col justify-center items-center bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: "url('Cityimage.webp')",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        backgroundBlendMode: "overlay"
      }}
    >
      <div className="max-w-lg bg-gray-800 border border-gray-700 p-8 rounded-md shadow-lg text-white">
        <div className="text-lg leading-relaxed mb-6">
          <ReactMarkdown
            components={{
              a: ({ href, children }) => (
                <a href={href} className="text-red-500 underline hover:text-red-700">
                  {children}
                </a>
              ),
            }}
          >
            {passage.text}
          </ReactMarkdown>
        </div>
        <div className="mt-4 flex flex-wrap gap-4">
          {passage.links.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavigation(link.target)}
              className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors"
            >
              {link.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );  
}
