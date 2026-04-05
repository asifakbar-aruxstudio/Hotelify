import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-green-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Hotelify
            </h2>
            <p className="text-sm leading-6">
              We build modern web solutions with high performance and beautiful UI.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {["Home", "About", "Services", "Contact"].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-white transition">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-2">
              {["Web Development", "UI/UX Design", "SEO", "Consulting"].map((service) => (
                <li key={service}>
                  <a href="#" className="hover:text-white transition">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Subscribe
            </h3>
            <p className="text-sm mb-4">
              Get latest updates and offers.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter email"
                className="w-full px-4 py-2 rounded bg-gray-800 text-sm focus:outline-none"
              />
              <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white text-sm">
                Subscribe
              </button>
            </form>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">

          {/* Copyright */}
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} YourBrand. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4">
            {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="bg-gray-800 p-2 rounded-full hover:bg-blue-600 transition"
              >
                <Icon className="text-sm text-white" />
              </a>
            ))}
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;