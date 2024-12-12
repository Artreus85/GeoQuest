"use client";

import React, { useEffect, useId, useState } from "react";
import Navbar from "@/components/navbar";
import MainContent from "@/components/main-content";
import Footer from "@/components/footer";
import GameQuestion from "@/components/game-question";
import { onAuthStateChanged, updateCurrentUser, User } from "firebase/auth";
import { auth, db } from "../FirebaseDB/firebase.config";
import { doc, increment, updateDoc } from "firebase/firestore";

export const questions = [
  // Първи въпрос
  {
    question: "Къде се намира обектът от снимката?",
    imageSrc: "/game-question-images/question1_TheEiffelTower.jpg",
    options: ["Германия", "Франция", "САЩ"],
    correctAnswer: "Франция",
  },
  // Втори въпрос
  {
    question: "Къде се намира обектът от снимката?",
    imageSrc: "/game-question-images/question2_TheGreatWallOfChina.jpg",
    options: ["Китай", "Камоджа", "Нидерландия"],
    correctAnswer: "Китай",
  },
  // Трети въпрос
  {
    question: "Къде се намира обектът от снимката?",
    imageSrc: "/game-question-images/question3_TheColosseum.jpg",
    options: ["Италия", "Хърватия", "Швеция"],
    correctAnswer: "Италия",
  },
  // Четвърти върпос
  {
    question: "Къде се намира обектът от снимката?",
    imageSrc: "/game-question-images/question4_TheStatueOfLiberty.jpg",
    options: ["САЩ", "Боливия", "Канада"],
    correctAnswer: "САЩ",
  },
  // Пети въпрос
  {
    question: "Къде се намира обектът от снимката?",
    imageSrc: "/game-question-images/question5_MachuPicchu.jpg",
    options: ["Бразилия", "Аржентина", "Перу"],
    correctAnswer: "Перу",
  },
  // Шести въпрос
  {
    question: "Къде се намира обектът от снимката?",
    imageSrc: "/game-question-images/question6_TajMahal.jpg",
    options: ["Индия", "Оман", "Йемен"],
    correctAnswer: "Индия",
  },
  // Седми въпрос
  {
    question: "Къде се намира обектът от снимката?",
    imageSrc: "/game-question-images/question7_TheSydneyOpera.jpg",
    options: ["Австрия", "Нова Зеландия", "Австралия"],
    correctAnswer: "Австралия",
  },
  // Осми въпрос
  {
    question: "Къде се намира обектът от снимката?",
    imageSrc: "/game-question-images/question8_JesusChristStatue.jpg",
    options: ["Аржентина", "Бразилия", "Чили"],
    correctAnswer: "Бразилия",
  },
  // Девети въпрос
  {
    question: "Къде се намира обектът от снимката?",
    imageSrc: "/game-question-images/question9_TheGizaPyramids.jpg",
    options: ["Египет", "Намибия", "Либия"],
    correctAnswer: "Египет",
  },
  // Десети въпрос
  {
    question: "Къде се намира обектът от снимката?",
    imageSrc: "/game-question-images/question10_TheAngkorWat.jpg",
    options: ["Тайланд", "Камбоджа", "Виетнам"],
    correctAnswer: "Камбоджа",
  }
];

export default function Game() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerSelected, setIsAnswerSelected] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userId, setUserId] = useState<string>("");

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User signed in: ", user);

        setCurrentUser(user);
        setUserId(user.uid);
      } 
      else {
        console.log("No user is signed in");

        setCurrentUser(null);
        setUserId("");
      }
    });
  
    return () => unsubscribe(); 
  }, []);

  // Функция за Update операция
  const updateUserDocument = async (userId: string, updates: Record<string, any>) => {
    try {
      const userDocRef = doc(db, "Users", userId);
      await updateDoc(userDocRef, updates);
  
      console.log("User document updated successfully");
    } 
    catch (error) {
      console.error("Error updating user document: ", error);
    }
  };

  // Функция за избор на отговор
  const handleOptionSelect = (selectedOption: string) => {
    if (!showResult) {
      setSelectedAnswer(selectedOption); // Избиране на отговор
      setIsAnswerSelected(true); // Активиране на бутона "Продължи"
    }
  };

  // Функция за натискане на бутона "Продължи"
  const handleSubmitAnswer = () => {
    setShowResult(true); // Показваме резултата

    if(selectedAnswer === currentQuestion.correctAnswer) {
      increasePoints(10);
    }
  };

  // Функция за преминаване към следващ въпрос
  const handleNextQuestion = () => {
    setIsAnswerSelected(false); // Нулиране на избора
    setShowResult(false); // Скриване на резултата
    setSelectedAnswer(null); // Нулиране на избора на отговор
    setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length); // Преминаване към следващия въпрос
  };
  
  const increasePoints = async (pointsToAdd: number) => {
    await updateUserDocument(userId, { points: increment(pointsToAdd) });
  }

  return (
    <>
      <Navbar />
      <MainContent
        content={
          <main className="flex text-black flex-col items-center justify-center flex-grow bg-gray-100 py-20 pt-1">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-10x w-full">
              <h1 className="text-3xl font-bold text-center mb-6">Игра</h1>

              <GameQuestion
                question={currentQuestion.question}
                imageSrc={currentQuestion.imageSrc}
                options={currentQuestion.options}
                onOptionSelect={handleOptionSelect}
                selectedAnswer={selectedAnswer}
                showResult={showResult} // Подаваме информация дали резултатът е показан
                correctAnswer={currentQuestion.correctAnswer} // Подаваме правилния отговор
                isAnswerSelected={false}              
              />

              {/* Бутонът "Продължи" е активен само ако е избран отговор */}
              {!showResult && (
                <div className="flex justify-center mt-6">
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={!isAnswerSelected} // Бутонът е деактивиран докато не се избере отговор
                    className={`px-6 py-2 text-white rounded ${
                      isAnswerSelected ? "bg-blue-500" : "bg-gray-300"
                    }`}
                  >
                    Продължи
                  </button>
                </div>
              )}

              {/* Резултати след натискане на "Продължи" */}
              {showResult && (
                <div className="mt-4 text-center">
                  <p
                    className={
                      selectedAnswer === currentQuestion.correctAnswer
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {selectedAnswer === currentQuestion.correctAnswer
                      ? "Правилен отговор!"
                      : "Неправилен отговор."}
                  </p>
                  <p>Избран отговор: {selectedAnswer}</p>
                  {selectedAnswer === currentQuestion.correctAnswer ? "+10 точки" : "Отговорът e: " + currentQuestion.correctAnswer} 

                  <div className="flex justify-center mt-6">
                    <button
                      onClick={handleNextQuestion}
                      className="px-6 py-2 bg-green-500 text-white rounded"
                    >
                      Следващ въпрос
                    </button>
                  </div>
                </div>
              )}
            </div>
          </main>
        }
      />
      <Footer />
    </>
  );
}

