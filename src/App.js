import React, { useState, useEffect } from 'react';
import '../src/App.css';

function App() {
  const [questions, setQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortAsc, setSortAsc] = useState(true); // состояние для отслеживания порядка сортировки

  useEffect(() => {
    fetch('https://63d304794abff88834170d21.mockapi.io/quetions')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then(data => {
        setQuestions(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  let filteredQuestions = questions.filter(question =>
    question.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Сортировка по алфавиту
  filteredQuestions.sort((a, b) => {
    if (sortAsc) {
      return a.title.localeCompare(b.title);
    } else {
      return b.title.localeCompare(a.title);
    }
  });

  const toggleSort = () => {
    setSortAsc(!sortAsc);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  return (
    <div className="container">
      <h1>Questions</h1>
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        <button onClick={toggleSort}>Toggle Sort</button> {/* Кнопка для переключения сортировки */}
      </div>
      <ul className="question-list">
        {filteredQuestions.map(question => (
          <li key={question.id} className="question-item">
            <div>
              <span className="question-id">ID: {question.id}</span>
              <span className="question-title">Title: {question.title}</span>
            </div>
            <img
              src={question.image}
              alt={question.title}
              className="question-image"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
