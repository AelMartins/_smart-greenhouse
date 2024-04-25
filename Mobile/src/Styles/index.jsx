import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

const Container = styled.View`
  flex: 1;
  padding: 30px;
  align-items: center;
  background-color: #fff;
  justify-content: center;
`;

const Card = styled.View`
  width: 100%;
  align-items: center;
  border-radius: 30px;
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




const CardContent = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const CardInfos = styled.View`
  margin-top: 10px;
  width: 100%;
  align-items: left;
  padding-left: 20px;
`;

const InfoText = styled.Text`
  font-size: 15px;
  color: #272b33;
  margin-bottom: 15px;
`;

export { Container, Card, ButtonCard, Button, ButtonText, TextInput, LabelText }