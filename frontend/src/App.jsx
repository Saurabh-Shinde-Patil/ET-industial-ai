import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import { RoleGuard } from './components/layout/RoleGuard';
import MainLayout from './components/layout/MainLayout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AdminUsersPage from './pages/AdminUsersPage';
import AssetsPage from './pages/AssetsPage';
import AssetDetailPage from './pages/AssetDetailPage';
import DocumentsPage from './pages/DocumentsPage';
import KnowledgeSearchPage from './pages/KnowledgeSearchPage';
import ChatPage from './pages/ChatPage';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            
            {/* Protected Routes wrapped in MainLayout */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <DashboardPage />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <DashboardPage />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            {/* Plant Asset Graph & Machinery Hierarchy */}
            <Route
              path="/assets"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <AssetsPage />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/assets/:id"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <AssetDetailPage />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            {/* Document Management Repository */}
            <Route
              path="/documents"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <DocumentsPage />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            {/* AI Operations Assistant Conversational RAG */}
            <Route
              path="/chat"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <ChatPage />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            {/* Hybrid Reciprocal Rank Fusion Search Playground */}
            <Route
              path="/search"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <KnowledgeSearchPage />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            {/* Admin Personnel & Audit Logs View (Role Guarded) */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <RoleGuard allowedRoles={['Admin', 'Knowledge Admin']}>
                    <MainLayout>
                      <AdminUsersPage />
                    </MainLayout>
                  </RoleGuard>
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
