export const getStudentProfile = async (studentId) => {
    try {
        const response = await fetch(`/api/students/${studentId}`);
        if (!response.ok) {
            throw new Error('Error fetching student profile');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch student profile:', error);
        throw error;
    }
};

export const updateStudentProfile = async (studentId, profileData) => {
    try {
        const response = await fetch(`/api/students/${studentId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(profileData),
        });
        if (!response.ok) {
            throw new Error('Error updating student profile');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to update student profile:', error);
        throw error;
    }
};