// Validación en tiempo real para solo letras y espacios
        function soloLetrasInput(inputId, label) {
            const input = document.getElementById(inputId);
            input.addEventListener('input', function() {
                let value = this.value;
                // Eliminar números y caracteres especiales
                const nuevo = value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñüÜ\s]/g, '');
                if (value !== nuevo) {
                    this.value = nuevo;
                    showNotification(`Solo se permiten letras y espacios en ${label}`, 'error');
                }
            });
        }
        soloLetrasInput('degree', 'el título universitario');
        soloLetrasInput('university', 'la universidad');

        // Validación en tiempo real para año de graduación
        const graduationYearInput = document.getElementById('graduationYear');
        graduationYearInput.addEventListener('input', function() {
            let value = this.value;
            // Solo números
            const nuevo = value.replace(/[^0-9]/g, '');
            if (value !== nuevo) {
                this.value = nuevo;
                showNotification('Solo se permiten números en el año de graduación', 'error');
            }
            // Validar rango
            const yearNum = parseInt(this.value, 10);
            const currentYear = new Date().getFullYear();
            if (this.value && (yearNum < 1940 || yearNum > currentYear)) {
                showNotification(`El año debe estar entre 1940 y ${currentYear}`, 'error');
            }
        });
// Variables globales
        let uploadedDocs = {
            titulo: null,
            cedula: null,
            certificaciones: []
        };

        // Upload de Título
        document.getElementById('tituloFile').addEventListener('change', function(e) {
            handleFileUpload(e.target.files[0], 'titulo', 'tituloPreview', 'tituloStatus');
        });

        // Upload de Cédula
        document.getElementById('cedulaFile').addEventListener('change', function(e) {
            handleFileUpload(e.target.files[0], 'cedula', 'cedulaPreview', 'cedulaStatus');
        });

        // Función para manejar uploads
        function handleFileUpload(file, type, previewId, statusId) {
            if (!file) return;

            if (file.size > 10 * 1024 * 1024) {
                showNotification('El archivo no debe superar 10MB', 'error');
                return;
            }

            if (file.type !== 'application/pdf') {
                showNotification('Solo se permiten archivos PDF', 'error');
                return;
            }

            uploadedDocs[type] = file;
            
            const preview = document.getElementById(previewId);
            preview.innerHTML = `
                <div class="file-item">
                    <span class="file-icon">📄</span>
                    <div class="file-info">
                        <span class="file-name">${file.name}</span>
                        <span class="file-size">${(file.size / 1024).toFixed(2)} KB</span>
                    </div>
                    <button type="button" class="btn-remove" onclick="removeFile('${type}', '${previewId}', '${statusId}')">
                        ✕
                    </button>
                </div>
            `;

            document.getElementById(statusId).innerHTML = '✅ Cargado';
            document.getElementById(statusId).style.color = '#27AE60';
            
            showNotification('Documento cargado exitosamente', 'success');
        }

        // Remover archivo
        function removeFile(type, previewId, statusId) {
            uploadedDocs[type] = null;
            document.getElementById(previewId).innerHTML = '';
            document.getElementById(statusId).innerHTML = '❌ Pendiente';
            document.getElementById(statusId).style.color = '#E74C3C';
        }

        // Agregar certificación
        let certCount = 1;
        document.getElementById('addCertBtn').addEventListener('click', function() {
            if (certCount >= 5) {
                showNotification('Máximo 5 certificaciones permitidas', 'error');
                return;
            }

            certCount++;
            const container = document.getElementById('certificacionesList');
            const newCert = document.createElement('div');
            newCert.className = 'certificacion-item';
            newCert.innerHTML = `
                <div class="certificacion-info">
                    <div class="input-group">
                        <label>Nombre de la Certificación</label>
                        <input type="text" class="cert-name" placeholder="Ej: Diplomado en Pedagogía Digital">
                    </div>
                    <div class="input-group">
                        <label>Institución</label>
                        <input type="text" class="cert-institution" placeholder="Ej: Universidad Nacional">
                    </div>
                </div>
                <div class="certificacion-upload">
                    <div class="file-upload-area small">
                        <input type="file" class="cert-file" accept=".pdf" hidden>
                        <label class="upload-label">
                            <span class="upload-icon">📎</span>
                            <span class="upload-text">Subir PDF</span>
                        </label>
                    </div>
                    <div class="cert-preview"></div>
                </div>
                <button type="button" class="btn-remove-cert" onclick="this.parentElement.remove(); certCount--;">
                    🗑️ Eliminar
                </button>
            `;
            container.appendChild(newCert);
        });

        // Permitir subir archivo en certificaciones adicionales
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('upload-label') && e.target.parentElement.querySelector('.cert-file')) {
                e.preventDefault();
                e.target.parentElement.querySelector('.cert-file').click();
            }
        });

        // Mostrar nombre del archivo PDF seleccionado en certificaciones
        document.addEventListener('change', function(e) {
            if (e.target.classList.contains('cert-file')) {
                const certPreview = e.target.closest('.certificacion-upload').querySelector('.cert-preview');
                const file = e.target.files[0];
                if (file) {
                    if (file.type !== 'application/pdf') {
                        showNotification('Solo se permiten archivos PDF en certificaciones', 'error');
                        e.target.value = '';
                        certPreview.textContent = '';
                        return;
                    }
                    if (file.size > 10 * 1024 * 1024) {
                        showNotification('El PDF de la certificación no debe superar 10MB', 'error');
                        e.target.value = '';
                        certPreview.textContent = '';
                        return;
                    }
                    certPreview.textContent = file.name + ' (' + (file.size / 1024).toFixed(2) + ' KB)';
                } else {
                    certPreview.textContent = '';
                }
            }
        });

        // Validar y continuar
        document.getElementById('nextBtn').addEventListener('click', function() {
            // Validar título universitario (solo letras y espacios, sin números ni caracteres especiales)
            const degree = document.getElementById('degree').value.trim();
            if (!degree) {
                showNotification('Completa el título universitario', 'error');
                return;
            }
            if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñüÜ\s]+$/.test(degree)) {
                showNotification('El título solo debe contener letras y espacios, sin números ni caracteres especiales', 'error');
                return;
            }

            // Validar universidad (solo letras y espacios)
            const university = document.getElementById('university').value.trim();
            if (!university) {
                showNotification('Completa la universidad', 'error');
                return;
            }
            if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñüÜ\s]+$/.test(university)) {
                showNotification('El nombre de la universidad solo debe contener letras y espacios, sin números ni caracteres especiales', 'error');
                return;
            }

            // Validar año de graduación (solo números, rango 1940 - año actual)
            const graduationYear = document.getElementById('graduationYear').value.trim();
            const yearNum = parseInt(graduationYear, 10);
            const currentYear = new Date().getFullYear();
            if (!graduationYear) {
                showNotification('Completa el año de graduación', 'error');
                return;
            }
            if (!/^[0-9]+$/.test(graduationYear)) {
                showNotification('El año de graduación solo debe contener números', 'error');
                return;
            }
            if (yearNum < 1940 || yearNum > currentYear) {
                showNotification(`El año de graduación debe estar entre 1940 y ${currentYear}`, 'error');
                return;
            }

            // Validar experiencia
            if (!document.getElementById('experience').value) {
                showNotification('Selecciona tu experiencia', 'error');
                return;
            }

            // Validar experiencia docente (mínimo 100 caracteres, solo texto y signos básicos)
            const teachingExperience = document.getElementById('teachingExperience').value.trim();
            if (!teachingExperience || teachingExperience.length < 100) {
                showNotification('Describe tu experiencia (mínimo 100 caracteres)', 'error');
                return;
            }
            if (/[^A-Za-zÁÉÍÓÚáéíóúÑñüÜ\s.,;:()\-]/.test(teachingExperience)) {
                showNotification('La experiencia solo debe contener letras, espacios y signos básicos', 'error');
                return;
            }

            // Validar archivos obligatorios
            if (!uploadedDocs.titulo) {
                showNotification('Debes subir tu título universitario', 'error');
                return;
            }
            if (!uploadedDocs.cedula) {
                showNotification('Debes subir tu cédula profesional', 'error');
                return;
            }

            // Validar certificados adicionales (si existen, nombre e institución solo letras y espacios, archivo PDF obligatorio)
            const certItems = document.querySelectorAll('.certificacion-item');
            for (let cert of certItems) {
                const certName = cert.querySelector('.cert-name').value.trim();
                const certInst = cert.querySelector('.cert-institution').value.trim();
                const certFileInput = cert.querySelector('.cert-file');
                const certFile = certFileInput && certFileInput.files && certFileInput.files[0];
                if (certName || certInst || (certFile && certFile.name)) {
                    if (!certName) {
                        showNotification('Completa el nombre de la certificación', 'error');
                        return;
                    }
                    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñüÜ\s]+$/.test(certName)) {
                        showNotification('El nombre de la certificación solo debe contener letras y espacios', 'error');
                        return;
                    }
                    if (!certInst) {
                        showNotification('Completa la institución de la certificación', 'error');
                        return;
                    }
                    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñüÜ\s]+$/.test(certInst)) {
                        showNotification('La institución de la certificación solo debe contener letras y espacios', 'error');
                        return;
                    }
                    if (!certFile) {
                        showNotification('Debes subir el PDF de la certificación', 'error');
                        return;
                    }
                    if (certFile.type !== 'application/pdf') {
                        showNotification('La certificación debe ser un archivo PDF', 'error');
                        return;
                    }
                    if (certFile.size > 10 * 1024 * 1024) {
                        showNotification('El PDF de la certificación no debe superar 10MB', 'error');
                        return;
                    }
                }
            }

            // Todo validado, continuar al paso 3
            showNotification('¡Información guardada! Continuando...', 'success');
            setTimeout(() => {
                window.location.href = 'ExperienciaProfesor.html';
            }, 1500);
        });
        // Botón ANTERIOR
        const backBtn = document.querySelector('.btn.btn-secondary');
        if (backBtn) {
            backBtn.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = 'RegistroProfesor.html';
            });
        }

        // Mostrar notificación
        function showNotification(message, type) {
            const notification = document.getElementById('notification');
            const icon = type === 'success' ? '✅' : '⚠️';
            notification.querySelector('.notification-icon').textContent = icon;
            notification.querySelector('.notification-message').textContent = message;
            notification.classList.add('show', type);
            
            setTimeout(() => {
                notification.classList.remove('show', type);
            }, 3000);


        // Observar cambios en la lista de certificaciones (alta y baja de elementos)
        const certList = document.getElementById('certificacionesList');
        if (certList) {
            updateCertCount(); // inicial
            const observer = new MutationObserver(() => updateCertCount());
            observer.observe(certList, { childList: true });
        }

        // Por seguridad, actualizar también después del click en el botón agregar
        const addCertBtnEl = document.getElementById('addCertBtn');
        if (addCertBtnEl) {
            addCertBtnEl.addEventListener('click', () => {
                // espera breve para que el handler existente complete la adición
                setTimeout(updateCertCount, 0);
            });
        }

        // Actualizar cuando se elimina mediante botones dinámicos (inline onclick o delegados)
        document.addEventListener('click', function(e) {
            if (e.target && e.target.classList && e.target.classList.contains('btn-remove-cert')) {
                setTimeout(updateCertCount, 0);
            }
        });
    }