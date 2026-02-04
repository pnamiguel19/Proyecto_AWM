import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authService from '../services/api/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // ==================== CARGAR SESIÓN AL INICIAR (DESACTIVADO PARA PRUEBAS) ====================
  useEffect(() => {
    // 🔴 COMENTAR ESTO PARA PRUEBAS - NO CARGAR SESIÓN PERSISTENTE
    // checkStoredAuth();
    
    // 🟢 PARA PRUEBAS: Siempre empezar sin sesión
    setLoading(false);
    console.log('⚠️  MODO PRUEBAS: Sesión persistente desactivada');
  }, []);

  // Función para verificar autenticación almacenada (DESACTIVADA)
  const checkStoredAuth = async () => {
    try {
      console.log('🔍 Verificando sesión almacenada...');
      const storedToken = await AsyncStorage.getItem('token');
      const storedUser = await AsyncStorage.getItem('user');

      if (storedToken && storedUser) {
        const parsedUser = JSON.parse(storedUser);
        
        // Verificar token con el backend
        const response = await authService.verifyToken();
        
        if (response.success) {
          setToken(storedToken);
          setUser(parsedUser);
          setIsAuthenticated(true);
          console.log('✅ Sesión restaurada:', parsedUser.email);
        } else {
          // Token inválido, limpiar
          await AsyncStorage.removeItem('token');
          await AsyncStorage.removeItem('user');
          console.log('⚠️  Token expirado, sesión limpiada');
        }
      } else {
        console.log('📱 No hay sesión almacenada');
      }
    } catch (error) {
      console.error('❌ Error al verificar sesión:', error);
    } finally {
      setLoading(false);
    }
  };

  // ==================== LOGIN ====================
  const login = async (email, password) => {
    try {
      console.log('🔐 Intentando login con:', email);
      setLoading(true);

      const response = await authService.login({ 
        email: email.toLowerCase().trim(), 
        password: password 
      });

      if (response.success) {
        const { token, user } = response.data;

        // 🔴 COMENTAR PARA PRUEBAS - NO GUARDAR EN ASYNCSTORAGE
        // await AsyncStorage.setItem('token', token);
        // await AsyncStorage.setItem('user', JSON.stringify(user));

        setToken(token);
        setUser(user);
        setIsAuthenticated(true);

        console.log('✅ Login exitoso:', user.firstName, '-', user.role);

        return { success: true, data: { user, token } };
      } else {
        throw new Error(response.message || 'Error en el login');
      }
    } catch (error) {
      console.error('❌ Error en login:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ==================== REGISTER STUDENT ====================
  const registerStudent = async (studentData) => {
    try {
      console.log('📝 Registrando estudiante:', studentData.email);
      setLoading(true);

      const response = await authService.registerStudent(studentData);

      if (response.success) {
        const { token, user } = response.data;

        // 🔴 COMENTAR PARA PRUEBAS
        // await AsyncStorage.setItem('token', token);
        // await AsyncStorage.setItem('user', JSON.stringify(user));

        setToken(token);
        setUser(user);
        setIsAuthenticated(true);

        console.log('✅ Estudiante registrado:', user.email);

        return { success: true, data: { user, token } };
      } else {
        throw new Error(response.message || 'Error en el registro');
      }
    } catch (error) {
      console.error('❌ Error en registro de estudiante:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ==================== REGISTER PROFESSOR ====================
  const registerProfessor = async (professorData, documents) => {
    try {
      console.log('📝 Registrando profesor:', professorData.email);
      setLoading(true);

      const response = await authService.registerProfessor(professorData, documents);

      if (response.success) {
        const { token, user } = response.data;

        // 🔴 COMENTAR PARA PRUEBAS
        // await AsyncStorage.setItem('token', token);
        // await AsyncStorage.setItem('user', JSON.stringify(user));

        setToken(token);
        setUser(user);
        setIsAuthenticated(true);

        console.log('✅ Profesor registrado:', user.email);

        return { success: true, data: { user, token } };
      } else {
        throw new Error(response.message || 'Error en el registro');
      }
    } catch (error) {
      console.error('❌ Error en registro de profesor:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ==================== LOGOUT ====================
  const logout = async () => {
    try {
      console.log('🚪 Cerrando sesión...');
      
      // Llamar al servicio de logout (opcional)
      await authService.logout();
      
      // Limpiar AsyncStorage
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      
      // Limpiar estado
      setToken(null);
      setUser(null);
      setIsAuthenticated(false);
      
      console.log('✅ Sesión cerrada exitosamente');
    } catch (error) {
      console.error('❌ Error al cerrar sesión:', error);
      
      // Aunque haya error, limpiamos localmente
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      setToken(null);
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  // ==================== UPDATE USER ====================
  const updateUser = async (updatedData) => {
    try {
      const updatedUser = { ...user, ...updatedData };
      
      // 🔴 COMENTAR PARA PRUEBAS
      // await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      
      setUser(updatedUser);
      console.log('✅ Usuario actualizado');
      
      return { success: true };
    } catch (error) {
      console.error('❌ Error al actualizar usuario:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        loading,
        login,
        logout,
        registerStudent,
        registerProfessor,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};