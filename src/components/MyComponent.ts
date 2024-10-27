import React, { useEffect, useState } from 'react';
import { initSession, acceptTermsOfUse, getFeatures, getOutcomes } from './EndlessMedicalAPI';

const MyComponent: React.FC = () => {
    const [features, setFeatures] = useState<string[]>([]);
    const [outcomes, setOutcomes] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true); // Add loading state

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Set loading to true before fetching
            try {
                await initSession(); // Initialize session
                await acceptTermsOfUse(); // Accept terms of use
                const featuresData = await getFeatures(); // Fetch features
                setFeatures(featuresData.data);
                const outcomesData = await getOutcomes(); // Fetch outcomes
                setOutcomes(outcomesData.data);
            } catch (error) {
                setError((error as Error).message); // Type assertion to Error for TypeScript
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchData();
    }, []);

    // Error handling
    if (error) return (<div>`Error: {error}`</div>);

    // Loading state
    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1>Features</h1>
            <ul>
                {features.map((feature) => (
                    <li key={feature}>{feature}</li>
                ))}
            </ul>
            <h1>Outcomes</h1>
            <ul>
                {outcomes.map((outcome) => (
                    <li key={outcome}>{outcome}</li>
                ))}
            </ul>
        </div>
    );
};

export default MyComponent;
