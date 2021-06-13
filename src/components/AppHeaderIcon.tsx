import React from 'react';
import { Platform } from 'react-native';
import { CommonHeaderButtonProps, HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '../theme';

export const AppHeaderIcon: React.FC<CommonHeaderButtonProps> = props => (
  <HeaderButton
    {...props}
    iconSize={24}
    IconComponent={Ionicons}
    color={Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR}
  />
)