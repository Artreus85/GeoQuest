"use client"

import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../FirebaseDB/firebase.config";
import Navbar from "@/components/navbar";
import MainContent from "@/components/main-content";
import Footer from "@/components/footer";
import GameQuestion from "@/components/game-question";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../FirebaseDB/firebase.config";
import { doc, updateDoc, increment } from "firebase/firestore";
import { Question, SubQuestion } from "../types";

export default function Game() {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isAnswerSelected, setIsAnswerSelected] = useState<boolean>(false);
    const [showResult, setShowResult] = useState<boolean>(false);
    const [isSubQuestion, setIsSubQuestion] = useState<boolean>(false);
    const [subQuestionIndex, setSubQuestionIndex] = useState<number>(0);
    const [currentSubIndex, setCurrentSubIndex] = useState<number>(0);
    const [userId, setUserId] = useState<string | null>(null);
    const [isMainQuestionCorrect, setIsMainQuestionCorrect] = useState<boolean>(false);
  
    // Fetch questions from Firestore
    useEffect(() => {
      const fetchQuestions = async () => {
        const querySnapshot = await getDocs(collection(db, "Questions"));
        const questionsData: Question[] = []; // Explicitly set type for `questionsData`
  
        querySnapshot.forEach((doc) => {
          const questionData = doc.data() as Question; // Cast the data to the `Question` type
          questionsData.push(questionData);
        });
  
        setQuestions(questionsData); // Store questions in state
      };
  
      fetchQuestions();
    }, []);
  
    const currentQuestion = questions[currentQuestionIndex]; // May be undefined if questions are empty
    const currentSubQuestion = currentQuestion?.subQuestions?.[subQuestionIndex];
  
    // Ensure the current question exists before accessing properties
    if (!currentQuestion) {
      return (
        <div>Loading questions...</div> // Or you can show a spinner/loading state here
      );
    }
  
    const handleAnswer = (answer: string) => {
      if (!currentQuestion) return; // Prevent accessing undefined question
  
      if (!isMainQuestionCorrect) {
        if (answer === currentQuestion.correctAnswer) {
          setIsMainQuestionCorrect(true);
          console.log("Correct! Now showing sub-questions.");
        } else {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          console.log("Incorrect. Next main question.");
        }
      } else {
        const subQuestion = currentQuestion.subQuestions[currentSubIndex];
        if (answer === subQuestion.correctAnswer) {
          if (currentSubIndex + 1 < currentQuestion.subQuestions.length) {
            setCurrentSubIndex(currentSubIndex + 1);
          } else {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setIsMainQuestionCorrect(false);
            setCurrentSubIndex(0);
          }
        } else {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setIsMainQuestionCorrect(false);
        }
      }
    };
  
    // Keep this `useEffect` for managing user authentication state, always executed at top
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUserId(user.uid);
        } else {
          setUserId(null);
        }
      });
  
      return () => unsubscribe();
    }, []);
  
    const updateUserDocument = async (userId: string, updates: Record<string, any>) => {
      try {
        const userDocRef = doc(db, "Users", userId);
        await updateDoc(userDocRef, updates);
        console.log("User document updated successfully");
      } catch (error) {
        console.error("Error updating user document: ", error);
      }
    };
  
    const handleOptionSelect = (selectedOption: string) => {
      if (!showResult) {
        setSelectedAnswer(selectedOption);
        setIsAnswerSelected(true);
      }
    };
  
    const handleSubmitAnswer = () => {
      setShowResult(true);
  
      const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
      setIsMainQuestionCorrect(isCorrect);
  
      if (isCorrect && userId) {
        increasePoints(10);
      }
    };
  
    const handleNextQuestion = () => {
      if (isSubQuestion) {
        if (subQuestionIndex < currentQuestion.subQuestions.length - 1) {
          setSubQuestionIndex((prev) => prev + 1);
        } else {
          moveToNextMainQuestion();
        }
      } else if (!isSubQuestion && currentQuestion.subQuestions?.length) {
        setIsSubQuestion(true);
      } else {
        moveToNextMainQuestion();
      }
  
      resetState();
    };
  
    const moveToNextMainQuestion = () => {
      setIsSubQuestion(false);
      setSubQuestionIndex(0);
      setCurrentQuestionIndex((prev) => (prev + 1) % questions.length);
    };
  
    const increasePoints = async (pointsToAdd: number) => {
      if (userId) {
        await updateUserDocument(userId, { points: increment(pointsToAdd) });
      }
    };
  
    const resetState = () => {
      setSelectedAnswer(null);
      setIsAnswerSelected(false);
      setShowResult(false);
      setIsMainQuestionCorrect(false);
    };

  return (
    <>
      <Navbar />
      <MainContent
        content={
          <main className="flex text-black flex-col items-center justify-center flex-grow bg-gray-100 py-20 pt-1">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-10x w-full">
              <h1 className="text-3xl font-bold text-center mb-6">Игра</h1>

              <GameQuestion
                question={isSubQuestion ? currentSubQuestion?.question : currentQuestion.question}
                imageSrc={currentQuestion.imageSrc}
                options={isSubQuestion ? currentSubQuestion?.options : currentQuestion.options}
                onOptionSelect={handleOptionSelect}
                selectedAnswer={selectedAnswer}
                showResult={showResult}
                correctAnswer={isSubQuestion ? currentSubQuestion?.correctAnswer : currentQuestion.correctAnswer}
                isAnswerSelected={isAnswerSelected}
              />

              <div className="flex justify-center mt-6">
                {!showResult ? (
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={!isAnswerSelected}
                    className="px-6 py-2 bg-blue-500 text-white rounded"
                  >
                    Продължи
                  </button>
                ) : (
                  <button onClick={handleNextQuestion} className="px-6 py-2 bg-green-500 text-white rounded">
                    Следващ въпрос
                  </button>
                )}
              </div>

              {showResult && (
                <div className="mt-4 text-center">
                  <p
                    className={selectedAnswer === currentQuestion.correctAnswer || selectedAnswer === currentSubQuestion?.correctAnswer
                      ? "text-green-600"
                      : "text-red-600"
                    }
                  >
                    {selectedAnswer === currentQuestion.correctAnswer || selectedAnswer === currentSubQuestion?.correctAnswer
                      ? "Правилен отговор!"
                      : "Неправилен отговор!"}
                  </p>
                  <p>Избран отговор: {selectedAnswer}</p>
                  {
                    selectedAnswer === currentQuestion.correctAnswer ? "+10 точки" : selectedAnswer === currentSubQuestion?.correctAnswer ? "+5 точки" : ""
                  }
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