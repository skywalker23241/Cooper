// src/components/CountdownCard.tsx
import { useState, useEffect } from "react";

export default function CountdownCard() {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    function updateCountdown() {
      const now = new Date();
      const target = new Date();
      target.setHours(18, 0, 0, 0); // 设置目标为今天 18:00

      // 如果已经过了 18:00，就算明天的 18:00
      if (now > target) {
        target.setDate(target.getDate() + 1);
      }

      const diff = target.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    }

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-4 bg-gray-100 rounded-2xl shadow text-center">
      <h3 className="text-lg font-bold">Time left until off work</h3>
      <p className="text-2xl font-mono text-gray-800 mt-2">{timeLeft}</p>
    </div>
  );
}
