// pages/index.js
import TwineStory from '../components/TwineStory';

export default function Home() {
  return (
    <div>
      <h1>Twine Story App</h1>
      <TwineStory storyType="funding" /> {/* Use "proposal" or "eigenlayer" for different stories */}
    </div>
  );
}

