import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/common/Button/Button';
import Input from '../../../components/common/Input/Input';
import Select from '../../../components/common/Select/Select';
import Textarea from '../../../components/common/TexTarea/TexTarea';
import './RegisterProfessor.css';
import { addProfessor, emailExists } from '../../../data/mockUsers';

function RegisterProfessor() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);


  const [formData, setFormData] = useState({
    profilePhoto: null,
    firstName: '',
    lastName: '',
    email: '',
    password: '', // AGREGAR
    confirmPassword: '', // AGREGAR (opcional pero recomendado)
    phone: '',
    birthDate: '',
    gender: '',
    address: '',
    bio: '',
    // Paso 2
    universityDegree: '',
    university: '',
    graduationYear: '',
    teachingExperience: '',
    universityDegreeFile: null,
    professionalLicenseFile: null,
    certifications: [],
    // Paso 3
    subjects: [],
    educationLevels: [],
    teachingModalities: [],
    pricePerHour: '',
    currency: 'USD',
    // Paso 4
    schedule: {
      lunes: { manana: false, tarde: false, noche: false, todoElDia: false },
      martes: { manana: false, tarde: false, noche: false, todoElDia: false },
      miercoles: { manana: false, tarde: false, noche: false, todoElDia: false },
      jueves: { manana: false, tarde: false, noche: false, todoElDia: false },
      viernes: { manana: false, tarde: false, noche: false, todoElDia: false },
      sabado: { manana: false, tarde: false, noche: false, todoElDia: false },
      domingo: { manana: false, tarde: false, noche: false, todoElDia: false }
    },
    maxStudentsPerClass: '1',
    reservationTime: '24',
    availabilityNotes: '',
    // Paso 5
    acceptTerms: false,
    acceptPrivacy: false,
    acceptNotifications: false
  });

  const [errors, setErrors] = useState({});
  const [photoPreview, setPhotoPreview] = useState(null);
  const [degreeFileName, setDegreeFileName] = useState('');
  const [licenseFileName, setLicenseFileName] = useState('');

  // OPCIONES DE SELECTS
  const genderOptions = [
    { value: '', label: 'Selecciona una opción' },
    { value: 'masculino', label: 'Masculino' },
    { value: 'femenino', label: 'Femenino' },
    { value: 'otro', label: 'Otro' },
    { value: 'prefiero-no-decir', label: 'Prefiero no decir' }
  ];

  const experienceOptions = [
    { value: '', label: 'Selecciona tu experiencia' },
    { value: '0-1', label: 'Menos de 1 año' },
    { value: '1-3', label: '1 a 3 años' },
    { value: '3-5', label: '3 a 5 años' },
    { value: '5-10', label: '5 a 10 años' },
    { value: '10+', label: 'Más de 10 años' }
  ];

  const currencyOptions = [
    { value: 'USD', label: 'USD - Dólar' },
    { value: 'EUR', label: 'EUR - Euro' },
    { value: 'MXN', label: 'MXN - Peso Mexicano' },
    { value: 'COP', label: 'COP - Peso Colombiano' },
    { value: 'ARS', label: 'ARS - Peso Argentino' },
    { value: 'CLP', label: 'CLP - Peso Chileno' }
  ];

  const maxStudentsOptions = [
    { value: '1', label: '1 estudiante (Individual)' },
    { value: '2', label: '2 estudiantes' },
    { value: '3', label: '3 estudiantes' },
    { value: '4', label: '4 estudiantes' },
    { value: '5', label: '5 estudiantes' },
    { value: '6-10', label: '6-10 estudiantes (Grupo pequeño)' },
    { value: '10+', label: 'Más de 10 estudiantes (Grupo grande)' }
  ];

  const reservationTimeOptions = [
    { value: '1', label: '1 hora antes' },
    { value: '2', label: '2 horas antes' },
    { value: '6', label: '6 horas antes' },
    { value: '12', label: '12 horas antes' },
    { value: '24', label: '24 horas antes' },
    { value: '48', label: '48 horas antes' },
    { value: '72', label: '3 días antes' },
    { value: '168', label: '1 semana antes' }
  ];

  // OPCIONES PASO 3
  const subjectsOptions = [
    { id: 'matematicas', name: 'Matemáticas', icon: '🔢' },
    { id: 'fisica', name: 'Física', icon: '⚛️' },
    { id: 'quimica', name: 'Química', icon: '🧪' },
    { id: 'biologia', name: 'Biología', icon: '🧬' },
    { id: 'lengua', name: 'Lengua y Literatura', icon: '📚' },
    { id: 'ingles', name: 'Inglés', icon: '🇬🇧' },
    { id: 'historia', name: 'Historia', icon: '📜' },
    { id: 'geografia', name: 'Geografía', icon: '🌍' },
    { id: 'informatica', name: 'Informática', icon: '💻' },
    { id: 'arte', name: 'Arte', icon: '🎨' },
    { id: 'musica', name: 'Música', icon: '🎵' },
    { id: 'educacion-fisica', name: 'Educación Física', icon: '⚽' }
  ];

  const educationLevelsOptions = [
    { id: 'primaria', name: 'Primaria', subtitle: '1° a 6° grado', icon: '🎒' },
    { id: 'secundaria', name: 'Secundaria', subtitle: '7° a 10° grado', icon: '📖' },
    { id: 'bachillerato', name: 'Bachillerato', subtitle: '1° a 3° año', icon: '🎓' },
    { id: 'universidad', name: 'Universidad', subtitle: 'Nivel superior', icon: '🏛️' },
    { id: 'adultos', name: 'Adultos', subtitle: 'Educación continua', icon: '👨‍🎓' }
  ];

  const modalitiesOptions = [
    { id: 'presencial', name: 'Presencial', subtitle: 'En un lugar físico', icon: '🏫' },
    { id: 'online', name: 'En Línea', subtitle: 'Clases virtuales', icon: '💻' },
    { id: 'hibrido', name: 'Híbrido', subtitle: 'Combinación de ambas', icon: '🔄' }
  ];

  // HANDLERS
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          profilePhoto: 'Solo se permiten imágenes (JPG, PNG, GIF)'
        }));
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          profilePhoto: 'La imagen no debe superar los 5MB'
        }));
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);

      setFormData(prev => ({ ...prev, profilePhoto: file }));
      setErrors(prev => ({ ...prev, profilePhoto: '' }));
    }
  };

  const handleFileUpload = (e, fieldName) => {
    const file = e.target.files[0];
    
    if (file) {
      if (file.type !== 'application/pdf') {
        setErrors(prev => ({
          ...prev,
          [fieldName]: 'Solo se permiten archivos PDF'
        }));
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          [fieldName]: 'El archivo no debe superar los 10MB'
        }));
        return;
      }

      setFormData(prev => ({ ...prev, [fieldName]: file }));
      
      if (fieldName === 'universityDegreeFile') {
        setDegreeFileName(file.name);
      } else if (fieldName === 'professionalLicenseFile') {
        setLicenseFileName(file.name);
      }
      
      setErrors(prev => ({ ...prev, [fieldName]: '' }));
    }
  };

  const toggleSelection = (field, value) => {
    setFormData(prev => {
      const currentArray = prev[field];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];
      
      return { ...prev, [field]: newArray };
    });

    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const addCertification = () => {
    setFormData(prev => ({
      ...prev,
      certifications: [...prev.certifications, { id: Date.now(), name: '', file: null, fileName: '' }]
    }));
  };

  const removeCertification = (id) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.filter(cert => cert.id !== id)
    }));
  };

  const handleCertificationFileChange = (id, file) => {
    if (file) {
      if (file.type !== 'application/pdf') {
        alert('Solo se permiten archivos PDF');
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        alert('El archivo no debe superar los 10MB');
        return;
      }

      setFormData(prev => ({
        ...prev,
        certifications: prev.certifications.map(cert =>
          cert.id === id ? { ...cert, file, fileName: file.name } : cert
        )
      }));
    }
  };

  const removePhoto = () => {
    setFormData(prev => ({ ...prev, profilePhoto: null }));
    setPhotoPreview(null);
    setErrors(prev => ({ ...prev, profilePhoto: '' }));
  };

  // VALIDACIONES
  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'El nombre es obligatorio';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'El apellido es obligatorio';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El correo electrónico no es válido';
    }

    // VALIDACIÓN DE CONTRASEÑA
    if (!formData.password.trim()) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (formData.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es obligatorio';
    }

    if (!formData.birthDate) {
      newErrors.birthDate = 'La fecha de nacimiento es obligatoria';
    }

    if (!formData.gender) {
      newErrors.gender = 'El género es obligatorio';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};

    if (!formData.universityDegree.trim()) {
      newErrors.universityDegree = 'El título universitario es obligatorio';
    }

    if (!formData.university.trim()) {
      newErrors.university = 'La universidad es obligatoria';
    }

    if (!formData.graduationYear) {
      newErrors.graduationYear = 'El año de graduación es obligatorio';
    } else {
      const year = parseInt(formData.graduationYear);
      const currentYear = new Date().getFullYear();
      if (year < 1950 || year > currentYear) {
        newErrors.graduationYear = `El año debe estar entre 1950 y ${currentYear}`;
      }
    }

    if (!formData.teachingExperience) {
      newErrors.teachingExperience = 'La experiencia docente es obligatoria';
    }

    if (!formData.universityDegreeFile) {
      newErrors.universityDegreeFile = 'El título universitario (PDF) es obligatorio';
    }

    if (!formData.professionalLicenseFile) {
      newErrors.professionalLicenseFile = 'La cédula profesional (PDF) es obligatoria';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors = {};

    if (formData.subjects.length === 0) {
      newErrors.subjects = 'Debes seleccionar al menos una materia';
    }

    if (formData.educationLevels.length === 0) {
      newErrors.educationLevels = 'Debes seleccionar al menos un nivel educativo';
    }

    if (formData.teachingModalities.length === 0) {
      newErrors.teachingModalities = 'Debes seleccionar al menos una modalidad de enseñanza';
    }

    if (!formData.pricePerHour || parseFloat(formData.pricePerHour) <= 0) {
      newErrors.pricePerHour = 'El precio por hora debe ser mayor a 0';
    }

    if (!formData.currency) {
      newErrors.currency = 'Debes seleccionar una moneda';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep4 = () => {
    const newErrors = {};
    
    // Validar que al menos un horario esté seleccionado
    const hasSchedule = Object.values(formData.schedule).some(day => 
      day.manana || day.tarde || day.noche
    );
    
    if (!hasSchedule) {
      newErrors.schedule = 'Debes seleccionar al menos una franja horaria';
    }

    if (!formData.maxStudentsPerClass) {
      newErrors.maxStudentsPerClass = 'Selecciona el número máximo de estudiantes';
    }

    if (!formData.reservationTime) {
      newErrors.reservationTime = 'Selecciona el tiempo de anticipación para reservas';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep5 = () => {
    const newErrors = {};

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Debes aceptar los Términos y Condiciones';
    }

    if (!formData.acceptPrivacy) {
      newErrors.acceptPrivacy = 'Debes aceptar la Política de Privacidad';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep1 = () => {
    if (validateStep1()) {
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const firstErrorField = document.querySelector('.input-error, .select-error, .textarea-error');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const handleNextStep2 = () => {
    if (validateStep2()) {
      setCurrentStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const firstErrorField = document.querySelector('.input-error, .select-error, .file-upload-error');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const handleNextStep3 = () => {
    if (validateStep3()) {
      setCurrentStep(4);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const firstErrorField = document.querySelector('.checkbox-group-error');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const handleNextStep4 = () => {
    if (validateStep4()) {
      setCurrentStep(5);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const firstErrorField = document.querySelector('.schedule-error');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const handleSubmitRegistration = () => {
    if (!validateStep5()) return;

    if (emailExists(formData.email)) {
      setErrors({ email: 'Este correo ya está registrado' });
      setCurrentStep(1);
      return;
    }

    const newProfessor = addProfessor(formData);
    localStorage.setItem('currentUser', JSON.stringify(newProfessor));

    alert('¡Registro exitoso! Bienvenido a EduMatch');
    navigate('/professor/dashboard');
  };

  const handleScheduleChange = (day, period) => {
    console.log('🔍 Cambiando:', day, period); // Debug
    
    setFormData(prev => {
      const newSchedule = { ...prev.schedule };
      
      if (period === 'todoElDia') {
        const allChecked = !newSchedule[day].todoElDia;
        newSchedule[day] = {
          manana: allChecked,
          tarde: allChecked,
          noche: allChecked,
          todoElDia: allChecked
        };
      } else {
        newSchedule[day][period] = !newSchedule[day][period];
        const allPeriods = newSchedule[day].manana && newSchedule[day].tarde && newSchedule[day].noche;
        newSchedule[day].todoElDia = allPeriods;
      }
      
      console.log('✅ Nuevo estado:', newSchedule[day]); // Debug
      return { ...prev, schedule: newSchedule };
    });

    if (errors.schedule) {
      setErrors(prev => ({ ...prev, schedule: '' }));
    }
  };

  const getScheduleStats = () => {
    let timeSlots = 0;
    let daysAvailable = 0;
    
    Object.keys(formData.schedule).forEach(day => {
      const daySchedule = formData.schedule[day];
      const hasAnySlot = daySchedule.manana || daySchedule.tarde || daySchedule.noche;
      
      if (hasAnySlot) {
        daysAvailable++;
        if (daySchedule.manana) timeSlots++;
        if (daySchedule.tarde) timeSlots++;
        if (daySchedule.noche) timeSlots++;
      }
    });
    
    return { timeSlots, daysAvailable };
  };

  // Función para obtener nombres de materias seleccionadas
  const getSelectedSubjectsNames = () => {
    return formData.subjects
      .map(id => subjectsOptions.find(s => s.id === id)?.name)
      .filter(Boolean)
      .join(', ') || 'No especificado';
  };

  // Función para obtener nombres de niveles educativos
  const getSelectedLevelsNames = () => {
    return formData.educationLevels
      .map(id => educationLevelsOptions.find(l => l.id === id)?.name)
      .filter(Boolean)
      .join(', ') || 'No especificado';
  };

  // Función para obtener nombres de modalidades
  const getSelectedModalitiesNames = () => {
    return formData.teachingModalities
      .map(id => modalitiesOptions.find(m => m.id === id)?.name)
      .filter(Boolean)
      .join(', ') || 'No especificado';
  };

  // Función para formatear experiencia docente
  const getExperienceLabel = () => {
    return experienceOptions.find(opt => opt.value === formData.teachingExperience)?.label || 'No especificado';
  };

  const steps = [
    { number: 1, label: 'Información Personal', icon: '👤' },
    { number: 2, label: 'Formación', icon: '🎓' },
    { number: 3, label: 'Clases', icon: '📚' },
    { number: 4, label: 'Horario', icon: '📅' },
    { number: 5, label: 'Confirmación', icon: '✓' }
  ];

  return (
    <div className="register-professor-wrapper">
      {/* HEADER */}
      <header className="register-professor-header">
        <div className="header-content">
          <div className="logo">
            <div className="logo-icon">🎓</div>
            <span className="logo-text">EduMatch</span>
          </div>
          <h1 className="register-professor-title">Únete como Profesor</h1>
          <p className="register-professor-subtitle">
            Comparte tu conocimiento y ayuda a estudiantes a alcanzar sus metas
          </p>
        </div>
      </header>

      {/* STEPPER */}
      <section className="stepper-container" data-step={currentStep}>
        <div className="stepper">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`step ${currentStep >= step.number ? 'active' : ''} ${
                currentStep > step.number ? 'completed' : ''
              }`}
            >
              <div className="step-icon">
                <span className="step-emoji">{step.icon}</span>
                <span className="step-number">{step.number}</span>
              </div>
              <span className="step-label">{step.label}</span>
              {index < steps.length - 1 && <div className="step-line"></div>}
            </div>
          ))}
        </div>
      </section>

      {/* CONTENIDO PRINCIPAL */}
      <main className="register-professor-card">
        {/* PASO 1: INFORMACIÓN PERSONAL */}
        {currentStep === 1 && (
          <div className="step-content">
            <div className="step-header">
              <h2 className="step-title">
                <span>👤</span> Información Personal
              </h2>
              <p className="step-description">
                Cuéntanos un poco sobre ti para crear tu perfil de profesor
              </p>
            </div>

            <form className="register-professor-form" onSubmit={(e) => e.preventDefault()}>
              {/* FOTO DE PERFIL */}
              <div className="photo-upload-section">
                <label className="photo-upload-label">
                  Foto de Perfil <span className="required-asterisk">*</span>
                </label>
                
                <div className="photo-upload-container">
                  {!photoPreview ? (
                    <label htmlFor="photo-upload" className="photo-upload-area">
                      <div className="photo-upload-icon">📷</div>
                      <div className="photo-upload-text">
                        <p className="photo-upload-title">Haz clic para subir tu foto</p>
                        <p className="photo-upload-hint">JPG, PNG o GIF (máx. 5MB)</p>
                      </div>
                      <input
                        id="photo-upload"
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="photo-upload-input"
                      />
                    </label>
                  ) : (
                    <div className="photo-preview-container">
                      <img src={photoPreview} alt="Preview" className="photo-preview" />
                      <button
                        type="button"
                        onClick={removePhoto}
                        className="photo-remove-btn"
                        title="Eliminar foto"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>
                
                {errors.profilePhoto && (
                  <span className="error-message">{errors.profilePhoto}</span>
                )}
              </div>

              {/* NOMBRE Y APELLIDO */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">
                    Nombre <span className="required-asterisk">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="Ej: Juan"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={errors.firstName ? 'error' : ''}
                  />
                  {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">
                    Apellido <span className="required-asterisk">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Ej: Pérez"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={errors.lastName ? 'error' : ''}
                  />
                  {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                </div>
              </div>

              {/* EMAIL Y TELÉFONO */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">
                    Correo Electrónico <span className="required-asterisk">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="ejemplo@correo.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">
                    Teléfono <span className="required-asterisk">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="+593 99 123 4567"
                    value={formData.phone}
                    onChange={handleChange}
                    className={errors.phone ? 'error' : ''}
                  />
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>
              </div>

              {/* CONTRASEÑA Y CONFIRMAR */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="password">
                    Contraseña <span className="required-asterisk">*</span>
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Mínimo 8 caracteres"
                    value={formData.password}
                    onChange={handleChange}
                    className={errors.password ? 'error' : ''}
                  />
                  {errors.password && <span className="error-message">{errors.password}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">
                    Confirmar Contraseña <span className="required-asterisk">*</span>
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Repite tu contraseña"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={errors.confirmPassword ? 'error' : ''}
                  />
                  {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                </div>
              </div>

              {/* FECHA DE NACIMIENTO Y GÉNERO */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="birthDate">
                    Fecha de Nacimiento <span className="required-asterisk">*</span>
                  </label>
                  <input
                    type="date"
                    id="birthDate"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                    className={errors.birthDate ? 'error' : ''}
                    max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
                  />
                  {errors.birthDate && <span className="error-message">{errors.birthDate}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="gender">
                    Género <span className="required-asterisk">*</span>
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className={errors.gender ? 'error' : ''}
                  >
                    {genderOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.gender && <span className="error-message">{errors.gender}</span>}
                </div>
              </div>

              {/* DIRECCIÓN */}
              <div className="form-group">
                <label htmlFor="address">Dirección</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Calle, número, ciudad, país"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>

              {/* BIOGRAFÍA */}
              <div className="form-group">
                <label htmlFor="bio">Biografía</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Cuéntanos sobre tu experiencia, tus pasiones por la enseñanza y qué te hace un gran profesor..."
                  rows="4"
                />
              </div>

              {/* BOTONES */}
              <div className="form-actions">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => navigate('/register')}
                >
                  Cancelar
                </Button>
                <Button type="button" variant="primary" onClick={handleNextStep1}>
                  Siguiente →
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* PASO 2: FORMACIÓN */}
        {currentStep === 2 && (
          <div className="step-content">
            <div className="step-header">
              <h2 className="step-title">
                <span>🎓</span> Formación Académica y Títulos
              </h2>
              <p className="step-description">
                Sube tus documentos que avalen tu formación y experiencia como docente
              </p>
            </div>

            <form className="register-professor-form" onSubmit={(e) => e.preventDefault()}>
              {/* INFORMACIÓN ACADÉMICA */}
              <div className="form-section-step2">
                <div className="section-header-step2">
                  <span className="section-icon-step2">📋</span>
                  <h3 className="section-title-step2">Información Académica</h3>
                </div>

                <div className="form-fields-container">
                  <div className="form-field">
                    <label className="field-label">
                      Título Universitario <span className="required-asterisk">*</span>
                    </label>
                    <input
                      type="text"
                      name="universityDegree"
                      placeholder="Ej: Licenciatura en Física"
                      value={formData.universityDegree}
                      onChange={handleChange}
                      className={`field-input ${errors.universityDegree ? 'input-error' : ''}`}
                    />
                    {errors.universityDegree && (
                      <span className="error-message-field">{errors.universityDegree}</span>
                    )}
                  </div>

                  <div className="form-field">
                    <label className="field-label">
                      Universidad <span className="required-asterisk">*</span>
                    </label>
                    <input
                      type="text"
                      name="university"
                      placeholder="Universidad Central del Ecuador"
                      value={formData.university}
                      onChange={handleChange}
                      className={`field-input ${errors.university ? 'input-error' : ''}`}
                    />
                    {errors.university && (
                      <span className="error-message-field">{errors.university}</span>
                    )}
                  </div>

                  <div className="form-row-step2">
                    <div className="form-field">
                      <label className="field-label">
                        Año de Graduación <span className="required-asterisk">*</span>
                      </label>
                      <input
                        type="number"
                        name="graduationYear"
                        placeholder="2018"
                        value={formData.graduationYear}
                        onChange={handleChange}
                        className={`field-input ${errors.graduationYear ? 'input-error' : ''}`}
                        min="1950"
                        max={new Date().getFullYear()}
                      />
                      {errors.graduationYear && (
                        <span className="error-message-field">{errors.graduationYear}</span>
                      )}
                    </div>

                    <div className="form-field">
                      <label className="field-label">
                        Años de Experiencia Docente <span className="required-asterisk">*</span>
                      </label>
                      <select
                        name="teachingExperience"
                        value={formData.teachingExperience}
                        onChange={handleChange}
                        className={`field-select ${errors.teachingExperience ? 'input-error' : ''}`}
                      >
                        {experienceOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      {errors.teachingExperience && (
                        <span className="error-message-field">{errors.teachingExperience}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* DOCUMENTOS DE RESPALDO */}
              <div className="form-section-step2">
                <div className="section-header-step2">
                  <span className="section-icon-step2">📄</span>
                  <h3 className="section-title-step2">Documentos de Respaldo</h3>
                </div>

                <div className="documents-upload-container">
                  {/* Título Universitario */}
                  <div className="document-upload-item">
                    <div className="document-upload-header">
                      <span className="document-icon">📎</span>
                      <div className="document-info">
                        <span className="document-label">
                          Título Universitario (PDF) <span className="required-asterisk">*</span>
                        </span>
                        {degreeFileName && (
                          <span className="document-filename">{degreeFileName}</span>
                        )}
                      </div>
                    </div>
                    <label htmlFor="degree-upload" className="document-upload-button">
                      <span className="upload-btn-text">Seleccionar archivo</span>
                    </label>
                    <input
                      id="degree-upload"
                      type="file"
                      accept=".pdf"
                      onChange={(e) => handleFileUpload(e, 'universityDegreeFile')}
                      className="file-input-hidden"
                    />
                    {errors.universityDegreeFile && (
                      <span className="error-message-field">{errors.universityDegreeFile}</span>
                    )}
                    {!formData.universityDegreeFile && (
                      <span className="document-required-note">El título universitario (PDF) es obligatorio</span>
                    )}
                  </div>

                  {/* Cédula Profesional */}
                  <div className="document-upload-item">
                    <div className="document-upload-header">
                      <span className="document-icon">📎</span>
                      <div className="document-info">
                        <span className="document-label">
                          Cédula Profesional (PDF) <span className="required-asterisk">*</span>
                        </span>
                        {licenseFileName && (
                          <span className="document-filename">{licenseFileName}</span>
                        )}
                      </div>
                    </div>
                    <label htmlFor="license-upload" className="document-upload-button">
                      <span className="upload-btn-text">Seleccionar archivo</span>
                    </label>
                    <input
                      id="license-upload"
                      type="file"
                      accept=".pdf"
                      onChange={(e) => handleFileUpload(e, 'professionalLicenseFile')}
                      className="file-input-hidden"
                    />
                    {errors.professionalLicenseFile && (
                      <span className="error-message-field">{errors.professionalLicenseFile}</span>
                    )}
                    {!formData.professionalLicenseFile && (
                      <span className="document-required-note">La cédula profesional (PDF) es obligatoria</span>
                    )}
                  </div>
                </div>
              </div>

              {/* CERTIFICACIONES ADICIONALES */}
              <div className="form-section-step2">
                <div className="section-header-step2">
                  <span className="section-icon-step2">⭐</span>
                  <h3 className="section-title-step2">Certificaciones Adicionales</h3>
                </div>
                <p className="section-description-step2">
                  Cursos, diplomados, especializaciones u otros documentos que fortalezcan tu perfil
                </p>

                <div className="certifications-container">
                  {formData.certifications.map((cert) => (
                    <div key={cert.id} className="certification-upload-item">
                      <div className="certification-upload-content">
                        <span className="certification-icon">📎</span>
                        <div className="certification-info">
                          {cert.fileName ? (
                            <span className="certification-filename">{cert.fileName}</span>
                          ) : (
                            <span className="certification-placeholder">Ningún archivo seleccionado</span>
                          )}
                        </div>
                        <label htmlFor={`cert-${cert.id}`} className="certification-select-btn">
                          Seleccionar archivo
                        </label>
                        <input
                          id={`cert-${cert.id}`}
                          type="file"
                          accept=".pdf"
                          onChange={(e) => handleCertificationFileChange(cert.id, e.target.files[0])}
                          className="file-input-hidden"
                        />
                        <button
                          type="button"
                          onClick={() => removeCertification(cert.id)}
                          className="certification-remove-btn"
                          title="Eliminar certificación"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addCertification}
                    className="add-certification-button"
                  >
                    <span className="add-cert-icon">➕</span>
                    <span className="add-cert-text">Agregar Otra Certificación</span>
                  </button>
                </div>
              </div>

              {/* RESUMEN DE DOCUMENTOS */}
              <div className="summary-section-step2">
                <div className="summary-header-step2">
                  <span className="summary-icon-step2">📊</span>
                  <h3 className="summary-title-step2">Resumen de Documentos Cargados</h3>
                </div>
                
                <div className="summary-items-grid">
                  <div className="summary-item-step2">
                    <span className="summary-item-label">Título Universitario:</span>
                    <span className={`summary-item-status ${formData.universityDegreeFile ? 'status-uploaded' : 'status-pending'}`}>
                      {formData.universityDegreeFile ? '✓ Cargado' : '✕ Pendiente'}
                    </span>
                  </div>
                  <div className="summary-item-step2">
                    <span className="summary-item-label">Cédula Profesional:</span>
                    <span className={`summary-item-status ${formData.professionalLicenseFile ? 'status-uploaded' : 'status-pending'}`}>
                      {formData.professionalLicenseFile ? '✓ Cargado' : '✕ Pendiente'}
                    </span>
                  </div>
                  <div className="summary-item-step2">
                    <span className="summary-item-label">Certificaciones Adicionales:</span>
                    <span className="summary-item-status status-optional">
                      {formData.certifications.filter(c => c.file).length} documento(s)
                    </span>
                  </div>
                </div>
              </div>

              {/* BOTONES */}
              <div className="form-actions">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setCurrentStep(1)}
                >
                  ← Anterior
                </Button>
                <Button type="button" variant="primary" onClick={handleNextStep2}>
                  Siguiente →
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* PASO 3: MATERIAS Y MODALIDADES */}
        {currentStep === 3 && (
          <div className="step-content">
            <div className="step-header">
              <h2 className="step-title">
                <span>📚</span> Materias y Modalidades
              </h2>
              <p className="step-description">
                Selecciona las materias que enseñas y los niveles educativos
              </p>
            </div>

            <form className="register-professor-form" onSubmit={(e) => e.preventDefault()}>
              {/* MATERIAS QUE ENSEÑAS */}
              <div className="form-section-step3">
                <div className="section-header-step3">
                  <span className="section-icon-step3">📖</span>
                  <h3 className="section-title-step3">Materias que Enseñas *</h3>
                </div>
                <p className="section-description-step3">
                  Selecciona todas las materias que puedes enseñar
                </p>

                <div className={`subjects-grid ${errors.subjects ? 'has-error' : ''}`}>
                  {subjectsOptions.map(subject => (
                    <label key={subject.id} className="subject-card">
                      <input
                        type="checkbox"
                        checked={formData.subjects.includes(subject.id)}
                        onChange={() => toggleSelection('subjects', subject.id)}
                        className="subject-checkbox-input"
                      />
                      <div className="subject-card-content">
                        <span className="subject-card-icon">{subject.icon}</span>
                        <span className="subject-card-label">{subject.name}</span>
                      </div>
                      <div className="subject-card-check">✓</div>
                    </label>
                  ))}
                </div>
                {errors.subjects && (
                  <span className="error-message-step3">{errors.subjects}</span>
                )}
              </div>

              {/* NIVELES EDUCATIVOS */}
              <div className="form-section-step3">
                <div className="section-header-step3">
                  <span className="section-icon-step3">🎓</span>
                  <h3 className="section-title-step3">Niveles Educativos *</h3>
                </div>
                <p className="section-description-step3">
                  ¿A qué niveles educativos puedes enseñar?
                </p>

                <div className={`levels-grid ${errors.educationLevels ? 'has-error' : ''}`}>
                  {educationLevelsOptions.map(level => (
                    <label key={level.id} className="level-card">
                      <input
                        type="checkbox"
                        checked={formData.educationLevels.includes(level.id)}
                        onChange={() => toggleSelection('educationLevels', level.id)}
                        className="level-checkbox-input"
                      />
                      <div className="level-card-content">
                        <span className="level-card-icon">{level.icon}</span>
                        <div className="level-card-text">
                          <span className="level-card-label">{level.name}</span>
                          <span className="level-card-subtitle">{level.subtitle}</span>
                        </div>
                      </div>
                      <div className="level-card-check">✓</div>
                    </label>
                  ))}
                </div>
                {errors.educationLevels && (
                  <span className="error-message-step3">{errors.educationLevels}</span>
                )}
              </div>

              {/* MODALIDADES DE ENSEÑANZA */}
              <div className="form-section-step3">
                <div className="section-header-step3">
                  <span className="section-icon-step3">🌐</span>
                  <h3 className="section-title-step3">Modalidades de Enseñanza *</h3>
                </div>
                <p className="section-description-step3">
                  ¿Cómo prefieres impartir tus clases?
                </p>

                <div className={`modalities-grid ${errors.teachingModalities ? 'has-error' : ''}`}>
                  {modalitiesOptions.map(modality => (
                    <label key={modality.id} className="modality-card">
                      <input
                        type="checkbox"
                        checked={formData.teachingModalities.includes(modality.id)}
                        onChange={() => toggleSelection('teachingModalities', modality.id)}
                        className="modality-checkbox-input"
                      />
                      <div className="modality-card-content">
                        <span className="modality-card-icon">{modality.icon}</span>
                        <div className="modality-card-text">
                          <span className="modality-card-label">{modality.name}</span>
                          <span className="modality-card-subtitle">{modality.subtitle}</span>
                        </div>
                      </div>
                      <div className="modality-card-check">✓</div>
                    </label>
                  ))}
                </div>
                {errors.teachingModalities && (
                  <span className="error-message-step3">{errors.teachingModalities}</span>
                )}
              </div>

              {/* TARIFA POR HORA */}
              <div className="form-section-step3">
                <div className="section-header-step3">
                  <span className="section-icon-step3">💰</span>
                  <h3 className="section-title-step3">Tarifa por Hora</h3>
                </div>

                <div className="price-fields-container">
                  <div className="price-field-group">
                    <label className="price-field-label">
                      Precio por Hora (USD) <span className="required-asterisk">*</span>
                    </label>
                    <input
                      type="number"
                      name="pricePerHour"
                      placeholder="15"
                      value={formData.pricePerHour}
                      onChange={handleChange}
                      className={`price-input ${errors.pricePerHour ? 'input-error' : ''}`}
                      min="0"
                      step="0.01"
                    />
                    {errors.pricePerHour && (
                      <span className="error-message-step3">{errors.pricePerHour}</span>
                    )}
                    <span className="price-helper-text">Establece tu tarifa por hora de clase</span>
                  </div>

                  <div className="price-field-group">
                    <label className="price-field-label">
                      Moneda <span className="required-asterisk">*</span>
                    </label>
                    <select
                      name="currency"
                      value={formData.currency}
                      onChange={handleChange}
                      className={`price-select ${errors.currency ? 'input-error' : ''}`}
                    >
                      {currencyOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {errors.currency && (
                      <span className="error-message-step3">{errors.currency}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* RESUMEN DE SELECCIÓN */}
              <div className="summary-section-step3">
                <div className="summary-header-step3">
                  <span className="summary-icon-step3">📊</span>
                  <h3 className="summary-title-step3">Resumen de tu Selección</h3>
                </div>
                
                <div className="summary-items-step3">
                  <div className="summary-item-box">
                    <span className="summary-box-label">Materias seleccionadas:</span>
                    <span className="summary-box-value">
                      {formData.subjects.length} materia{formData.subjects.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="summary-item-box">
                    <span className="summary-box-label">Niveles educativos:</span>
                    <span className="summary-box-value">
                      {formData.educationLevels.length} nivel{formData.educationLevels.length !== 1 ? 'es' : ''}
                    </span>
                  </div>
                  <div className="summary-item-box">
                    <span className="summary-box-label">Modalidades:</span>
                    <span className="summary-box-value">
                      {formData.teachingModalities.length} modalidad{formData.teachingModalities.length !== 1 ? 'es' : ''}
                    </span>
                  </div>
                </div>
              </div>

              {/* BOTONES */}
              <div className="form-actions">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setCurrentStep(2)}
                >
                  ← Anterior
                </Button>
                <Button type="button" variant="primary" onClick={handleNextStep3}>
                  Siguiente →
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* PASO 4: DISPONIBILIDAD HORARIA */}
        {currentStep === 4 && (
          <div className="step-content">
            <div className="step-header">
              <h2 className="step-title">
                <span>📅</span> Disponibilidad Horaria
              </h2>
              <p className="step-description">
                Selecciona los horarios en los que estás disponible para dar clases
              </p>
            </div>

            <form className="register-professor-form" onSubmit={(e) => e.preventDefault()}>
              {/* CONSEJOS */}
              <div className="tips-section-step4">
                <div className="tips-header-step4">
                  <span className="tips-icon-step4">💡</span>
                  <h3 className="tips-title-step4">Consejos para tu horario</h3>
                </div>
                <ul className="tips-list-step4">
                  <li>Sé flexible y ofrece diferentes horarios para atraer más estudiantes</li>
                  <li>Considera las zonas horarias si ofreces clases en línea</li>
                  <li>Puedes actualizar tu disponibilidad en cualquier momento desde tu perfil</li>
                </ul>
              </div>

              {/* TABLA DE HORARIOS */}
              <div className="form-section-step4">
                <div className="section-header-step4">
                  <span className="section-icon-step4">🕐</span>
                  <h3 className="section-title-step4">Selecciona tu Disponibilidad *</h3>
                </div>

                <div className={`schedule-table-step4 ${errors.schedule ? 'schedule-error-step4' : ''}`}>
                  {/* ENCABEZADO DE LA TABLA */}
                  <div className="schedule-header-step4">
                    <div className="schedule-day-header"></div>
                    <div className="schedule-period-header">
                      <span className="period-icon-step4">🌅</span>
                      <div className="period-info-step4">
                        <span className="period-name-step4">Mañana</span>
                        <span className="period-time-step4">6:00 - 12:00</span>
                      </div>
                    </div>
                    <div className="schedule-period-header">
                      <span className="period-icon-step4">☀️</span>
                      <div className="period-info-step4">
                        <span className="period-name-step4">Tarde</span>
                        <span className="period-time-step4">12:00 - 18:00</span>
                      </div>
                    </div>
                    <div className="schedule-period-header">
                      <span className="period-icon-step4">🌙</span>
                      <div className="period-info-step4">
                        <span className="period-name-step4">Noche</span>
                        <span className="period-time-step4">18:00 - 23:00</span>
                      </div>
                    </div>
                    <div className="schedule-period-header">
                      <span className="period-all-step4">Todo el día</span>
                    </div>
                  </div>

                  {/* FILAS DE DÍAS */}
                  {['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'].map(day => (
                    <div key={day} className="schedule-row-step4">
                      <div className="schedule-day-name-step4">
                        {day.charAt(0).toUpperCase() + day.slice(1)}
                      </div>
                      
                      {/* MAÑANA */}
                      <div className="schedule-checkbox-cell-step4">
                        <div 
                          className="schedule-checkbox-step4"
                          onClick={() => handleScheduleChange(day, 'manana')}
                        >
                          <input
                            type="checkbox"
                            checked={formData.schedule[day].manana}
                            onChange={() => {}} // Manejado por el onClick del div
                            readOnly
                          />
                          <span className="checkmark-step4"></span>
                        </div>
                      </div>

                      {/* TARDE */}
                      <div className="schedule-checkbox-cell-step4">
                        <div 
                          className="schedule-checkbox-step4"
                          onClick={() => handleScheduleChange(day, 'tarde')}
                        >
                          <input
                            type="checkbox"
                            checked={formData.schedule[day].tarde}
                            onChange={() => {}} // Manejado por el onClick del div
                            readOnly
                          />
                          <span className="checkmark-step4"></span>
                        </div>
                      </div>

                      {/* NOCHE */}
                      <div className="schedule-checkbox-cell-step4">
                        <div 
                          className="schedule-checkbox-step4"
                          onClick={() => handleScheduleChange(day, 'noche')}
                        >
                          <input
                            type="checkbox"
                            checked={formData.schedule[day].noche}
                            onChange={() => {}} // Manejado por el onClick del div
                            readOnly
                          />
                          <span className="checkmark-step4"></span>
                        </div>
                      </div>

                      {/* TODO EL DÍA */}
                      <div className="schedule-checkbox-cell-step4">
                        <button
                          type="button"
                          className={`add-all-btn-step4 ${formData.schedule[day].todoElDia ? 'active' : ''}`}
                          onClick={() => handleScheduleChange(day, 'todoElDia')}
                          title={formData.schedule[day].todoElDia ? 'Desmarcar todo el día' : 'Marcar todo el día'}
                        >
                          {formData.schedule[day].todoElDia ? '✓' : '+'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {errors.schedule && (
                  <span className="error-message-step4">{errors.schedule}</span>
                )}
              </div>

              {/* PREFERENCIAS ADICIONALES */}
              <div className="form-section-step4">
                <div className="section-header-step4">
                  <span className="section-icon-step4">⚙️</span>
                  <h3 className="section-title-step4">Preferencias Adicionales</h3>
                </div>

                <div className="preferences-grid-step4">
                  <div className="preference-field-step4">
                    <label className="preference-label-step4">
                      Máximo de Estudiantes por Clase <span className="required-asterisk">*</span>
                    </label>
                    <select
                      name="maxStudentsPerClass"
                      value={formData.maxStudentsPerClass}
                      onChange={handleChange}
                      className={`preference-select-step4 ${errors.maxStudentsPerClass ? 'input-error' : ''}`}
                    >
                      {maxStudentsOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {errors.maxStudentsPerClass && (
                      <span className="error-message-step4">{errors.maxStudentsPerClass}</span>
                    )}
                    <span className="preference-helper-step4">Define el número máximo de estudiantes que aceptas por clase</span>
                  </div>

                  <div className="preference-field-step4">
                    <label className="preference-label-step4">
                      Tiempo de Anticipación para Reservas <span className="required-asterisk">*</span>
                    </label>
                    <select
                      name="reservationTime"
                      value={formData.reservationTime}
                      onChange={handleChange}
                      className={`preference-select-step4 ${errors.reservationTime ? 'input-error' : ''}`}
                    >
                      {reservationTimeOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {errors.reservationTime && (
                      <span className="error-message-step4">{errors.reservationTime}</span>
                    )}
                    <span className="preference-helper-step4">¿Con cuánta anticipación deben reservar los estudiantes?</span>
                  </div>
                </div>

                <div className="notes-field-step4">
                  <label className="notes-label-step4">
                    Notas Adicionales sobre tu Disponibilidad
                  </label>
                  <textarea
                    name="availabilityNotes"
                    value={formData.availabilityNotes}
                    onChange={handleChange}
                    placeholder="Ej: Tengo mayor disponibilidad durante vacaciones escolares, puedo ajustar horarios para grupos, etc."
                    maxLength={300}
                    className="notes-textarea-step4"
                    rows="4"
                  />
                  <div className="notes-char-count-step4">
                    {formData.availabilityNotes.length}/300 caracteres
                  </div>
                  {errors.availabilityNotes && (
                    <span className="error-message-step4">{errors.availabilityNotes}</span>
                  )}
                </div>
              </div>

              {/* RESUMEN DE DISPONIBILIDAD */}
              <div className="summary-section-step4">
                <div className="summary-header-step4">
                  <span className="summary-icon-step4">📊</span>
                  <h3 className="summary-title-step4">Resumen de Disponibilidad</h3>
                </div>
                
                <div className="summary-items-step4">
                  <div className="summary-item-box-step4">
                    <span className="summary-box-icon-step4">📅</span>
                    <div className="summary-box-content-step4">
                      <span className="summary-box-label-step4">Franjas horarias seleccionadas</span>
                      <span className="summary-box-value-step4">
                        {getScheduleStats().timeSlots} franja{getScheduleStats().timeSlots !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                  <div className="summary-item-box-step4">
                    <span className="summary-box-icon-step4">📆</span>
                    <div className="summary-box-content-step4">
                      <span className="summary-box-label-step4">Días disponibles</span>
                      <span className="summary-box-value-step4">
                        {getScheduleStats().daysAvailable} día{getScheduleStats().daysAvailable !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                  <div className="summary-item-box-step4">
                    <span className="summary-box-icon-step4">👥</span>
                    <div className="summary-box-content-step4">
                      <span className="summary-box-label-step4">Estudiantes máx. por clase</span>
                      <span className="summary-box-value-step4">
                        {maxStudentsOptions.find(opt => opt.value === formData.maxStudentsPerClass)?.label.split('(')[0].trim() || 'No seleccionado'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* BOTONES */}
              <div className="form-actions">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setCurrentStep(3)}
                >
                  ← Anterior
                </Button>
                <Button type="button" variant="primary" onClick={handleNextStep4}>
                  Siguiente →
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* PASO 5: CONFIRMACIÓN Y REVISIÓN */}
        {currentStep === 5 && (
          <div className="step-content">
            <div className="step-header">
              <h2 className="step-title">
                <span>✅</span> Confirmación y Revisión
              </h2>
              <p className="step-description">
                Revisa toda tu información antes de enviar tu solicitud
              </p>
            </div>

            <form className="register-professor-form" onSubmit={(e) => e.preventDefault()}>
              {/* MENSAJE DE BIENVENIDA */}
              <div className="success-message-section">
                <div className="success-icon">🎉</div>
                <h3 className="success-title">¡Estás a un paso de unirte a EduMatch!</h3>
                <p className="success-description">
                  Al completar tu registro, nuestro equipo revisará tu perfil y te enviaremos una confirmación 
                  por correo electrónico en las próximas 24-48 horas.
                </p>
                <p className="success-subdescription">
                  Una vez aprobado, podrás comenzar a recibir solicitudes de estudiantes y empezar a 
                  compartir tu conocimiento.
                </p>
              </div>

              {/* SECCIÓN 1: INFORMACIÓN PERSONAL */}
              <div className="review-section">
                <div className="review-header">
                  <span className="review-icon">👤</span>
                  <h3 className="review-title">Información Personal</h3>
                </div>

                <div className="review-grid">
                  <div className="review-item">
                    <span className="review-label">Nombre completo:</span>
                    <span className="review-value">{formData.firstName} {formData.lastName}</span>
                  </div>
                  <div className="review-item">
                    <span className="review-label">Email:</span>
                    <span className="review-value">{formData.email}</span>
                  </div>
                  <div className="review-item">
                    <span className="review-label">Teléfono:</span>
                    <span className="review-value">{formData.phone}</span>
                  </div>
                  <div className="review-item">
                    <span className="review-label">Fecha de nacimiento:</span>
                    <span className="review-value">{formData.birthDate}</span>
                  </div>
                  <div className="review-item">
                    <span className="review-label">Género:</span>
                    <span className="review-value">
                      {genderOptions.find(opt => opt.value === formData.gender)?.label || 'No especificado'}
                    </span>
                  </div>
                </div>
              </div>

              {/* SECCIÓN 2: FORMACIÓN ACADÉMICA */}
              <div className="review-section">
                <div className="review-header">
                  <span className="review-icon">🎓</span>
                  <h3 className="review-title">Formación Académica</h3>
                </div>

                <div className="review-grid">
                  <div className="review-item">
                    <span className="review-label">Título universitario:</span>
                    <span className="review-value">{formData.universityDegree || 'No especificado'}</span>
                  </div>
                  <div className="review-item">
                    <span className="review-label">Universidad:</span>
                    <span className="review-value">{formData.university || 'No especificado'}</span>
                  </div>
                  <div className="review-item">
                    <span className="review-label">Año de graduación:</span>
                    <span className="review-value">{formData.graduationYear || 'No especificado'}</span>
                  </div>
                  <div className="review-item">
                    <span className="review-label">Cédula profesional:</span>
                    <span className="review-value">
                      {formData.professionalLicenseFile ? '✓ Documento cargado' : 'No especificado'}
                    </span>
                  </div>
                  <div className="review-item">
                    <span className="review-label">Experiencia docente:</span>
                    <span className="review-value">{getExperienceLabel()}</span>
                  </div>
                  <div className="review-item">
                    <span className="review-label">Certificaciones adicionales:</span>
                    <span className="review-value">
                      {formData.certifications.filter(c => c.file).length} certificación(es)
                    </span>
                  </div>
                </div>
              </div>

              {/* SECCIÓN 3: MATERIAS Y MODALIDADES */}
              <div className="review-section">
                <div className="review-header">
                  <span className="review-icon">📚</span>
                  <h3 className="review-title">Materias y Modalidades</h3>
                </div>

                <div className="review-grid">
                  <div className="review-item full-width">
                    <span className="review-label">Materias:</span>
                    <span className="review-value">{getSelectedSubjectsNames()}</span>
                  </div>
                  <div className="review-item full-width">
                    <span className="review-label">Niveles educativos:</span>
                    <span className="review-value">{getSelectedLevelsNames()}</span>
                  </div>
                  <div className="review-item full-width">
                    <span className="review-label">Modalidades:</span>
                    <span className="review-value">{getSelectedModalitiesNames()}</span>
                  </div>
                  <div className="review-item">
                    <span className="review-label">Tarifa por hora:</span>
                    <span className="review-value">
                      {formData.pricePerHour} {formData.currency}
                    </span>
                  </div>
                </div>
              </div>

              {/* SECCIÓN 4: DISPONIBILIDAD HORARIA */}
              <div className="review-section">
                <div className="review-header">
                  <span className="review-icon">📅</span>
                  <h3 className="review-title">Disponibilidad Horaria</h3>
                </div>

                <div className="review-grid">
                  <div className="review-item">
                    <span className="review-label">Horarios disponibles:</span>
                    <span className="review-value">
                      {getScheduleStats().timeSlots} franja{getScheduleStats().timeSlots !== 1 ? 's' : ''} horaria{getScheduleStats().timeSlots !== 1 ? 's' : ''} seleccionada{getScheduleStats().timeSlots !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="review-item">
                    <span className="review-label">Estudiantes máximo por clase:</span>
                    <span className="review-value">
                      {maxStudentsOptions.find(opt => opt.value === formData.maxStudentsPerClass)?.label.split('(')[0].trim() || 'No especificado'}
                    </span>
                  </div>
                  <div className="review-item">
                    <span className="review-label">Tiempo de anticipación:</span>
                    <span className="review-value">
                      {reservationTimeOptions.find(opt => opt.value === formData.reservationTime)?.label || 'No especificado'}
                    </span>
                  </div>
                </div>
              </div>

              {/* TÉRMINOS Y CONDICIONES */}
              <div className="terms-section">
                <div className="terms-checkbox-group">
                  <label className={`terms-checkbox ${errors.acceptTerms ? 'error' : ''}`}>
                    <input
                      type="checkbox"
                      checked={formData.acceptTerms}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, acceptTerms: e.target.checked }));
                        if (errors.acceptTerms) {
                          setErrors(prev => ({ ...prev, acceptTerms: '' }));
                        }
                      }}
                    />
                    <span className="terms-checkmark"></span>
                    <span className="terms-text">
                      He leído y acepto los{' '}
                      <a href="/terminos-condiciones" target="_blank" rel="noopener noreferrer">
                        Términos y Condiciones
                      </a>
                      {' '}y la{' '}
                      <a href="/politica-privacidad" target="_blank" rel="noopener noreferrer">
                        Política de Privacidad
                      </a>
                    </span>
                  </label>
                  {errors.acceptTerms && (
                    <span className="error-message">{errors.acceptTerms}</span>
                  )}

                  <label className={`terms-checkbox ${errors.acceptPrivacy ? 'error' : ''}`}>
                    <input
                      type="checkbox"
                      checked={formData.acceptPrivacy}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, acceptPrivacy: e.target.checked }));
                        if (errors.acceptPrivacy) {
                          setErrors(prev => ({ ...prev, acceptPrivacy: '' }));
                        }
                      }}
                    />
                    <span className="terms-checkmark"></span>
                    <span className="terms-text">
                      Autorizo el uso de mis datos personales según la política de privacidad
                    </span>
                  </label>
                  {errors.acceptPrivacy && (
                    <span className="error-message">{errors.acceptPrivacy}</span>
                  )}

                  <label className="terms-checkbox optional">
                    <input
                      type="checkbox"
                      checked={formData.acceptNotifications}
                      onChange={(e) => setFormData(prev => ({ ...prev, acceptNotifications: e.target.checked }))}
                    />
                    <span className="terms-checkmark"></span>
                    <span className="terms-text">
                      Deseo recibir notificaciones sobre nuevas solicitudes de clases (opcional)
                    </span>
                  </label>
                </div>
              </div>

              {/* BOTONES */}
              <div className="form-actions">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setCurrentStep(4)}
                >
                  ← Anterior
                </Button>
                <Button 
                  type="button" 
                  variant="primary" 
                  onClick={handleSubmitRegistration}
                >
                  🎉 Completar Registro
                </Button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}

export default RegisterProfessor;