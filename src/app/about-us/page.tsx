import Navbar from "@/components/navbar";
import MainContent from "@/components/main-content";
import Footer from "@/components/footer";
import Link from "next/link";

export default function AboutUs() {
    return (
        <>
            <Navbar/>
            <MainContent
                content={
                    <div className="bg-white shadow-2xl rounded-lg p-16 max-w-5xl w-full">
                        <h1 className="text-4xl font-bold text-center mb-8"> За GeoQuest </h1>

                        <p className="text-gray-700 text-xl text-center mb-12 leading-relaxed">
                            GeoQuest е уеб приложение-игра, в която потребителят разпознава географски обекти по снимки. <br/>
                            Като за всеки познат въпрос, той трупа точки, с който да се изкачва нагоре в класацията от потребители.
                        </p>

                        <div className="flex justify-center">
                            <Link href="/game" className="bg-[#457B9D] text-white py-4 px-10 text-lg rounded-lg hover:bg-[#356486]"> Играй </Link> 
                        </div>
                    </div>
                }/>
            <Footer/>
        </>
    );
}