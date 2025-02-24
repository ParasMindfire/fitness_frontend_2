import React, { useState, useEffect } from "react";

const quotes = [
  "The only bad workout is the one that didn’t happen.",
  "Push yourself, because no one else is going to do it for you.",
  "Fitness is not about being better than someone else… it's about being better than you used to be.",
];

const AnimatedQuotes: React.FC = () => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) =>
        prevIndex === quotes.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // change quote every 3 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="text-center px-4">
      <p className="text-lg font-semibold text-gray-800">
        {quotes[currentQuoteIndex]}
      </p>
    </div>
  );
};

export default AnimatedQuotes;
