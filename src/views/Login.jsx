import React, { useState } from 'react';
import { useRole } from '../context/RoleContext';
import '../index.css';

const CREDENTIALS = {
    user: { username: 'user', password: 'user123' },
    admin: { username: 'admin', password: 'admin123' },
};

function Login() {
    const { login } = useRole();
    const [activeTab, setActiveTab] = useState('user'); // 'user' | 'admin'
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        const creds = CREDENTIALS[activeTab];

        if (username === creds.username && password === creds.password) {
            setLoading(true);
            setTimeout(() => {
                login(activeTab);
                setLoading(false);
            }, 900);
        } else {
            setError('Invalid username or password. Please try again.');
        }
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setUsername('');
        setPassword('');
        setError('');
    };

    const fillDemo = () => {
        const creds = CREDENTIALS[activeTab];
        setUsername(creds.username);
        setPassword(creds.password);
        setError('');
    };

    return (
        <div className="login-page">
            {/* Background orbs */}
            <div className="login-orb login-orb-1" />
            <div className="login-orb login-orb-2" />
            <div className="login-orb login-orb-3" />

            <div className="login-card">
                {/* Logo */}
                <div className="login-logo">
                    <span className="login-logo-icon">⚡</span>
                    <span className="login-logo-text">PulseAnalytics</span>
                </div>

                <h1 className="login-title">Welcome back</h1>
                <p className="login-subtitle">Sign in to your dashboard</p>

                {/* Role Tabs */}
                <div className="login-tabs" role="tablist">
                    <button
                        id="tab-user"
                        role="tab"
                        aria-selected={activeTab === 'user'}
                        className={`login-tab ${activeTab === 'user' ? 'login-tab-active login-tab-user' : ''}`}
                        onClick={() => handleTabChange('user')}
                        type="button"
                    >
                        👤 User
                    </button>
                    <button
                        id="tab-admin"
                        role="tab"
                        aria-selected={activeTab === 'admin'}
                        className={`login-tab ${activeTab === 'admin' ? 'login-tab-active login-tab-admin' : ''}`}
                        onClick={() => handleTabChange('admin')}
                        type="button"
                    >
                        🛡️ Admin
                    </button>
                </div>

                {/* Form */}
                <form className="login-form" onSubmit={handleSubmit} noValidate>
                    <div className="login-field">
                        <label htmlFor="login-username" className="login-label">Username</label>
                        <input
                            id="login-username"
                            type="text"
                            className="login-input"
                            placeholder={activeTab === 'admin' ? 'admin' : 'user'}
                            value={username}
                            onChange={e => { setUsername(e.target.value); setError(''); }}
                            autoComplete="username"
                            required
                        />
                    </div>

                    <div className="login-field">
                        <label htmlFor="login-password" className="login-label">Password</label>
                        <input
                            id="login-password"
                            type="password"
                            className="login-input"
                            placeholder="••••••••"
                            value={password}
                            onChange={e => { setPassword(e.target.value); setError(''); }}
                            autoComplete="current-password"
                            required
                        />
                    </div>

                    {error && (
                        <div className="login-error" role="alert">
                            ⚠️ {error}
                        </div>
                    )}

                    <button
                        id="btn-login-submit"
                        type="submit"
                        className={`login-submit-btn ${activeTab === 'admin' ? 'login-submit-admin' : 'login-submit-user'}`}
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="login-spinner">⏳ Signing in…</span>
                        ) : (
                            `Sign in as ${activeTab === 'admin' ? 'Admin' : 'User'}`
                        )}
                    </button>
                </form>

                {/* Demo hint */}
                <div className="login-demo-hint">
                    <span>Demo credentials: </span>
                    <button
                        id="btn-fill-demo"
                        type="button"
                        className="login-demo-btn"
                        onClick={fillDemo}
                    >
                        Fill automatically
                    </button>
                </div>

                <div className="login-creds-box">
                    {activeTab === 'user' ? (
                        <span>👤 user / user123</span>
                    ) : (
                        <span>🛡️ admin / admin123</span>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Login;
