export interface Question {
    question: string;
    imageSrc: string;
    options: string[];
    correctAnswer: string;
    subQuestions: SubQuestion[];
}

export interface SubQuestion {
    question: string; 
    options: string[];
    correctAnswer: string;
}

