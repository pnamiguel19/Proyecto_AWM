import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Input from '../../components/common/Input/Input';
import Button from '../../components/common/Button/Button';
import { useAuth } from '../../context/AuthContext';
import styles from './LoginScreen.styles';

const LoginScreen = ({ navigation }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Usuarios de prueba
  const testUsers = [
    {
      email: 'juan.perez@student.com',
      password: 'Student123!',
      role: 'student',
      name: 'Juan Estudiante',
      emoji: '🎒',
    },
    {
      email: 'maria.garcia@professor.com',
      password: 'Professor123!',
      role: 'professor',
      name: 'María Profesora',
      emoji: '👨‍🏫',
    },
    {
      email: 'admin@edumatch.com',
      password: 'Admin123!',
      role: 'admin',
      name: 'Admin',
      emoji: '👔',
    },
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Correo electrónico inválido';
    }
    
    if (!password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    setErrors({});

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      console.log('🔐 Intentando login con:', email);

      const response = await login(email.toLowerCase().trim(), password);

      if (response.success) {
        const user = response.data.user;
        const role = user.role;

        console.log('✅ Login exitoso:', user.firstName, '-', role);

        // ✅ NO NAVEGUES MANUALMENTE - El AppNavigator lo hace automáticamente
        // Cuando el usuario se autentica, AuthContext actualiza isAuthenticated
        // y AppNavigator renderiza automáticamente StudentTabs o ProfessorTabs
        
        console.log('🎯 Usuario autenticado. AppNavigator redirigirá automáticamente.');
        
      }
    } catch (error) {
      console.error('❌ Error en login:', error);

      let errorMessage = 'Ocurrió un error al iniciar sesión. Intenta nuevamente.';
      
      if (error.message) {
        errorMessage = error.message;
      }

      if (error.error === 'NETWORK_ERROR') {
        errorMessage = 'No se pudo conectar con el servidor. Verifica tu conexión a internet y que el backend esté corriendo.';
      }

      Alert.alert('Error de Autenticación', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    Alert.alert(
      'Próximamente',
      'El inicio de sesión con Google estará disponible pronto.'
    );
  };

  const handleFacebookLogin = () => {
    Alert.alert(
      'Próximamente',
      'El inicio de sesión con Facebook estará disponible pronto.'
    );
  };

  const fillTestCredentials = (userType) => {
    const user = testUsers.find((u) => u.role === userType);
    if (user) {
      setEmail(user.email);
      setPassword(user.password);
      Alert.alert(
        'Credenciales cargadas',
        `Email: ${user.email}\nPassword: ${user.password}\n\nAhora presiona "Iniciar Sesión"`
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoEmoji}>🎓</Text>
          </View>
        </View>

        {/* Título */}
        <Text style={styles.title}>Iniciar sesión</Text>
        <Text style={styles.subtitle}>Accede a tu cuenta para continuar</Text>

        {/* Usuarios de prueba */}
        <View style={styles.testUsersContainer}>
          <Text style={styles.testUsersTitle}>👤 Usuarios de prueba:</Text>
          <View style={styles.testUsersButtons}>
            {testUsers.map((user) => (
              <TouchableOpacity
                key={user.role}
                style={styles.testUserButton}
                onPress={() => fillTestCredentials(user.role)}
              >
                <Text style={styles.testUserEmoji}>{user.emoji}</Text>
                <Text style={styles.testUserText}>
                  {user.role === 'student' ? 'Estudiante' : user.role === 'professor' ? 'Profesor' : 'Admin'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.testUsersHint}>
            Toca un rol para autocompletar las credenciales
          </Text>
        </View>

        {/* Formulario */}
        <View style={styles.form}>
          <Input
            label="Correo electrónico"
            placeholder="correo@ejemplo.com"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setErrors({ ...errors, email: '' });
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            required
            error={errors.email}
            editable={!loading}
          />

          <Input
            label="Contraseña"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setErrors({ ...errors, password: '' });
            }}
            secureTextEntry
            showPasswordToggle
            required
            error={errors.password}
            editable={!loading}
          />

          {/* Recordarme y Olvidaste contraseña */}
          <View style={styles.options}>
            <TouchableOpacity
              style={styles.rememberMe}
              onPress={() => setRememberMe(!rememberMe)}
              disabled={loading}
            >
              <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                {rememberMe && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.rememberMeText}>Recordarme</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  'Recuperar contraseña',
                  'Esta funcionalidad estará disponible pronto.'
                )
              }
              disabled={loading}
            >
              <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>
          </View>

          {/* Botón de Login */}
          <Button
            title="INICIAR SESIÓN"
            onPress={handleLogin}
            loading={loading}
            style={styles.loginButton}
          />

          {/* Divisor */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>o continúa con</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Botones sociales */}
          <View style={styles.socialButtons}>
            <Button
              title="GOOGLE"
              onPress={handleGoogleLogin}
              variant="secondary"
              style={styles.socialButton}
              disabled={loading}
            />
            <Button
              title="FACEBOOK"
              onPress={handleFacebookLogin}
              variant="secondary"
              style={styles.socialButton}
              disabled={loading}
            />
          </View>

          {/* Registro */}
          <View style={styles.register}>
            <Text style={styles.registerText}>¿No tienes cuenta? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Register')}
              disabled={loading}
            >
              <Text style={styles.registerLink}>Regístrate aquí</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
