import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  padding: 30px;
`;

export const Form = styled.View`
  flex-direction: row;
  padding-bottom: 20px;
  border-bottom-width: 1px;
  border-color: #eee;
`;

export const Input = styled.TextInput.attrs({
    placeholderTextColor: '#999',
})`
  flex: 1;
  height: 40px;
  background: #fff;
  border-radius: 4px;
  padding: 0 15px;
  border: 1px solid #eee;
`;

export const SubmitButton = styled(RectButton)`
  justify-content: center;
  align-items: center;
  background: #3498db;
  margin-left: 10px;
  padding: 0 12px;
  opacity: ${props => (props.loading ? 0.7 : 1)};
`;

export const List = styled.FlatList`
  margin-top: 20px;
`;

export const User = styled.View`
  align-items: center;
  margin: 0 20px 30px;
`;

export const Avatar = styled.Image`
  width: 128px;
  height: 128px;
  border-radius: 64px;
  background: #eee;
`;

export const AvatarDetails = styled.Image`
  width: 256px;
  height: 256px;
  border-radius: 128px;
  background: #eee;
`;

export const Name = styled.Text`
  font-size: 22px;
  color: #333;
  font-weight: bold;
  margin-top: 4px;
  text-align: left;
`;

export const Bio = styled.Text.attrs({
    numberOfLines: 2,
})`
  font-size: 13px;
  line-height: 18px;
  color: #999;
  margin-top: 5px;
  text-align: center;
`;

export const ProfileButton = styled(RectButton)`
  margin-top: 10px;
  align-self: stretch;
  background: #3498db;
  justify-content: center;
  align-items: center;
  height: 36px;
`;

export const ProfileButtonText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  text-transform: uppercase;
`;

export const Stars = styled.FlatList.attrs({
    showsVerticalScrollIndicator: false,
})`
  margin-top: 20px;
`;

export const Starred = styled.View`
  background: #f5f5f5;
  border-radius: 4px;
  padding: 10px 15px;
  margin-bottom: 20px;
  flex-direction: row;
  align-items: center;
`;

export const OwnerAvatar = styled.Image`
  width: 42px;
  height: 42px;
  border-radius: 21px;
  background: #eee;
`;

export const Info = styled.View`
  margin-left: 10px;
  flex: 1;
`;

export const Title = styled.Text.attrs({
    numberOfLines: 1,
})`
  font-size: 15px;
  font-weight: bold;
  color: #333;
`;

export const Author = styled.Text`
  font-size: 13px;
  color: #666;
  margin-top: 2px;
`;

export const Header = styled.View`
  padding-top: 30px;
  align-items: center;
  justify-content: center;
`;

export const Avatarperfil = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background: #eee;
`;

export const Nameperfil = styled.Text`
  font-size: 16px;
  color: #333;
  font-weight: bold;
  margin-top: 4px;
  text-align: center;
`;

export const Bioperfil = styled.Text`
  font-size: 15px;
  line-height: 18px;
  color: #999;
  margin-top: 5px;
  text-align: center;
`;

export const Button = styled.TouchableOpacity`
  background-color: #272b33;
  border-radius: 10px;
  padding: 10px;
  width: 80%;
  align-items: center;
  margin: 5px;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
`;

export const AddButton = styled.TouchableOpacity`
  background-color: #272b33;
  border-radius: 10px;
  padding: 10px;
  width: 12%;
  align-items: center;
  margin: 10px;
  justify-content: center;
`;

export const Card = styled.View`
  align-items: center;
  margin: 5px 5px;
  background: #1fefff;
  padding: 20px;
  border-radius: 30px;
`;

export const CardDetails = styled.View`
  align-items: center;
  margin: 5px 5px;
  background: #1fefff;
  padding: 20px;
  border-radius: 30px;
  border-color: #28a82e68;
`;


export const CardContent = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

export const CardInfos = styled.View`
  margin-top: 10px;
  width: 100%;
  align-items: left;
  padding-left: 20px;
`;

export const Status = styled.Text`
  font-size: 13px;
  color: #272b33;
  margin-top: 4px;
`;

export const LabelText = styled.Text`
  font-size: 16px;
  color: #333;
  font-weight: bold;
  margin: 5px;
`;

export const InfoText = styled.Text`
  font-size: 15px;
  color: #272b33;
  margin-bottom: 15px;
`;

export const CardButtons = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
`;

export const CardButton = styled(RectButton)`
  margin-top: 10px;
  background: #272b33;
  width: 47%;
  justify-content: center;
  align-items: center;
  height: 36px;
  border-radius: 10px;
`;

export const CardButtonText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  text-transform: uppercase;
`;
