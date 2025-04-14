// WorkerDashboard.jsx
export default function WorkerDashboard() {
    const { user } = useAuth();
    
    return (
      <div className="worker-dashboard">
        <h1>Welcome, {user.first_name} (Worker)</h1>
        <nav>
          <Link to="tasks">My Tasks</Link>
        </nav>
        <Outlet />
      </div>
    );
  }