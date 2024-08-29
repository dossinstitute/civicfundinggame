"use client";

import { useState, useEffect } from 'react';
import fundingStory from '../data/funding.json';
import proposalStory from '../data/proposal.json';
import eigenlayerStory from '../data/eigenlayer.json';

export default function TwineStory({ storyType }) {
  const [currentStory, setCurrentStory] = useState(() => {
    switch (storyType) {
      case 'funding':
        return fundingStory;
      case 'proposal':
        return proposalStory;
      case 'eigenlayer':
        return eigenlayerStory;
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
      // Reset to the initial story (fundingStory) and passage
      setCurrentStory(fundingStory);
      setCurrentPassage('1');
    } else if (['5', '6', '7', '8', '10'].includes(target)) {
      setCurrentStory(proposalStory);
      setCurrentPassage(target);
    } else if (['11', '12', '13', '14', '15', '16', '17'].includes(target)) {
      setCurrentStory(eigenlayerStory);
      setCurrentPassage(target);
    } else {
      setCurrentPassage(target);
    }
  };

  return (
    <div>
      <p>{passage.text}</p>
      <div>
        {passage.links.map((link) => (
          <button
            key={link.name}
            onClick={() => {
              console.log(`Navigating to passage ID: ${link.target}`);
              handleNavigation(link.target);
            }}
            style={{ margin: '5px', padding: '10px', cursor: 'pointer' }}
          >
            {link.name}
          </button>
        ))}
      </div>
    </div>
  );
}

