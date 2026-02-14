import { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import UnSerializeForm from './components/UnSerializeForm';
import Content from './components/Content';
import Footer from './components/Footer';
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
      const processedEntries = urlEntries.map((entryData, index) => {
        const result = unserializeData(entryData.serializedData);
        return {
          id: Date.now() + index,
          title: entryData.title,
          serializedData: entryData.serializedData,
          unserializedData: result.data,
          error: result.error,
          format: result.format,
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
      const url = new URL(window.location.href);
      url.searchParams.delete('data');
      window.history.replaceState({}, '', url.toString());
    }
  }, [entries]);

  const handleFormSubmit = (formData) => {
    if (entries.length >= 3) return;
    const result = unserializeData(formData.serializedData);
    const newEntry = {
      id: Date.now(),
      title: formData.title,
      serializedData: formData.serializedData,
      unserializedData: result.data,
      error: result.error,
      format: result.format,
    };
    setEntries([...entries, newEntry]);
    setShowForm(false);
  };

  const handleRemoveEntry = (id) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  const handleAddNew = () => setShowForm(true);
  const handleCancelForm = () => setShowForm(false);

  const handleCopyShareLink = async () => {
    const success = await copyURLToClipboard();
    setCopySuccess(success);
    if (success) setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleClearAll = () => {
    setEntries([]);
    setShowForm(true);
  };

  return (
    <div className="app">
      <Header />
      <main className="app-main">
        {showForm && (
          <UnSerializeForm
            onSubmit={handleFormSubmit}
            onCancel={handleCancelForm}
            maxEntriesReached={entries.length >= 3}
          />
        )}
        <Content
          entries={entries}
          showForm={showForm}
          copySuccess={copySuccess}
          onAddNew={handleAddNew}
          onClearAll={handleClearAll}
          onRemoveEntry={handleRemoveEntry}
          onCopyShareLink={handleCopyShareLink}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;
