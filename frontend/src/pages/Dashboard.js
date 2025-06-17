import { useState } from 'react';
import Analytics from '../components/Analytics';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import '../styles/dashboard.css';


const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('form');

  const renderContent = () => {
    switch (activeTab) {
      case 'form':
        return <ExpenseForm onAdd={() => window.location.reload()} />;
      case 'list':
        return <ExpenseList />;
      case 'analytics':
        return <Analytics />;
      default:
        return null;
    }
  };

  return (
  <div className="dashboard-container">
    {/* NavBar */}
    <div className="navbar">
      <button
        onClick={() => setActiveTab('form')}
        className={activeTab === 'form' ? 'active' : ''}
      >
        Add Expense
      </button>
      <button
        onClick={() => setActiveTab('list')}
        className={activeTab === 'list' ? 'active' : ''}
      >
        Expense List
      </button>
      <button
        onClick={() => setActiveTab('analytics')}
        className={activeTab === 'analytics' ? 'active' : ''}
      >
        Analytics
      </button>
    </div>

    {/* Content Area */}
    <div className="content-area">
      {renderContent()}
    </div>
  </div>
);

};

export default Dashboard;
