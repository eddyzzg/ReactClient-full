//styles
import './styles/app.scss';
import './styles/loader.scss';

//main import
import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import { Home as HomeIcon, Video, Info, Mail, Moon, Sun, Pen, ArrowBigUp } from 'lucide-react';
import { NavLink, Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { lightTheme, darkTheme } from './theme/theme';
import { RequireAuth } from './auth/RequireAuth';

import LoginPage from './auth/LoginPage';
import RegistrationPage from './auth/RegistrationPage';

//lazy subpages load
const Home = lazy(() => import(/* webpackChunkName: "home" */ './pages/Home'));
const AboutPage = lazy(() => import(/* webpackChunkName: "aboutPage" */'./pages/AboutPage'));
const Videos = lazy(() => import(/* webpackChunkName: "videos" */ './pages/Videos'));
const Contact = lazy(() => import(/* webpackChunkName: "contact" */ './pages/Contact'));
const ContactFormPage = lazy(() => import(/* webpackChunkName: "contactFormPage" */ './pages/ContactFormPage'));

export default function App() {
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => setMenuOpen(!menuOpen);
    const [title, setTitle] = useState<string>();
    const [darkMode, setDarkMode] = useState<boolean>(() => {
        const isDarkMode = localStorage.getItem('darkMode');
        return isDarkMode === 'true';
    });

    const onSetTitle = useCallback((title: string, params: { name?: string, version?: string }) => {
        let nameVersionParam = '';
        if (params) {
            nameVersionParam = params.name ? `(${params.name} v.${params.version})` : '';
        }
        setTitle(`${title} ${nameVersionParam}`);
    }, []);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
    }, [darkMode]);

    return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <CssBaseline />
            <div className={darkMode ? 'dark' : ''}>
                <header className="topbar">
                    <div className="topbar__title">{title}</div>
                    <div className="topbar__actions">
                        <button
                            className={`topbar__theme-toggle ${darkMode ? 'rotating' : ''}`}
                            onClick={() => setDarkMode(!darkMode)}
                            aria-label="Przełącz tryb ciemny"
                        >
                            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <button className="topbar__menu-btn" onClick={toggleMenu} aria-label="Toggle menu">
                            <div className={`hamburger ${menuOpen ? 'open' : ''}`}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </button>
                    </div>
                </header>

                <Router>
                    <nav className={`sidebar ${menuOpen ? 'sidebar--open' : ''} bg-gray-800 text-white p-4`}>
                        <ul className="space-y-2">
                            <li>
                                <NavLink to="/" onClick={() => setMenuOpen(false)} className="flex items-center space-x-2 sidebar__home">
                                    <HomeIcon size={18} /> <span>Home</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/videos" onClick={() => setMenuOpen(false)} className="flex items-center space-x-2 sidebar__videos">
                                    <Video size={18} /> <span>Filmy</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/about" onClick={() => setMenuOpen(false)} className="flex items-center space-x-2 sidebar__about">
                                    <Info size={18} /> <span>O mnie</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/contact" onClick={() => setMenuOpen(false)} className="flex items-center space-x-2 sidebar__contact">
                                    <Mail size={18} /> <span>Kontakt</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/contactForm" onClick={() => setMenuOpen(false)} className="flex items-center space-x-2 sidebar__register">
                                    <Pen size={18} /> <span>Formularz kontaktowy</span>
                                </NavLink>
                            </li>
                        </ul>
                    </nav>

                    <div className="ml-0 md:ml-64">
                        <Suspense fallback={<p className="page page--loading">Ładowanie...</p>}>
                            <Routes>
                                {/* Strona logowania */}
                                <Route path="/login" element={<LoginPage onSetTitle={onSetTitle} />} />
                                <Route path="/register" element={<RegistrationPage onSetTitle={onSetTitle} />} />

                                <Route element={<RequireAuth />}>
                                    <Route path="/" element={<Home onSetTitle={onSetTitle} />} />
                                    <Route path="/videos" element={<Videos onSetTitle={onSetTitle} />} />
                                    <Route path="/contact" element={<Contact onSetTitle={onSetTitle} />} />
                                    <Route path="/about" element={<AboutPage onSetTitle={onSetTitle} />} />
                                </Route>

                                <Route path="/contactForm" element={<ContactFormPage onSetTitle={onSetTitle} />} />

                            </Routes>
                        </Suspense>
                    </div>
                </Router>
            </div>
        </ThemeProvider>
    );
};
