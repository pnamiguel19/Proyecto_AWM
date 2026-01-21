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
import styles from './LoginScreen.styles';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Usuarios ficticios
  const users = [
    {
      email: 'estudiante@edumatch.com',
      password: '123456',
      role: 'student',
      name: 'Juan Estudiante',
    },
    {
      email: 'profesor@edumatch.com',
      password: '123456',
      role: 'professor',
      name: 'María Profesora',
    },
    {
      email: 'admin@edumatch.com',
      password: '123456',
      role: 'admin',
      name: 'Carlos Admin',
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
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Simular delay de red
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Buscar usuario
      const user = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );

      if (!user) {
        Alert.alert(
          'Error de autenticación',
          'Correo electrónico o contraseña incorrectos. Por favor, verifica tus credenciales.'
        );
        setLoading(false);
        return;
      }

      // Login exitoso
      console.log('Login exitoso:', user);

      // Mostrar mensaje de bienvenida
      Alert.alert(
        '¡Bienvenido! 🎉',
        `Hola ${user.name}, has iniciado sesión como ${
          user.role === 'student'
            ? 'Estudiante'
            : user.role === 'professor'
            ? 'Profesor'
            : 'Administrador'
        }`,
        [
          {
            text: 'Continuar',
            onPress: () => {
              // Navegar según el rol del usuario
              switch (user.role) {
                case 'student':
                  navigation.navigate('StudentHome');
                  break;
                case 'professor':
                  navigation.navigate('ProfessorProfile');
                  break;
                case 'admin':
                  // TODO: Crear AdminHome
                  Alert.alert(
                    'Próximamente',
                    'La interfaz de administrador estará disponible pronto.'
                  );
                  break;
                default:
                  navigation.navigate('StudentHome');
              }
            },
          },
        ]
      );
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      Alert.alert('Error', 'Ocurrió un error al iniciar sesión. Intenta nuevamente.');
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
    const user = users.find((u) => u.role === userType);
    if (user) {
      setEmail(user.email);
      setPassword(user.password);
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
            <TouchableOpacity
              style={styles.testUserButton}
              onPress={() => fillTestCredentials('student')}
            >
              <Text style={styles.testUserEmoji}>🎒</Text>
              <Text style={styles.testUserText}>Estudiante</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.testUserButton}
              onPress={() => fillTestCredentials('professor')}
            >
              <Text style={styles.testUserEmoji}>👨‍🏫</Text>
              <Text style={styles.testUserText}>Profesor</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.testUserButton}
              onPress={() => fillTestCredentials('admin')}
            >
              <Text style={styles.testUserEmoji}>👔</Text>
              <Text style={styles.testUserText}>Admin</Text>
            </TouchableOpacity>
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
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            required
            error={errors.email}
          />

          <Input
            label="Contraseña"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            showPasswordToggle
            required
            error={errors.password}
          />

          {/* Recordarme y Olvidaste contraseña */}
          <View style={styles.options}>
            <TouchableOpacity
              style={styles.rememberMe}
              onPress={() => setRememberMe(!rememberMe)}
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
            />
            <Button
              title="FACEBOOK"
              onPress={handleFacebookLogin}
              variant="secondary"
              style={styles.socialButton}
            />
          </View>

          {/* Registro */}
          <View style={styles.register}>
            <Text style={styles.registerText}>¿No tienes cuenta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.registerLink}>Regístrate aquí</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
