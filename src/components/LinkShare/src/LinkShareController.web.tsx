import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import * as yup from 'yup';
// Customizable Area Start
// Customizable Area End

export const configJSON = require("./config");


declare global {
  interface Navigator {
    canShare: (shareData: ShareData) => boolean,
  }
}

export interface Props {
  navigation: any;
  id: string;
  classes: { [key: string]: string };
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  inputValue: string;
  savedValue: string;
  hideInputValue: boolean;
  openShareDialog: boolean;
  linkShareData: LinkShareData[],
  shareUrl: string,
  // Customizable Area Start
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export interface IApiCall {
  header: { [key: string]: string };
  url: string;
  httpMethod: string;
}


export function apiCall({ header, url, httpMethod, }: IApiCall) {

  let requestURL = url;

  const requestMessage = new Message(
    getName(MessageEnum.RestAPIRequestMessage)
  );

  requestMessage.addData(
    getName(MessageEnum.RestAPIResponceEndPointMessage),
    requestURL
  );
  requestMessage.addData(
    getName(MessageEnum.RestAPIRequestHeaderMessage),
    JSON.stringify(header)
  );
  requestMessage.addData(
    getName(MessageEnum.RestAPIRequestMethodMessage),
    httpMethod
  );
  return requestMessage;
}

interface LinkShareData {
  "id": string,
  "type": "linkshare",
  "attributes": {
    "photo": {
      "photo": string,
      "id": number,
      "name": string,
    }[]
  }
}

export default class LinkShareController extends BlockComponent<Props, S, SS> {

  // Customizable Area Start
  fetchShareURLMsgId: string = '';
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);


    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area Start
      // Customizable Area End
    ];

    this.state = {
      inputValue: "",
      savedValue: "",
      hideInputValue: false,
      openShareDialog: false,
      linkShareData: [],
      shareUrl: '',
      // Customizable Area Start
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End

  }

  async componentDidMount() {
    this.fetchShareURL();
  }

  async receive(from: string, message: Message) {

    runEngine.debugLog("Message Recived", message);

    if (message.id === getName(MessageEnum.AccoutLoginSuccess)) {
      let value = message.getData(getName(MessageEnum.AuthTokenDataMessage));
      this.setState({ savedValue: value });
    }

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
          this.setState({ linkShareData: responseJson.data || [] });
        }
      }
    }
    // Customizable Area Start
    // Customizable Area End

  }

  // Customizable Area Start

  fetchShareURL = () => {

    const header = {
      "Content-Type": configJSON.LinkShareRequestContentType
    };

    const fetchShareURLMessage = apiCall({
      header: header,
      httpMethod: configJSON.LinkShareRequestMethod,
      url: 'bx_block_linkshare/linkshares',
    });

    this.fetchShareURLMsgId = fetchShareURLMessage.messageId;
    runEngine.sendMessage(fetchShareURLMessage.id, fetchShareURLMessage);
  }


  closeShareDialogHandler = () => {
    this.setState({ openShareDialog: false });
  }

  onTextInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: event.target.value });
  }

  toggleHideInputHandler = () => {
    let hideInputValue = !this.state.hideInputValue;
    this.setState({ hideInputValue });
  }

  clickMeHandler = () => {
    let message = new Message(getName(MessageEnum.AccoutLoginSuccess));
    message.addData(
      getName(MessageEnum.AuthTokenDataMessage),
      this.state.inputValue
    );
    this.send(message);
  }

  shareHandler = async (shareUrl: string) => {
    try {
      const sharedData = { url: shareUrl };

      const canShareIsSupported = Boolean(navigator.canShare);
      const canShare = canShareIsSupported && navigator.canShare(sharedData);

      const isValidURL = await yup.string().url().isValid(shareUrl);

      if (canShare && isValidURL) {
        try {
          await navigator.share(sharedData)
        } catch (error) {
          console.error('share aborted');
        }
      }
      else
        this.setState({ openShareDialog: true, shareUrl });

    } catch (error) {
      console.error(error);
    }
  }

  // Customizable Area End

}
