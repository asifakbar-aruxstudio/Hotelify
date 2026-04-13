import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { Link } from 'react-router-dom';
import { 
  HiOutlineCalendarDays, 
  HiOutlineUserGroup, 
  HiOutlineShieldCheck,
  HiOutlineCurrencyDollar,
  HiOutlineStar,
  HiOutlineClock,
  HiOutlineChatBubbleLeftRight,
  HiOutlineSparkles,
  HiOutlineHomeModern,
  HiOutlineKey,
  HiOutlineCheckCircle,
  HiOutlineHeart
} from 'react-icons/hi2';
import { FaHotel, FaWhatsapp, FaAward, FaHandshake } from 'react-icons/fa6';

const stats = [
  { value: '10K+', label: 'Hotels', icon: FaHotel },
  { value: '500K+', label: 'Happy Guests', icon: HiOutlineUserGroup },
  { value: '50+', label: 'Cities', icon: HiOutlineStar },
  { value: '4.9', label: 'Rating', icon: FaAward },
];

const steps = [
  {
    step: '01',
    icon: HiOutlineSparkles,
    title: 'Search & Discover',
    description: 'Browse thousands of hotels worldwide. Filter by location, price, amenities, ratings, and more to find your perfect stay.'
  },
  {
    step: '02',
    icon: HiOutlineCalendarDays,
    title: 'Select Your Dates',
    description: 'Choose your check-in and check-out dates. See real-time availability and compare prices across different room types.'
  },
  {
    step: '03',
    icon: HiOutlineHomeModern,
    title: 'Book Instantly',
    description: 'Secure your reservation with instant confirmation. Receive your booking details via email and WhatsApp.'
  },
  {
    step: '04',
    icon: HiOutlineKey,
    title: 'Enjoy Your Stay',
    description: 'Arrive at your hotel and enjoy seamless check-in. Our support team is available 24/7 for any assistance.'
  },
];

const features = [
  {
    icon: HiOutlineShieldCheck,
    title: 'Secure Booking',
    description: 'Your payments are protected with industry-standard security. Book with confidence knowing your data is safe.'
  },
  {
    icon: HiOutlineClock,
    title: 'Instant Confirmation',
    description: 'Get immediate booking confirmation via email and WhatsApp. No waiting, no uncertainty - just your reservation confirmed.'
  },
  {
    icon: HiOutlineCurrencyDollar,
    title: 'Best Price Guarantee',
    description: 'Find a lower price? We will match it. Get the best deals directly from hotels with no middleman markup.'
  },
  {
    icon: HiOutlineUserGroup,
    title: '24/7 Support',
    description: 'Our dedicated support team is available round the clock to help you with bookings and emergencies.'
  },
  {
    icon: HiOutlineStar,
    title: 'Verified Reviews',
    description: 'Read authentic reviews from real guests. Make informed decisions based on genuine guest experiences.'
  },
  {
    icon: FaHandshake,
    title: 'Flexible Cancellation',
    description: 'Most bookings offer free cancellation. Change your plans without worrying about penalties.'
  },
];

const whyChooseUs = [
  'Direct partnerships with 10,000+ hotels worldwide',
  'Exclusive deals and discounts unavailable elsewhere',
  'Seamless booking experience in minutes',
  'Multi-language support for international travelers',
  'Loyalty rewards andPoints program',
  'Business and group booking solutions',
];

const faqs = [
  {
    question: 'How do I make a hotel booking?',
    answer: 'Simply search for your desired location, select dates, browse available hotels, and book instantly. You will receive confirmation via email and WhatsApp within seconds.'
  },
  {
    question: 'Can I modify or cancel my booking?',
    answer: 'Yes, most bookings allow free modification or cancellation up to 24 hours before check-in. Check the specific hotel cancellation policy for details.'
  },
  {
    question: 'How do I contact hotel support?',
    answer: 'Use our WhatsApp chat widget for instant support, or call our 24/7 hotline. We are here to help with any questions or concerns.'
  },
  {
    question: 'Are the hotel ratings trustworthy?',
    answer: 'Yes! All ratings are from verified guests who have stayed at the property. We do not post fake reviews.'
  },
  {
    question: 'What payment methods are accepted?',
    answer: 'We accept all major credit cards, debit cards, UPI, and digital wallets. Your payment is secure and encrypted.'
  },
  {
    question: 'Is my personal information safe?',
    answer: 'Absolutely. We use bank-level security to protect your data. We never share your information with third parties.'
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-500 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
              <FaAward className="w-4 h-4" />
              Trusted by 500,000+ Happy Guests
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Your Journey Starts with
              <span className="block text-emerald-400">Perfect Stays</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
              We simplify hotel bookings so you can focus on what matters - creating unforgettable memories.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/hotels" 
                className="px-8 py-4 bg-emerald-500 text-white font-semibold rounded-full hover:bg-emerald-600 transition-all duration-200 shadow-lg shadow-emerald-500/30"
              >
                Book Your Stay
              </Link>
              <a 
                href="https://wa.me/1234567890" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-8 py-4 border border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <FaWhatsapp className="w-5 h-5" />
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-emerald-500" />
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How Hotel Booking Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Book your perfect hotel in just four simple steps. No complications, no confusion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="text-6xl font-bold text-gray-100 absolute top-0 left-0 -z-10">
                  {step.step}
                </div>
                <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center mb-4">
                  <step.icon className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Travelers Love Hotelify
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We make hotel booking seamless, secure, and stress-free.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Book with Hotelify?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                We combine technology with dedicated service to deliver the best hotel booking experience.
              </p>
              <ul className="space-y-4">
                {whyChooseUs.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <HiOutlineCheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-3xl transform rotate-3" />
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
                    <FaHotel className="w-8 h-8 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Hotelify Pro</h3>
                    <p className="text-gray-500">For Hotel Owners</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">
                  List your hotel on Hotelify and reach millions of travelers. Our platform handles 
                  bookings, payments, and guest communication.
                </p>
                <Link 
                  to="/signup" 
                  className="block w-full py-3 text-center bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-600 transition-colors"
                >
                  Register Your Hotel
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Got questions? We have answers.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-gray-100"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <a 
              href="https://wa.me/1234567890" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white font-semibold rounded-full hover:bg-[#20BD5A] transition-colors"
            >
              <HiOutlineChatBubbleLeftRight className="w-5 h-5" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-r from-emerald-500 to-teal-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Find Your Perfect Stay?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join 500,000+ happy travelers who booked their dream hotels with us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/hotels" 
              className="px-8 py-4 bg-white text-emerald-600 font-semibold rounded-full hover:bg-gray-100 transition-all duration-200"
            >
              Browse Hotels
            </Link>
            <Link 
              to="/signup" 
              className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-200"
            >
              List Your Hotel
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;