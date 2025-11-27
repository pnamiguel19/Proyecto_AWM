import React, { useState } from 'react';
import UploadDocumentModal from '../../../components/Professor/UploadDocumentModal';
import './Documents.css';

function Documents() {
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Documentos cargados
  const documents = [
    {
      id: 1,
      title: 'Título Universitario (Licenciatura/Maestría)',
      description: 'Certificado de estudios superiores en Física.',
      status: 'approved',
      uploadDate: '15 Oct 2024',
      fileName: 'titulo_fisica.pdf'
    },
    {
      id: 2,
      title: 'Cédula Profesional o Permiso de Ejercicio',
      description: 'Documento que habilita el ejercicio de la profesión.',
      status: 'approved',
      uploadDate: '15 Oct 2024',
      fileName: 'cedula_profesional.pdf'
    },
    {
      id: 3,
      title: 'Identificación Oficial (Cédula de Identidad/Pasaporte)',
      description: 'Documento de identidad vigente. Imagen borrosa.',
      status: 'rejected',
      uploadDate: '14 Oct 2024',
      fileName: 'id_oficial.jpg',
      rejectionReason: 'La imagen del documento está borrosa y no se puede verificar la información.'
    },
    {
      id: 4,
      title: 'Certificación de Inglés Avanzado C1',
      description: 'Certificado oficial de dominio del idioma inglés.',
      status: 'uploaded',
      uploadDate: '22 Oct 2024',
      fileName: 'cert_ingles_c1.pdf'
    },
    {
      id: 5,
      title: 'Certificado de Antecedentes Penales',
      description: 'Certificado limpio de antecedentes penales.',
      status: 'approved',
      uploadDate: '10 Oct 2024',
      fileName: 'antecedentes_penales.pdf'
    }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return { text: '✓ Aprobado', className: 'approved' };
      case 'rejected':
        return { text: '✕ Rechazado', className: 'rejected' };
      case 'uploaded':
        return { text: '⏳ En Revisión', className: 'uploaded' };
      default:
        return { text: 'Pendiente', className: 'pending' };
    }
  };

  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    switch(extension) {
      case 'pdf': return '📄';
      case 'jpg':
      case 'jpeg':
      case 'png': return '🖼️';
      default: return '📎';
    }
  };

  const handleUpload = (documentData) => {
    console.log('Documento subido:', documentData);
    alert('Documento subido exitosamente. Será revisado en 24-48 horas.');
    // Aquí iría la lógica para enviar al backend
  };

  return (
    <div className="doc-container">
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
              <div className="doc-card-content">
                <div className="doc-card-header">
                  <div className="doc-card-icon">{getFileIcon(doc.fileName)}</div>
                  <div className="doc-card-info">
                    <h3 className="doc-card-title">{doc.title}</h3>
                    <p className="doc-card-description">{doc.description}</p>
                    <div className="doc-card-meta">
                      <span className="doc-card-file">📎 {doc.fileName}</span>
                      <span className="doc-card-date">🕐 Subido el {doc.uploadDate}</span>
                    </div>
                  </div>
                </div>

                <div className="doc-card-right">
                  <span className={`doc-status-badge ${badge.className}`}>
                    {badge.text}
                  </span>
                  <div className="doc-card-actions">
                    <button className="doc-btn-view" title="Ver documento">
                      👁️ Ver
                    </button>
                    <button className="doc-btn-download" title="Descargar">
                      ⬇️
                    </button>
                    {doc.status === 'rejected' && (
                      <button className="doc-btn-reupload" onClick={() => setShowUploadModal(true)}>
                        🔄 Re-subir
                      </button>
                    )}
                    <button className="doc-btn-delete" title="Eliminar">
                      🗑️
                    </button>
                  </div>
                </div>
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

      {/* UPLOAD MODAL */}
      <UploadDocumentModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onUpload={handleUpload}
      />
    </div>
  );
}

export default Documents;