import React from 'react';
import { Link } from '@react-navigation/native';
import { Formik } from 'formik';
import { styles } from './styles';
import { View, Text } from 'react-native';
import { TextInput, HelperText, Button } from 'react-native-paper';
import { useSingUpVal } from './hooks/useLoginVal';
import { useLogin } from './hooks/useLogin';
import { SafeAreaView } from 'react-native-safe-area-context';

export const LoginForm = ({ navigation }) => {
  const loginValidationSchema = useSingUpVal();
  return (
    <SafeAreaView style={styles.loginContainer}>
      <Text style={styles.title}>Welcome to RentABike</Text>
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{ email: '', password: '' }}
        onSubmit={(values) => {
          useLogin(values.email, values.password, navigation);
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isValid,
        }) => (
          <>
            <TextInput
              activeUnderlineColor='#7C8C03'
              name='email'
              placeholder='Email Address'
              style={styles.textInput}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType='email-address'
            />
            {errors.email && touched.email && (
              <HelperText type='error' visible={(errors.email, touched.email)}>
                {errors.email}
              </HelperText>
            )}
            <TextInput
              activeUnderlineColor='#7C8C03'
              name='password'
              placeholder='Password'
              style={styles.textInput}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry
            />
            {errors.password && touched.password && (
              <HelperText
                type='error'
                visible={(errors.password, touched.password)}
              >
                {errors.password}
              </HelperText>
            )}
            <Button
              onPress={handleSubmit}
              disabled={!isValid}
              mode='contained'
              color='#7C8C03'
              style={styles.submitButton}
            >
              Login
            </Button>
          </>
        )}
      </Formik>
      <Link to={{ screen: 'SingupScreen' }} style={styles.link}>New on RentABike? Sing up!</Link>
      <Link to={{ screen: 'SingupScreen' }} style={styles.link}>Forgot your password?</Link>
    </SafeAreaView>
  );
};