import React, { useState, useEffect } from 'react';
import { Filter, Search, Maximize2, X, MapPin, Calendar, Briefcase, Info, ChevronLeft, ChevronRight, Activity, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project, ProjectCategory } from '../types';
import { INITIAL_PROJECTS } from '../constants';
import { useNavigate } from 'react-router-dom';

const SkeletonCard = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
    <div className="bg-gray-200 h-64 w-full"></div>
    <div className="p-6 space-y-4">
      <div className="flex justify-between">
        <div className="h-3 w-16 bg-gray-200 rounded"></div>
        <div className="h-3 w-10 bg-gray-200 rounded"></div>
      </div>
      <div className="h-6 w-3/4 bg-gray-200 rounded"></div>
      <div className="h-4 w-full bg-gray-200 rounded"></div>
      <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
        <div className="h-4 w-24 bg-gray-200 rounded"></div>
        <div className="h-4 w-12 bg-gray-200 rounded"></div>
      </div>
    </div>
  </div>
);

const categories = ['All', ...Object.values(ProjectCategory)];
const statuses = ['All', 'Completed', 'In Progress', 'Planned'];

const Projects: React.FC = () => {
  const navigate = useNavigate();
  const [catFilter, setCatFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = "Elite Portfolios | Luxury Residential & Industrial Projects | Mithram Elite";
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      let filtered = INITIAL_PROJECTS;
      if (catFilter !== 'All') filtered = filtered.filter(p => p.category === catFilter);
      if (statusFilter !== 'All') filtered = filtered.filter(p => p.status === statusFilter);
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(p => 
          p.title.toLowerCase().includes(term) || 
          p.location.toLowerCase().includes(term)
        );
      }
      setProjects(filtered);
      setIsLoading(false);
    }, 600);
    
    return () => clearTimeout(timer);
  }, [catFilter, statusFilter, searchTerm]);

  const openDetails = (project: Project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'hidden';
  };

  const closeDetails = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'unset';
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!selectedProject?.images) return;
    setCurrentImageIndex((prev) => (prev + 1) % (selectedProject.images?.length || 1));
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!selectedProject?.images) return;
    setCurrentImageIndex((prev) => (prev - 1 + (selectedProject.images?.length || 1)) % (selectedProject.images?.length || 1));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50">
      {/* Header */}
      <section className="bg-gray-900 py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-[url('https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=1920')] bg-cover bg-center"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-6xl font-black uppercase text-white mb-4 tracking-tighter">Iconic Landmark Portfolio</h1>
          <p className="text-teal-400 font-bold uppercase tracking-[0.3em] text-xs max-w-2xl mx-auto">Witness 25 years of engineering mastery across Tamil Nadu.</p>
        </div>
      </section>

      {/* Toolbar */}
      <section className="bg-white/95 backdrop-blur-md border-b sticky top-[0px] z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-4 flex-1">
              <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-hide">
                <Filter className="h-4 w-4 text-teal-600 mr-2 flex-shrink-0" />
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCatFilter(cat)}
                    className={`px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border ${
                      catFilter === cat 
                        ? 'bg-teal-600 text-white border-teal-600 shadow-lg shadow-teal-200' 
                        : 'bg-white text-gray-500 border-gray-100 hover:border-teal-300 hover:text-teal-600'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-hide">
                <Activity className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                {statuses.map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border ${
                      statusFilter === status 
                        ? 'bg-gray-900 text-white border-gray-900 shadow-lg' 
                        : 'bg-white text-gray-500 border-gray-100 hover:border-gray-400 hover:text-gray-900'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
            <div className="relative group min-w-[320px]">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-teal-600 transition-colors" />
              <input 
                type="text" 
                placeholder="Search projects or locations..."
                className="pl-14 pr-8 py-4 bg-gray-50 border-gray-100 rounded-full text-sm font-bold focus:ring-4 focus:ring-teal-500/10 focus:bg-white border w-full transition-all outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-24 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {[1, 2, 3, 4, 5, 6].map(i => <SkeletonCard key={i} />)}
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-40 space-y-6">
              <div className="bg-gray-100 w-28 h-28 rounded-full flex items-center justify-center mx-auto mb-8">
                <Search className="h-12 w-12 text-gray-300" />
              </div>
              <h3 className="text-3xl font-bold uppercase text-gray-900">No projects match criteria</h3>
              <p className="text-gray-500 max-w-md mx-auto uppercase text-xs font-bold tracking-[0.2em]">Adjust filters to explore more of our heritage.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {projects.map((project) => (
                <motion.div 
                  layout
                  key={project.id} 
                  className="bg-white rounded-3xl shadow-xl overflow-hidden group hover:shadow-2xl hover:shadow-teal-900/10 transition-all duration-500 border border-gray-100 flex flex-col h-full"
                >
                  <div className="relative h-80 overflow-hidden">
                    <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1500ms]" />
                    <div className="absolute top-6 left-6">
                       <div className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md shadow-2xl ${
                         project.status === 'Completed' ? 'bg-green-600/90 text-white' : 
                         project.status === 'In Progress' ? 'bg-teal-600/90 text-white' : 'bg-blue-600/90 text-white'
                       }`}>
                        {project.status}
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-teal-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                       <button 
                         onClick={() => openDetails(project)}
                         className="bg-white text-teal-900 p-5 rounded-2xl hover:bg-teal-50 transform scale-50 group-hover:scale-100 transition-all duration-500 delay-100 shadow-2xl"
                       >
                        <Maximize2 className="h-8 w-8" />
                       </button>
                    </div>
                  </div>
                  <div className="p-10 flex-1 flex flex-col">
                    <div className="flex justify-between items-center mb-5">
                      <span className="text-teal-600 text-[10px] font-black uppercase tracking-[0.4em]">{project.category}</span>
                      <span className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">{project.year}</span>
                    </div>
                    <h3 className="text-3xl font-bold uppercase text-gray-900 group-hover:text-teal-600 transition-colors duration-300 leading-[1.1] mb-5">{project.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 flex-1 font-medium mb-6">{project.description}</p>
                    <div className="pt-8 border-t border-gray-50 flex items-center justify-between">
                      <div className="flex items-center space-x-3 text-gray-400">
                        <MapPin className="h-4 w-4 text-teal-500/60" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">{project.location}</span>
                      </div>
                      <button 
                        onClick={() => openDetails(project)}
                        className="text-teal-600 font-black uppercase text-[10px] tracking-[0.3em] hover:text-teal-700 flex items-center group/btn"
                      >
                        Explore <ChevronRight className="ml-2 h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6 sm:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDetails}
              className="absolute inset-0 bg-gray-950/95 backdrop-blur-xl"
            ></motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="bg-white w-full max-w-6xl max-h-full rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden relative z-10 flex flex-col md:flex-row border border-white/10"
            >
              <button 
                onClick={closeDetails}
                className="absolute top-8 right-8 z-30 p-4 bg-black/60 hover:bg-black text-white rounded-2xl transition-all backdrop-blur-xl border border-white/10"
              >
                <X className="h-6 w-6" />
              </button>
              
              <div className="w-full md:w-3/5 h-[45vh] md:h-auto overflow-hidden relative group/carousel bg-gray-50">
                <div className="absolute inset-0 flex items-center justify-between px-8 opacity-0 group-hover/carousel:opacity-100 transition-opacity z-20">
                  <button onClick={prevImage} className="p-5 bg-black/70 hover:bg-black text-white rounded-2xl transition-all backdrop-blur-md border border-white/10 shadow-2xl">
                    <ChevronLeft className="h-7 w-7" />
                  </button>
                  <button onClick={nextImage} className="p-5 bg-black/70 hover:bg-black text-white rounded-2xl transition-all backdrop-blur-md border border-white/10 shadow-2xl">
                    <ChevronRight className="h-7 w-7" />
                  </button>
                </div>

                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex space-x-4 z-20">
                  {(selectedProject.images || [selectedProject.imageUrl]).map((_, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`h-2 transition-all duration-500 rounded-full ${currentImageIndex === idx ? 'w-14 bg-teal-500 shadow-lg shadow-teal-500/50' : 'w-5 bg-white/40'}`}
                    ></button>
                  ))}
                </div>

                <motion.img 
                  key={currentImageIndex}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7 }}
                  src={(selectedProject.images || [selectedProject.imageUrl])[currentImageIndex]} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover" 
                />
              </div>

              <div className="w-full md:w-2/5 p-12 md:p-20 overflow-y-auto bg-white flex flex-col justify-center">
                <div className="space-y-10">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4 text-teal-600">
                      <Briefcase className="h-5 w-5" />
                      <span className="text-[10px] font-black uppercase tracking-[0.5em]">{selectedProject.category} Sector</span>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black uppercase text-gray-900 leading-[0.85] tracking-tighter">{selectedProject.title}</h2>
                    <div className={`inline-flex px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-sm ${
                      selectedProject.status === 'Completed' ? 'bg-green-50 text-green-700' : 
                      selectedProject.status === 'In Progress' ? 'bg-teal-50 text-teal-700' : 'bg-blue-50 text-blue-700'
                    }`}>
                      {selectedProject.status} Phase
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-10 py-10 border-y border-gray-100">
                    <div className="flex items-center space-x-5">
                      <div className="bg-teal-50 p-4 rounded-3xl text-teal-600 shadow-sm"><MapPin className="h-7 w-7" /></div>
                      <div>
                        <p className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] mb-1">Region</p>
                        <p className="text-sm font-black text-gray-900 uppercase">{selectedProject.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-5">
                      <div className="bg-teal-50 p-4 rounded-3xl text-teal-600 shadow-sm"><Calendar className="h-7 w-7" /></div>
                      <div>
                        <p className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] mb-1">Timeline</p>
                        <p className="text-sm font-black text-gray-900 uppercase">{selectedProject.year}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div className="flex items-center space-x-4 text-gray-900">
                      <Info className="h-5 w-5 text-teal-500" />
                      <h4 className="font-black uppercase text-xs tracking-[0.3em]">Technical Summary</h4>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed font-medium">
                      {selectedProject.description}
                    </p>
                  </div>

                  <div className="pt-8">
                    <button 
                      onClick={() => {
                        closeDetails();
                        navigate('/contact');
                      }}
                      className="w-full bg-black text-white py-6 rounded-3xl font-black uppercase text-xs tracking-[0.3em] hover:bg-teal-600 transition-all flex items-center justify-center group shadow-2xl shadow-gray-300"
                    >
                      Enquire For Quotation <ArrowRight className="ml-4 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;