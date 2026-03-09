import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import ProposalsList from './pages/ProposalsList';
import NewProposal from './pages/NewProposal';
import ProposalView from './pages/ProposalView';
import PrintProposal from './pages/PrintProposal';
import Settings from './pages/Settings';

function EmbedShell({ children }) {
  return <div className="gc-embed-shell">{children}</div>;
}

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes with Layout */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout>
              <Navigate to="/dashboard" replace />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/proposals"
        element={
          <ProtectedRoute>
            <Layout>
              <ProposalsList />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Layout>
              <Settings />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/proposals/new"
        element={
          <ProtectedRoute>
            <Layout>
              <NewProposal />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/proposals/view/:id"
        element={
          <ProtectedRoute>
            <Layout>
              <ProposalView />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/print-proposal/:id"
        element={
          <PrintProposal />
        }
      />

      <Route
        path="/embed/proposals"
        element={
          <ProtectedRoute>
            <EmbedShell>
              <ProposalsList />
            </EmbedShell>
          </ProtectedRoute>
        }
      />

      <Route
        path="/embed/proposals/new"
        element={
          <ProtectedRoute>
            <EmbedShell>
              <NewProposal />
            </EmbedShell>
          </ProtectedRoute>
        }
      />

      <Route
        path="/embed/proposals/view/:id"
        element={
          <ProtectedRoute>
            <EmbedShell>
              <ProposalView />
            </EmbedShell>
          </ProtectedRoute>
        }
      />

      {/* Catch all - redirect to dashboard */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;
