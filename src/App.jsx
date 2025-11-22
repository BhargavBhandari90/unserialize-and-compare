import { useState, useEffect, useRef } from 'react';
import { IconPlus, IconShare, IconCheck, IconTrash } from '@tabler/icons-react';
import Form from './Form';
import ResultDisplay from './ResultDisplay';
import { unserializeData } from './utils/unserialize';
import { updateURL, getEntriesFromURL, copyURLToClipboard } from './utils/urlEncoder';
import './App.css';

function App() {
  const [entries, setEntries] = useState([]);
  const [showForm, setShowForm] = useState(true);
  const [copySuccess, setCopySuccess] = useState(false);
  const isInitialLoad = useRef(true);

  // Load entries from URL on mount
  useEffect(() => {
    const urlEntries = getEntriesFromURL();
    if (urlEntries && urlEntries.length > 0) {
      // Unserialize each entry
      const processedEntries = urlEntries.map((entryData, index) => {
        const result = unserializeData(entryData.serializedData);
        return {
          id: Date.now() + index,
          title: entryData.title,
          serializedData: entryData.serializedData,
          unserializedData: result.data,
          error: result.error,
          format: result.format
        };
      });
      setEntries(processedEntries);
      setShowForm(false);
    }
    isInitialLoad.current = false;
  }, []);

  // Update URL when entries change (but not on initial load from URL)
  useEffect(() => {
    if (isInitialLoad.current) {
      return;
    }
    
    if (entries.length > 0) {
      updateURL(entries);
    } else {
      // Clear URL if no entries
      const url = new URL(window.location.href);
      url.searchParams.delete('data');
      window.history.replaceState({}, '', url.toString());
    }
  }, [entries]);

  const handleFormSubmit = (formData) => {
    // Limit to 3 entries
    if (entries.length >= 3) {
      return;
    }

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

  const handleRemoveEntry = (id) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  const handleAddNew = () => {
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
  };

  const handleCopyShareLink = async () => {
    const success = await copyURLToClipboard();
    setCopySuccess(success);
    if (success) {
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const handleClearAll = () => {
    setEntries([]);
    setShowForm(true);
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
            <Form 
              onSubmit={handleFormSubmit} 
              onCancel={handleCancelForm}
              maxEntriesReached={entries.length >= 3}
            />
          </div>
        )}

        {!showForm && entries.length === 0 && (
          <div className="empty-state">
            <p>No data to display. Click the button below to add your first entry.</p>
            <button onClick={handleAddNew} className="btn btn-add" disabled={entries.length >= 3}>
              <IconPlus size={20} />
              Add
            </button>
          </div>
        )}

        {entries.length > 0 && (
          <div className="results-section">
            <div className="results-header">
              <h2>Results</h2>
              <div className="results-header-actions">
                {!showForm && entries.length < 3 && (
                  <>
                    <button onClick={handleClearAll} className="btn btn-remove">
                      <IconTrash size={20} />
                      Clear All
                    </button>
                    <button onClick={handleAddNew} className="btn btn-add">
                      <IconPlus size={20} />
                      Add
                    </button>
                  </>
                )}
                {entries.length >= 3 && (
                  <span className="max-entries-message">Max 3 comparisons</span>
                )}
                <button 
                  onClick={handleCopyShareLink} 
                  className="btn btn-share"
                  title="Copy shareable link"
                >
                  {copySuccess ? (
                    <>
                      <IconCheck size={20} />
                      Copied!
                    </>
                  ) : (
                    <>
                      <IconShare size={20} />
                      Share
                    </>
                  )}
                </button>
              </div>
            </div>
            
            <div className="results-grid">
              {entries.map((entry) => (
                <ResultDisplay 
                  key={entry.id} 
                  entry={entry} 
                  onRemove={() => handleRemoveEntry(entry.id)}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
