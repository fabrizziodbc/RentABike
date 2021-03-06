import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../colors';

export function MessageCard({ item, owner }) {
  const navigation = useNavigation();
  console.log('card=>', item.rentId);
  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate('ChatScreen', {
          rentId: item.rentId,
          ownerName: item.ownerName,
          ownerDeviceToken: item.ownerDeviceToken,
          bikeModel: item.bikeModel,
        })
      }
    >
      <View
        style={{
          backgroundColor: colors.background2,
          /*    borderWidth: 1, */
          padding: 12,
          borderTopEndRadius: 15,
          borderTopStartRadius: 15,
          borderBottomStartRadius: 15,
          borderBottomEndRadius: 15,
          marginBottom: 8,
          /*  backgroundColor:"red" */
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Image
            source={{ uri: !owner ? item.bikeImg : item.userImg }}
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              marginRight: 18,
            }}
          ></Image>
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
              {!owner ? item.ownerName : item.userName}
            </Text>
            <Text
              style={{
                fontWeight: '200',
                fontSize: 16,
              }}
            >
              ({item.bikeModel})
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
