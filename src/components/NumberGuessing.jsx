import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Komponenten in separate Dateien auslagern für bessere Wartbarkeit
const Card = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="max-w-md w-full p-8 bg-white text-gray-900 rounded-3xl shadow-2xl border border-gray-200 transition-all"
  >
    {children}
  </motion.div>
);

const Button = ({ onClick, children, className = "", disabled = false }) => (
  <motion.button
    whileHover={{ scale: disabled ? 1 : 1.05 }}
    whileTap={{ scale: disabled ? 1 : 0.95 }}
    onClick={onClick}
    disabled={disabled}
    className={`w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-300 ${
      disabled ? "opacity-50 cursor-not-allowed" : ""
    } ${className}`}
  >
    {children}
  </motion.button>
);

const Input = ({ value, onChange, disabled, placeholder }) => (
  <motion.input
    type="number"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    disabled={disabled}
    whileFocus={{ scale: 1.02 }}
    className="text-center text-lg border-2 border-purple-300 focus:border-purple-500 rounded-lg p-3 w-full shadow-sm focus:ring-2 focus:ring-purple-200 transition-all duration-200"
  />
);

const Alert = ({ children, type = "info" }) => {
  const alertStyles = {
    info: "border-purple-500 bg-purple-100 text-purple-800",
    success: "border-green-500 bg-green-100 text-green-800",
    error: "border-red-500 bg-red-100 text-red-800",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`mt-4 border-l-4 ${alertStyles[type]} p-4 rounded-lg shadow-sm`}
    >
      {children}
    </motion.div>
  );
};

const HistoryDisplay = ({ history }) => (
  <motion.div
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: "auto" }}
    transition={{ duration: 0.4 }}
    className="overflow-hidden mt-4 p-4 bg-gray-50 rounded-lg text-gray-700 text-sm shadow-inner"
  >
    <h2 className="font-semibold mb-1">Deine bisherigen Tipps:</h2>
    <div className="flex flex-wrap gap-2">
      {history.map((num, index) => (
        <motion.span
          key={index}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.05 }}
          className="inline-block bg-white px-3 py-1 rounded-full shadow-xs border border-gray-200"
        >
          {num}
        </motion.span>
      ))}
    </div>
  </motion.div>
);

export default function NumberGuessingGame() {
  const [target, setTarget] = useState(generateRandomNumber());
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [history, setHistory] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }

  function checkGuess() {
    if (gameOver) return;
    
    const num = parseInt(guess, 10);
    
    if (isNaN(num) || num < 1 || num > 100) {
      setMessage({
        text: "Bitte eine gültige Zahl zwischen 1 und 100 eingeben!",
        type: "error"
      });
      return;
    }
    
    const newAttempts = attempts + 1;
    const newHistory = [...history, num];
    
    setAttempts(newAttempts);
    setHistory(newHistory);
    
    if (num === target) {
      setMessage({
        text: `🎉 Richtig! Du hast es in ${newAttempts} Versuch${newAttempts > 1 ? "en" : ""} geschafft!`,
        type: "success"
      });
      setGameOver(true);
    } else {
      setMessage({
        text: num < target ? "🔼 Zu niedrig!" : "🔽 Zu hoch!",
        type: "info"
      });
    }
    
    setGuess("");
  }

  function resetGame() {
    setTarget(generateRandomNumber());
    setGuess("");
    setMessage("");
    setAttempts(0);
    setHistory([]);
    setGameOver(false);
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      checkGuess();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">
      <Card>
        <div className="flex flex-col gap-6 text-center">
          <motion.h1 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
          >
            🔢 Zahlenraten-Spiel
          </motion.h1>
          
          <p className="text-gray-600">
            Kannst du die geheime Zahl zwischen 1 und 100 erraten?
          </p>
          
          <Input
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={gameOver}
            placeholder="Dein Tipp..."
          />
          
          <Button onClick={checkGuess} disabled={gameOver}>
            Überprüfen
          </Button>
          
          <AnimatePresence>
            {message && (
              <Alert type={message.type}>
                {message.text}
              </Alert>
            )}
          </AnimatePresence>
          
          {history.length > 0 && <HistoryDisplay history={history} />}
          
          <Button
            onClick={resetGame}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800"
          >
            Neues Spiel starten
          </Button>
        </div>
      </Card>
    </div>
  );
}