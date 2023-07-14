import React from 'react';
import { Pressable, Text as RNText, TextStyle } from 'react-native';
import Colors from '../../constants/Colors';

const Typography: React.FC<TypographyProps> = ({
  variant = 'text',
  align = 'left',
  color = 'black',
  size = 'medium',
  weight = '500',
  bottom = 0,
  style,
  children,
  pressAble,
  onPress
}) => {
  const getStyles = (): TextStyle => {
    switch (variant) {
      case 'heading':
        return {
          textAlign: align,
          color: Colors[color],
          fontSize: getSize(size),
          marginBottom: getMarginBottom(bottom),
          fontWeight: getWeight(weight),
        };
        case 'text':
            return {
                textAlign: align,
                color: Colors[color],
                fontSize: getSize(size),
                marginBottom: getMarginBottom(bottom),
                fontWeight: getWeight(weight),
            };
            default:
                return {
                    textAlign: align,
                    color: Colors[color],
                    fontSize: getSize(size),
                    marginBottom: getMarginBottom(bottom),
          fontWeight: getWeight(weight),
        };
    }
  };

  const textStyle = getStyles();

  return <>
    {!!pressAble ? (
      <Pressable onPress={onPress}>
        <RNText style={[textStyle, style]}>{children}</RNText>
      </Pressable>
    ) : <RNText style={[textStyle, style]}>{children}</RNText>
    }
  </>;
};

const getSize = (size: keyof SizeVariant | number): number => {
  const sizeVariant: SizeVariant = {
    extraSmall: 10,
    small: 12,
    medium: 14,
    large: 20,
    heading1: 28,
    heading2: 24,
    heading3: 20,
    heading4: 18,
    heading5: 16,
    heading6: 14,
    paragraph: 16,
    regularText: 18,
    caption: 12,
    label: 12,
    subtitle: 14,
    button: 16,
    buttonText: 14,
    title: 24,
    pageTitle: 30,
    pageSubTitle: 18,
    sectionTitle: 20,
  };

  if (typeof size === 'number') return size;
  
  return sizeVariant[size];
};
const getMarginBottom = (margin: keyof MarginBottomVariants | number): number => {
    const sizeVariant: MarginBottomVariants = {
        mb0: 2,
        mb1: 4,
        mb2: 6,
        mb3: 8,
        mb4: 10,
        mb5: 11,
        mb6: 12,
        mb7: 14,
        mb8: 16,
        mb9: 18,
        mb10: 20,
    };
    if (typeof margin === 'number') return margin;
  return sizeVariant[margin];
};


const getWeight = (weight: string): weightInterface => {
  switch (weight) {
    case 'light':
      return '400';
    case 'regular':
      return 'normal';
    case 'bold':
      return 'bold';
    case '100':
    case '200':
    case '300':
    case '400':
    case '500':
    case '600':
    case '700':
    case '800':
    case '900':
      return weight;
    default:
      return 'normal';
  }
};

export default Typography;

type weightInterface = | 'bold' | 'normal' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';

interface SizeVariant {
    extraSmall: number;
    small: number;
    medium: number;
    large: number;
    heading1: number;
    heading2: number;
    heading3: number;
    heading4: number;
    heading5: number;
    heading6: number;
    paragraph: number;
    regularText: number;
    caption: number;
    label: number;
    subtitle: number;
    button: number;
    buttonText: number;
    title: number;
    pageTitle: number;
    pageSubTitle: number;
    sectionTitle: number;
}
  
interface TypographyProps {
    variant?: 'heading' | 'text';
    align?: 'left' | 'center' | 'right';
    color?: keyof typeof Colors;
    size?: keyof SizeVariant | number;
    bottom?: keyof MarginBottomVariants | number;
    weight?: weightInterface;
    style?: TextStyle;
    children: React.ReactNode;
    pressAble?: boolean;
    onPress?: () => void;
}
  
interface MarginBottomVariants {
    mb0: number;
    mb1: number;
    mb2: number;
    mb3: number;
    mb4: number;
    mb5: number;
    mb6: number;
    mb7: number;
    mb8: number;
    mb9: number;
    mb10:number;
  }