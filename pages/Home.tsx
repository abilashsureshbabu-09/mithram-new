
import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, Bot, MessageSquare, X, ChevronRight, 
  CheckCircle2, Shield, Hammer, Ruler, Play, 
  Users2, Building2, Quote, Award, HardHat,
  DraftingCompass, Truck, Key
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getSmartEstimateChat } from '../services/geminiService';
import { motion, AnimatePresence } from 'framer-motion';
import { INITIAL_PROJECTS } from '../constants';

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1581094794329-c8112a4e5190?auto=format&fit=crop&q=80&w=1920",
  "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=1920",
  "https://images.unsplash.com/photo-1590644365607-1c5a519a7a37?auto=format&fit=crop&q=80&w=1920",
  "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1920"
];

const TESTIMONIALS = [
  {
    name: "Rajesh Kumar",
    role: "CEO, TechPark Chennai",
    text: "Mithram's commitment to the timeline was unprecedented. They delivered our 1.2M sq.ft. facility 2 months ahead of schedule without a single compromise on safety.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
  },
  {
    name: "Anita Deshmukh",
    role: "Architectural Consultant",
    text: "As an architect, finding a contractor who understands the nuance of design is rare. Mithram treats every blueprint as a sacred contract.",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
  },
  {
    name: "Sanjay Reddy",
    role: "Owner, Elite Villas",
    text: "The precision in their finishing is what sets them apart. From the structural core to the final paint stroke, the quality is palpable.",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
  }
];

const Home: React.FC = () => {
  const [showChat, setShowChat] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<{role: 'user' | 'model', content: string}[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentHeroIdx, setCurrentHeroIdx] = useState(0);

  useEffect(() => {
    document.title = "Mithram Elite Constructions | Premium Builders & Contractors in Chennai";
    const interval = setInterval(() => {
      setCurrentHeroIdx((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = chatInput;
    const history = chatMessages.map(m => ({ role: m.role, message: m.content }));
    
    setChatMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setChatInput('');
    setIsTyping(true);

    const response = await getSmartEstimateChat(history, userMessage);
    setChatMessages(prev => [...prev, { role: 'model', content: response }]);
    setIsTyping(false);
  };

  return (
    <div className="flex flex-col overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-[95vh] flex items-center bg-black overflow-hidden">
        {HERO_IMAGES.map((img, idx) => (
          <div 
            key={img}
            className={`absolute inset-0 w-full h-full transition-opacity duration-[2500ms] ${idx === currentHeroIdx ? 'opacity-60' : 'opacity-0'}`}
          >
            <img src={img} alt={`Construction Masterpiece ${idx + 1}`} className="w-full h-full object-cover scale-105" />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-4xl space-y-6"
          >
            <div className="flex items-center gap-4">
              <span className="w-12 h-0.5 bg-teal-500"></span>
              <span className="text-teal-500 font-black uppercase tracking-[0.4em] text-xs">Legacy of Excellence</span>
            </div>
            <h1 className="text-7xl md:text-[10rem] font-black text-white uppercase leading-[0.85] tracking-tighter">
              Build <br />
              <span className="text-teal-500">Beyond.</span>
            </h1>
            <p className="text-xl text-gray-300 font-medium max-w-2xl leading-relaxed border-l-2 border-teal-500/30 pl-6">
              Mithram Elite defines the gold standard in regional infrastructure, bringing architectural dreams to life with 25+ years of precision engineering.
            </p>
            <div className="flex flex-wrap gap-4 pt-10">
              <Link to="/projects">
                <button className="bg-teal-600 text-white px-14 py-6 rounded-sm font-black uppercase text-xs tracking-widest hover:bg-teal-500 transition-all shadow-2xl shadow-teal-900/40 flex items-center gap-3 group">
                  View Masterpieces <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link to="/contact">
                <button className="bg-white/5 backdrop-blur-xl text-white border border-white/20 px-14 py-6 rounded-sm font-black uppercase text-xs tracking-widest hover:bg-white hover:text-black transition-all">
                  Request Quote
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
        
        <div className="absolute bottom-12 left-4 md:left-12 flex items-center space-x-4 z-20">
          <span className="text-white font-black text-[10px] tracking-widest uppercase opacity-40">0{currentHeroIdx + 1}</span>
          <div className="flex space-x-2">
            {HERO_IMAGES.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setCurrentHeroIdx(i)}
                className={`h-1.5 transition-all duration-500 rounded-full ${i === currentHeroIdx ? 'w-16 bg-teal-500' : 'w-4 bg-white/20'}`}
              />
            ))}
          </div>
          <span className="text-white font-black text-[10px] tracking-widest uppercase opacity-40">0{HERO_IMAGES.length}</span>
        </div>
      </section>

      {/* Trust Metrics Section */}
      <section className="bg-white py-24 relative -mt-16 mx-auto w-11/12 max-w-7xl z-20 shadow-2xl rounded-sm border-t-8 border-teal-600">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center divide-x divide-gray-100">
          {[
            { label: 'Built Landmarks', value: '500+', icon: <Building2 className="h-5 w-5 mx-auto mb-2 text-teal-600" /> },
            { label: 'Engineering Years', value: '25+', icon: <Award className="h-5 w-5 mx-auto mb-2 text-teal-600" /> },
            { label: 'Safety Incidents', value: '0.0%', icon: <Shield className="h-5 w-5 mx-auto mb-2 text-teal-600" /> },
            { label: 'Active Sites', value: '42+', icon: <HardHat className="h-5 w-5 mx-auto mb-2 text-teal-600" /> }
          ].map((stat, i) => (
            <div key={i} className="px-6 group">
              {stat.icon}
              <p className="text-5xl font-black text-black mb-1 group-hover:scale-110 transition-transform">{stat.value}</p>
              <p className="text-[11px] uppercase tracking-[0.3em] font-black text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Intro Bridge Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <span className="text-teal-600 font-black uppercase tracking-[0.5em] text-xs">Who We Are</span>
              <h2 className="text-6xl font-black uppercase text-black leading-[0.9] tracking-tighter">
                We Don't Build Structures. <br />
                <span className="text-gray-400">We Build Legacies.</span>
              </h2>
              <div className="h-1.5 w-32 bg-teal-500"></div>
              <p className="text-gray-600 text-lg leading-relaxed font-medium">
                Mithram Elite Constructions stands as a pillar of structural integrity in Tamil Nadu. Our engineering DNA is coded for precision, sustainability, and absolute client satisfaction.
              </p>
              <div className="flex gap-8">
                <div className="flex flex-col">
                  <span className="text-4xl font-black text-black tracking-tighter uppercase">ISO 9001</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-teal-600">Certified Quality</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-4xl font-black text-black tracking-tighter uppercase">LEED</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-teal-600">Green Practice</span>
                </div>
              </div>
            </div>
            <div className="relative group cursor-pointer overflow-hidden rounded-sm">
              <img 
                src="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=1200" 
                alt="Construction Process" 
                className="w-full h-[500px] object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-teal-600 p-8 rounded-full shadow-2xl animate-pulse">
                  <Play className="h-8 w-8 text-white fill-current" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Verticals */}
      <section className="py-32 bg-gray-50 border-y">
        <div className="container mx-auto px-4">
          <div className="text-center mb-24 space-y-4">
            <span className="text-teal-600 font-black uppercase tracking-[0.5em] text-xs">Core Sectors</span>
            <h2 className="text-5xl font-black uppercase text-black tracking-tighter">Our Engineering Verticals</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                title: 'Residential', 
                icon: <Shield className="h-8 w-8" />,
                img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
                desc: 'Signature luxury villas and premium apartments crafted for elite living standards.' 
              },
              { 
                title: 'Commercial', 
                icon: <Building2 className="h-8 w-8" />,
                img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
                desc: 'High-performance corporate offices and Grade-A retail hubs with global standards.' 
              },
              { 
                title: 'Industrial', 
                icon: <Hammer className="h-8 w-8" />,
                img: "https://images.unsplash.com/photo-1586528116311-ad8de3c8a50f?auto=format&fit=crop&q=80&w=800",
                desc: 'Massive manufacturing plants, smart logistics parks, and PEB structural centers.' 
              }
            ].map((service, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="group bg-white overflow-hidden shadow-2xl rounded-sm hover:-translate-y-4 transition-all duration-500"
              >
                <div className="h-80 overflow-hidden relative">
                  <img src={service.img} alt={service.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-125" />
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-all"></div>
                  <div className="absolute top-8 left-8">
                    <div className="bg-teal-600 p-4 rounded-sm text-white shadow-xl">
                      {service.icon}
                    </div>
                  </div>
                </div>
                <div className="p-12 space-y-6">
                  <h3 className="text-3xl font-black uppercase text-black tracking-tighter">{service.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed font-medium">{service.desc}</p>
                  <Link to="/projects" className="inline-flex items-center text-[11px] font-black uppercase tracking-[0.3em] text-teal-600 hover:text-teal-700 border-b-2 border-transparent hover:border-teal-600 transition-all pb-2">
                    View Sector Portfolio <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Mithram Methodology */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-24">
            <span className="text-teal-600 font-black uppercase tracking-[0.5em] text-xs">Our Workflow</span>
            <h2 className="text-6xl font-black uppercase text-black leading-tight tracking-tighter">A Methodology Focused <br />on Predictive Success</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { title: 'Vision & Audit', step: '01', icon: <DraftingCompass />, desc: 'Structural auditing and architectural visualization before the first brick.' },
              { title: 'Global Sourcing', step: '02', icon: <Truck />, desc: 'Acquiring premium raw materials from verified global engineering partners.' },
              { title: 'Core Build', step: '03', icon: <HardHat />, desc: 'High-precision construction managed by BIM technology and site leads.' },
              { title: 'The Handover', step: '04', icon: <Key />, desc: 'Final QC verification and lifecycle management support for the facility.' }
            ].map((method, i) => (
              <div key={i} className="bg-gray-50 p-12 space-y-8 group hover:bg-black hover:text-white transition-all duration-500 border-b-4 border-transparent hover:border-teal-500">
                <div className="flex justify-between items-start">
                  <div className="p-4 bg-white/50 rounded-sm text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-all">
                    {/* Fix: Casting to React.ReactElement<any> to allow className prop in cloneElement by avoiding unknown prop inference */}
                    {React.cloneElement(method.icon as React.ReactElement<any>, { className: 'h-8 w-8' })}
                  </div>
                  <span className="text-4xl font-black text-gray-200 group-hover:text-teal-900 transition-colors uppercase italic">{method.step}</span>
                </div>
                <div className="space-y-4">
                  <h4 className="text-2xl font-black uppercase tracking-tighter">{method.title}</h4>
                  <p className="text-gray-500 group-hover:text-gray-400 text-sm leading-relaxed">{method.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Parallax Signature Project Section */}
      <section className="h-[70vh] relative flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-fixed bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1503387762-592dee58c460?auto=format&fit=crop&q=80&w=1920')` }}></div>
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl space-y-8">
            <span className="bg-teal-600 text-white px-4 py-1 text-[10px] font-black uppercase tracking-[0.3em]">Featured Landmark</span>
            <h2 className="text-7xl font-black uppercase text-white tracking-tighter leading-[0.85]">Corporate <br />Nexus OMR</h2>
            <p className="text-xl text-gray-300 font-medium">Over 500,000 sq.ft of Grade-A office space, delivered in record time with 100% LEED compliance.</p>
            <Link to="/projects">
              <button className="bg-white text-black px-12 py-5 rounded-sm font-black uppercase text-xs tracking-widest hover:bg-teal-500 hover:text-white transition-all">
                View Project Details
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Wall (Testimonials) */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-24">
            <Quote className="h-16 w-16 text-teal-100 mx-auto mb-8" />
            <h2 className="text-5xl font-black uppercase text-black tracking-tighter">Voice of Confidence</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="space-y-8 p-10 border border-gray-100 rounded-sm relative group hover:border-teal-500/30 transition-all">
                <p className="text-gray-600 text-lg leading-relaxed italic font-medium">"{t.text}"</p>
                <div className="flex items-center gap-5">
                  <img src={t.img} alt={t.name} className="w-16 h-16 rounded-full object-cover border-4 border-teal-50" />
                  <div>
                    <h5 className="font-black uppercase text-sm text-black tracking-tight">{t.name}</h5>
                    <p className="text-[10px] font-black uppercase tracking-widest text-teal-600">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Partners Marquee */}
      <section className="py-24 bg-gray-50 border-y">
        <div className="container mx-auto px-4">
          <p className="text-center text-[10px] font-black uppercase tracking-[0.5em] text-gray-400 mb-16">Global Technical Partners</p>
          <div className="flex flex-wrap justify-center items-center gap-20 opacity-40 grayscale hover:grayscale-0 transition-all">
            {['TATA STEEL', 'ULTRATECH', 'BIM TECH', 'JSW', 'SAINT GOBAIN', 'OTIS'].map((p) => (
              <span key={p} className="text-3xl font-black text-black tracking-tighter uppercase">{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-40 bg-black relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-teal-600/5 -skew-x-12 translate-x-1/2"></div>
        <div className="container mx-auto px-4 text-center relative z-10 space-y-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-7xl md:text-9xl font-black uppercase text-white tracking-tighter leading-[0.85] mb-8">
              Ready to <br /><span className="text-teal-500">Break Ground?</span>
            </h2>
            <p className="text-gray-400 text-xl font-medium max-w-2xl mx-auto mb-16">
              Connect with our principal engineering consultants today for a strategic project audit.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link to="/contact">
                <button className="bg-teal-600 text-white px-16 py-7 rounded-sm font-black uppercase text-sm tracking-[0.2em] hover:bg-teal-500 transition-all shadow-2xl active:scale-95">
                  Initialize Consultation
                </button>
              </Link>
              <button className="bg-white/5 border border-white/20 text-white px-16 py-7 rounded-sm font-black uppercase text-sm tracking-[0.2em] hover:bg-white hover:text-black transition-all">
                Download Brochure
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* AI Widget */}
      <div className="fixed bottom-10 right-10 z-50">
        {!showChat ? (
          <button 
            onClick={() => setShowChat(true)}
            className="bg-black text-white p-5 rounded-full shadow-2xl transition-all transform hover:scale-110 flex items-center space-x-3 group border border-teal-500/30"
          >
            <Bot className="h-7 w-7 text-teal-500" />
            <span className="font-black uppercase text-[10px] tracking-[0.3em] hidden md:inline">Ask Our AI</span>
          </button>
        ) : (
          <div className="bg-white w-[380px] md:w-[450px] h-[650px] rounded-sm shadow-2xl flex flex-col border border-gray-100 overflow-hidden animate-in slide-in-from-bottom-5">
            <div className="bg-[#1A1A1A] p-6 flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="bg-teal-50 p-2 rounded-sm">
                  <Bot className="h-6 w-6 text-black" />
                </div>
                <div>
                  <h4 className="text-white font-black text-sm uppercase tracking-widest">Master AI Consultant</h4>
                  <div className="flex items-center space-x-1.5">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-[10px] text-teal-400 font-bold uppercase tracking-tighter">Live Support</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setShowChat(false)} className="text-gray-400 hover:text-white transition-colors">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-gray-50">
              {chatMessages.length === 0 && (
                <div className="text-center py-12 space-y-6">
                  <div className="bg-white w-24 h-24 rounded-full flex items-center justify-center mx-auto shadow-sm border border-gray-100">
                    <MessageSquare className="h-12 w-12 text-teal-600" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-900 font-black uppercase text-xs tracking-widest">Welcome to Mithram Elite</p>
                    <p className="text-gray-500 text-sm font-bold italic leading-relaxed">"I can assist with material estimations, project timelines, and high-end engineering queries."</p>
                  </div>
                </div>
              )}
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-5 rounded-sm text-sm font-medium leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-black text-white' 
                      : 'bg-white text-gray-800 shadow-sm border border-gray-200'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white p-5 rounded-sm border border-gray-200 flex space-x-2 shadow-sm">
                    <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleChatSubmit} className="p-8 border-t border-gray-100 bg-white">
              <div className="flex items-center space-x-3 bg-gray-100 rounded-sm p-3">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask about materials, costs..."
                  className="flex-1 bg-transparent border-none text-sm font-bold placeholder:text-gray-400 focus:ring-0"
                />
                <button 
                  type="submit" 
                  disabled={isTyping}
                  className="bg-black text-white p-4 rounded-sm hover:bg-teal-600 disabled:opacity-50 transition-all"
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
