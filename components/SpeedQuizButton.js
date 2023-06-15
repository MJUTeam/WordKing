import {Pressable, StyleSheet,Text} from 'react-native';
import PropTypes from 'prop-types';

const ButtonTypes ={
    NUMBER:"NUMBER",
    OPERATOR:"OPERATOR",
}

const Button = ({ title, onPress, buttonStyle,buttonTypes }) =>{
    return (
        <Pressable
        style={({pressed})=>[
            styles.button,{
                backgroundColor:
                    buttonTypes===ButtonTypes.NUMBER?'#3f3f46':'#f59e0b',
            },
            pressed && {
                backgroundColor:
                buttonTypes===ButtonTypes.NUMBER?'black':'#b45309',},
            buttonStyle,
        ]}
        onPressOut={onPress}
        >
            <Text style={styles.title}>{title}</Text>
        </Pressable>
    );
};

Button.defaultProps = {
    buttonTypes:ButtonTypes.NUMBER,
}

Button.propTypes = {
    title: PropTypes.string.isRequired,
    onPress:PropTypes.func.isRequired,
    buttonStyle:PropTypes.object,
    buttonTypes:PropTypes.oneOf(Object.values(ButtonTypes)),
}

const styles = StyleSheet.create({
    button:{
        justifyContent:'center',
        alignItems: 'center',
        borderWidth:1,
    },  
    title:{
        color:'#ffffff',
        fontSize:30,
        fontWeight:'700'
    },
})

export {ButtonTypes};
export default Button;