import React, { useCallback, useState } from 'react';
import './App.css';
import { Alert, Box, Button, createTheme, Snackbar, TextField, ThemeProvider } from '@mui/material';
import { ContentCopyOutlined } from '@mui/icons-material'

const theme = createTheme({
  typography: {
    fontFamily: 'Prompt'
  }
});

function App() {

  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);

  const copy = useCallback(() => {
    if (text !== "") {
      navigator.clipboard.writeText(text);
      setOpen(true);
    }
  }, [text]);

  const alertClose = () => {
    setOpen(false);
  };

  const editText = useCallback((value: string) => {
    if (value !== "่") {

      if (value.includes('ำ'))
        value = value.replace('่ำ', 'ํ่า').replace('้ำ', 'ํ้า').replace('๊ำ', 'ํ๊า').replace('๋ำ', 'ํ๋า').replace('ำ', 'ํา');

      const array = Array.from(value);
      const newArray = array.map((v: string, i: Number) => {
        if (i === 0) {
          return v;
        } else if (" ั  ิ  ี  ึ  ื ุ  ู  ฺ  ็  ่  ้  ๊  ๋  ์  ํ  ๎".includes(v) && v !== " ") {
          return v;
        } else {
          return ' ' + v;
        }
      });

      setText(newArray.join(""));
    } else {
      setText("");
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h2>พิมพ์เว้นวรรค</h2>
        {/*<Input type={'text'} onChange={e => editText(e.target.value)}></Input>
        <Copy onClick={copy}>{text}</Copy>*/}
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              width: 500,
              maxWidth: '80%',
            }}
          >

            <TextField
              id="outlined-basic"
              label="พิมพ์ที่นี่"
              variant="outlined"
              multiline maxRows={5}
              margin="normal"
              fullWidth
              onChange={(e) => editText(e.target.value)}
            />
            <Button
              variant="outlined"
              startIcon={<ContentCopyOutlined />}
              size="large"
              color='primary'
              sx={{ m: 2 }}
              onClick={copy}
            >
              {text === "" ? "Copy" : text}
            </Button>
            <Snackbar
              open={open}
              autoHideDuration={6000}
              onClose={alertClose}
            >
              <Alert severity="success" color="info" onClose={alertClose}>Copied to clipboard!</Alert>
            </Snackbar>
          </Box>
        </ThemeProvider>
      </header>
    </div >
  );
}

export default App;
