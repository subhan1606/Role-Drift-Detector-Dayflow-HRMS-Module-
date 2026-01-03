import React, { useState } from 'react';
import Hero from './components/Hero';
import ProblemSection from './components/ProblemSection';
import HowItWorks from './components/HowItWorks';
import Dashboard from './components/Dashboard';
import { Layers } from 'lucide-react';

function App() {
  const [view, setView] = useState('landing'); // landing | dashboard

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* Navigation */}
      <nav style={{ background: 'rgba(10, 10, 10, 0.8)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(255,255,255,0.1)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div className="container flex-row justify-between" style={{ height: '70px' }}>
          <div className="flex-row" style={{ cursor: 'pointer' }} onClick={() => setView('landing')}>
            <Layers color="var(--primary-blue)" size={28} />
            <span style={{ fontSize: '1.25rem', fontWeight: '700', letterSpacing: '-0.5px', color: 'var(--text-primary)' }}>
              RoleDrift<span className="text-tea">Detector</span>
            </span>
          </div>
          <div className="flex-row">
            {view === 'landing' ? (
              <>
                <a href="#" style={{ textDecoration: 'none', color: 'var(--text-secondary)' }}>Features</a>
                <a href="#" style={{ textDecoration: 'none', color: 'var(--text-secondary)' }}>Pricing</a>
                <button className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.9rem' }} onClick={() => setView('dashboard')}>
                  Sign In
                </button>
              </>
            ) : (
              <>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginRight: '16px' }}>Admin View</span>
                <div style={{ position: 'relative', marginRight: '16px', cursor: 'pointer' }}>
                  <div style={{ width: '8px', height: '8px', background: 'red', borderRadius: '50%', position: 'absolute', top: 0, right: 0, border: '1px solid #1a1a1a' }}></div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-primary)' }}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
                </div>
                <div style={{ width: '32px', height: '32px', background: 'var(--primary-blue)', borderRadius: '50%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>HR</div>
              </>
            )}
          </div>
        </div>
      </nav>

      <main style={{ flex: 1 }}>
        {view === 'landing' ? (
          <>
            <Hero onViewDashboard={() => setView('dashboard')} onLearnMore={() => document.getElementById('problems').scrollIntoView({ behavior: 'smooth' })} />
            <div id="problems">
              <ProblemSection />
            </div>
            <HowItWorks />

            {/* CTA Section */}
            <section style={{ background: 'var(--primary-blue)', color: 'white', padding: '80px 24px', textAlign: 'center' }}>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '24px' }}>Ready to optimize your workforce?</h2>
              <button className="btn" style={{ background: 'white', color: 'var(--primary-blue)' }} onClick={() => setView('dashboard')}>
                Get Started Free
              </button>
            </section>
          </>
        ) : (
          <Dashboard />
        )}
      </main>

      <footer style={{ background: 'var(--bg-body)', padding: '40px 0', borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: 'auto' }}>
        <div className="container text-center" style={{ color: 'var(--text-tertiary)' }}>
          <p>© 2024 Role Drift Detector. Enterprise HR Analytics.</p>
          <p style={{ marginTop: '10px', fontSize: '0.9rem' }}>
            Team:
            <a href="https://github.com/rudrapatel3436-rgb" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none', marginLeft: '5px' }}>Rudra Patel</a>,
            <a href="https://github.com/subhan1606" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none', marginLeft: '5px' }}>Subhan Khalifa</a>
          </p>
        </div>
      </footer>

    </div>
  );
}

export default App;
