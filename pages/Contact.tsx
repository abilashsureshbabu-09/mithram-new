
import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, AlertCircle, CheckCircle2, X } from 'lucide-react';
import { COMPANY_DETAILS } from '../constants';
// Added missing imports for animation components
import { motion, AnimatePresence } from 'framer-motion';

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    document.title = "Get a Professional Quote | Contact Mithram Elite Constructions Chennai";
    window.scrollTo(0, 0);
  }, []);

  const validate = (name: string, value: string) => {
    let error = '';
    switch (name) {
      case 'name':
        if (!value.trim()) error = 'Name is required';
        else if (value.trim().length < 3) error = 'Name must be at least 3 characters';
        break;
      case 'email':
        if (!value.trim()) error = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Invalid email address';
        break;
      case 'subject':
        if (!value) error = 'Please select a subject';
        break;
      case 'message':
        if (!value.trim()) error = 'Message is required';
        else if (value.trim().length < 10) error = 'Message must be at least 10 characters';
        break;
      case 'phone':
        if (value && !/^\+?[0-9\s-]{10,20}$/.test(value)) error = 'Invalid phone number format';
        break;
    }
    return error;
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validate(name, formState[name as keyof typeof formState]);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      const error = validate(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: FormErrors = {};
    Object.keys(formState).forEach(key => {
      const error = validate(key, formState[key as keyof typeof formState]);
      if (error) newErrors[key as keyof FormErrors] = error;
    });

    setErrors(newErrors);
    setTouched({ name: true, email: true, phone: true, subject: true, message: true });

    if (Object.keys(newErrors).length > 0) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setFormState({ name: '', email: '', phone: '', subject: '', message: '' });
      setTouched({});
      setErrors({});
    }, 1500);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gray-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-6xl font-black uppercase mb-4 tracking-tighter">Strategic Consultations</h1>
          <p className="text-teal-500 font-bold uppercase tracking-[0.3em] text-sm">Chennai's Leading Engineering Minds at Your Service</p>
        </div>
      </section>

      <section className="py-24 -mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info Cards */}
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-white/95 backdrop-blur-sm p-10 rounded-sm shadow-2xl border-l-8 border-teal-500 hover:-translate-y-2 transition-all">
                <div className="flex items-center space-x-5 mb-6">
                  <div className="bg-teal-100 p-4 rounded-sm text-teal-600"><Phone className="h-7 w-7" /></div>
                  <h4 className="font-black uppercase tracking-widest text-sm">Direct Hotline</h4>
                </div>
                <p className="text-gray-900 font-black text-xl mb-1">{COMPANY_DETAILS.phone}</p>
                <p className="text-gray-400 text-[10px] uppercase font-bold tracking-[0.2em]">Regional HQ: 9AM - 7PM</p>
              </div>

              <div className="bg-white/95 backdrop-blur-sm p-10 rounded-sm shadow-2xl border-l-8 border-teal-500 hover:-translate-y-2 transition-all">
                <div className="flex items-center space-x-5 mb-6">
                  <div className="bg-teal-100 p-4 rounded-sm text-teal-600"><Mail className="h-7 w-7" /></div>
                  <h4 className="font-black uppercase tracking-widest text-sm">Secure Email</h4>
                </div>
                <p className="text-gray-900 font-bold text-lg mb-1">{COMPANY_DETAILS.email}</p>
                <p className="text-gray-400 text-[10px] uppercase font-bold tracking-[0.2em]">Prioritized Response Within 12H</p>
              </div>

              <div className="bg-white/95 backdrop-blur-sm p-10 rounded-sm shadow-2xl border-l-8 border-teal-500 hover:-translate-y-2 transition-all">
                <div className="flex items-center space-x-5 mb-6">
                  <div className="bg-teal-100 p-4 rounded-sm text-teal-600"><MapPin className="h-7 w-7" /></div>
                  <h4 className="font-black uppercase tracking-widest text-sm">Regional HQ</h4>
                </div>
                <p className="text-gray-600 text-sm font-medium leading-relaxed mb-4">{COMPANY_DETAILS.address}</p>
                <button className="text-teal-600 text-[10px] font-black uppercase tracking-[0.2em] hover:underline flex items-center">
                  Live Map Coordinates <Send className="ml-2 h-3 w-3" />
                </button>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2 relative">
              <AnimatePresence>
                {success && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute inset-0 z-50 bg-white/98 backdrop-blur-xl flex items-center justify-center p-12 rounded-sm shadow-2xl"
                  >
                    <div className="max-w-md text-center space-y-8">
                      <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto shadow-inner">
                        <CheckCircle2 className="h-12 w-12 text-green-600" />
                      </div>
                      <div className="space-y-3">
                        <h3 className="text-4xl font-black uppercase text-gray-900 tracking-tighter">Transmission Successful</h3>
                        <p className="text-gray-600 font-medium">Your request for an elite consultation has been logged. An engineering lead will reach out to you.</p>
                      </div>
                      <button 
                        onClick={() => setSuccess(false)}
                        className="bg-black text-white px-12 py-5 rounded-sm font-black uppercase text-xs tracking-[0.3em] hover:bg-teal-600 transition-all shadow-xl active:scale-95"
                      >
                        New Enquiry
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="bg-white rounded-sm shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] p-12 md:p-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-teal-500/5 rounded-full -mr-24 -mt-24"></div>
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                  <h3 className="text-4xl font-black uppercase text-gray-900 flex items-center tracking-tighter">
                    <MessageSquare className="h-10 w-10 text-teal-500 mr-5" />
                    Request a Proposal
                  </h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 text-right">Encrypted Channel</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Full Name *</label>
                    <input 
                      name="name"
                      type="text" 
                      className={`w-full bg-gray-50 border-2 rounded-sm focus:ring-0 px-6 py-4 text-sm font-bold transition-all ${
                        errors.name ? 'border-red-200 focus:border-red-500' : 'border-gray-50 focus:border-teal-500'
                      }`}
                      placeholder="LEAD CONTACT NAME"
                      value={formState.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.name && touched.name && (
                      <p className="text-red-500 text-[10px] font-bold uppercase flex items-center mt-2 tracking-widest">
                        <AlertCircle className="h-3 w-3 mr-2" /> {errors.name}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Professional Email *</label>
                    <input 
                      name="email"
                      type="email" 
                      className={`w-full bg-gray-50 border-2 rounded-sm focus:ring-0 px-6 py-4 text-sm font-bold transition-all ${
                        errors.email ? 'border-red-200 focus:border-red-500' : 'border-gray-50 focus:border-teal-500'
                      }`}
                      placeholder="OFFICIAL@EMAIL.COM"
                      value={formState.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.email && touched.email && (
                      <p className="text-red-500 text-[10px] font-bold uppercase flex items-center mt-2 tracking-widest">
                        <AlertCircle className="h-3 w-3 mr-2" /> {errors.email}
                      </p>
                    )}
                  </div>
                  <div className="md:col-span-2 pt-8">
                    <button 
                      disabled={isSubmitting}
                      className="w-full bg-black hover:bg-teal-600 text-white font-black uppercase py-6 rounded-sm transition-all flex items-center justify-center space-x-4 disabled:opacity-50 group shadow-2xl shadow-gray-200"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center space-x-4">
                           <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                           <span className="tracking-[0.3em]">SECURE TRANSMISSION IN PROGRESS...</span>
                        </div>
                      ) : (
                        <>
                          <span className="tracking-[0.4em]">Initialize Quotation Process</span>
                          <Send className="h-5 w-5 group-hover:translate-x-3 group-hover:-translate-y-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="h-[500px] w-full bg-gray-900 relative grayscale overflow-hidden group">
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="bg-white/95 backdrop-blur-xl p-10 rounded-sm shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] flex items-center space-x-6 border-l-8 border-teal-600 transform group-hover:scale-110 transition-transform duration-700">
             <MapPin className="h-12 w-12 text-teal-600" />
             <div>
               <h4 className="font-black uppercase text-xl tracking-tighter">{COMPANY_DETAILS.name}</h4>
               <p className="text-[10px] text-gray-500 uppercase font-black tracking-[0.4em]">Global Operations Center</p>
             </div>
          </div>
        </div>
        <img 
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1920" 
          alt="Chennai Region Satellite Map" 
          className="w-full h-full object-cover opacity-30 scale-105 group-hover:scale-110 transition-transform duration-[20s] ease-linear"
        />
      </section>
    </div>
  );
};

export default Contact;
