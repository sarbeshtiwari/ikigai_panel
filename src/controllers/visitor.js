// controllers/visitor.js
export const fetchVisitorData = async () => {
    const response = await fetch('/api/visitor-data'); // Adjust API endpoint as needed
    const data = await response.json();
    return data;
};
