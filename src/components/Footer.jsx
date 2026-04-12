import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const footerLinks = {
  company: [
    { name: "About Us", path: "/about" },
    { name: "Careers", path: "/careers" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ],
  services: [
    { name: "Hotel Management", path: "/services/management" },
    { name: "Booking System", path: "/services/booking" },
    { name: "Revenue Management", path: "/services/revenue" },
    { name: "Marketing", path: "/services/marketing" },
  ],
  legal: [
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" },
    { name: "Cookie Policy", path: "/cookies" },
  ],
};

const socialLinks = [
  { icon: FaFacebookF, href: "#", label: "Facebook" },
  { icon: FaTwitter, href: "#", label: "Twitter" },
  { icon: FaInstagram, href: "#", label: "Instagram" },
  { icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
];

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                Hotelify
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6 max-w-sm">
              Simplify your hotel management with our all-in-one platform. 
              Streamline bookings, automate operations, and boost revenue.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  to={href}
                  aria-label={label}
                  className="p-2.5 rounded-lg bg-gray-800 hover:bg-emerald-500 hover:text-white text-gray-400 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm hover:text-emerald-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm hover:text-emerald-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Stay Updated</h3>
            <p className="text-sm mb-4">
              Subscribe to get the latest news and offers.
            </p>
            <form className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-sm focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-gray-500"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-lg bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-600 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="py-6 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm">
            © {new Date().getFullYear()} Hotelify. All rights reserved.
          </p>
          <div className="flex gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-sm hover:text-emerald-400 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;