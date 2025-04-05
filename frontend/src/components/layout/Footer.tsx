export function Footer() {
  const footerLinks = {
    "Contact Us": [
      { icon: "bi-telephone", text: "+91 8929676776" },
      { icon: "bi-envelope", text: "netdaddy101@gmail.com" },
      { icon: "bi-globe", text: "www.netdaddy.org" },
      { icon: "bi-geo-alt", text: "Janakpuri, New Delhi" }
    ],
    "Social Media": [
      { icon: "bi-twitter-x", text: "X" },
      { icon: "bi-instagram", text: "Instagram" }
    ],
    "Resources": [
      { icon: "bi-github", text: "Github" }
    ]
  };

  return (
    <footer id="contact" className="border-t border-white/10 py-16">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Logo and description */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-md bg-gradient-to-br from-dusk-500 to-indigo-600 flex items-center justify-center">
                <span className="font-bold text-white">nD</span>
              </div>
              <span className="font-bold text-white text-xl">NetDaddy</span>
            </div>
            <p className="text-white/60 mb-6">Ensuring a safe internet for your child.</p>
          </div>

          {/* Links with Icons */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold mb-4 text-white">{category}</h3>
              <ul className="space-y-2">
                {links.map(({ icon, text }) => (
                  <li key={text} className="flex items-center space-x-2">
                    <i className={`bi ${icon} text-white/60`}></i>
                    <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">{text}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <div className="text-white/40 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Sneaky Alligators. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
