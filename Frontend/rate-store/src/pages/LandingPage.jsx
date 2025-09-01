import React from 'react';
import AnimatedSpiral from '../components/AnimatedSpiral';
import logo from '../assets/logo.png'; 
import { featureSections, testimonials } from '../data';
import { FaGithub, FaLinkedin, FaCode } from 'react-icons/fa';


const HeroSection = ({ onRegisterClick }) => (
  <section className="grid md:grid-cols-2 items-center gap-12 py-12">
    <div className="text-center md:text-left">
      <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
        Honest Ratings,
        <br />
        Trusted Stores
      </h1>
      <p className="max-w-md mx-auto md:mx-0 text-lg text-gray-300 mb-8">
        The ultimate platform for discovering, rating, and sharing your experiences with local stores.
      </p>
      <button
        onClick={onRegisterClick}
        className="bg-white text-black font-semibold py-3 px-8 rounded-full hover:opacity-80 transition-transform hover:scale-105"
      >
        Start Rating Now
      </button>
    </div>
    <div>
      <AnimatedSpiral />
    </div>
  </section>
);

const Testimonials = () => (
  <section className="py-20 text-center">
    <h2 className="text-3xl font-bold mb-12">What Our Users Say</h2>
    <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
      <div className="flex animate-[scroll_40s_linear_infinite]">
        {[...testimonials, ...testimonials].map((testimonial, index) => (
          <div key={index} className="flex-shrink-0 w-80 bg-white/5 border border-white/10 rounded-lg p-6 mx-8 text-left">
            <div className="flex items-center mb-4">
              <img src={testimonial.imageUrl} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
              <p className="font-semibold">{testimonial.name}</p>
            </div>
            <p className="text-gray-400">"{testimonial.review}"</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="border-t border-white/10 mt-20 pt-10 pb-6 text-center text-gray-400">
    <img src={logo} alt="RateStore Logo" className="h-8 w-auto mx-auto mb-4" />
    <p>Roxiler Systems FullStack Intern Coding Challenge - Jayesh Patil</p>
    <div className="flex justify-center gap-6 my-6">
      <a href="https://github.com/JayeshPatil163" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-white"><FaGithub /></a>
      <a href="https://www.linkedin.com/in/jayesh-patil-1901b1297" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-white"><FaLinkedin /></a>
      <a href="https://leetcode.com/u/Jayesh_Patil_27/" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-white"><FaCode /></a>
    </div>
    <p>Contact: <a href="mailto:jayeshjpatil163@gmail.com" className="hover:text-white">jayeshjpatil163@gmail.com</a></p>
    <p className="text-xs mt-6">&copy; 2025 RateStore. All Rights Reserved.</p>
  </footer>
);


const LandingPage = ({ onRegisterClick }) => {
  return (
    <div>
      <HeroSection onRegisterClick={onRegisterClick} />
      <section className="grid md:grid-cols-2 items-center gap-12 py-20">
        <div className="order-2 md:order-2">
          <h2 className="text-3xl font-bold mb-4">{featureSections[0].title}</h2>
          <p className="text-gray-400 leading-relaxed">{featureSections[0].description}</p>
        </div>
        <div className="order-1 md:order-1">
          <img src={featureSections[0].imageUrl} alt={featureSections[0].title} className="rounded-lg shadow-2xl w-full" />
        </div>
      </section>

      <section className="grid md:grid-cols-2 items-center gap-12 py-20">
        <div className="order-2 md:order-1">
          <h2 className="text-3xl font-bold mb-4">{featureSections[1].title}</h2>
          <p className="text-gray-400 leading-relaxed">{featureSections[1].description}</p>
        </div>
        <div className="order-1 md:order-2">
          <img src={featureSections[1].imageUrl} alt={featureSections[1].title} className="rounded-lg shadow-2xl w-full" />
        </div>
      </section>

      <section className="grid md:grid-cols-2 items-center gap-12 py-20">
        <div className="order-2 md:order-2">
          <h2 className="text-3xl font-bold mb-4">{featureSections[2].title}</h2>
          <p className="text-gray-400 leading-relaxed">{featureSections[2].description}</p>
        </div>
        <div className="order-1 md:order-1">
          <img src={featureSections[2].imageUrl} alt={featureSections[2].title} className="rounded-lg shadow-2xl w-full" />
        </div>
      </section>
      <Testimonials />
      <Footer />
    </div>
  );
};

export default LandingPage;