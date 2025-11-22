import { formatForDisplay } from './utils/unserialize';
import './ResultDisplay.css';

function ResultDisplay({ entry, onRemove }) {
  if (!entry) {
    return null;
  }

  const { title, unserializedData, error, format } = entry;

  return (
    <div className="result-display">
      {(title || format || onRemove) && (
        <div className="result-header-row">
          <div className="result-header-content">
            {title && (
              <div className="result-title">
                <h3>{title}</h3>
                {format && <span className="result-format">{format}</span>}
              </div>
            )}
            {!title && format && (
              <div className="result-format-standalone">
                <span className="result-format">{format}</span>
              </div>
            )}
          </div>
          {onRemove && (
            <button onClick={onRemove} className="btn-remove" title="Remove this entry">
              ×
            </button>
          )}
        </div>
      )}
      
      {error ? (
        <div className="result-error">
          <pre>{error}</pre>
        </div>
      ) : (
        <div className="result-content">
          <pre>{formatForDisplay(unserializedData)}</pre>
        </div>
      )}
    </div>
  );
}

export default ResultDisplay;

