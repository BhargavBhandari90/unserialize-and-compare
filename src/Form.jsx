import { useState } from 'react';
import './Form.css';

function Form({ onSubmit, onCancel }) {
  const [title, setTitle] = useState('');
  const [serializedData, setSerializedData] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!serializedData.trim()) {
      setError('Serialized Data is required');
      return;
    }

    onSubmit({
      title: title.trim() || null,
      serializedData: serializedData.trim()
    });

    // Reset form
    setTitle('');
    setSerializedData('');
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title (Optional)</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a title for this data"
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="serializedData">
          Serialized Data <span className="required">*</span>
        </label>
        <textarea
          id="serializedData"
          value={serializedData}
          onChange={(e) => setSerializedData(e.target.value)}
          placeholder="Paste your PHP serialized or JSON data here..."
          className="form-textarea"
          rows={6}
          required
        />
        {error && <div className="form-error">{error}</div>}
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="btn btn-secondary">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default Form;

