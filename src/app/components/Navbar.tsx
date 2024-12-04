import Link from "next/link";
import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-[#457B9D] text-white px-6 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-2xl font-bold">
          <img className="max-w-14" src="./images/logo.png" alt="GeoQuest" />
        </span>
        <div className="flex space-x-36">
          {" "}
          {/* Увеличаваме разстоянието */}
          <Link href="/game" className="text-xl font-bold hover:underline">
            Игра
          </Link>
          <a href="#" className="text-xl font-bold hover:underline">
            Класация
          </a>
          <a href="#" className="text-xl font-bold hover:underline">
            За нас
          </a>
        </div>
        <div>
          <img className="max-w-14" src="./images/user.png" alt="GeoQuest" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
