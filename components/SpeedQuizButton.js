import {Pressable, StyleSheet,Text} from 'react-native';
import PropTypes from 'prop-types';
import { GRAY, Orange} from '../colors';

const SpeedQuizButton = ({ title, onPress, buttonStyle,buttonTypes }) =>{
    return (
        <Pressable
        style={({pressed})=>[
            styles.button,{
                backgroundColor:
                    buttonTypes===ButtonTypes.NUMBER?Orange.DEFAULT:GRAY.DEFAULT,
            },
            pressed && {
                backgroundColor:
                buttonTypes===ButtonTypes.NUMBER?Orange.DARK:GRAY.DARK,},
            buttonStyle,
        ]}
        onPressOut={onPress}
        >
            <Text style={styles.title}>{title}</Text>
        </Pressable>
    );
};

const ButtonTypes ={
    NUMBER:"NUMBER",
    OPERATOR:"OPERATOR",
}

SpeedQuizButton.defaultProps = {
    buttonTypes:ButtonTypes.NUMBER,
}

SpeedQuizButton.propTypes = {
    title: PropTypes.string.isRequired,
    onPress:PropTypes.func.isRequired,
    buttonStyle:PropTypes.object,
    buttonTypes:PropTypes.oneOf(Object.values(ButtonTypes)),
}

const styles = StyleSheet.create({
    button:{
        justifyContent:'center',
        alignItems: 'center',
        borderWidth:7,
    },  
    title:{
        color:'#ffffff',
        fontSize:30,
        fontWeight:'700'
    },
})

export { ButtonTypes};
export default SpeedQuizButton;