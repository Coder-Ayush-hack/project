import { useState, useEffect } from 'react';

/**
 * Custom hook to simulate periodic data updates.
 * @param {Function} dataGenerator Function that generates new data
 * @param {number} intervalMs How often to update data in milliseconds
 * @param {boolean} isConnected Used to pause updates when disconnected
 * @returns {any} The simulated data state
 */
export function useSimulatedData(dataGenerator, intervalMs = 2000, isConnected = true) {
    const [data, setData] = useState(dataGenerator());

    useEffect(() => {
        if (!isConnected) return; // Pause updates while simulated "refresh/reconnect"

        const intervalId = setInterval(() => {
            setData((prevData) => {
                // Option to pass prevData to generator to make continuous changes.
                return dataGenerator(prevData);
            });
        }, intervalMs);

        return () => clearInterval(intervalId);
    }, [dataGenerator, intervalMs, isConnected]);

    return data;
}
