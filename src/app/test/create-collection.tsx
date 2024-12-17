import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../FirebaseDB/firebase.config";

async function createCollectionAndDocument() {
    try {
      const docRef = await setDoc(doc(collection(db, "GameQuestions")), {
        questions: {
            mainQuestion: "Кой е обекта на снимката?",
            subQuestions: {
                subQuestion1: "Каква е основната причина за построяването на Айфеловата кула?",
                subQuestion2: "Колко време е отнело построяването на кулата?",
                subQuestion3: "Какво е било предназначението на кулата след изтичането на първоначалния ѝ договор?"
            }
        },

        options: {
            mainOptions: {
                mainOption1: "Айфеловата кула",
                mainOption2: "Пирамидите в Гиза",
                mainOption3: "Статуята на Иисус Христос"
            },

            subOptions: {
                subQuestionOptions1: {
                    subQuestion1Option1: "За Световното изложение през 1889 г.",
                    subQuestion1Option2: "За отбелязване на победа във война",
                    subQuestion1Option3: "За научни експерименти"
                },

                subQuestionOptions2: {
                    subQuestion2Option1: "2 години",
                    subQuestion2Option2: "5 години",
                    subQuestion2Option3: "3 години"
                },

                subQuestionOptions3: {
                    subQuestion3Option1: "Да бъде демонтирана",
                    subQuestion3Option2: "Да се използва за жилищни нужди",
                    subQuestion3Option3: "Да се превърне в паметник на инженерството"
                },
            }        
        },

        imageURL: "https://drive.google.com/file/d/15RPLkmUdEJ1YYb6i8vezslxwVqREU_NC/view?usp=drive_link"
      });
  
      console.log("Document added");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  
  export default createCollectionAndDocument();