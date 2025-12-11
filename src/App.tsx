import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { BillPayment } from './pages/BillPayment';
import { UPITransfer } from './pages/UPITransfer';
import { DigitalGold } from './pages/DigitalGold';
import { StockTrading } from './pages/StockTrading';
import { Profile } from './pages/Profile';
import { AutofillForm } from './pages/AutofillForm';
import { TransactionSuccess } from './pages/TransactionSuccess';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bill-payment"
            element={
              <ProtectedRoute>
                <BillPayment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/upi-transfer"
            element={
              <ProtectedRoute>
                <UPITransfer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/digital-gold"
            element={
              <ProtectedRoute>
                <DigitalGold />
              </ProtectedRoute>
            }
          />
          <Route
            path="/stock-trading"
            element={
              <ProtectedRoute>
                <StockTrading />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/autofill-form"
            element={
              <ProtectedRoute>
                <AutofillForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/transaction-success"
            element={
              <ProtectedRoute>
                <TransactionSuccess />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
