import { useState } from 'react';
import Form from './Form';
import ResultDisplay from './ResultDisplay';
import { unserializeData } from './utils/unserialize';
import './App.css';

function App() {
  const [entries, setEntries] = useState([]);
  const [showForm, setShowForm] = useState(true);

  const handleFormSubmit = (formData) => {
    const result = unserializeData(formData.serializedData);
    
    const newEntry = {
      id: Date.now(),
      title: formData.title,
      serializedData: formData.serializedData,
      unserializedData: result.data,
      error: result.error,
      format: result.format
    };

    setEntries([...entries, newEntry]);
    setShowForm(false);
  };

  const handleAddNew = () => {
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Unserialize and Compare</h1>
        <p>Unserialize PHP or JSON data and compare multiple results side by side</p>
      </header>

      <main className="app-main">
        {showForm && (
          <div className="form-section">
            <Form onSubmit={handleFormSubmit} onCancel={handleCancelForm} />
          </div>
        )}

        {!showForm && entries.length === 0 && (
          <div className="empty-state">
            <p>No data to display. Click the button below to add your first entry.</p>
            <button onClick={handleAddNew} className="btn-add">
              + Add New
            </button>
          </div>
        )}

        {entries.length > 0 && (
          <div className="results-section">
            <div className="results-header">
              <h2>Results</h2>
              {!showForm && (
                <button onClick={handleAddNew} className="btn-add">
                  + Add New
                </button>
              )}
            </div>
            
            <div className="results-grid">
              {entries.map((entry) => (
                <ResultDisplay key={entry.id} entry={entry} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
