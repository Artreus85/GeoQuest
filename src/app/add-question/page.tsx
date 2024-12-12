"use client"

import Navbar from "@/components/navbar";
import MainContent from "@/components/main-content";
import Footer from "@/components/footer";
import Link from "next/link";
import Game, { questions } from "../game/page";
import { useState } from "react";

export default function AddQuestion() {
    const [optionOne, setOptionOne] = useState("");
    const [optionTwo, setOptionTwo] = useState("");
    const [optionThree, setOptionThree] = useState("");
    const [correctOption, setCorrectOption] = useState("");
    const [imageURL, setImageURL] = useState("");

    const handleAddQuestion = () => {
        questions.push
        (
            {   
                question: "Къде се намира обектът от снимката?", 
                imageSrc: imageURL, 
                options: [optionOne, optionTwo, optionThree],
                correctAnswer: correctOption
            }
        )
    }

    return (
        <>
            <Navbar/>
            <MainContent
                content={
                    <><div className="bg-gray-100 p-6 rounded-md shadow-md w-full max-w-md mx-auto">
                        <h2 className="text-center text-xl font-bold mb-6">Добавяне на въпрос</h2>

                        <form>
                            <div className="mb-4">
                                <label className="block mb-1 text-sm font-medium">Първа опция</label>

                                <input
                                    type="text"
                                    id="usernameOrEmail"
                                    className="w-full border border-gray-300 rounded-md p-2"
                                    placeholder="Въведете първа опция"

                                    value={optionOne}
                                    onChange={(e) => setOptionOne(e.target.value)} />
                            </div>

                            <div className="mb-4">
                                <label className="block mb-1 text-sm font-medium">Втора опция</label>

                                <input
                                    type="text"
                                    id="usernameOrEmail"
                                    className="w-full border border-gray-300 rounded-md p-2"
                                    placeholder="Въведете втора опция"

                                    value={optionTwo}
                                    onChange={(e) => setOptionTwo(e.target.value)} />
                            </div>

                            <div className="mb-4">
                                <label className="block mb-1 text-sm font-medium">Трета опция</label>

                                <input
                                    type="text"
                                    id="usernameOrEmail"
                                    className="w-full border border-gray-300 rounded-md p-2"
                                    placeholder="Въведете трета опция"

                                    value={optionThree}
                                    onChange={(e) => setOptionThree(e.target.value)} />
                            </div>

                            <div className="mb-4">
                                <label className="block mb-1 text-sm font-medium">Правилен отговор</label>

                                <input
                                    type="text"
                                    id="usernameOrEmail"
                                    className="w-full border border-gray-300 rounded-md p-2"
                                    placeholder="Въведете правилния отговор"

                                    value={correctOption}
                                    onChange={(e) => setCorrectOption(e.target.value)} />
                            </div>
                            
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white rounded-md p-2 font-medium hover:bg-blue-700 transition"
                                onClick={handleAddQuestion}
                            >
                                Добави въпрос
                            </button>
                        </form>
                    </div><div><br /><br /><br /><br /><br /></div></>
                }/>
            <Footer/>
        </>
    );
}