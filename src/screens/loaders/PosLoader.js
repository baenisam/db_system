import {StyleSheet, Text, View, FlatList, Dimensions} from 'react-native';
import React from 'react';
import themeContext from '../../constants/themeContext';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
const {width, height} = Dimensions.get('window');
const PosLoader = () => {
    const COLORS = React.useContext(themeContext)
  const data = [
    {id: 1},
    {id: 2},
    {id: 3},
    {id: 4},
    {id: 5},
    {id: 6},
    {id: 7},
    {id: 8},
    {id: 9},
    {id: 10},
    {id: 11},
    {id: 12},
    {id: 13},
    {id: 14},
    {id: 15},
    {id: 16},
    {id: 17},
  ];

  const renderItem = ({item, index}) => {
    return (
      <SkeletonPlaceholder borderRadius={4}>
        <View style={{...styles.card_template}} />
      </SkeletonPlaceholder>
    );
  };
  return (
    <View
            style={{
              backgroundColor: COLORS.background,
              marginTop: 20,
              flex: 1,
              height: height,
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              padding: 20,
            }}>
            <FlatList
              //ItemSeparatorComponent={() => (<View style={{width:10}}/>)}
              scrollEventThrottle={16}
              ItemSeparatorComponent={() => <View style={{width:10}}/>}
              columnWrapperStyle={{justifyContent:'space-between'}}
              keyExtractor={(item, index) => item.id}
              numColumns={2}
              data={data}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
            />
          </View>
  );
};

export default PosLoader;

const styles = StyleSheet.create({
  card_image: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    resizeMode: 'contain',
  },
});
