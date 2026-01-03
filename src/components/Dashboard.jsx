import React, { useState } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { Users, AlertOctagon, TrendingUp, ChevronRight, User, Filter } from 'lucide-react';

/* Mock Data */
const driftData = [
    { name: 'Engineering', aligned: 40, drift: 10, risk: 5 },
    { name: 'Product', aligned: 20, drift: 8, risk: 2 },
    { name: 'Sales', aligned: 30, drift: 15, risk: 8 },
    { name: 'HR', aligned: 15, drift: 5, risk: 1 },
];

const employees = [
    { id: 1, name: "Alice Johnson", role: "Frontend Dev", dept: "Engineering", driftScore: 12, status: "Aligned", history: [10, 12, 11, 12, 12] },
    { id: 2, name: "Bob Smith", role: "Product Manager", dept: "Product", driftScore: 45, status: "Moderate", history: [20, 25, 30, 40, 45] },
    { id: 3, name: "Charlie Davis", role: "Sales Lead", dept: "Sales", driftScore: 82, status: "High Risk", history: [40, 55, 65, 75, 82] },
    { id: 4, name: "Diana Prince", role: "DevOps", dept: "Engineering", driftScore: 65, status: "High Risk", history: [30, 45, 50, 60, 65] },
    { id: 5, name: "Evan Wright", role: "Designer", dept: "Product", driftScore: 24, status: "Aligned", history: [20, 22, 21, 23, 24] },
    { id: 6, name: "Fiona Gallagher", role: "HR BP", dept: "HR", driftScore: 5, status: "Aligned", history: [2, 3, 4, 5, 5] },
];

const driftDefinition = {
    title: "Understanding Role Drift",
    description: "Role Drift occurs when an employee's actual day-to-day responsibilities diverge significantly from their official job description. This metric helps identify hidden talent, burnout risks, or the need for role restructuring.",
    levels: [
        { label: "Aligned (0-25%)", desc: "Duties match the job description well." },
        { label: "Moderate (26-60%)", desc: "Noticeable divergence. Worth discussing." },
        { label: "High Risk (>60%)", desc: "Significant mismatch. Immediate review needed." }
    ]
};

const departments = ["All", "Engineering", "Product", "Sales", "HR"];

export default function Dashboard() {
    const [selectedEmp, setSelectedEmp] = useState(null);
    const [filterDept, setFilterDept] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);
    const [employeeData, setEmployees] = useState(employees); // Use state for employees now

    const [newEmp, setNewEmp] = useState({ name: '', role: '', dept: 'Engineering' });

    const handleAddEmployee = (e) => {
        e.preventDefault();
        const id = employeeData.length + 1;
        // Mock drift calculation
        const randomDrift = Math.floor(Math.random() * 90) + 5;
        const status = randomDrift < 25 ? "Aligned" : randomDrift < 60 ? "Moderate" : "High Risk";

        const addedEmp = {
            id,
            ...newEmp,
            driftScore: randomDrift,
            status,
            history: [randomDrift - 5, randomDrift - 2, randomDrift, randomDrift, randomDrift] // Mock history
        };

        setEmployees([...employeeData, addedEmp]);
        setShowAddModal(false);
        setNewEmp({ name: '', role: '', dept: 'Engineering' });
        // Auto select the new employee to show details immediately
        setSelectedEmp(addedEmp);
    };

    const filteredEmployees = employeeData.filter(e => {
        const matchDept = filterDept === "All" || e.dept === filterDept;
        const matchSearch = e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            e.role.toLowerCase().includes(searchTerm.toLowerCase());
        return matchDept && matchSearch;
    });

    const exportToCSV = () => {
        const headers = ["ID,Name,Role,Department,Drift Score,Status"];
        const rows = filteredEmployees.map(e =>
            `${e.id},"${e.name}","${e.role}","${e.dept}",${e.driftScore},${e.status}`
        );
        const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "role_drift_report.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const [sortConfig, setSortConfig] = useState({ key: 'driftScore', direction: 'desc' });

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedEmployees = [...filteredEmployees].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
    });

    const SortIcon = ({ column }) => {
        if (sortConfig.key !== column) return <span style={{ opacity: 0.3, marginLeft: '4px' }}>↕</span>;
        return <span style={{ marginLeft: '4px' }}>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>;
    };

    const stats = {
        total: filteredEmployees.length,
        drift: filteredEmployees.filter(e => e.status !== "Aligned").length,
        risk: filteredEmployees.filter(e => e.status === "High Risk").length
    };

    return (
        <div className="container animate-fade-in" style={{ padding: '40px 24px' }}>

            {/* Header */}
            <div className="flex-row justify-between" style={{ marginBottom: '32px' }}>
                <div>
                    <h2 style={{ fontSize: '2rem' }}>Role Drift Overview</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>Monitoring {stats.total} employees {filterDept !== 'All' ? `in ${filterDept}` : 'across organization'}.</p>
                </div>
                <div className="flex-row">
                    <div className="flex-row" style={{ background: 'rgba(255,255,255,0.05)', padding: '8px 16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', marginRight: '16px' }}>
                        <Filter size={18} color="var(--text-secondary)" style={{ marginRight: '8px' }} />
                        <input
                            type="text"
                            placeholder="Search employees..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ border: 'none', background: 'transparent', fontSize: '1rem', outline: 'none', width: '150px', color: 'var(--text-primary)' }}
                        />
                        <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.1)', margin: '0 12px' }}></div>
                        <select
                            value={filterDept}
                            onChange={(e) => setFilterDept(e.target.value)}
                            style={{ border: 'none', background: 'transparent', fontSize: '1rem', outline: 'none', cursor: 'pointer', color: 'var(--text-primary)' }}
                        >
                            {departments.map(d => <option key={d} value={d} style={{ background: 'var(--surface-white)', color: 'var(--text-primary)' }}>{d}</option>)}
                        </select>
                    </div>
                    <button className="btn btn-secondary" onClick={exportToCSV}>Export CSV</button>
                    <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>+ Add Employee</button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid-3" style={{ marginBottom: '32px' }}>
                <StatsCard label="Employees Monitored" value={stats.total} icon={<Users />} color="blue" />
                <StatsCard label="Drift Detected" value={stats.drift} icon={<TrendingUp />} color="warning" />
                <StatsCard label="High Risk Alerts" value={stats.risk} icon={<AlertOctagon />} color="danger" />
            </div>

            {/* Drift Definition Banner - Collapsible or always visible */}
            <div className="card" style={{ marginBottom: '32px', borderLeft: '4px solid var(--primary-blue)' }}>
                <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: '300px' }}>
                        <h4 style={{ color: 'var(--primary-blue)', marginBottom: '8px' }}>{driftDefinition.title}</h4>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{driftDefinition.description}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                        {driftDefinition.levels.map((level, idx) => (
                            <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', minWidth: '180px' }}>
                                <div style={{ fontWeight: '600', fontSize: '0.9rem', color: idx === 0 ? 'var(--status-drift-low)' : idx === 1 ? 'var(--status-warning)' : 'var(--status-drift-high)' }}>
                                    {level.label}
                                </div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', marginTop: '4px' }}>{level.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Charts */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '32px' }}>
                <div className="card">
                    <h3>Drift Distribution by Team</h3>
                    <div style={{ height: '300px', marginTop: '16px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={driftData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip cursor={{ fill: 'transparent' }} />
                                <Bar dataKey="aligned" stackId="a" fill="var(--status-drift-low)" radius={[0, 0, 4, 4]} />
                                <Bar dataKey="drift" stackId="a" fill="var(--status-warning)" />
                                <Bar dataKey="risk" stackId="a" fill="var(--status-drift-high)" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="card">
                    <h3>Overall Health</h3>
                    <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie data={[
                                    { name: 'Aligned', value: 104 },
                                    { name: 'Drift', value: 26 },
                                    { name: 'Risk', value: 12 }
                                ]} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                                    <Cell fill="var(--status-drift-low)" />
                                    <Cell fill="var(--status-warning)" />
                                    <Cell fill="var(--status-drift-high)" />
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex-row justify-between" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        <span>Low Risk</span>
                        <span>Moderate</span>
                        <span>Critical</span>
                    </div>
                </div>
            </div>

            {/* Employee List & Detail Split */}
            <div style={{ display: 'grid', gridTemplateColumns: selectedEmp ? '1fr 1fr' : '1fr', gap: '24px', transition: 'all 0.3s' }}>

                {/* List */}
                <div className="card">
                    <h3>Employee Signals</h3>
                    <div style={{ marginTop: '16px', overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid #eee', textAlign: 'left', color: 'var(--text-tertiary)', cursor: 'pointer' }}>
                                    <th style={{ padding: '12px' }} onClick={() => handleSort('name')}>Name <SortIcon column="name" /></th>
                                    <th style={{ padding: '12px' }} onClick={() => handleSort('role')}>Role <SortIcon column="role" /></th>
                                    <th style={{ padding: '12px' }} onClick={() => handleSort('driftScore')}>Drift Score <SortIcon column="driftScore" /></th>
                                    <th style={{ padding: '12px' }}>Status</th>
                                    <th style={{ padding: '12px' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedEmployees.length > 0 ? (
                                    sortedEmployees.map(emp => (
                                        <tr key={emp.id} className="row-hover-effect" style={{ borderBottom: '1px solid #f9f9f9', cursor: 'pointer', background: selectedEmp?.id === emp.id ? 'var(--secondary-bg)' : 'transparent', transition: 'all 0.2s' }} onClick={() => setSelectedEmp(emp)}>
                                            <td style={{ padding: '12px', fontWeight: '500' }}>{emp.name}</td>
                                            <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>{emp.role}</td>
                                            <td style={{ padding: '12px' }}>
                                                <div style={{ width: '100%', background: '#eee', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
                                                    <div style={{
                                                        width: `${emp.driftScore}%`,
                                                        height: '100%',
                                                        background: getStatusColor(emp.driftScore)
                                                    }} />
                                                </div>
                                            </td>
                                            <td style={{ padding: '12px' }}>
                                                <span style={{
                                                    color: getStatusColor(emp.driftScore),
                                                    background: getStatusBg(emp.driftScore),
                                                    padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: '600'
                                                }}>
                                                    {emp.status}
                                                </span>
                                            </td>
                                            <td style={{ padding: '12px' }}>
                                                <button
                                                    className="btn btn-secondary btn-sm btn-animated"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedEmp(emp);
                                                    }}
                                                >
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                                            No employees found matching your criteria.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Details Panel */}
                {selectedEmp && (
                    <div className="card animate-fade-in" style={{ border: '2px solid var(--primary-blue)' }}>
                        <div className="flex-row justify-between" style={{ marginBottom: '24px' }}>
                            <div className="flex-row">
                                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <User />
                                </div>
                                <div>
                                    <h3>{selectedEmp.name}</h3>
                                    <p style={{ color: 'var(--text-secondary)' }}>{selectedEmp.role}</p>
                                </div>
                            </div>
                            <button onClick={() => setSelectedEmp(null)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
                        </div>

                        <div style={{ marginBottom: '24px' }}>
                            <h4 style={{ marginBottom: '8px' }}>Drift Trend (Last 5 Months)</h4>
                            <div style={{ height: '150px', marginLeft: '-20px' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={selectedEmp.history.map((val, i) => ({ month: i, score: val }))}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="month" hide />
                                        <YAxis hide domain={[0, 100]} />
                                        <Tooltip />
                                        <Line type="monotone" dataKey="score" stroke={getStatusColor(selectedEmp.driftScore)} strokeWidth={3} dot={{ r: 4 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="flex-row justify-between" style={{ alignItems: 'flex-end', marginTop: '16px' }}>
                                <div>
                                    <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Current Score</span>
                                    <div style={{ fontSize: '3rem', fontWeight: '700', color: getStatusColor(selectedEmp.driftScore), lineHeight: 1 }}>
                                        {selectedEmp.driftScore}
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Drift Status</span>
                                    <div style={{ fontWeight: '600' }}>{selectedEmp.status}</div>
                                </div>
                            </div>
                        </div>

                        <div style={{ marginBottom: '24px' }}>
                            <h4 style={{ marginBottom: '8px' }}>Drift Analysis</h4>
                            <p style={{ color: 'var(--text-secondary)' }}>
                                Detected high volume of tasks in <strong>{selectedEmp.dept === 'Sales' ? 'Account Management' : 'Project Management'}</strong> not present in original Job Description.
                                <br /><br />
                                <em>Why this matters:</em> A drift score of <strong>{selectedEmp.driftScore}</strong> indicates that approximately {selectedEmp.driftScore}% of their daily tasks do not align with their expected role responsibilities.
                            </p>
                        </div>

                        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <h4 style={{ marginBottom: '12px' }}>Recommendations</h4>
                            <ul style={{ paddingLeft: '20px', lineHeight: '1.6' }}>
                                <li>Review Job Description for update.</li>
                                <li>Schedule 1:1 to discuss workload balance.</li>
                                {selectedEmp.driftScore > 50 && <li style={{ color: 'var(--status-danger)' }}>Immediate Burnout Risk Assessment required.</li>}
                            </ul>
                        </div>

                        <div className="flex-row" style={{ marginTop: '24px' }}>
                            <button className="btn btn-primary" style={{ width: '100%' }}>Action Review</button>
                        </div>
                    </div>
                )}

            </div>
            {/* Add Employee Modal */}
            {showAddModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
                }}>
                    <div className="card animate-fade-in" style={{ width: '400px', maxWidth: '90%' }}>
                        <div className="flex-row justify-between" style={{ marginBottom: '24px' }}>
                            <h3>Add New Employee</h3>
                            <button onClick={() => setShowAddModal(false)} style={{ border: 'none', background: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
                        </div>
                        <form onSubmit={handleAddEmployee}>
                            <div className="flex-col" style={{ gap: '16px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: '500' }}>Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'var(--text-primary)' }}
                                        value={newEmp.name}
                                        onChange={e => setNewEmp({ ...newEmp, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: '500' }}>Role Title</label>
                                    <input
                                        type="text"
                                        required
                                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'var(--text-primary)' }}
                                        value={newEmp.role}
                                        onChange={e => setNewEmp({ ...newEmp, role: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: '500' }}>Department</label>
                                    <select
                                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'var(--text-primary)' }}
                                        value={newEmp.dept}
                                        onChange={e => setNewEmp({ ...newEmp, dept: e.target.value })}
                                    >
                                        {departments.filter(d => d !== 'All').map(d => <option key={d} value={d} style={{ background: 'var(--surface-white)', color: 'var(--text-primary)' }}>{d}</option>)}
                                    </select>
                                </div>

                                <div style={{ background: 'rgba(79, 70, 229, 0.1)', padding: '12px', borderRadius: '8px', marginTop: '8px', border: '1px solid rgba(79, 70, 229, 0.2)' }}>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--primary-blue)' }}>
                                        ℹ️ Drift Score will be calculated automatically based on initial role signals.
                                    </p>
                                </div>

                                <button type="submit" className="btn btn-primary" style={{ marginTop: '16px', width: '100%' }}>
                                    Add & Analyze Drift
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

function StatsCard({ label, value, icon, color }) {
    const colorMap = {
        blue: 'var(--primary-blue)',
        warning: 'var(--status-warning)',
        danger: 'var(--status-drift-high)'
    };
    return (
        <div className="card flex-row justify-between">
            <div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{label}</p>
                <h3 style={{ fontSize: '2rem' }}>{value}</h3>
            </div>
            <div style={{ padding: '12px', background: 'rgba(0,0,0,0.03)', borderRadius: '12px', color: colorMap[color] }}>
                {icon}
            </div>
        </div>
    )
}

function getStatusColor(score) {
    if (score < 25) return 'var(--status-drift-low)';
    if (score < 60) return 'var(--status-warning)';
    return 'var(--status-drift-high)';
}

function getStatusBg(score) {
    if (score < 25) return 'rgba(66, 190, 101, 0.1)';
    if (score < 60) return 'rgba(241, 194, 27, 0.1)';
    return 'rgba(250, 77, 86, 0.1)';
}
