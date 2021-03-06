import React from 'react';
import { Formik } from 'formik';
import { Link } from '@react-navigation/native';
import { styles } from '../Login/styles';
import { View, Text } from 'react-native';
import { useSingUpVal } from './hooks/useSingUpVal';
import { useSingup } from './hooks/useSingup';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput, HelperText, Button } from 'react-native-paper';
import { colors } from '../../colors';

export const SingupForm = ({ navigation, setLoading }) => {
  /*   const goToHome = () => navigation.navigate('TypeOfUserScreen'); */
  const singupValidationSchema = useSingUpVal();
  return (
    <SafeAreaView style={styles.loginContainer}>
      <Text style={styles.title}>Welcome to RentABike</Text>
      <Formik
        validationSchema={singupValidationSchema}
        initialValues={{
          name: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword: '',
        }}
        onSubmit={(values, { resetForm }) => {
          useSingup(
            values.email,
            values.password,
            values.phone,
            values.name,
            navigation,
            setLoading,
          );
          resetForm();
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
              activeUnderlineColor={colors.primary}
              name='name'
              placeholder='Name'
              style={styles.textInput}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
              keyboardType='default'
            />
            {errors.name && touched.name && (
              <HelperText type='error' visible={(errors.name, touched.name)}>
                {errors.name}
              </HelperText>
            )}
            <TextInput
              activeUnderlineColor={colors.primary}
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
              activeUnderlineColor={colors.primary}
              name='phone'
              placeholder='Phone number'
              style={styles.textInput}
              onChangeText={handleChange('phone')}
              onBlur={handleBlur('phone')}
              value={values.phone}
              keyboardType='number-pad'
            />
            {errors.phone && touched.phone && (
              <HelperText type='error' visible={(errors.phone, touched.phone)}>
                {errors.phone}
              </HelperText>
            )}
            <TextInput
              activeUnderlineColor={colors.primary}
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
            <TextInput
              activeUnderlineColor={colors.primary}
              name='confirmPassword'
              placeholder='Repeat your password'
              style={styles.textInput}
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
              secureTextEntry
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <HelperText
                type='error'
                visible={(errors.confirmPassword, touched.confirmPassword)}
              >
                {errors.confirmPassword}
              </HelperText>
            )}
            <Button
              onPress={handleSubmit}
              disabled={!isValid}
              mode='contained'
              color={colors.primary}
              style={styles.submitButton}
            >
              Sing up
            </Button>
          </>
        )}
      </Formik>
      <Link to={{ screen: 'LoginScreen' }} style={styles.link}>
        Do you have an account? Log in!
      </Link>
    </SafeAreaView>
  );
};
