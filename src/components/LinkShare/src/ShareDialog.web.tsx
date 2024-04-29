import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from "@material-ui/core/styles";
import clsx from 'clsx';
import { createSvgIcon } from '@material-ui/core';

const FacebookIcon = createSvgIcon(React.createElement("path", {
  d: "M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2m13 2h-2.5A3.5 3.5 0 0 0 12 8.5V11h-2v3h2v7h3v-7h3v-3h-3V9a1 1 0 0 1 1-1h2V5z"
}), 'facebook');

const PinterestIcon = createSvgIcon(React.createElement("path", {
  d: "M9.04 21.54c.96.29 1.93.46 2.96.46a10 10 0 0 0 10-10A10 10 0 0 0 12 2 10 10 0 0 0 2 12c0 4.25 2.67 7.9 6.44 9.34-.09-.78-.18-2.07 0-2.96l1.15-4.94s-.29-.58-.29-1.5c0-1.38.86-2.41 1.84-2.41.86 0 1.26.63 1.26 1.44 0 .86-.57 2.09-.86 3.27-.17.98.52 1.84 1.52 1.84 1.78 0 3.16-1.9 3.16-4.58 0-2.4-1.72-4.04-4.19-4.04-2.82 0-4.48 2.1-4.48 4.31 0 .86.28 1.73.74 2.3.09.06.09.14.06.29l-.29 1.09c0 .17-.11.23-.28.11-1.28-.56-2.02-2.38-2.02-3.85 0-3.16 2.24-6.03 6.56-6.03 3.44 0 6.12 2.47 6.12 5.75 0 3.44-2.13 6.2-5.18 6.2-.97 0-1.92-.52-2.26-1.13l-.67 2.37c-.23.86-.86 2.01-1.29 2.7v-.03z"
}), 'pintrest');

const TwitterIcon = createSvgIcon(React.createElement("path", {
  d: "M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"
}), 'twitter');

const MailIcon = createSvgIcon(React.createElement("path", {
  d: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
}), 'mail');

const WhatsAppIcon = createSvgIcon(React.createElement("path", {
  d: "M16.75 13.96c.25.13.41.2.46.3.06.11.04.61-.21 1.18-.2.56-1.24 1.1-1.7 1.12-.46.02-.47.36-2.96-.73-2.49-1.09-3.99-3.75-4.11-3.92-.12-.17-.96-1.38-.92-2.61.05-1.22.69-1.8.95-2.04.24-.26.51-.29.68-.26h.47c.15 0 .36-.06.55.45l.69 1.87c.06.13.1.28.01.44l-.27.41-.39.42c-.12.12-.26.25-.12.5.12.26.62 1.09 1.32 1.78.91.88 1.71 1.17 1.95 1.3.24.14.39.12.54-.04l.81-.94c.19-.25.35-.19.58-.11l1.67.88M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10c-1.97 0-3.8-.57-5.35-1.55L2 22l1.55-4.65A9.969 9.969 0 0 1 2 12 10 10 0 0 1 12 2m0 2a8 8 0 0 0-8 8c0 1.72.54 3.31 1.46 4.61L4.5 19.5l2.89-.96A7.95 7.95 0 0 0 12 20a8 8 0 0 0 8-8 8 8 0 0 0-8-8z"
}), 'whatsapp');

const CloseIcon = createSvgIcon(React.createElement("path", {
  d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
}), 'close');


const useDialogStyles = makeStyles({
  paper: {
    borderRadius: '10px',
    overflow: 'inherit',
  }
});


const useStyles = makeStyles({
  contentContainer: {
    padding: "20px",
    '& > *': {
      margin: '25px 0',
    }
  },
  copyContainer: {
    border: "1px solid #e2e3e5",
    display: "flex",
    padding: "0",
    justifyContent: "space-between",
    borderRadius: "5px",
    alignItems: "center"
  },
  copyBtn: {
    background: "#e2e3e5",
    borderTopLeftRadius: "0",
    borderBottomLeftRadius: "0",
    fontWeight: "bold",
    padding: "10px 20px",
    cursor: "pointer"
  },
  copyLink: {
    maxWidth: "260px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    margin: "0",
    padding: "4px 0 4px 10px",
    color: "#85868a",
    fontWeight: 600
  },
  centerText: {
    textAlign: 'center',
  },
  text1: {
    color: "#2e2f31",
    fontWeight: "bold",
    fontSize: "1rem"
  },
  text2: {
    color: "#75797c",
    fontWeight: 600,
    fontSize: "1.1rem"
  },
  iconButton: {
    background: '#e1e1e1'
  },
  closeBtn: {
    position: 'fixed',
    top: '3vh',
    right: '3vw',
  },
  closeIcon: {
    color: 'white'
  },
  sharedImg: {
    maxWidth: '100px'
  },
});


export function ShareDialog({
  open,
  sharedUrl,
  onClose,
}: {
  open: boolean,
  sharedUrl: string,
  onClose: () => void,
}) {

  const classes = useStyles();
  const dialogClasses = useDialogStyles();

  const pintrestURL = `https://pinterest.com/pin/create/link/?url=${sharedUrl}`
  const twitterURL = `https://twitter.com/share?url=${sharedUrl}`;
  const facebookURL = `https://www.facebook.com/sharer/sharer.php?u=${sharedUrl}`;
  const mailURL = `mailto:?subject=${sharedUrl}&amp;body=${sharedUrl}`;
  const whatsappURL = `https://api.whatsapp.com/send?text=${sharedUrl}`;


  function copyHandler() {
    navigator.clipboard.writeText(sharedUrl);
    setTimeout(() => {
      onClose();
    }, 50);
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      classes={dialogClasses}
    >

      <IconButton className={classes.closeBtn} onClick={onClose}>
        <CloseIcon className={classes.closeIcon} fontSize="large" />
      </IconButton>

      <DialogContent className={classes.contentContainer}>

        <Typography variant='body1' className={clsx(classes.centerText, classes.text1)}>
          {`Share`}
        </Typography>

        <Grid container justifyContent="center" alignItems="center">
        <img src={sharedUrl} className={classes.sharedImg} />
        </Grid>

        <Grid container justifyContent='center'>
          <Grid item xs={2} container justifyContent="center">
            <a
              target="_blank"
              href={mailURL}
            >
              <IconButton className={classes.iconButton}>
                <MailIcon />
              </IconButton>
            </a>
          </Grid>
          <Grid item xs={2} container justifyContent="center">
            <a href={whatsappURL}
              data-action="share/whatsapp/share"
              target="_blank">
              <IconButton className={classes.iconButton}>
                <WhatsAppIcon />
              </IconButton>
            </a>
          </Grid>
          <Grid item xs={2} container justifyContent="center">
            <a
              target="_blank"
              href={pintrestURL}
            >
              <IconButton className={classes.iconButton}>
                <PinterestIcon />
              </IconButton>
            </a>
          </Grid>
          <Grid item xs={2} container justifyContent="center">
            <a
              target="_blank"
              href={twitterURL}
            >
              <IconButton className={classes.iconButton}>
                <TwitterIcon />
              </IconButton>
            </a>
          </Grid>
          <Grid item xs={2} container justifyContent="center">
            <a
              target="_blank"
              href={facebookURL}
            >
              <IconButton className={classes.iconButton}>
                <FacebookIcon />
              </IconButton>
            </a>
          </Grid>

        </Grid>


        <Typography variant="body2" className={clsx(classes.centerText, classes.text2)}>
          {'or Copy to clipboard'}
        </Typography>

        <div className={classes.copyContainer}>
          <Typography className={classes.copyLink}>
            {sharedUrl}
          </Typography>
          <Button data-testid="copy" className={classes.copyBtn} onClick={copyHandler}>
            {'Copy'}
          </Button>
        </div>

      </DialogContent>

    </Dialog>
  );
}
