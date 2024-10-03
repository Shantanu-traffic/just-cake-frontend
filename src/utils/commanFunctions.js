export const generateOrderDate = () => {
    const date = new Date();  // Get the current date and time
    const orderDate = date.toISOString();  // Convert to ISO 8601 format
    return orderDate;  // Returns in "2024-09-25T12:00:00Z" format
};

export const BASE_API_URL = 'http://localhost:5000' 