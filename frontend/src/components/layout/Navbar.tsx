import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { IoMdMenu, IoMdClose } from "react-icons/io";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Disable scrolling when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3 backdrop-blur border-b border-white/10" : "py-5"
      }`}
    >
      <div className="container max-w-6xl mx-auto px-4 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-gradient-to-br from-dusk-500 to-indigo-600 flex items-center justify-center">
            <span className="font-bold text-white">nD</span>
          </div>
          <span className="font-bold text-white text-xl">NetDaddy</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#home" className="inline-flex items-center py-1 px-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-sm text-white/80 hover:text-white transition-colors shadow-[0_0_10px_rgba(168,85,247,0.7)] hover:shadow-[0_0_15px_rgba(168,85,247,0.8)]">Home</a>
          <a href="#working" className="inline-flex items-center py-1 px-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-sm text-white/80 hover:text-white transition-colors shadow-[0_0_10px_rgba(168,85,247,0.7)] hover:shadow-[0_0_15px_rgba(168,85,247,0.8)]">How it works</a>
          <a href="#features" className="inline-flex items-center py-1 px-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-sm text-white/80 hover:text-white transition-colors shadow-[0_0_10px_rgba(168,85,247,0.7)] hover:shadow-[0_0_15px_rgba(168,85,247,0.8)]">Features</a>
          <a href="#contact" className="inline-flex items-center py-1 px-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-sm text-white/80 hover:text-white transition-colors shadow-[0_0_10px_rgba(168,85,247,0.7)] hover:shadow-[0_0_15px_rgba(168,85,247,0.8)]">Contact Us</a>
        </nav>

        

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <IoMdClose /> : <IoMdMenu />}
        </button>

        {/* Mobile Navigation Menu */}
        <div
          className={`fixed top-0 left-0 w-full h-full bg-gradient-to-br from-[#2A0E61] to-[#10031F] flex flex-col items-center gap-6 pt-20 transition-transform ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          } md:hidden`}
        >
          {/* Close Button */}
          <button
            className="absolute top-5 right-5 text-white text-3xl"
            onClick={() => setMenuOpen(false)}
          >
            <IoMdClose />
          </button>

          {/* Menu Items */}
          <a href="#home" className="text-lg text-white hover:text-indigo-400 transition-colors" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#working" className="text-lg text-white hover:text-indigo-400 transition-colors" onClick={() => setMenuOpen(false)}>How it works</a>
          <a href="#features" className="text-lg text-white hover:text-indigo-400 transition-colors" onClick={() => setMenuOpen(false)}>Features</a>
          <a href="#contact" className="text-lg text-white hover:text-indigo-400 transition-colors" onClick={() => setMenuOpen(false)}>Contact Us</a>
          
          {/* Sign-in Button */}
          <Button
            className="whitespace-nowrap bg-gradient-to-t from-[#5636f7] to-[#9781e3] mt-4 px-6 py-2 shadow-lg shadow-[#843dff]/25 transition-all duration-300"
            onClick={() => setMenuOpen(false)}
          >
            Sign In
          </Button>
        </div>
      </div>
    </header>
  );
}
