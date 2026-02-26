import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { initializeApp } from '@/features/app/initializeApp';
import { AppShell } from '@/components/layout/AppShell';
import { ProtectedRoute } from '@/routes/ProtectedRoute';
import { HomePage } from '@/pages/HomePage';
import { LoginPage } from '@/pages/LoginPage';
import { QuestionPage } from '@/pages/QuestionPage';
import { NewQuestionPage } from '@/pages/NewQuestionPage';
import { LeaderboardPage } from '@/pages/LeaderboardPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

function App() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.app.loading);
  const initialized = useAppSelector((state) => state.app.initialized);
  const authedUserId = useAppSelector((state) => state.auth.authedUserId);

  useEffect(() => {
    void dispatch(initializeApp());
  }, [dispatch]);

  if (!initialized || loading) {
    return <div className="grid min-h-screen place-items-center text-lg">Loading application...</div>;
  }

  return (
    <Routes>
      <Route path="/login" element={authedUserId ? <Navigate to="/" replace /> : <LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route
          path="/"
          element={
            <AppShell>
              <HomePage />
            </AppShell>
          }
        />
        <Route
          path="/questions/:question_id"
          element={
            <AppShell>
              <QuestionPage />
            </AppShell>
          }
        />
        <Route
          path="/add"
          element={
            <AppShell>
              <NewQuestionPage />
            </AppShell>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <AppShell>
              <LeaderboardPage />
            </AppShell>
          }
        />
      </Route>
      <Route
        path="*"
        element={
          <AppShell>
            <NotFoundPage />
          </AppShell>
        }
      />
    </Routes>
  );
}

export default App;
