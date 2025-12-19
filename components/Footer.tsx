import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from 'lucide-react';
import { COMPANY_DETAILS } from '../constants';
import { Link } from 'react-router-dom';

const FooterLogo = () => (
  <div className="flex items-center gap-3">
    <img 
      src="components/logo.png" 
      alt="Mithram Constructions Logo" 
      className="w-12 h-12 object-contain"
      loading="lazy"
    />
    <div className="flex flex-col leading-none">
      <span className="text-2xl font-black uppercase tracking-tighter text-white">Mithram</span>
      <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-teal-500">Constructions</span>
    </div>
  </div>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1A1A1A] text-white pt-24 pb-12 overflow-hidden border-t-8 border-teal-600">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="space-y-8">
            <Link to="/" className="inline-block">
              <FooterLogo />
            </Link>
            <p className="text-gray-400 leading-relaxed font-medium text-sm">
              Mithram Constructions defines the Chennai skyline. We blend innovative engineering with timeless craftsmanship for residential, commercial, and industrial landmarks.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="p-3 bg-white/5 rounded-sm hover:bg-teal-600 transition-all hover:shadow-lg">
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold uppercase mb-8 tracking-widest text-teal-500">Navigation</h4>
            <ul className="space-y-4 text-gray-400 font-bold uppercase text-[11px] tracking-widest">
              <li><Link to="/" className="hover:text-teal-500 transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-teal-500 transition-colors">About Us</Link></li>
              <li><Link to="/projects" className="hover:text-teal-500 transition-colors">Portfolio</Link></li>
              <li><Link to="/contact" className="hover:text-teal-500 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold uppercase mb-8 tracking-widest text-teal-500">Services</h4>
            <ul className="space-y-4 text-gray-400 font-bold uppercase text-[11px] tracking-widest">
              <li className="flex items-center space-x-3"><div className="w-1.5 h-1.5 bg-teal-500"></div> <span>Civil Engineering</span></li>
              <li className="flex items-center space-x-3"><div className="w-1.5 h-1.5 bg-teal-500"></div> <span>Project Management</span></li>
              <li className="flex items-center space-x-3"><div className="w-1.5 h-1.5 bg-teal-500"></div> <span>Residential Villas</span></li>
              <li className="flex items-center space-x-3"><div className="w-1.5 h-1.5 bg-teal-500"></div> <span>Industrial Hubs</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold uppercase mb-8 tracking-widest text-teal-500">Get in Touch</h4>
            <ul className="space-y-6">
              <li className="flex items-start space-x-4">
                <MapPin className="h-5 w-5 text-teal-500 flex-shrink-0" />
                <span className="text-gray-400 text-sm leading-relaxed">{COMPANY_DETAILS.address}</span>
              </li>
              <li className="flex items-center space-x-4">
                <Phone className="h-5 w-5 text-teal-500 flex-shrink-0" />
                <span className="text-gray-400 text-sm font-bold tracking-wider">{COMPANY_DETAILS.phone}</span>
              </li>
              <li className="flex items-center space-x-4">
                <Mail className="h-5 w-5 text-teal-500 flex-shrink-0" />
                <span className="text-gray-400 text-sm font-bold lowercase">{COMPANY_DETAILS.email}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em]">
            &copy; {new Date().getFullYear()} {COMPANY_DETAILS.name}. {COMPANY_DETAILS.tagline}
          </p>
          <div className="flex space-x-8 text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">
            <Link to="/admin" className="hover:text-teal-500 transition-colors">Admin Login</Link>
            <a href="#" className="hover:text-teal-500 transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;