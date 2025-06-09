import React, { useEffect } from 'react';

interface InputProps {
  onSetTitle: (title: string, props: {name: string, version: string}) => void;
}

export default function Home({ onSetTitle }: InputProps) {
    const subPageTitle = 'Witam :)';

    useEffect(() => {
        onSetTitle(subPageTitle, { name: '', version: '' });
    }, []);

    return (
        <div className='subpage'>
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Strona główna</h1>
                <p>Witaj !</p>
            </div>
        </div>
    );
}