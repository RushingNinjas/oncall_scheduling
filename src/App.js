import React, { useEffect, useState } from 'react';

//test

function App() {
    const [providers, setProviders] = useState([]);

    useEffect(() => {
        fetch('/api/providers')
            .then(response => response.json())
            .then(data => setProviders(data));
    }, []);

    return (
        <div>
            <h1>Provider Profiles</h1>
            <ul>
                {providers.map(provider => (
                    <li key={provider.id}>
                        {provider.name} - {provider.specialties.join(', ')}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App; 