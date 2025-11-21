export const useStudentData = () => {
    const [studentData, setStudentData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/student'); // Cambia la URL según tu API
                if (!response.ok) {
                    throw new Error('Error al obtener los datos del estudiante');
                }
                const data = await response.json();
                setStudentData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStudentData();
    }, []);

    return { studentData, loading, error };
};