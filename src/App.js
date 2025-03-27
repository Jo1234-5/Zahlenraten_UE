import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import NumberGuessingGame from './components/NumberGuessing';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/zahlenraten" element={<NumberGuessingGame />} />
        <Route
          path="/"
          element={
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900">
              <h1 className="text-4xl font-bold">Willkommen zur Spiele-App</h1>
              <p className="text-lg mt-4">Spiele das Zahlenraten-Spiel!</p>
              <Link to="/zahlenraten" className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
                Zum Spiel
              </Link>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}
