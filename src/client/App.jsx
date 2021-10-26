import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import Share from '@/pages/share'

const theme = createTheme({
  status: {},
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
      xxl: 1600
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
          <Switch>
              {/* <Route path="/myShare">

              </Route> */}
              {window.electron ? (
                <Route path="/" component={Share} />
              ) : (
                <Route path="/" component={myShare} />
              )}
              
          </Switch>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
