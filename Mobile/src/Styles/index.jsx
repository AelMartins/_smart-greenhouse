import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

const Container = styled.View`
  flex: 1;
  padding: 10px;
  align-items: center;
`;

const ContainerImage = styled.View`
  flex: 1;
  align-items: center;
  background-color: rgba(0,0,0,0);
`;

const ContainerChart = styled.View`
  flex: 1;
  margin-top: 3%;
  max-height:  50%;
  boder-radius: 10px;
  align-items: center;
  background-color: white;
`;

const HeaderChart = styled.View`
  padding: 10px;
  background-color: white;
  justify-content: center;
`;

const Card = styled.View`
  width: 100%;
  align-items: center;
  border-radius: 30px;
  justify-content: center;
`;

const TextPlantName = styled.Text`
  color: white;
  font-size: 22px;
  font-weight: bold;
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

const List = styled.FlatList`
  margin-top: 20px;
`;

export {
  Container,
  ContainerImage,
  ContainerChart,
  HeaderChart,
  Card,
  TextPlantName,
  ButtonCard,
  Button,
  ButtonText,
  TextInput,
  LabelText,
  IconButton,
  Image,
  List,
}