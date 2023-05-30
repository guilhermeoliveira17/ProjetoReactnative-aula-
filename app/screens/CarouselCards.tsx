import { faUserPen } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { View, Text, Image, Button, StyleSheet, Dimensions} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import data from './data';

const Slider_Width = Dimensions.get('window').width;
const Item_Width = Slider_Width * 0.8;

type Props = {
    item: {
        body: string,
        title: string,
        imgUrl: string,
    },
    index: number
}

const carouselCardItem = ({item, index}: Props) => {
    return(
        <View key={index}>
            <Image source={{uri: item.imgUrl}}/>
            <Text>{item.title}</Text>
            <Text>{item.body}</Text>
        </View>
    );
}

const CarouselCards = () => {
    return(
        <View>
            <Carousel
                data={data}
                renderItem= {carouselCardItem}
                sliderWidth={Slider_Width}
                itemWidth={Item_Width}
                useScrollView={true}
            />
        </View>
    );
}
 
export default CarouselCards;
