"use client";

import { useState } from "react";
import SpinnerButtons from "../components/SpinnerButtons/SpinnerButtons";

const TestButton = () => {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);

    // Simule un chargement (ex: appel API)
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="bg-red-500 text-white px-6 py-2 rounded flex justify-center items-center gap-2"
    >
      {loading ? <SpinnerButtons /> : "Cliquez-moi"}
    </button>
  );
};

export default TestButton;
