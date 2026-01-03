import React from 'react';
import { AlertTriangle, BatteryWarning, EyeOff } from 'lucide-react';

export default function ProblemSection() {
    const problems = [
        {
            icon: <EyeOff size={32} color="var(--primary-teal)" />,
            title: "Silent Work",
            desc: "Employees performed critical tasks outside their official role without visibility."
        },
        {
            icon: <BatteryWarning size={32} color="var(--status-danger)" />,
            title: "Burnout Risk",
            desc: "Misaligned responsibilities lead to 3x higher turnover rates."
        },
        {
            icon: <AlertTriangle size={32} color="var(--status-warning)" />,
            title: "Organizational Debt",
            desc: "Unfair workload distribution creates long-term structural weakness."
        }
    ];

    return (
        <section className="container" style={{ padding: '80px 24px' }}>
            <h2 className="text-center" style={{ marginBottom: '48px', fontSize: '2.5rem' }}>The Hidden Cost of Role Drift</h2>
            <div className="grid-3">
                {problems.map((p, i) => (
                    <div key={i} className="card flex-col" style={{ alignItems: 'flex-start' }}>
                        <div style={{ padding: '12px', background: 'rgba(230, 247, 255, 0.5)', borderRadius: '50%' }}>
                            {p.icon}
                        </div>
                        <h3 style={{ fontSize: '1.25rem' }}>{p.title}</h3>
                        <p style={{ color: 'var(--text-secondary)' }}>{p.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
