"use client"; // Marking this as a Client Component

import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import QuizQuestion from "../components/QuizQuestion"; // Importing the QuizQuestion component

const Game: React.FC = () => {
  const handleOptionSelect = (selectedOption: string) => {
    console.log("Избран отговор:", selectedOption);
  };

  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-center flex-grow bg-gray-100 py-20">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl w-full">
          <h1 className="text-3xl font-bold text-center mb-6">Игра</h1>
          <QuizQuestion
            question="Къде се намира обектът от снимката?"
            imageSrc="/image.png" // Path to your image
            options={["В сервиза", "На магистралата", "Тракия"]}
            onOptionSelect={handleOptionSelect} // Passing event handler here
          />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Game;
