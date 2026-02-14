import { IconPlus, IconShare, IconCheck, IconTrash } from '@tabler/icons-react';
import ResultDisplay from '../ResultDisplay';

function Content({
  entries,
  showForm,
  copySuccess,
  onAddNew,
  onClearAll,
  onRemoveEntry,
  onCopyShareLink,
}) {
  return (
    <>
      {!showForm && entries.length === 0 && (
        <div className="empty-state">
          <p>No data to display. Click the button below to add your first entry.</p>
          <button onClick={onAddNew} className="btn btn-add" disabled={entries.length >= 3}>
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
              {entries.length >= 3 && (
                <span className="max-entries-message">Max 3 comparisons</span>
              )}
              <button onClick={onClearAll} className="btn btn-remove">
                <IconTrash size={20} />
                Clear All
              </button>
              {!showForm && entries.length < 3 && (
                <button onClick={onAddNew} className="btn btn-add">
                  <IconPlus size={20} />
                  Add
                </button>
              )}
              <button
                onClick={onCopyShareLink}
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
                onRemove={() => onRemoveEntry(entry.id)}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Content;
