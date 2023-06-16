import { TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GRAY, WHITE } from '../colors';

const IconButton = ({ onPress, iconName, size, styles }) => {
  return (
    <TouchableOpacity
      style={[defaultStyles.container, styles?.container]}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <MaterialCommunityIcons
        name={iconName}
        style={[defaultStyles.icon, styles?.icon]}
        size={size} 
      />
    </TouchableOpacity>
  );
};

const defaultStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: WHITE,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  icon: {
    color: GRAY.DARK,
  },
});

IconButton.defaultProps = {
  size: 28,
};

export default IconButton;
