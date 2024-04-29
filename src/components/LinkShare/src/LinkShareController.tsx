import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
import {Share} from "react-native"
interface LinkShareData {
  "id": string,
  "type": string,
  "attributes": {
    "photo": {
      "photo": string,
      "id": number,
      "name": string,
    }[]
  }
}
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  // Customizable Area Start
  linkShareData: LinkShareData[],
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class LinkShareController extends BlockComponent<
  Props,
  S,
  SS
> {

  // Customizable Area Start
  fetchShareURLMsgId: string = '';
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area End
    ];

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      // Customizable Area Start
      linkShareData:[]
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End

  }

  async receive(from: string, message: Message) {

    runEngine.debugLog("Message Recived", message);

    if (message.id === getName(MessageEnum.AccoutLoginSuccess)) {
      let value = message.getData(getName(MessageEnum.AuthTokenDataMessage));

      // this.showAlert(
      //   "Change Value",
      //   "From: " + this.state.txtSavedValue + " To: " + value
      // );

      this.setState({ txtSavedValue: value });
    }

    // Customizable Area Start

    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {

      let apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      let errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );

      if (apiRequestCallId == this.fetchShareURLMsgId) {
        if (errorReponse) {
          console.error(errorReponse);
        } else {
          this.setState({ linkShareData: responseJson.data });
        }
      }
    }
    // Customizable Area End

  }

  txtInputWebProps = {
    onChangeText: (text: string) => {
      this.setState({ txtInputValue: text });
    },
    secureTextEntry: false
  };

  txtInputMobileProps = {
    ...this.txtInputWebProps,
    autoCompleteType: "email",
    keyboardType: "email-address"
  };

  txtInputProps = this.isPlatformWeb()
    ? this.txtInputWebProps
    : this.txtInputMobileProps;

  btnShowHideProps = {
    onPress: () => {
      this.setState({ enableField: !this.state.enableField });
      this.txtInputProps.secureTextEntry = !this.state.enableField;
      this.btnShowHideImageProps.source = this.txtInputProps.secureTextEntry
        ? imgPasswordVisible
        : imgPasswordInVisible;
    }
  };

  btnShowHideImageProps = {
    source: this.txtInputProps.secureTextEntry
      ? imgPasswordVisible
      : imgPasswordInVisible
  };

  btnExampleProps = {
    onPress: () => this.doButtonPressed()
  };

  doButtonPressed() {
    let message = new Message(getName(MessageEnum.AccoutLoginSuccess));
    message.addData(
      getName(MessageEnum.AuthTokenDataMessage),
      this.state.txtInputValue
    );
    this.send(message);
  }

  // Customizable Area Start

  async componentDidMount() {
    this.fetchShareURL();
  }


  onShare = async (name:string,imageUrl:string) => {
    try {
      await Share.share({
        title: name,
        message:imageUrl,
        url:imageUrl
      });
      
    } catch (error) {
      alert(configJSON.shareErrorMessage)
    }
  };


  async fetchShareURL (){

    const header = {
      "Content-Type": configJSON.LinkShareRequestContentType
    };
    const fetchShareURLMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    
    this.fetchShareURLMsgId = fetchShareURLMessage.messageId

    fetchShareURLMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.linkShareAPiEndPoint
    );

    fetchShareURLMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    )

    fetchShareURLMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.LinkShareRequestMethod
    )

    runEngine.sendMessage(fetchShareURLMessage.id,fetchShareURLMessage)
  }
  
  // Customizable Area End
  
}
