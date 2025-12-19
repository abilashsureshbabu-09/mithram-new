import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  MessageSquare, 
  Settings, 
  Plus, 
  TrendingUp, 
  Users, 
  CheckCircle,
  MoreVertical,
  Edit,
  Trash2,
  Sparkles,
  Lock,
  ArrowRight,
  LogOut,
  X,
  AlertTriangle
} from 'lucide-react';
import { Project, ProjectCategory } from '../types';
import { INITIAL_PROJECTS } from '../constants';
import { generateProjectSummary } from '../services/geminiService';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  
  const [activeTab, setActiveTab] = useState<'dashboard' | 'projects' | 'messages'>('dashboard');
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  
  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: '',
    category: ProjectCategory.RESIDENTIAL,
    location: '',
    year: new Date().getFullYear(),
    status: 'Planned',
    description: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'Admin@Mithram') {
      setIsAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-gray-900 flex items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-teal-600"></div>
        <div className="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 relative z-10">
          <div className="p-10">
            <div className="flex justify-center mb-8">
              <div className="bg-teal-600 p-4 rounded-2xl shadow-lg">
                <Lock className="h-8 w-8 text-white" />
              </div>
            </div>
            
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold uppercase text-gray-900 tracking-tight">Admin Portal</h2>
              <p className="text-gray-500 text-sm mt-2 uppercase tracking-widest font-bold">Authorized Access Only</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Security Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (loginError) setLoginError(false);
                  }}
                  className={`w-full bg-gray-50 border-2 rounded-lg px-4 py-4 text-center text-lg tracking-widest focus:ring-0 transition-colors ${
                    loginError ? 'border-red-500 focus:border-red-500' : 'border-gray-100 focus:border-teal-500'
                  }`}
                  placeholder="••••••••"
                  autoFocus
                />
                {loginError && (
                  <p className="text-red-500 text-[10px] font-bold uppercase text-center mt-2 animate-bounce">
                    Invalid Credentials. Please try again.
                  </p>
                )}
              </div>

              <button 
                type="submit"
                className="w-full bg-gray-900 hover:bg-teal-600 text-white font-bold uppercase py-4 rounded-lg transition-all flex items-center justify-center space-x-2 group shadow-xl active:scale-[0.98]"
              >
                <span>Access Dashboard</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  const chartData = [
    { name: 'Jan', value: 4 },
    { name: 'Feb', value: 3 },
    { name: 'Mar', value: 6 },
    { name: 'Apr', value: 8 },
    { name: 'May', value: 7 },
    { name: 'Jun', value: 12 },
  ];

  const handleMagicWrite = async () => {
    if (!newProject.title) return;
    setIsGenerating(true);
    const summary = await generateProjectSummary(newProject.title, newProject.category || 'Construction');
    setNewProject({ ...newProject, description: summary });
    setIsGenerating(false);
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    const project: Project = {
      ...newProject as Project,
      id: Math.random().toString(36).substr(2, 9),
      imageUrl: `https://picsum.photos/seed/${newProject.title}/800/600`,
      images: [`https://picsum.photos/seed/${newProject.title}1/800/600`]
    };
    setProjects([project, ...projects]);
    setIsAddingProject(false);
    setNewProject({ title: '', category: ProjectCategory.RESIDENTIAL, location: '', year: new Date().getFullYear(), status: 'Planned', description: '' });
  };

  const confirmDelete = () => {
    if (projectToDelete) {
      setProjects(projects.filter(p => p.id !== projectToDelete.id));
      setProjectToDelete(null);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-100 flex">
      {/* Delete Confirmation Modal */}
      {projectToDelete && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 backdrop-blur-sm bg-black/50 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-xl shadow-2xl p-8 space-y-6 animate-in zoom-in-95 duration-200">
            <div className="flex items-center space-x-4">
              <div className="bg-red-100 p-3 rounded-full text-red-600">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold uppercase text-gray-900 leading-none">Confirm Deletion</h3>
              </div>
            </div>
            <p className="text-gray-600 text-sm">
              Are you sure you want to delete <span className="font-bold text-gray-900">"{projectToDelete.title}"</span>?
            </p>
            <div className="flex space-x-3 pt-2">
              <button 
                onClick={confirmDelete}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold uppercase text-xs py-3 rounded-lg transition-colors"
              >
                Yes, Delete
              </button>
              <button 
                onClick={() => setProjectToDelete(null)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold uppercase text-xs py-3 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-800">
          <p className="text-xs font-bold uppercase tracking-widest text-teal-500">Mithram Elite Admin</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-semibold uppercase tracking-wider transition-all ${
              activeTab === 'dashboard' ? 'bg-teal-600 text-white shadow-lg' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <LayoutDashboard className="h-5 w-5" />
            <span>Dashboard</span>
          </button>
          <button 
            onClick={() => setActiveTab('projects')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-semibold uppercase tracking-wider transition-all ${
              activeTab === 'projects' ? 'bg-teal-600 text-white shadow-lg' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <Briefcase className="h-5 w-5" />
            <span>Projects</span>
          </button>
          <button 
            onClick={() => setActiveTab('messages')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-semibold uppercase tracking-wider transition-all ${
              activeTab === 'messages' ? 'bg-teal-600 text-white shadow-lg' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <MessageSquare className="h-5 w-5" />
            <span>Messages</span>
          </button>
          
          <div className="pt-8 px-4 border-t border-gray-800 mt-4">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 text-red-400 hover:text-red-300 text-xs uppercase font-bold tracking-widest px-4 py-2 hover:bg-red-900/20 rounded-lg transition-colors mt-2"
            >
              <LogOut className="h-4 w-4" />
              <span>Log Out</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5">
            <h2 className="text-3xl font-bold uppercase">Enterprise Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: 'Total Revenue', value: '₹4.2 Cr', icon: <TrendingUp className="text-green-500" /> },
                { label: 'Active Projects', value: projects.filter(p => p.status !== 'Completed').length, icon: <Briefcase className="text-teal-500" /> },
                { label: 'Pending Enquiries', value: '18', icon: <MessageSquare className="text-blue-500" /> },
                { label: 'Workers On-site', value: '142', icon: <Users className="text-purple-500" /> }
              ].map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="p-2 bg-gray-50 rounded-lg mb-4">{stat.icon}</div>
                  <h4 className="text-gray-500 text-xs font-bold uppercase tracking-widest">{stat.label}</h4>
                  <p className="text-2xl font-bold mt-1 uppercase">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold uppercase mb-6">Client Enquiries Trend</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                    <Bar dataKey="value" fill="#0d9488" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold uppercase">Project Management</h2>
              <button 
                onClick={() => setIsAddingProject(true)}
                className="bg-gray-900 text-white px-6 py-2 rounded-lg font-bold uppercase text-xs tracking-widest flex items-center space-x-2 hover:bg-teal-600 transition-all shadow-md active:scale-95"
              >
                <Plus className="h-4 w-4" />
                <span>New Project</span>
              </button>
            </div>

            {isAddingProject && (
              <div className="bg-white p-8 rounded-xl shadow-xl border-2 border-teal-500 animate-in zoom-in-95">
                <h3 className="text-xl font-bold uppercase mb-6">Add New Venture</h3>
                <form onSubmit={handleAddProject} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase text-gray-500">Project Title</label>
                    <input 
                      required
                      type="text" 
                      className="w-full bg-gray-50 border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-teal-500"
                      value={newProject.title}
                      onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase text-gray-500">Category</label>
                    <select 
                      className="w-full bg-gray-50 border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-teal-500"
                      value={newProject.category}
                      onChange={(e) => setNewProject({...newProject, category: e.target.value as ProjectCategory})}
                    >
                      {Object.values(ProjectCategory).map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <textarea 
                      required
                      placeholder="Description"
                      rows={4}
                      className="w-full bg-gray-50 border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-teal-500"
                      value={newProject.description}
                      onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                    ></textarea>
                  </div>
                  <div className="flex space-x-4 pt-4">
                    <button type="submit" className="bg-teal-600 text-white px-8 py-3 rounded-lg font-bold uppercase text-xs shadow-lg active:scale-95">Save Project</button>
                    <button type="button" onClick={() => setIsAddingProject(false)} className="bg-gray-100 text-gray-600 px-8 py-3 rounded-lg font-bold uppercase text-xs">Cancel</button>
                  </div>
                </form>
              </div>
            )}

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-[10px] font-bold uppercase text-gray-500 tracking-widest">
                  <tr>
                    <th className="px-6 py-4">Project</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {projects.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-bold text-gray-900 uppercase text-xs">{p.title}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                          p.status === 'Completed' ? 'bg-green-100 text-green-700' : 
                          p.status === 'In Progress' ? 'bg-teal-100 text-teal-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end space-x-2">
                          <button onClick={() => setProjectToDelete(p)} className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;