"use client";

import React, { useState } from 'react';
import MainContent from '@/components/main-content';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { db } from '../FirebaseDB/firebase.config'; 
import { collection, addDoc } from 'firebase/firestore'; 
import { Question, SubQuestion } from '../types';

const AddQuestion = () => {
  const [questionText, setQuestionText] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [options, setOptions] = useState(['', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [subQuestions, setSubQuestions] = useState<SubQuestion[]>([]);
  
  const handleQuestionTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestionText(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageSrc(e.target.value);
  };

  const handleOptionsChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedOptions = [...options];
    updatedOptions[index] = e.target.value;
    setOptions(updatedOptions);
  };

  const handleCorrectAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCorrectAnswer(e.target.value);
  };

  const handleAddSubQuestion = () => {
    setSubQuestions([...subQuestions, { question: '', options: ['', '', ''], correctAnswer: '' }]);
  };

  const handleSubQuestionChange = (index: number, field: string, value: string) => {
    const updatedSubQuestions = [...subQuestions];
    updatedSubQuestions[index] = {
      ...updatedSubQuestions[index],
      [field]: value,
    };

    setSubQuestions(updatedSubQuestions);
  };

  const handleSubQuestionOptionsChange = (index: number, optionIndex: number, value: string) => {
    const updatedSubQuestions = [...subQuestions];
    const updatedOptions = [...updatedSubQuestions[index].options];
    updatedOptions[optionIndex] = value;
    updatedSubQuestions[index].options = updatedOptions;
    setSubQuestions(updatedSubQuestions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "Questions"), {
        questionText,
        imageSrc,
        options,
        correctAnswer,
        subQuestions,
      });
      console.log('Document written with ID: ', docRef.id);

      // Clear form
      setQuestionText('');
      setImageSrc('');
      setOptions(['', '', '']);
      setCorrectAnswer('');
      setSubQuestions([]);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return (
    <>
      <Navbar />
      <MainContent
        content={
          <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-center">Добави нов въпрос</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-lg font-medium text-gray-700">Текст на въпроса</label>
                <input
                  type="text"
                  value={questionText}
                  onChange={handleQuestionTextChange}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700">URL на изображение</label>
                <input
                  type="text"
                  value={imageSrc}
                  onChange={handleImageChange}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700">Опции</label>
                {options.map((option, index) => (
                  <input
                    key={index}
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionsChange(e, index)}
                    placeholder={`Опция ${index + 1}`}
                    className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                ))}
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700">Правилен отговор</label>
                <input
                  type="text"
                  value={correctAnswer}
                  onChange={handleCorrectAnswerChange}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-medium text-gray-700">Допълнителни въпроси</h3>
                {subQuestions.map((subQuestion, index) => (
                  <div key={index} className="border p-4 rounded-md">
                    <div>
                      <label className="block text-lg font-medium text-gray-700">Текст на допълнителния въпрос</label>
                      <input
                        type="text"
                        value={subQuestion.question}
                        onChange={(e) => handleSubQuestionChange(index, 'question', e.target.value)}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-lg font-medium text-gray-700">Опции за допълнителния въпрос</label>
                      {subQuestion.options.map((option, optionIndex) => (
                        <input
                          key={optionIndex}
                          type="text"
                          value={option}
                          onChange={(e) => handleSubQuestionOptionsChange(index, optionIndex, e.target.value)}
                          placeholder={`Опция ${optionIndex + 1}`}
                          className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      ))}
                    </div>

                    <div>
                      <label className="block p-2 text-lg font-medium text-gray-700">Правилен отговор на допълнителния въпрос</label>
                      <input
                        type="text"
                        value={subQuestion.correctAnswer}
                        onChange={(e) => handleSubQuestionChange(index, 'correctAnswer', e.target.value)}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={handleAddSubQuestion}
                  className="w-full mt-4 p-3 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 focus:outline-none"
                >
                  Добави допълнителен въпрос
                </button>
              </div>

              <button
                type="submit"
                className="w-full mt-6 p-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none"
              >
                Добави въпрос
              </button>
            </form>
          </div>
        }
      />
      <Footer />
    </>
  );
};

export default AddQuestion;
