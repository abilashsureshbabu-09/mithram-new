import React, { useEffect } from 'react';
import { Target, Eye, Users, ShieldCheck, CheckCircle2, Award, Briefcase, Zap } from 'lucide-react';
import { COMPANY_DETAILS } from '../constants';

const About: React.FC = () => {
  useEffect(() => {
    document.title = "About Mithram Elite | 25+ Years of Construction Mastery in Chennai";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-gray-900 py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-teal-600/10 skew-x-12 transform translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-6xl font-black uppercase text-white mb-6 tracking-tight">Expertise. Integrity. <br /><span className="text-teal-500">Excellence.</span></h1>
          <p className="text-teal-500 font-bold uppercase tracking-widest text-lg">Your Strategic Partner in Regional Infrastructure</p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-teal-500/10 rounded-3xl -rotate-2"></div>
              <img 
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800" 
                alt="The Mithram Heritage" 
                className="rounded-2xl shadow-2xl relative z-10"
              />
              <div className="absolute -bottom-10 -right-10 bg-teal-600 text-white p-8 rounded-3xl shadow-2xl z-20 hidden md:block">
                <p className="text-4xl font-black mb-1">25+</p>
                <p className="text-xs font-bold uppercase tracking-widest">Years of Prestige</p>
              </div>
            </div>
            
            <div className="space-y-8">
              <h2 className="text-4xl font-bold uppercase text-gray-900">Decades of Unrivaled <br /><span className="text-teal-600">Engineering Distinction.</span></h2>
              <p className="text-gray-600 leading-relaxed text-lg font-medium">
                Founded in 1998, Mithram Elite Constructions has established itself as the gold standard for high-performance building in Tamil Nadu. We specialize in turning complex architectural blueprints into durable engineering realities.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our legacy is built on the pillars of transparency, innovation, and client success. From high-rise residential towers to massive industrial warehouses, we apply the same rigor and precision to every square foot.
              </p>
              
              <div className="grid grid-cols-2 gap-8 pt-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-teal-100 p-2 rounded-lg text-teal-600"><Award className="h-6 w-6" /></div>
                  <div>
                    <h4 className="font-bold uppercase text-sm mb-1">A+ Rating</h4>
                    <p className="text-xs text-gray-500 uppercase font-bold">Standard of Excellence</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-teal-100 p-2 rounded-lg text-teal-600"><Briefcase className="h-6 w-6" /></div>
                  <div>
                    <h4 className="font-bold uppercase text-sm mb-1">Full Turnkey</h4>
                    <p className="text-xs text-gray-500 uppercase font-bold">Concept to Delivery</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Breakdown */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-teal-600 font-black uppercase tracking-[0.4em] text-sm mb-4">Core Competencies</h2>
            <h3 className="text-4xl md:text-5xl font-bold uppercase text-gray-900">Infrastructure Intelligence</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: 'Elite Civil Construction', desc: 'Precision-engineered foundations and structures for luxury residences and corporate offices.' },
              { title: 'Project Management', desc: 'Advanced oversight systems ensuring strict timeline adherence and zero-defect quality control.' },
              { title: 'Luxury Interior Finishes', desc: 'Architectural interior design that harmonizes aesthetic opulence with functional efficiency.' },
              { title: 'Structural Engineering', desc: 'Modern structural analysis and retrofitting for safety, durability, and seismic resistance.' },
              { title: 'PEB Industrial Hubs', desc: 'Rapid-deployment Pre-Engineered Buildings for modern manufacturing and heavy-duty storage.' },
              { title: 'Sustainable Engineering', desc: 'Integrating green energy solutions and eco-friendly materials to build future-ready spaces.' }
            ].map((service, i) => (
              <div key={i} className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-gray-100 group">
                <div className="h-2 w-12 bg-teal-500 mb-8 transition-all group-hover:w-24"></div>
                <h4 className="text-xl font-bold uppercase mb-4 text-gray-900">{service.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-teal-900 rounded-[3rem] overflow-hidden relative">
            <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=1920')] bg-cover"></div>
            <div className="relative z-10 p-12 md:p-24 grid grid-cols-1 lg:grid-cols-3 gap-16">
              <div className="space-y-6">
                <ShieldCheck className="h-16 w-16 text-teal-400" />
                <h4 className="text-3xl font-bold text-white uppercase">Radical Integrity</h4>
                <p className="text-teal-100/80 leading-relaxed">Absolute transparency in cost auditing and project milestones. We build on a foundation of trust.</p>
              </div>
              <div className="space-y-6">
                <Users className="h-16 w-16 text-teal-400" />
                <h4 className="text-3xl font-bold text-white uppercase">Elite Collaboration</h4>
                <p className="text-teal-100/80 leading-relaxed">Working seamlessly with global architects and consultants to realize your project's maximum potential.</p>
              </div>
              <div className="space-y-6">
                <Zap className="h-16 w-16 text-teal-400" />
                <h4 className="text-3xl font-bold text-white uppercase">BIM Technology</h4>
                <p className="text-teal-100/80 leading-relaxed">Utilizing advanced Building Information Modeling to simulate, optimize, and streamline every phase of construction.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;