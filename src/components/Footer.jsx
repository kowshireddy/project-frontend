import {
  FaInstagram,
  FaGithub,
  FaLinkedin,
    FaTwitter,
    FaApple,
    FaGoogle,

} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-16 px-6 md:px-12 font-sans rounded-lg">

      {/* Newsletter Box
      <div className="bg-purple-400 rounded-2xl p-8 max-w-[100%] h-fit mx-auto text-center shadow-lg">
        

        
        <div className="flex flex-col sm:flex-row justify-center gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="rounded-full px-4 py-2 text-black w-full sm:w-auto flex-1"
          />
          <button className="bg-black text-white rounded-full px-6 py-2 font-semibold hover:bg-gray-900 transition">
            Get started
          </button>
        </div>
      </div> */}

      {/* Footer Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10  text-sm text-white">
        <div>
          <h4 className="font-bold text-left mb-3">Sign up for our newsletter</h4>
          <p className="text-left text-white/70 mb-4">
            Don’t worry, we reserve our newsletter for important news so we only send a few updates a year.
          </p>
          <button className="border block ml-0 border-white rounded-full px-4 py-1 hover:bg-white hover:text-black transition">
            Subscribe
          </button>
        </div>

        <div>
          <h4 className="font-bold text-left mb-3">Quick Links</h4>
          <ul className="space-y-2 text-left text-white/70">
            <li><a href="#">Home</a></li>
            <li><a href="#">Categories</a></li>
            <li><a href="#">Services</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-left mb-3">Company</h4>
          <ul className="space-y-2 text-left text-white/70">
            <li><a href="#">Contact</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-left mb-3">Stay Connected</h4>
          <ul className="space-y-2 text-left text-white/70">
            <li><a href="#">Instagram</a></li>
            <li><a href="#">LinkedIn</a></li>
            <li><a href="#">Git Hub</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-white/20 pt-4 pb-4 flex flex-col md:flex-row justify-between items-center text-xs text-white/70">
        <p>© 2025 EVENTIQUE. All rights reserved.</p>
        <div className="flex space-x-4 mt-2 md:mt-0 text-lg">
          <a href="#"><FaGithub /></a>
          <a href="#"><FaLinkedin /></a>
          <a href="#"><FaInstagram /></a>
        </div>
      </div>
    </footer>
  );
}
