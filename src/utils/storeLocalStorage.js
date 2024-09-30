// utils/storeLocalStorage.js
export const saveState = (state) => {
    try {
        const { shippingAddress } = state; // Destructure the slices you want to persist
        const stateToPersist = { shippingAddress }; // Create an object with only those slices
        localStorage.setItem('reduxState', JSON.stringify(stateToPersist)); // Save to localStorage
    } catch (error) {
        console.error('Error saving state to localStorage:', error);
    }
};


// utils/storeLocalStorage.js
export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('reduxState'); // Load the stored state
        if (serializedState === null) return undefined; // If no state, return undefined
        return JSON.parse(serializedState); // Parse and return the state
    } catch (error) {
        console.error('Error loading state from localStorage:', error);
        return undefined; // Return undefined in case of error
    }
};
