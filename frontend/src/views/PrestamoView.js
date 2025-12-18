import React, { useState, useEffect } from 'react';
// Importa el servicio de API, NO la vista
import { prestamosAPI } from '../services/api'; 

const PrestamoView = () => {
  const [prestamos, setPrestamos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    equipo: '',
    empleado_id: '',
    fecha_prestamo: '',
    estado: 'operativo'
  });

  useEffect(() => {
    loadPrestamos();
  }, []);

  const loadPrestamos = async () => {
    try {
      setLoading(true);
      const response = await prestamosAPI.getAll();
      setPrestamos(response.data);
    } catch (err) {
      setError('Error al cargar préstamos');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await prestamosAPI.create(formData);
      loadPrestamos();
      setFormData({ equipo: '', empleado_id: '', fecha_prestamo: '', estado: 'operativo' });
    } catch (err) {
      setError('Error al registrar el préstamo');
    }
  };

  if (loading) return <div className="loading">Cargando...</div>;

  return (
    <div className="container">
      <div className="card">
        <h2>Gestión de Préstamos de Equipos</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Equipo:</label>
            <input 
              type="text" 
              value={formData.equipo}
              onChange={(e) => setFormData({...formData, equipo: e.target.value})}
              required 
            />
          </div>
          <div className="form-group">
            <label>Fecha de Préstamo:</label>
            <input 
              type="date" 
              value={formData.fecha_prestamo}
              onChange={(e) => setFormData({...formData, fecha_prestamo: e.target.value})}
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary">Registrar Préstamo</button>
        </form>
      </div>
      {/* Tabla de préstamos omitida por brevedad */}
    </div>
  );
};

export default PrestamoView; // Asegúrate de que esta línea esté presente