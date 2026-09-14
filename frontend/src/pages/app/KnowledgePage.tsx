import { useState, useEffect } from 'react';
import { Search, BookOpen, FileText, Video, Link2, FolderOpen, ChevronRight, ArrowLeft } from 'lucide-react';
import { PageContainer } from '@/components/layout/PageContainer';
import { SectionHeader } from '@/components/ui/section-header';
import { ContentCard } from '@/components/knowledge/ContentCard';
import { CategoryPill } from '@/components/knowledge/CategoryPill';
import { EmptyState } from '@/components/states/EmptyState';
import { LoadingState } from '@/components/states/LoadingState';
import { cn } from '@/lib/utils';

const categories = ['All', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Computer Science'];

interface Module {
  subject: string;
  topics: Topic[];
  progress: number;
}

interface Topic {
  name: string;
  resources: number;
}

const modules: Module[] = [
  { subject: 'Mathematics II', progress: 78, topics: [
    { name: 'Linear Algebra', resources: 4 }, { name: 'Calculus', resources: 3 }, { name: 'Probability', resources: 2 }, { name: 'Statistics', resources: 2 }, { name: 'Discrete Mathematics', resources: 1 },
  ]},
  { subject: 'Physics', progress: 65, topics: [
    { name: 'Mechanics', resources: 3 }, { name: 'Thermodynamics', resources: 3 }, { name: 'Optics', resources: 2 }, { name: 'Electromagnetism', resources: 3 }, { name: 'Waves', resources: 2 }, { name: 'Quantum Intro', resources: 2 },
  ]},
  { subject: 'Chemistry', progress: 82, topics: [
    { name: 'Organic Chemistry', resources: 3 }, { name: 'Inorganic Chemistry', resources: 2 }, { name: 'Biochemistry', resources: 2 }, { name: 'Analytical Methods', resources: 2 },
  ]},
  { subject: 'Computer Science', progress: 92, topics: [
    { name: 'Data Structures', resources: 4 }, { name: 'Algorithms', resources: 3 }, { name: 'OOP Principles', resources: 2 }, { name: 'Databases', resources: 3 }, { name: 'Web Development', resources: 2 }, { name: 'Networks', resources: 2 }, { name: 'OS Fundamentals', resources: 2 },
  ]},
];

const resources = [
  { title: 'Linear Algebra — Chapter 5 Notes', subject: 'Mathematics II', type: 'document' as const, date: 'Jun 14', author: 'Dr. Maria Smith', module: 'Linear Algebra' },
  { title: 'Newton\'s Laws Explained', subject: 'Physics', type: 'video' as const, date: 'Jun 12', author: 'Prof. Alex John', module: 'Mechanics' },
  { title: 'Organic Chemistry Practice Set', subject: 'Chemistry', type: 'exercise' as const, date: 'Jun 10', author: 'James Lee', module: 'Organic Chemistry' },
  { title: 'Shakespeare: Hamlet Analysis', subject: 'English Literature', type: 'document' as const, date: 'Jun 8', author: 'Sarah Wilson', module: 'Drama' },
  { title: 'Cell Biology Interactive Lab', subject: 'Biology', type: 'link' as const, date: 'Jun 6', author: 'Dr. Rachel Green', module: 'Cell Biology' },
  { title: 'Python Data Structures — Tutorial', subject: 'Computer Science', type: 'video' as const, date: 'Jun 5', author: 'Prof. David Chen', module: 'Data Structures' },
  { title: 'Calculus Problem Set #7', subject: 'Mathematics II', type: 'exercise' as const, date: 'Jun 3', author: 'Dr. Maria Smith', module: 'Calculus' },
  { title: 'Thermodynamics Reference Guide', subject: 'Physics', type: 'document' as const, date: 'Jun 1', author: 'Prof. Alex John', module: 'Thermodynamics' },
  { title: 'Periodic Table — Interactive', subject: 'Chemistry', type: 'link' as const, date: 'May 28', author: 'James Lee', module: 'Inorganic Chemistry' },
];

export default function KnowledgePage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [view, setView] = useState<'resources' | 'modules'>('modules');
  const [expandedModule, setExpandedModule] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<{ subject: string; topic: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(t);
  }, [activeCategory, view]);

  const filtered = resources.filter(r => {
    const matchCat = activeCategory === 'All' || r.subject.toLowerCase().includes(activeCategory.toLowerCase());
    const matchQuery = !query || r.title.toLowerCase().includes(query.toLowerCase()) || r.subject.toLowerCase().includes(query.toLowerCase());
    const matchTopic = !selectedTopic || (r.subject === selectedTopic.subject && r.module === selectedTopic.topic);
    return matchCat && matchQuery && matchTopic;
  });

  const typeStats = {
    documents: resources.filter(r => r.type === 'document').length,
    videos: resources.filter(r => r.type === 'video').length,
    exercises: resources.filter(r => r.type === 'exercise').length,
    links: resources.filter(r => r.type === 'link').length,
  };

  const handleTopicClick = (subject: string, topic: string) => {
    setSelectedTopic({ subject, topic });
    setView('resources');
  };

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Knowledge Space</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {selectedTopic
            ? `${selectedTopic.subject} → ${selectedTopic.topic}`
            : 'Your digital academic environment — subjects, modules, topics, and resources.'}
        </p>
      </div>

      {selectedTopic && (
        <button
          onClick={() => { setSelectedTopic(null); setView('modules'); }}
          className="mb-4 flex items-center gap-1.5 text-xs font-medium text-primary hover:underline transition-colors active:scale-95"
        >
          <ArrowLeft className="h-3 w-3" /> Back to Modules
        </button>
      )}

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search resources, topics, subjects..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border border-border bg-card py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all"
          />
        </div>
      </div>

      {!selectedTopic && (
        <>
          <div className="mb-6 flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
            {categories.map(c => (
              <CategoryPill key={c} label={c} active={activeCategory === c} onClick={() => setActiveCategory(c)} />
            ))}
          </div>

          <div className="mb-6 flex items-center gap-2">
            <button
              onClick={() => setView('modules')}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors active:scale-95 ${view === 'modules' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'}`}
            >
              Subjects & Modules
            </button>
            <button
              onClick={() => setView('resources')}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors active:scale-95 ${view === 'resources' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'}`}
            >
              All Resources
            </button>
          </div>
        </>
      )}

      {loading ? (
        <LoadingState variant={view === 'modules' ? 'list' : 'cards'} cards={view === 'modules' ? 4 : 6} />
      ) : (
        <>
          {view === 'modules' && !selectedTopic && (
            <div className="space-y-3">
              {modules.map(m => {
                const isExpanded = expandedModule === m.subject;
                const totalResources = m.topics.reduce((s, t) => s + t.resources, 0);
                return (
                  <div key={m.subject} className="rounded-2xl border border-border bg-card transition-all hover:shadow-sm">
                    <button
                      onClick={() => setExpandedModule(isExpanded ? null : m.subject)}
                      className="flex w-full items-start gap-3 p-5 text-left active:scale-[0.998]"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                        <FolderOpen className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-heading text-sm font-semibold text-foreground">{m.subject}</h3>
                        <p className="text-xs text-muted-foreground">{m.topics.length} topics · {totalResources} resources</p>
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium text-foreground">{m.progress}%</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                            <div className="h-full rounded-full bg-primary transition-all duration-700" style={{ width: `${m.progress}%` }} />
                          </div>
                        </div>
                      </div>
                      <ChevronRight className={cn('h-4 w-4 text-muted-foreground transition-transform mt-1', isExpanded && 'rotate-90')} />
                    </button>
                    {isExpanded && (
                      <div className="border-t border-border px-5 py-3 space-y-1">
                        {m.topics.map(t => (
                          <button
                            key={t.name}
                            onClick={() => handleTopicClick(m.subject, t.name)}
                            className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left transition-colors hover:bg-muted/50 active:scale-[0.99]"
                          >
                            <div className="flex items-center gap-2.5">
                              <div className="h-1.5 w-1.5 rounded-full bg-primary/50" />
                              <span className="text-sm text-foreground">{t.name}</span>
                            </div>
                            <span className="text-xs text-muted-foreground">{t.resources} resources</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {(view === 'resources' || selectedTopic) && (
            <>
              {!selectedTopic && (
                <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div className="rounded-xl border border-border bg-card p-3 text-center transition-all hover:shadow-sm">
                    <FileText className="mx-auto h-4 w-4 text-info" />
                    <p className="mt-1 font-heading text-lg font-bold text-foreground">{typeStats.documents}</p>
                    <p className="text-[10px] text-muted-foreground">Documents</p>
                  </div>
                  <div className="rounded-xl border border-border bg-card p-3 text-center transition-all hover:shadow-sm">
                    <Video className="mx-auto h-4 w-4 text-destructive" />
                    <p className="mt-1 font-heading text-lg font-bold text-foreground">{typeStats.videos}</p>
                    <p className="text-[10px] text-muted-foreground">Videos</p>
                  </div>
                  <div className="rounded-xl border border-border bg-card p-3 text-center transition-all hover:shadow-sm">
                    <BookOpen className="mx-auto h-4 w-4 text-success" />
                    <p className="mt-1 font-heading text-lg font-bold text-foreground">{typeStats.exercises}</p>
                    <p className="text-[10px] text-muted-foreground">Exercises</p>
                  </div>
                  <div className="rounded-xl border border-border bg-card p-3 text-center transition-all hover:shadow-sm">
                    <Link2 className="mx-auto h-4 w-4 text-warning" />
                    <p className="mt-1 font-heading text-lg font-bold text-foreground">{typeStats.links}</p>
                    <p className="text-[10px] text-muted-foreground">Links</p>
                  </div>
                </div>
              )}

              <SectionHeader
                title={selectedTopic ? `${selectedTopic.topic} Resources` : activeCategory === 'All' ? 'All Resources' : activeCategory}
                subtitle={`${filtered.length} items`}
              />
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((r, i) => <ContentCard key={i} {...r} />)}
              </div>

              {filtered.length === 0 && (
                <EmptyState icon={Search} title="No resources found" description={selectedTopic ? `No resources yet for ${selectedTopic.topic}.` : 'Try adjusting your search or filter.'} />
              )}
            </>
          )}
        </>
      )}
    </PageContainer>
  );
}
