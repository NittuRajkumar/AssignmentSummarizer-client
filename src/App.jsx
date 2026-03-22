import React, { useState } from 'react';
import ErrorBoundary from './ErrorBoundary';
import ResultCard from './components/ResultCard';
import Loader from './components/Loader';

function App() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!text.trim()) {
      setError('Please enter some text to summarize.');
      return;
    }
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const response = await fetch('http://localhost:5000/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();

      if (!response.ok) {
        const msg = data?.error || 'Failed to summarize text. Please try again.';
        throw new Error(msg);
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setResult(data);
    } catch (err) {
      setError(err.message || 'Unknown error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h1>AI Text Summarizer</h1>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter the text you want to summarize..."
          rows={10}
        />
        <button
          onClick={handleSubmit}
          disabled={!text.trim() || loading}
          className="submit-btn"
        >
          {loading ? 'Analyzing...' : 'Summarize'}
        </button>
        {loading && <Loader />}
        {error && <p className="error">{error}</p>}
        {result && <ResultCard result={result} />}
      </div>
    </div>
  );
}

function AppWithBoundary() {
  return (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}

export default AppWithBoundary;
