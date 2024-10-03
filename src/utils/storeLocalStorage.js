// utils/storeLocalStorage.js
export const saveState = (state) => {
    try {
        const { shippingAddress } = state; // Add other slices as needed
        const stateToPersist = { shippingAddress }; // Persist only needed slices
        localStorage.setItem('reduxState', JSON.stringify(stateToPersist)); // Save to localStorage
    } catch (error) {
        console.error('Error saving state to localStorage:', error);
    }
};



// utils/storeLocalStorage.js
export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('reduxState');
        if (serializedState === null) return undefined; // Return undefined if no saved state

        const parsedState = JSON.parse(serializedState);

        // Optionally, add a validation for critical slices
        if (parsedState && parsedState.shippingAddress) {
            return parsedState; // Return the parsed state if valid
        } else {
            return undefined; // If validation fails, return undefined to use default state
        }
    } catch (error) {
        console.error('Error loading state from localStorage:', error);
        return undefined; // In case of any error, return undefined to initialize fresh state
    }
};

