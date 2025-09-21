// src/components/CountdownCard.tsx
import { useState, useEffect } from "react";

export default function CountdownCard() {
  const [timeLeft, setTimeLeft] = useState("");
  const [status, setStatus] = useState(""); // New status field

  useEffect(() => {
    function updateCountdown() {
      const now = new Date();
      const day = now.getDay(); // 0 = Sunday, 1-6 = Monday-Saturday
      
      // Weekend check (0=Sunday, 6=Saturday)
      if (day === 0 || day === 6) {
        setTimeLeft("Weekend, no work today!");
        setStatus("weekend");
        return;
      }
      
      const hours = now.getHours();
      const minutes = now.getMinutes();
      
      // Off-work hours (8:30-18:00)
      if (hours < 8 || (hours === 8 && minutes < 30) || hours >= 18) {
        setTimeLeft("Off work, time to relax!");
        setStatus("off-work");
        return;
      }
      
      // Lunch break (12:00-13:30)
      if ((hours === 12) || (hours === 13 && minutes < 30)) {
        setTimeLeft("Lunch time!");
        setStatus("lunch");
        return;
      }
      
      // Working hours, calculate countdown
      const target = new Date();
      target.setHours(18, 0, 0, 0); // Set target to 18:00 today

      const diff = target.getTime() - now.getTime();
      const hoursLeft = Math.floor(diff / (1000 * 60 * 60));
      const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secondsLeft = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(`${hoursLeft}h ${minutesLeft}m ${secondsLeft}s`);
      setStatus("working");
    }

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-4 bg-gray-100 rounded-2xl shadow text-center">
      <h3 className="text-lg font-bold">Time until off work</h3>
      <p className="text-2xl font-mono text-gray-800 mt-2">{timeLeft}</p>
    </div>
  );
}