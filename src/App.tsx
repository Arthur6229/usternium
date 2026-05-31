import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Landing } from './pages/Landing';
import { Onboarding } from './pages/Onboarding';
import { Dashboard } from './pages/Dashboard';
import { FormFiller } from './pages/FormFiller';
import { useStore } from './store/useStore';

function ProtectedDashboard() {
  const { profile } = useStore();
  return profile ? <Dashboard /> : <Navigate to="/" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/onboard" element={<Onboarding />} />
        <Route path="/dashboard" element={<ProtectedDashboard />} />
        <Route path="/form-filler" element={<FormFiller />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
