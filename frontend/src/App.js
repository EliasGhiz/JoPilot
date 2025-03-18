import React, { useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  const fetchData = (event) => {
    event.preventDefault();
    console.log('Fetching data from /test');
    fetch('http://localhost:5000/test') //flask API address for test function. Should receive json data via console
      .then(res => {
        console.log('Response status:', res.status);
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        console.log('Data received:', data);
        setMessage(data.message);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error.toString());
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">JoPilot</h1>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/test" onClick={fetchData}>Test</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>
      </header>
      <main>
        <h2>Main Content</h2>
        {error ? <p className="error">Error: {error}</p> : <p className="message">{message}</p>}
      </main>
      <footer>
        <p>&copy; JoPilot 2025</p>
      </footer>
    </div>
  );
}

export default App;