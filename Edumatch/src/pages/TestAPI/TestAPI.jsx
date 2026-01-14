import { useState, useEffect } from 'react';
import api from '../services/api';
import './TestAPI.css';

/**
 * Componente de prueba para demostrar el uso de la API REST
 * Este componente muestra cómo usar los métodos GET, POST y DELETE
 */
function TestAPI() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    price: 0
  });
  const [serverStatus, setServerStatus] = useState(null);

  // Cargar items al montar el componente
  useEffect(() => {
    loadItems();
    checkServerHealth();
  }, []);

  // GET - Obtener todos los items
  const loadItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.items.getAll();
      setItems(response.data);
    } catch (err) {
      setError('Error al cargar items: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // POST - Crear nuevo item
  const handleCreateItem = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const response = await api.items.create(newItem);
      console.log('Item creado:', response);
      
      // Limpiar formulario
      setNewItem({ name: '', description: '', price: 0 });
      
      // Recargar lista
      await loadItems();
      
      alert('✅ Item creado exitosamente!');
    } catch (err) {
      setError('Error al crear item: ' + err.message);
      alert('❌ Error al crear item');
    } finally {
      setLoading(false);
    }
  };

  // DELETE - Eliminar item
  const handleDeleteItem = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este item?')) {
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await api.items.delete(id);
      console.log('Item eliminado:', response);
      
      // Recargar lista
      await loadItems();
      
      alert('✅ Item eliminado exitosamente!');
    } catch (err) {
      setError('Error al eliminar item: ' + err.message);
      alert('❌ Error al eliminar item');
    } finally {
      setLoading(false);
    }
  };

  // GET - Verificar estado del servidor
  const checkServerHealth = async () => {
    try {
      const response = await api.healthCheck();
      setServerStatus(response);
    } catch (err) {
      console.error('Error al verificar estado del servidor:', err);
    }
  };

  return (
    <div className="test-api-container">
      <h1>🧪 Prueba de API REST - EduMatch</h1>

      {/* Estado del servidor */}
      {serverStatus && (
        <div className="server-status">
          <h3>Estado del Servidor</h3>
          <p>✅ Estado: {serverStatus.status}</p>
          <p>⏱️ Tiempo activo: {Math.floor(serverStatus.uptime)}s</p>
        </div>
      )}

      {/* Mensajes de error */}
      {error && (
        <div className="error-message">
          ❌ {error}
        </div>
      )}

      {/* Formulario para crear items (POST) */}
      <div className="create-section">
        <h2>➕ Crear Nuevo Item (POST)</h2>
        <form onSubmit={handleCreateItem}>
          <div className="form-group">
            <label>Nombre:</label>
            <input
              type="text"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              required
              placeholder="Ej: Curso de React"
            />
          </div>

          <div className="form-group">
            <label>Descripción:</label>
            <input
              type="text"
              value={newItem.description}
              onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              required
              placeholder="Ej: Aprende React desde cero"
            />
          </div>

          <div className="form-group">
            <label>Precio:</label>
            <input
              type="number"
              value={newItem.price}
              onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) })}
              min="0"
              step="0.01"
            />
          </div>

          <button type="submit" disabled={loading} className="btn-create">
            {loading ? 'Creando...' : 'Crear Item'}
          </button>
        </form>
      </div>

      {/* Lista de items (GET) */}
      <div className="items-section">
        <div className="section-header">
          <h2>📋 Lista de Items (GET)</h2>
          <button onClick={loadItems} disabled={loading} className="btn-refresh">
            {loading ? '⏳ Cargando...' : '🔄 Recargar'}
          </button>
        </div>

        {loading && items.length === 0 ? (
          <p className="loading">Cargando items...</p>
        ) : (
          <div className="items-grid">
            {items.length === 0 ? (
              <p>No hay items disponibles</p>
            ) : (
              items.map((item) => (
                <div key={item.id} className="item-card">
                  <h3>{item.name}</h3>
                  <p className="description">{item.description}</p>
                  <p className="price">💰 ${item.price}</p>
                  <p className="id">ID: {item.id}</p>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    disabled={loading}
                    className="btn-delete"
                  >
                    🗑️ Eliminar (DELETE)
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Información de endpoints */}
      <div className="endpoints-info">
        <h2>📡 Endpoints Disponibles</h2>
        <ul>
          <li><strong>GET</strong> /api/items - Obtener todos los items</li>
          <li><strong>GET</strong> /api/items/:id - Obtener un item por ID</li>
          <li><strong>POST</strong> /api/items - Crear un nuevo item</li>
          <li><strong>DELETE</strong> /api/items/:id - Eliminar un item</li>
          <li><strong>GET</strong> /api/health - Estado del servidor</li>
        </ul>
      </div>
    </div>
  );
}

export default TestAPI;
