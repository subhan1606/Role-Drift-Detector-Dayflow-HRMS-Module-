import React from 'react';
import { Search, Activity, GitCommit } from 'lucide-react';

export default function HowItWorks() {
    const steps = [
        { icon: <Search />, title: "Analyze", text: "We ingest job descriptions and assigned KPIs." },
        { icon: <Activity />, title: "Observe", text: "We monitor real work signals (Jira, Slack, Email volume)." },
        { icon: <GitCommit />, title: "Compare", text: "Our engine calculates the drift between Expectation vs Reality." }
    ];

    return (
        <section className="container" style={{ padding: '80px 24px', marginBottom: '80px' }}>
            <div className="flex-col text-center" style={{ gap: '48px' }}>
                <h2 style={{ color: 'var(--text-primary)' }}>How It Works</h2>
                <div className="flex-row" style={{ justifyContent: 'center', flexWrap: 'wrap', gap: '40px' }}>
                    {steps.map((s, i) => (
                        <div key={i} className="card flex-col" style={{
                            alignItems: 'center',
                            maxWidth: '300px',
                            flex: 1,
                            border: '1px solid rgba(255,255,255,0.05)',
                            transition: 'transform 0.3s ease'
                        }}>
                            <div style={{
                                width: '64px', height: '64px', background: 'var(--primary-blue)', color: 'white',
                                borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                boxShadow: '0 10px 20px rgba(99, 102, 241, 0.4)'
                            }}>
                                {React.cloneElement(s.icon, { size: 32 })}
                            </div>
                            <h3 style={{ color: 'var(--text-primary)', marginTop: '16px' }}>{s.title}</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>{s.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
