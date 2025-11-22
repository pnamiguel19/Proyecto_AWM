import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Documents.css';

function Documents() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user || user.role !== 'professor') {
      navigate('/login');
      return;
    }
    setCurrentUser(user);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  const getInitials = () => {
    if (!currentUser) return '';
    return `${currentUser.firstName?.[0] || ''}${currentUser.lastName?.[0] || ''}`;
  };

  const menuItems = [
    { id: 'info', icon: '👤', label: 'Información sobre mí', path: '/professor/profile' },
    { id: 'classes', icon: '📚', label: 'Mis Clases', path: '/professor/classes' },
    { id: 'courses', icon: '📖', label: 'Mis Cursos', path: '/professor/courses' },
    { id: 'history', icon: '📊', label: 'Mi historial de Enseñanza', path: '/professor/history' },
    { id: 'schedule', icon: '📅', label: 'Disponibilidad y Horario', path: '/professor/schedule' },
    { id: 'documents', icon: '📄', label: 'Documentos de Acreditación', path: '/professor/documents' },
    { id: 'ratings', icon: '⭐', label: 'Mis Calificaciones y reseñas', path: '/professor/ratings' }
  ];

  // Documentos cargados
  const documents = [
    {
      id: 1,
      title: 'Título Universitario (Licenciatura/Maestría)',
      description: 'Certificado de estudios superiores en Física.',
      status: 'approved',
      uploadDate: '15 Oct 2024'
    },
    {
      id: 2,
      title: 'Cédula Profesional o Permiso de Ejercicio',
      description: 'Documento que habilita el ejercicio de la profesión.',
      status: 'approved',
      uploadDate: '15 Oct 2024'
    },
    {
      id: 3,
      title: 'Identificación Oficial (Cédula de Identidad/Pasaporte)',
      description: 'Documento de identidad vigente. Imagen borrosa.',
      status: 'rejected',
      uploadDate: '14 Oct 2024',
      rejectionReason: 'La imagen del documento está borrosa y no se puede verificar la información.'
    },
    {
      id: 4,
      title: 'Certificación de Inglés Avanzado C1',
      description: 'Certificado oficial de dominio del idioma inglés.',
      status: 'uploaded',
      uploadDate: '22 Oct 2024'
    },
    {
      id: 5,
      title: 'Certificado de Antecedentes Penales',
      description: 'Certificado limpio de antecedentes penales.',
      status: 'approved',
      uploadDate: '10 Oct 2024'
    }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return { text: '✓ Aprobado', className: 'approved' };
      case 'rejected':
        return { text: '✕ Rechazado', className: 'rejected' };
      case 'uploaded':
        return { text: '⏳ Cargado', className: 'uploaded' };
      default:
        return { text: 'Pendiente', className: 'pending' };
    }
  };

  if (!currentUser) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Cargando...</div>;
  }

  return (
    <div className="doc-page">
      {/* HEADER */}
      <header className="doc-header">
        <div className="doc-header-content">
          <div className="doc-header-left">
            <div className="doc-logo" onClick={() => navigate('/professor/profile')}>
              <span className="doc-logo-icon">🎓</span>
              <span className="doc-logo-text">EduMatch</span>
            </div>
          </div>

          <div className="doc-header-right">
            <button className="doc-btn-convert" onClick={() => navigate('/student/home')}>
              Conviértete en Estudiante
            </button>
            
            <div className="doc-user-menu-container">
              <button
                className="doc-user-avatar-btn"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <div className="doc-avatar-placeholder">{getInitials()}</div>
                <span className="doc-menu-icon">☰</span>
              </button>

              {showUserMenu && (
                <div className="doc-user-dropdown">
                  <div className="doc-dropdown-header">
                    <p className="doc-user-name">{currentUser.firstName} {currentUser.lastName}</p>
                    <p className="doc-user-email">{currentUser.email}</p>
                  </div>
                  <div className="doc-dropdown-divider"></div>
                  <button className="doc-dropdown-item" onClick={() => navigate('/professor/profile')}>
                    👤 Mi Perfil
                  </button>
                  <button className="doc-dropdown-item doc-logout" onClick={handleLogout}>
                    🚪 Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <div className="doc-main-content">
        {/* SIDEBAR */}
        <aside className="doc-sidebar">
          <h2 className="doc-sidebar-title">Perfil</h2>
          <nav className="doc-sidebar-nav">
            {menuItems.map((item) => (
              <button
                key={item.id}
                className={`doc-sidebar-item ${item.id === 'documents' ? 'doc-active' : ''}`}
                onClick={() => navigate(item.path)}
              >
                <span className="doc-sidebar-icon">{item.icon}</span>
                <span className="doc-sidebar-label">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* MAIN SECTION */}
        <section className="doc-section">
          <div className="doc-header-section">
            <h1 className="doc-section-title">Documentos Cargados para Acreditación</h1>
            <button className="doc-btn-add" onClick={() => setShowUploadModal(true)}>
              + Agregar Certificado
            </button>
          </div>

          {/* INFO BANNER */}
          <div className="doc-info-banner">
            <div className="doc-info-icon">ℹ️</div>
            <div className="doc-info-content">
              <h3 className="doc-info-title">Información Importante</h3>
              <p className="doc-info-text">
                Todos los documentos deben estar vigentes y legibles. Los documentos rechazados deben ser resubidos con mejor calidad. 
                El proceso de verificación toma entre 24-48 horas.
              </p>
            </div>
          </div>

          {/* DOCUMENTS LIST */}
          <div className="doc-list">
            {documents.map((doc) => {
              const badge = getStatusBadge(doc.status);
              return (
                <div key={doc.id} className="doc-card">
                  <div className="doc-card-header">
                    <div className="doc-card-icon">📄</div>
                    <div className="doc-card-info">
                      <h3 className="doc-card-title">{doc.title}</h3>
                      <p className="doc-card-description">{doc.description}</p>
                      <p className="doc-card-date">Subido el: {doc.uploadDate}</p>
                    </div>
                  </div>

                  <div className="doc-card-right">
                    <span className={`doc-status-badge ${badge.className}`}>
                      {badge.text}
                    </span>
                    <button className="doc-btn-view">Ver</button>
                    {doc.status === 'rejected' && (
                      <button className="doc-btn-reupload">Re-subir</button>
                    )}
                  </div>

                  {doc.status === 'rejected' && (
                    <div className="doc-rejection-reason">
                      <div className="doc-rejection-icon">⚠️</div>
                      <div className="doc-rejection-text">
                        <strong>Motivo de rechazo:</strong> {doc.rejectionReason}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* REQUIRED DOCUMENTS */}
          <div className="doc-required-section">
            <h2 className="doc-required-title">📋 Documentos Requeridos</h2>
            <div className="doc-required-list">
              <div className="doc-required-item">
                <span className="doc-required-icon">✓</span>
                <span className="doc-required-name">Título Universitario o Certificado de Estudios</span>
              </div>
              <div className="doc-required-item">
                <span className="doc-required-icon">✓</span>
                <span className="doc-required-name">Cédula Profesional (si aplica)</span>
              </div>
              <div className="doc-required-item">
                <span className="doc-required-icon">✓</span>
                <span className="doc-required-name">Identificación Oficial Vigente</span>
              </div>
              <div className="doc-required-item">
                <span className="doc-required-icon">✓</span>
                <span className="doc-required-name">Certificado de Antecedentes Penales</span>
              </div>
              <div className="doc-required-item optional">
                <span className="doc-required-icon">○</span>
                <span className="doc-required-name">Certificaciones Adicionales (Opcional)</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* UPLOAD MODAL */}
      {showUploadModal && (
        <div className="doc-modal-overlay" onClick={() => setShowUploadModal(false)}>
          <div className="doc-modal" onClick={(e) => e.stopPropagation()}>
            <div className="doc-modal-header">
              <h2 className="doc-modal-title">Subir Nuevo Documento</h2>
              <button className="doc-modal-close" onClick={() => setShowUploadModal(false)}>✕</button>
            </div>
            
            <div className="doc-modal-body">
              <div className="doc-form-group">
                <label className="doc-form-label">Tipo de Documento</label>
                <select className="doc-form-select">
                  <option>Seleccionar tipo...</option>
                  <option>Título Universitario</option>
                  <option>Cédula Profesional</option>
                  <option>Identificación Oficial</option>
                  <option>Certificación de Idiomas</option>
                  <option>Antecedentes Penales</option>
                  <option>Otro</option>
                </select>
              </div>

              <div className="doc-form-group">
                <label className="doc-form-label">Descripción</label>
                <textarea className="doc-form-textarea" rows="3" placeholder="Describe el documento..."></textarea>
              </div>

              <div className="doc-form-group">
                <label className="doc-form-label">Archivo</label>
                <div className="doc-upload-area">
                  <div className="doc-upload-icon">📤</div>
                  <p className="doc-upload-text">Arrastra el archivo aquí o haz clic para seleccionar</p>
                  <p className="doc-upload-info">PDF, JPG, PNG (Max 5MB)</p>
                  <input type="file" className="doc-upload-input" accept=".pdf,.jpg,.jpeg,.png" />
                </div>
              </div>
            </div>

            <div className="doc-modal-footer">
              <button className="doc-btn-cancel" onClick={() => setShowUploadModal(false)}>
                Cancelar
              </button>
              <button className="doc-btn-submit">
                Subir Documento
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Documents;