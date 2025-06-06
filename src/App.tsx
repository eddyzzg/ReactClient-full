import React, { useState, useEffect } from 'react';
import YouTubeFeed from './YouTubeFeed';
import './styles/App.scss';
import { Home, Video, Info, Mail, Moon, Sun } from 'lucide-react';
import SelectChannel from './SelectChannel';

const App = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => setMenuOpen(!menuOpen);
    const [darkMode, setDarkMode] = useState(false);
    const [apiKey, setApiKey] = useState<string>('');
    const [channelId, setChannelId] = useState<string>('');

    const fetchKey = async (): Promise<string> => {
        const response = await fetch('/GoogleAPIKey.txt');
        if (!response.ok) {
            throw new Error('Nie udało się pobrać klucza');
        }
        const key = await response.text();
        return key.trim();
    };

    const handleChannelSelect = (channel: { label: string; id: string }) => {
        if (channel && channel.id) {
            setChannelId(channel.id);
        }
    };

    let isReady = apiKey && channelId;

    useEffect(() => {
        fetchKey()
            .then(key => setApiKey(key))
            .catch(err => console.error(err));
    }, []);

    return (
        <>
            <div className={darkMode ? 'dark' : ''}>
                <header className="topbar">
                    <div className="topbar__title">Ulubiony kanał na YT</div>
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

                <nav className={`sidebar ${menuOpen ? 'sidebar--open' : ''}`}>
                    <ul>
                        <li>
                            <a href="#home" onClick={() => setMenuOpen(false)}>
                                <Home size={18} /> <span>Home</span>
                            </a>
                        </li>
                        <li>
                            <a href="#videos" onClick={() => setMenuOpen(false)}>
                                <Video size={18} /> <span>Filmy</span>
                            </a>
                        </li>
                        <li>
                            <a href="#about" onClick={() => setMenuOpen(false)}>
                                <Info size={18} /> <span>O mnie</span>
                            </a>
                        </li>
                        <li>
                            <a href="#contact" onClick={() => setMenuOpen(false)}>
                                <Mail size={18} /> <span>Kontakt</span>
                            </a>
                        </li>
                    </ul>
                </nav>

                <main className="main-content" onClick={() => menuOpen && setMenuOpen(false)}>


                    <div className='main-container'>
                        <h1>Ostatnie wideo:</h1>
                        {isReady ? <YouTubeFeed apiKey={apiKey} channelId={channelId}/> : <SelectChannel onSubmit={handleChannelSelect} />}
                    </div>
                </main>
            </div>
        </>
    );
};

export default App;