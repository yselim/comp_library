import React from "react";

import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  Button,
  Platform,
  // Customizable Area Start
  // Customizable Area End
} from "react-native";

import LinkShareController, {
  Props,
  configJSON
} from "./LinkShareController";

export default class LinkShare extends LinkShareController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    return (
      // Customizable Area Start
      <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
        <TouchableWithoutFeedback
          testID="btnHide"
          onPress={() => {
            this.hideKeyboard();
          }}
        >
          {/* Customizable Area Start */}
          {/* Merge Engine UI Engine Code */}
          <View>
            {this.isPlatformWeb() ? (
              <Text
                testID="labelTitle" //Merge Engine::From BDS
                style={styles.title} //UI Engine::From Sketch
              >
                {configJSON.labelTitleText}
              </Text> //UI Engine::From Sketch
            ) : null}

            <Text
              testID="labelBody" //Merge Engine::From BDS
              style={styles.body} //UI Engine::From Sketch
            >
              {" "}
              {/* UI Engine::From Sketch */}
              {configJSON.labelBodyText} {/* UI Engine::From Sketch */}
            </Text>

            <Text testID="txtSaved">
              This is the reviced value:
              {this.state.txtSavedValue}{" "}
              {/* Merge Engine::From BDS - {...this.testIDValue} */}
            </Text>

            <View style={styles.bgPasswordContainer}>
              <TextInput
                testID="txtInput" //Merge Engine::From BDS
                style={styles.bgMobileInput} //UI Engine::From Sketch
                placeholder={configJSON.txtInputPlaceholder} //UI Engine::From Sketch
                {...this.txtInputProps} //Merge Engine::From BDS - {...this.testIDProps}
              />

              <TouchableOpacity
                testID={"btnShowHide"} //Merge Engine::From BDS
                style={styles.showHide} //UI Engine::From Sketch
                {...this.btnShowHideProps} //Merge Engine::From BDS - {...this.testIDProps}
              >
                <Image
                  testID={"btnShowHideImage"} //Merge Engine::From BDS - testIDImage
                  style={styles.imgShowhide} //UI Engine::From Sketch
                  {...this.btnShowHideImageProps} //Merge Engine::From BDS - {...this.testIDProps}
                />
              </TouchableOpacity>
            </View>

            <Button
              testID={"btnExample"} //Merge Engine::From BDS
              title={configJSON.btnExampleTitle} //UI Engine::From Sketch
              {...this.btnExampleProps} //Merge Engine::From BDS - {...this.testIDProps}
            />
            {this.state.linkShareData.filter((shareDataItem) => shareDataItem.attributes.photo)
              .map((shareDataItem,index) => (
                <View style={styles.shareImageContainer} key={shareDataItem.id}>
                  <Image style={styles.shareImage} resizeMode="contain" source={{ uri:shareDataItem.attributes.photo[0].photo}} />
                  <Button
                    testID={`btnShare-${index}`}
                    title={configJSON.btnShareTitle}
                    onPress={()=> this.onShare(shareDataItem.attributes.photo[0].name,shareDataItem.attributes.photo[0].photo)}
                  />
                </View>
              ))
            }


          </View>

          {/* Merge Engine UI Engine Code */}
          {/* Customizable Area End */}
        </TouchableWithoutFeedback>
      </ScrollView>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    maxWidth: 650,
    backgroundColor: "#ffffffff",
  },
  title: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8
  },
  body: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8
  },
  bgPasswordContainer: {
    flexDirection: "row",
    backgroundColor: "#00000000",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderColor: "#767676",
    borderRadius: 2,
    padding: 10,
    borderWidth: 1
  },
  bgMobileInput: {
    flex: 1
  },
  showHide: {
    alignSelf: "center"
  },
  imgShowhide: {},
  shareImageContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: "2%",
  },
  shareImage: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginVertical:"1%"
  }
});
// Customizable Area End
