import '../styles/about.scss';
import React, { useEffect } from 'react';

interface InputProps {
  onSetTitle: (title: string, props: {name: string, version: string}) => void;
}

export default function AboutPage({ onSetTitle }: InputProps) {
    const subPageTitle = 'O mnie...';

    useEffect(() => {
        onSetTitle(subPageTitle, { name: '', version: '' });
    }, []);

    return (
        <div className='subpage'>
            <div className="about-page page page--about">
                <h1 className="page__title">Bartosz Bossy</h1>
                <p className="page__text">Jestem <strong>front-end</strong> oraz <strong>full-stack developerem</strong> z pasją do tworzenia nowoczesnych i responsywnych aplikacji internetowych.</p>
                <p className="page__text">Specjalizuję się w technologiach takich jak <span className="page__tag">JavaScript</span>, <span className="page__tag">TypeScript</span>, <span className="page__tag">React</span> oraz <span className="page__tag">Node.js</span>. Mam także spore doświdczenie w pisaniu aplikacji w <span className="page__tag">Java</span> oraz <span className="page__tag">Rest API</span>. Tworzę zarówno dynamiczne interfejsy użytkownika, jak i solidne backendy.</p>
                <p className="page__text">Uwielbiam uczyć się nowych rzeczy, optymalizować działające już aplikacje i pracować zespołowo nad ambitnymi projektami.</p>
            </div>
        </div>
    )

}