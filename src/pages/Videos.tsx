import React, { useState, useEffect, useCallback } from 'react';
import YouTubeFeed from './YouTubeFeed';
import '../styles/app.scss';
import '../styles/loader.scss';
import SelectChannel from './SelectChannel';

interface InputProps {
  onSetTitle: (title: string, props: {name: string, version: string}) => void;
}

export default function Videos({ onSetTitle }: InputProps) {
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => setMenuOpen(!menuOpen);
    const [darkMode, setDarkMode] = useState(false);
    const [apiKey, setApiKey] = useState<string>('');
    const [channelId, setChannelId] = useState<string>('');
    const subPageTitle = 'Ulubione kanały na YouTube';

    const fetchKey = async (): Promise<string> => {
        const response = await fetch('/GoogleAPIKey.txt');
        if (!response.ok) {
            throw new Error('Nie udało się pobrać klucza');
        }
        const key = await response.text();
        return key.trim();
    };

    const handleChannelSelect = useCallback((channel: { label: string; id: string }, name: string, version:string) => {
        onSetTitle(subPageTitle, {name, version});

        if (channel && channel.id) {
            setChannelId(channel.id);
        }
    }, []);

    const isReady = apiKey && channelId;

    useEffect(() => {
        fetchKey()
            .then(key => setApiKey(key))
            .catch(err => console.error(err));
    }, [darkMode, apiKey, channelId]);

    return (
        <div className='subpage'>
            <main className="main-content" onClick={() => menuOpen && setMenuOpen(false)}>
                <div className='main-container'>
                    {isReady ? <YouTubeFeed apiKey={apiKey} channelId={channelId} /> : <SelectChannel onSubmit={handleChannelSelect} />}
                </div>
            </main>
        </div>
    );
};
