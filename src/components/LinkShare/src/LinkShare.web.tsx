import React from "react";
import { withStyles } from '@material-ui/core/styles';
import { Button, Typography, IconButton, TextField, } from '@material-ui/core';

import LinkShareControllerWeb, {
  Props,
  configJSON
} from "./LinkShareController.web";
import { ShareDialog } from "./ShareDialog.web";
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";

class LinkShare extends LinkShareControllerWeb {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {

    const { hideInputValue, linkShareData, shareUrl, openShareDialog } = this.state;
    const classes = this.props.classes || {};
    const textInputType = hideInputValue ? 'password' : 'text';
    const hideImage = hideInputValue ? imgPasswordVisible : imgPasswordInVisible;

    return (
      // Customizable Area Start
      <>

        <ShareDialog
          open={openShareDialog}
          sharedUrl={shareUrl}
          onClose={this.closeShareDialogHandler}
          data-testid="share-dialog"
        />


        <div className={classes.container}>
          <Typography
            data-testid="labelTitle"
            className={classes.title}
          >
            {configJSON.labelTitleTypography}
          </Typography>

          <Typography
            data-testid="labelBody"
            className={classes.body}
          >
            {" "}
            {configJSON.labelBodyTypography}
          </Typography>

          <Typography data-testid="txtSaved">
            This is the received value:
              {this.state.savedValue}{" "}
          </Typography>

          <TextField
            data-testid="txtInput"
            className={classes.textInput}
            placeholder={configJSON.txtInputPlaceholder}
            InputProps={{
              endAdornment: (
                <IconButton
                  data-testid={"btnShowHide"}
                  onClick={this.toggleHideInputHandler}
                >
                  <img
                    data-testid={"btnShowHideImage"}
                    src={hideImage}
                  />
                </IconButton>
              )
            }}
            variant="outlined"
            value={this.state.inputValue}
            onChange={this.onTextInputChange}
            type={textInputType}
          />

          <Button
            data-testid={"btnExample"}
            onClick={this.clickMeHandler}
            variant="contained"
            color="primary"
          >
            {configJSON.btnExampleTitle}
          </Button>

          {
            linkShareData
              ?.filter((shareDataItem) => shareDataItem.attributes.photo && shareDataItem.attributes.photo.length)
              ?.map((shareDataItem) => {

                let shareData = shareDataItem.attributes.photo[0];

                return (
                  <div key={shareData.id}>
                    <img 
                    className={classes.img}
                    src={shareData.photo} alt={shareData.name} />
                    <Button
                      fullWidth
                      data-testid={"btnShare"}
                      onClick={() => this.shareHandler(shareData.photo)}
                      variant="contained"
                      color="primary"
                    >
                      {configJSON.btnShareTitle}
                    </Button>
                  </div>
                )
              })
          }

        </div>
      </>
      // Customizable Area End
    );
  }
}

// Customizable Area Start

export default withStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: 16,
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    maxWidth: 650,
    backgroundColor: "#ffffffff",
    '&>*': {
      margin: '5px 0',
    },
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
  textInput: {
  },
  img:{
    maxWidth: '100%',
  },
})(LinkShare);
// Customizable Area End
