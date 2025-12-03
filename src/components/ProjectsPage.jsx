import React from 'react';
import { useInView } from 'react-intersection-observer';
import { SimpleSpotlightCard, SimpleProjectImage, Icon } from './UI';
import { PlusCircle, Edit, Trash2, ArrowUpRight } from 'lucide-react';
import { projectDefaults } from '../content'; 

const ProjectsPage = React.memo(({ t, lang, projects, isAdmin, handleEditProject, handleDeleteProject }) => {
    const { ref: sectionRef, inView } = useInView({ threshold: 0.3, triggerOnce: true }); 
    const shouldAnimate = inView;
    const finalProjects = projects.length > 0 ? projects : t.projects.list.map(dt => ({ ...dt, ...projectDefaults[dt.id] }));

    return (
        <section id="projects" className="relative w-full min-h-screen flex flex-col justify-center items-center py-20">
            <div className="absolute inset-0 bg-black/40 z-0 pointer-events-none"></div>
            <div className="text-center mb-16 relative z-20 px-4">
                <h3 className="text-4xl font-bold mb-4 text-white animate-fade-up"> 
                    <span key={`${lang}-proj-title`}>{t.projects.title}</span> <span className="text-teal-400"> {t.projects.subtitle}</span>
                </h3>
                <p key={`${lang}-proj-desc`} className="text-gray-400 text-lg font-light max-w-2xl mx-auto animate-fade-up delay-100"> 
                    {t.projects.desc}
                </p>
                {isAdmin && (<button onClick={() => handleEditProject(null)} className="mt-4 flex items-center mx-auto text-teal-400 hover:text-teal-300 transition-colors text-sm font-medium"><PlusCircle className="w-4 h-4 mr-1" /> TAMBAH PROYEK BARU</button>)}
            </div>
            
            <div className="max-w-7xl mx-auto px-4 w-full relative z-20" ref={sectionRef}> 
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {finalProjects.map((project, index) => {
                        // Tentukan apakah kartu ini punya link
                        const hasLink = project.link && project.link !== '#';
                        // Tentukan tag pembungkus (a jika ada link, div jika tidak)
                        const Wrapper = hasLink ? 'a' : 'div';
                        const wrapperProps = hasLink ? { href: project.link, target: "_blank", rel: "noopener noreferrer" } : {};

                        return (
                            <div key={project.id} className={`transition-all duration-500 ease-out transform ${shouldAnimate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: shouldAnimate ? `${index * 150}ms` : '0s' }}>
                                {/* WRAPPER YANG BISA DIKLIK */}
                                <Wrapper {...wrapperProps} className="block h-full group cursor-pointer">
                                    <SimpleSpotlightCard spotlightColor="teal" className="h-full flex flex-col">
                                        
                                        {/* TOMBOL ADMIN (EDIT/DELETE) */}
                                        {/* Kita stop propagasi agar klik tidak tembus ke link */}
                                        {isAdmin && (
                                            <div className="absolute top-4 right-4 z-20 flex space-x-2">
                                                <button 
                                                    onClick={(e) => { 
                                                        e.preventDefault(); // Jangan buka link
                                                        e.stopPropagation(); // Jangan tembus ke card
                                                        handleEditProject(project); 
                                                    }} 
                                                    className="p-2 bg-teal-500/30 text-teal-100 rounded-full hover:bg-teal-500/50 transition-colors shadow-lg"
                                                >
                                                    <Edit className="w-5 h-5" />
                                                </button>
                                                <button 
                                                    onClick={(e) => { 
                                                        e.preventDefault(); 
                                                        e.stopPropagation(); 
                                                        handleDeleteProject(project); 
                                                    }} 
                                                    className="p-2 bg-red-500/30 text-red-100 rounded-full hover:bg-red-500/50 transition-colors shadow-lg"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        )}

                                        <div className="relative w-full h-48 overflow-hidden border-b border-white/5">
                                            <SimpleProjectImage src={project.img} alt={project.title} />
                                            <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors pointer-events-none"></div>
                                        </div>
                                        <div className="p-6 flex flex-col flex-grow">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400"><Icon name={project.icon || 'globe'} className="w-5 h-5" /></div>
                                                <h4 className="text-xl font-bold text-gray-100 group-hover:text-teal-400 transition-colors line-clamp-1">{project.title}</h4>
                                            </div>
                                            <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">{project.desc}</p>
                                            <div className="flex flex-wrap gap-2 mb-6">{(project.tech || '').split(', ').map((tag, i) => (<span key={i} className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#0f172a] text-gray-300 border border-white/5">{tag}</span>))}</div>
                                            
                                            {/* TEXT VIEW DETAIL */}
                                            <div className="flex items-center text-sm font-medium text-teal-400 mt-auto pt-4 border-t border-white/5 group-hover:text-teal-300 transition-colors">
                                                <span key={`${lang}-view-btn`}>{t.projects.btnAll.includes('All') ? 'View Detail' : 'Lihat Detail'}</span> 
                                                <ArrowUpRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                            </div>
                                        </div>
                                    </SimpleSpotlightCard>
                                </Wrapper>
                            </div>
                        );
                    })}
                </div>
                
                <div className="mt-16 text-center">
                    {/* Tombol Lihat Semua (Ini biasanya ke GitHub atau Page Lain) */}
                    <button className="px-8 py-3 rounded-full border border-gray-700 text-gray-300 hover:bg-teal-500/10 hover:text-teal-400 hover:border-teal-500/50 transition-all duration-300">
                        <span key={`${lang}-view-all`} className="animate-fade-up">{t.projects.btnAll}</span>
                    </button>
                </div>
            </div>
        </section>
    );
});
export default ProjectsPage;