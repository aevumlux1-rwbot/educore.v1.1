import { useState } from 'react';
import { User, Bell, Palette, Shield, LogOut } from 'lucide-react';
import { PageContainer } from '@/components/layout/PageContainer';
import { CategoryPill } from '@/components/knowledge/CategoryPill';
import { cn } from '@/lib/utils';

const tabs = ['Profile', 'Notifications', 'Appearance', 'Security'];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('Profile');

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage your account and preferences.</p>
      </div>

      <div className="mb-6 flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
        {tabs.map(t => <CategoryPill key={t} label={t} active={activeTab === t} onClick={() => setActiveTab(t)} />)}
      </div>

      {activeTab === 'Profile' && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 font-heading text-xl font-bold text-primary">JS</div>
              <div>
                <h2 className="font-heading text-lg font-bold text-foreground">John Smith</h2>
                <p className="text-sm text-muted-foreground">Student · Grade 11B</p>
                <p className="text-xs text-muted-foreground">john.smith@example.edu</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
            <h3 className="font-heading text-sm font-semibold text-foreground">Personal Information</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { label: 'Full Name', value: 'John Smith' },
                { label: 'Student ID', value: 'STU-2024-0847' },
                { label: 'Email', value: 'john.smith@example.edu' },
                { label: 'Phone', value: '+1 (555) 012-3456' },
                { label: 'Date of Birth', value: 'March 15, 2008' },
                { label: 'Guardian', value: 'Robert Smith' },
              ].map(f => (
                <div key={f.label}>
                  <label className="text-xs text-muted-foreground">{f.label}</label>
                  <p className="mt-1 rounded-lg border border-border bg-muted/50 px-3 py-2 text-sm text-foreground">{f.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Notifications' && (
        <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
          <h3 className="font-heading text-sm font-semibold text-foreground">Notification Preferences</h3>
          {[
            { label: 'Academic updates', desc: 'New grades, schedule changes, content' },
            { label: 'Financial alerts', desc: 'Payment reminders, receipts, overdue notices' },
            { label: 'Messages', desc: 'New messages from teachers and groups' },
            { label: 'Institutional notices', desc: 'Announcements and events' },
          ].map(n => (
            <div key={n.label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <div>
                <p className="text-sm font-medium text-foreground">{n.label}</p>
                <p className="text-xs text-muted-foreground">{n.desc}</p>
              </div>
              <div className="h-5 w-9 rounded-full bg-primary relative cursor-pointer">
                <div className="absolute right-0.5 top-0.5 h-4 w-4 rounded-full bg-primary-foreground transition-all" />
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'Appearance' && (
        <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
          <h3 className="font-heading text-sm font-semibold text-foreground">Theme</h3>
          <div className="flex gap-3">
            {['Light', 'Dark', 'System'].map(t => (
              <button key={t} className={cn(
                'rounded-xl border px-4 py-3 text-sm font-medium transition-colors',
                t === 'Light' ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-card text-muted-foreground hover:border-primary/20'
              )}>{t}</button>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'Security' && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
            <h3 className="font-heading text-sm font-semibold text-foreground">Password</h3>
            <p className="text-xs text-muted-foreground">Last changed 30 days ago</p>
            <button className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">Change Password</button>
          </div>
          <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6">
            <div className="flex items-center gap-3">
              <LogOut className="h-4 w-4 text-destructive" />
              <div>
                <p className="text-sm font-medium text-foreground">Sign out</p>
                <p className="text-xs text-muted-foreground">Sign out of your account</p>
              </div>
              <button className="ml-auto rounded-xl border border-destructive/30 px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors">Sign Out</button>
            </div>
          </div>
        </div>
      )}
    </PageContainer>
  );
}
