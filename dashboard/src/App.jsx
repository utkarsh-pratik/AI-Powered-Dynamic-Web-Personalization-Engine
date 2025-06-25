import React from 'react';
import Analytics from './Analytics.jsx';
import Config from './Config.jsx';
import ABTest from './ABTest.jsx';
import Segments from './Segments.jsx';
import Settings from './Settings.jsx';

export default function App() {
  return (
    <div>
      <h1>Personalization Admin Dashboard</h1>
      <Analytics />
      <Config />
      <ABTest />
      <Segments />
      <Settings />
    </div>
  );
}