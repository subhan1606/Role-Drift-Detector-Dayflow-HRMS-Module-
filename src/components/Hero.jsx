import React from 'react';
import { ArrowRight, BarChart2 } from 'lucide-react';

export default function Hero({ onViewDashboard, onLearnMore }) {
  return (
    <section className="container flex-col" style={{ padding: '80px 24px', alignItems: 'center', textAlign: 'center' }}>
      <div className="animate-fade-in">
        <span style={{
          background: 'rgba(0, 179, 161, 0.1)',
          color: 'var(--primary-teal)',
          padding: '6px 12px',
          borderRadius: '20px',
          fontSize: '0.9rem',
          fontWeight: '600'
        }}>
          New HR Analytics Module
        </span>
        <h1 style={{ fontSize: '3.5rem', lineHeight: '1.2', margin: '24px 0 16px', maxWidth: '800px' }}>
          Detect <span className="text-blue">Role Drift</span> Before It Turns Into Burnout.
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 32px' }}>
          Align assigned jobs with actual work signals. Identify hidden organizational risks early using our AI-driven continuous monitoring.
        </p>

        <div className="flex-row" style={{ justifyContent: 'center' }}>
          <button onClick={onViewDashboard} className="btn btn-primary">
            View Dashboard <BarChart2 size={20} />
          </button>
          <button onClick={onLearnMore} className="btn btn-secondary">
            How It Works <ArrowRight size={20} />
          </button>
        </div>
      </div>

      {/* Live Signal Processing Visual */}
      <div className="animate-fade-in" style={{
        marginTop: '60px',
        width: '100%',
        maxWidth: '1000px',
        height: '400px',
        background: 'rgba(30, 30, 30, 0.5)', /* Dark glass */
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '24px',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '40px', background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', padding: '0 20px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#EF4444', marginRight: '8px' }}></div>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#F59E0B', marginRight: '8px' }}></div>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981' }}></div>
          <div style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>Live Monitoring Active</div>
        </div>

        <div style={{ position: 'relative', width: '100%', maxWidth: '600px', height: '200px' }}>
          {/* Animated Signal Elements */}
          <div className="signal-card" style={{ position: 'absolute', top: '20px', left: '0', animationDelay: '0s' }}>
            <span style={{ color: '#60A5FA' }}>● Jira</span> Ticket #492: "Frontend Refactor" <span style={{ color: '#34D399', marginLeft: '10px' }}>Aligned</span>
          </div>
          <div className="signal-card" style={{ position: 'absolute', top: '70px', right: '20px', animationDelay: '1.5s' }}>
            <span style={{ color: '#F472B6' }}>● Slack</span> Channel #sales-leads <span style={{ color: '#F87171', marginLeft: '10px' }}>Drift Detected</span>
          </div>
          <div className="signal-card" style={{ position: 'absolute', top: '120px', left: '40px', animationDelay: '3s' }}>
            <span style={{ color: '#A78BFA' }}>● Cal</span> Meeting: "Client Strategy" <span style={{ color: '#FBBF24', marginLeft: '10px' }}>Review</span>
          </div>
        </div>

        <style>
          {`
            .signal-card {
                background: rgba(255,255,255,0.03);
                border: 1px solid rgba(255,255,255,0.1);
                color: var(--text-secondary);
                padding: 12px 20px;
                border-radius: 12px;
                font-size: 0.9rem;
                display: flex;
                align-items: center;
                animation: floatUp 6s infinite ease-in-out;
                opacity: 0;
            }
            @keyframes floatUp {
                0% { transform: translateY(20px); opacity: 0; }
                20% { opacity: 1; }
                80% { opacity: 1; }
                100% { transform: translateY(-20px); opacity: 0; }
            }
            `}
        </style>
      </div>
    </section>
  );
}
