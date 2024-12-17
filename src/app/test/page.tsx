/*
"use client"

import Navbar from "@/components/navbar";
import MainContent from "@/components/main-content";
import Footer from "@/components/footer";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { addDoc, collection, setDoc } from "firebase/firestore";
import { db } from "../FirebaseDB/firebase.config";
import GameQuestion from "@/components/game-question";

export default function TestPage() {
    const [value1, setValue1] = useState("");
    const [value2, setValue2] = useState("");

    const router = useRouter();

    const addQuestionDocument = async (mainQuestion: string, mainQuestionOptions: string[], 
                                        mainQuestionCorrectAnswer: string,
                                        subQuestions: string[], subQuestionsOptions: string[][], 
                                        subQuestionsCorrectAnswers: string[],) => {
      try{
        console.log("Document added");
        const docRef = await addDoc(collection(db, "Questions"), {
          questionUID: newQuestion.questionUID,
          mainQuestion: newQuestion.mainQuestion,
          mainQuestionOptions: newQuestion.mainQuestionOptions,
          mainQuestionCorrectAnswer: newQuestion.mainQuestionCorrectAnswer,

          subQuestions: newQuestion.subQuestions,
          subQuestionsOptions: newQuestion.subQuestionsOptions,
          subQeustionsCorrectAnswers: newQuestion.subQuestionsCorrectAnswers,

          imageURL: newQuestion.imageURL
        });
      }
      catch (e) {
        console.error("Error upon adding document: ", e);
      }
    }

    let question: Question = new Question("", [""], "", [""], [[""],[""]], [""], "");

    return (
        <>
            <Navbar/>
            <MainContent content=
            {
                  <div>
                    <input 
                      type="text" 
                      value={question.mainQuestion}
                      onChange={(e) => question.mainQuestion = e.target.value}>
                    </input>

                    <br/><br/>

                    <input 
                      type="text" 
                      value={value2}
                      onChange={(e) => setValue2(e.target.value)}>
                    </input>

                    <button onClick={() => addDocument(value1, value2)}>Add document</button>
                    <button>Remove document</button>
                  </div>              
                }
                />
            <Footer/>
        </>
    );
}
*/

/*
"use client"

import Navbar from "@/components/navbar";
import MainContent from "@/components/main-content";
import Footer from "@/components/footer";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TestPage() {
    const [message, setMessage] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("");

    const router = useRouter();

    return (
        <>
            <Navbar/>
            <MainContent content=
                {
                <div className="flex items-center justify-center min-h-screen bg-gray-100">
                    <form
                      className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full"
                      onSubmit={() => router.push('/test')}
                    >
                      <h1 className="text-2xl font-bold mb-4 text-center">
                        Свържете се с нас
                      </h1>
                      <div className="mb-4">
                        <label
                          htmlFor="email"
                          className="block text-gray-700 font-medium mb-2"
                        >
                          Вашият имейл
                        </label>
                        <input
                          type="email"
                          id="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full border border-gray-300 p-2 rounded-lg"
                          placeholder="example@mail.com"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="message"
                          className="block text-gray-700 font-medium mb-2"
                        >
                          Вашето съобщение
                        </label>
                        <textarea
                          id="message"
                          required
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="w-full border border-gray-300 p-2 rounded-lg"
                          rows={5}
                          placeholder="Напишете вашето съобщение тук..."
                        >
                        </textarea>
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                      >
                        Изпрати
                      </button>
                      {status && (
                        <p className="mt-4 text-center text-sm text-gray-700">{status}</p>
                      )}
                    </form>
                  </div>
                  }
                />
            <Footer/>
        </>
    );
}
*/

/*
"use client"

import React, { useState } from 'react';
import { db } from '../FirebaseDB/firebase.config'; 
import { collection, addDoc } from 'firebase/firestore'; 
import { questions } from '../questions';

export default function TestPage() { 
  async function insertQuestions() {
    try {
      // Reference to the Firestore collection where questions will be stored
      const questionsCollectionRef = collection(db, 'Questions');
      
      for (const questionData of questions) {
        // Add a new document to the Questions collection
        const questionDocRef = await addDoc(questionsCollectionRef, {
          question: questionData.question,
          imageSrc: questionData.imageSrc,
          options: questionData.options,
          correctAnswer: questionData.correctAnswer,
        });
  
        // Add subQuestions to Firestore under the corresponding question
        const subQuestionsCollectionRef = collection(db, 'Questions', questionDocRef.id, 'SubQuestions');
        
        for (const subQuestion of questionData.subQuestions) {
          await addDoc(subQuestionsCollectionRef, {
            question: subQuestion.question,
            options: subQuestion.options,
            correctAnswer: subQuestion.correctAnswer,
          });
        }
        
        console.log(`Question added with ID: ${questionDocRef.id}`);
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <button onClick={insertQuestions}>Add questions</button>
  );
}
*/

export default function TestPage() {
  return;
}