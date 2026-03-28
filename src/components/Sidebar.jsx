import React from 'react';
import { NavLink } from 'react-router-dom';
import { useRole } from '../context/RoleContext';
import '../index.css';

const USER_PROFILES = {
    user: {
        name: 'Ayush Kumar',
        email: 'ayush@pulseanalytics.io',
        avatar: '👤',
        department: 'Viewer',
        since: 'Jan 2025',
    },
    admin: {
        name: 'Admin Root',
        email: 'admin@pulseanalytics.io',
        avatar: '🛡️',
        department: 'System Admin',
        since: 'Jun 2024',
    },
};

function Sidebar() {
    const { role } = useRole();
    const profile = USER_PROFILES[role];

    return (
        <aside className="sidebar">
            {/* Brand */}
            <div className="sidebar-header">
                ⚡ PulseAnalytics
            </div>

            {/* Profile Card */}
            <div className="sidebar-profile">
                <div className="sidebar-avatar">{profile.avatar}</div>
                <div className="sidebar-profile-info">
                    <div className="sidebar-profile-name">{profile.name}</div>
                    <div className="sidebar-profile-role">{profile.department}</div>
                    <div className="sidebar-profile-email">{profile.email}</div>
                    <div className="sidebar-profile-since">Member since: {profile.since}</div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="sidebar-nav">
                <NavLink
                    to="/"
                    className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                    end
                >
                    📊 Overview
                </NavLink>
                <NavLink
                    to="/performance"
                    className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                >
                    ⚙️ Performance
                </NavLink>
                <NavLink
                    to="/activity"
                    className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                >
                    👥 User Activity
                </NavLink>

                {/* Admin-only links */}
                {role === 'admin' && (
                    <>
                        <div className="sidebar-section-label">Admin Panel</div>
                        <NavLink
                            to="/admin/settings"
                            className={({ isActive }) => (isActive ? "nav-link active admin-link" : "nav-link admin-link")}
                        >
                            🔧 System Settings
                        </NavLink>
                        <NavLink
                            to="/admin/users"
                            className={({ isActive }) => (isActive ? "nav-link active admin-link" : "nav-link admin-link")}
                        >
                            👥 Manage Users
                        </NavLink>
                        <NavLink
                            to="/admin/logs"
                            className={({ isActive }) => (isActive ? "nav-link active admin-link" : "nav-link admin-link")}
                        >
                            📋 Audit Logs
                        </NavLink>
                    </>
                )}
            </nav>

            {/* Footer */}
            <div className="sidebar-footer">
                <span>v1.0.0</span>
                <span>PulseAnalytics © 2026</span>
            </div>
        </aside>
    );
}

export default Sidebar;
