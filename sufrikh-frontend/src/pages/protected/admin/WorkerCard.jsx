const WorkerCard = ({ worker, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ ...worker });
  
    const handleUpdate = async () => {
      try {
        await authService.updateWorker(worker.id, formData, token);
        setIsEditing(false);
        toast.success('Worker updated!');
      } catch (error) {
        toast.error('Update failed');
      }
    };
  
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        {isEditing ? (
          <>
            <input 
              value={formData.position}
              onChange={(e) => setFormData({...formData, position: e.target.value})}
            />
            <button onClick={handleUpdate}>Save</button>
          </>
        ) : (
          <>
            <h4>{worker.first_name} {worker.last_name}</h4>
            <p>{worker.position}</p>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={onDelete}>Delete</button>
          </>
        )}
      </div>
    );
  };