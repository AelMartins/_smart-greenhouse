import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

const Container = styled.View`
  flex: 1;
  padding: 30px;
  align-items: center;
  background-color: #fff;
  justify-content: center;
`;

const ContainerImage = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: rgba(0,0,0,0);
`;

const Card = styled.View`
  width: 100%;
  align-items: center;
  border-radius: 30px;
  justify-content: center;
`;

const ButtonCard = styled.View`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.TouchableOpacity`
  height: 50px;
  display: flex;
  padding: 5px 50px;
  margin: 3px auto;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;

const ButtonText = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

const TextInput = styled.TextInput.attrs({
  placeholderTextColor: '#929292',
})`
  width: 75%;
  margin: 5px;
  color: black;
  height: 50px;
  font-size: 17px;
  border-radius: 10px;
  background-color: #fff;
`;

const LabelText = styled.Text`
width: 75%;
display: flex;
font-size: 20px;
margin-top: 25px;
font-weight: bold;
align-items: center;
justify-content: center;
`;

const IconButton = ({ onPress, iconName, text }) => {
  return (
    <ButtonContainer onPress={onPress}>
      <Ionicons name={iconName} size={24} color="white" />
      <ButtonText>{text}</ButtonText>
    </ButtonContainer>
  );
};

const Image = styled.Image``;












const Form = styled.View`
  flex-direction: row;
  padding-bottom: 20px;
  border-bottom-width: 1px;
  border-color: #eee;
`;



const SubmitButton = styled(RectButton)`
  justify-content: center;
  align-items: center;
  background: #3498db;
  margin-left: 10px;
  padding: 0 12px;
  opacity: ${props => (props.loading ? 0.7 : 1)};
`;

const List = styled.FlatList`
  margin-top: 20px;
`;

export {
  Container,
  ContainerImage,
  Card,
  ButtonCard,
  Button,
  ButtonText,
  TextInput,
  LabelText,
  IconButton,
  Image,
}