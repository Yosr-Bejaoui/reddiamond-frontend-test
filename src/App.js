import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SearchProvider } from './context/SearchContext';
import Navbar from './components/Navbar';
import UsersPage from './pages/UsersPage';
import UserDetailPage from './pages/UserDetailPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <SearchProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<UsersPage />} />
          <Route path="/details/:id" element={<UserDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </SearchProvider>
    </BrowserRouter>
  );
}
