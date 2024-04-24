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
  width: 20%;
  height: 45px;
  display: flex;
  margin: 3px auto;
  border-radius: 10px;
  align-items: center;
  border-color: green;
  justify-content: center;
  background-color: blue;
`;

const ButtonText = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

const TextInput = styled.TextInput.attrs({
  placeholderTextColor: '#1a6b00',
})`
  width: 75%;
  margin: 5px;
  color: black;
  height: 40px;
  font-size: 14px;
  max-height: 45px;
  border-radius: 10px;
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


const LabelText = styled.Text`
  font-size: 16px;
  color: #333;
  font-weight: bold;
  margin: 5px;
`;

const InfoText = styled.Text`
  font-size: 15px;
  color: #272b33;
  margin-bottom: 15px;
`;

export { Container, Card, ButtonCard, Button, ButtonText, TextInput }