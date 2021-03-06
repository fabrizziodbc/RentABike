import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { List } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
  FlatList,
} from 'react-native';
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { firebaseConfig } from '../../../config/database/firebase';
import { BikeCard } from './BikeCard';
import Loading from '../Loading';
import { colors } from '../../colors';
import { useSelector, useDispatch } from 'react-redux';

import { fetchRentData } from '../../store/slices/rent';
import { fetchUserData } from '../../store/slices/user';
import { fetchBikeData } from '../../store/slices/bike';

export const RenterHome = () => {
  const { bikeData: dataPrueba } = useSelector((state) => state.bike);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const app = initializeApp(firebaseConfig);
  const db = getFirestore();
  const usersRef = collection(db, 'Bike');
  const q = query(usersRef);
  const [bikes, setBikes] = useState([]);
  useEffect(() => {
    setLoading(true);
    //
    const fetchRent = dispatch(fetchRentData());
    const fetchUser = dispatch(fetchUserData());
    const fetchBikes = dispatch(fetchBikeData());

    setBikes(dataPrueba);
    setLoading(false);
    return () => {
      fetchBikes();
      fetchRent();
      fetchUser();
    };
  }, []);
  return (
    <>
      <Loading loading={loading} />
      <SafeAreaView style={{ backgroundColor: colors.background }}>
        <FlatList
          data={bikes}
          numColumns={1}
          showsVerticalScrollIndicator={false}
          keyExtractor={(e) => String(e.id)}
          renderItem={({ item }) => (
            <BikeCard bike={item} userType={'renter'} />
          )}
          contentContainerStyle={styles.flatListContainer}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    paddingHorizontal: 5,
  },
});
