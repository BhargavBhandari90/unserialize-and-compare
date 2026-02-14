import Form from '../Form';

function UnSerializeForm({ onSubmit, onCancel, maxEntriesReached }) {
  return (
    <div className="form-section">
      <Form onSubmit={onSubmit} onCancel={onCancel} maxEntriesReached={maxEntriesReached} />
    </div>
  );
}

export default UnSerializeForm;
