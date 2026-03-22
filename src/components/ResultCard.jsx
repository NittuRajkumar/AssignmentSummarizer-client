import React from 'react';

const ResultCard = ({ result }) => {
  const summary = result?.summary || 'No summary available';
  const keyPoints = Array.isArray(result?.keyPoints) ? result.keyPoints : [];
  const sentiment = result?.sentiment || 'neutral';
  const sentimentClass = `sentiment ${sentiment}`;

  return (
    <div className="result-card">
      <div className="section">
        <h2>Summary</h2>
        <p>{summary}</p>
      </div>
      <div className="section">
        <h3>Key Points</h3>
        <ul>
          {keyPoints.length > 0 ? (
            keyPoints.map((point, index) => <li key={index}>{point}</li>)
          ) : (
            <li>No key points provided</li>
          )}
        </ul>
      </div>
      <div className="section">
        <h3>Sentiment</h3>
        <span className={sentimentClass}>{sentiment}</span>
      </div>
    </div>
  );
};

export default ResultCard;