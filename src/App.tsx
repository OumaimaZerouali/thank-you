import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { CardBuilder } from './components/CardBuilder/CardBuilder';
import { ProtectedRoute } from './components/ProtectedRoute';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export function App() {
  return <Router>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/create"
              element={
                <ProtectedRoute>
                  <CardBuilder />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>;
}
