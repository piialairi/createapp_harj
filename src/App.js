import './App.css';
import Todolist from './components/todolist';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function App({ children }) {

  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {children}
        <AppBar position='static'>
          <Toolbar>
            <Typography
              variant='h6'>
              My todolist
            </Typography>
          </Toolbar>
        </AppBar>
        <Todolist />

      </LocalizationProvider>
    </div>
  );
}

export default App;
