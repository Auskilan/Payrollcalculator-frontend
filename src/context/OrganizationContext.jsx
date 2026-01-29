import React, { createContext, useContext, useState } from 'react';

const OrganizationContext = createContext();

export const useOrganization = () => {
    const context = useContext(OrganizationContext);
    if (!context) {
        throw new Error('useOrganization must be used within an OrganizationProvider');
    }
    return context;  
};

export const OrganizationProvider = ({ children }) => {
    // Mock data for initial state
    const [organization, setOrganization] = useState({
        id: 1,
        name: 'Sivam Gold & Silver',
        status: 'Active',
        createdAt: '2023-01-15'
    });

    const [locations, setLocations] = useState([
        { id: 101, name: 'Main Branch - T.Nagar', employeeCount: 45, status: 'Active', address: '123 Gold St, T.Nagar, Chennai', isMain: true, deviceCount: 3, biometricEnabled: true },
        { id: 102, name: 'Branch 1 - Anna Nagar', employeeCount: 12, status: 'Active', address: '45 North Road, Anna Nagar', isMain: false, deviceCount: 1, biometricEnabled: true },
        { id: 103, name: 'Branch 2 - Velachery', employeeCount: 8, status: 'Maintenance', address: '88 South Ave, Velachery', isMain: false, deviceCount: 0, biometricEnabled: false }
    ]);

    const [selectedLocation, setSelectedLocation] = useState(locations[0]);

    const addLocation = (location) => {
        setLocations(prev => [...prev, { ...location, id: Date.now(), status: 'Active', employeeCount: 0 }]);
    };

    const updateLocation = (id, updates) => {
        setLocations(prev => prev.map(loc => loc.id === id ? { ...loc, ...updates } : loc));
    };

    return (
        <OrganizationContext.Provider value={{
            organization,
            setOrganization,
            locations,
            selectedLocation,
            setSelectedLocation,
            addLocation,
            updateLocation
        }}>
            {children}
        </OrganizationContext.Provider>
    );
};
