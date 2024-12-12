export default function Footer() {
    return (
      <footer className="bg-[#457B9D] text-white p-4 flex items-center justify-between rounded-lg">

        {/* Лявата част на футъра */}
        <div className="text-lg mx-10">© Всички права запазени</div>

        {/* Дясната част на футъра с икони */}
        <div className="flex space-x-4 mx-10 p-2 rounded-lg">
          <a href="#" className="hover:opacity-80">
            <img src="/instagram_icon.png" alt="Instagram" className="h-8 w-8" />
          </a>

          <a href="" className="hover:opacity-80">
            <img src="/mail_icon.png" alt="Mail" className="h-8 w-8" />
          </a>
        </div>
      </footer>
    );
  }