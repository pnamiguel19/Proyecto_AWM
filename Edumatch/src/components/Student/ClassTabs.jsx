import React from 'react';
import './ClassTabs.css';

const ClassTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'upcoming', label: 'Próximas', icon: '📅' },
    { id: 'completed', label: 'Completadas', icon: '✅' },
    { id: 'cancelled', label: 'Canceladas', icon: '❌' }
  ];

  return (
    <div className="class-tabs">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          <span className="tab-icon">{tab.icon}</span>
          <span className="tab-label">{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

export default ClassTabs;