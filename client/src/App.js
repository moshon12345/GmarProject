import './App.css';
import Layout from './layout/Layout';
import {BrowserRouter} from 'react-router-dom';
import Router from './routes/Router';
import {AppThemePrvoider} from './providers/ThemePrvoider';
import {SnackbarProvider} from './providers/SnackbarProvider';
import {UserProvider} from './users/providers/UserProvider';
import Background from "..//src//image.jpg";

function App () {
  const styles = {
    paperContainer: {
      backgroundImage: `url(${Background})`,
        // backgroundImage: `url(${"static/src/img/main.jpg"})`
    }
};

  return (
    <BrowserRouter style={styles.paperContainer}>
      <AppThemePrvoider style={styles.paperContainer}>
        <SnackbarProvider style={styles.paperContainer}>
          <UserProvider style={styles.paperContainer}>
            <Layout style={styles.paperContainer}>
              <Router style={styles.paperContainer}/>
            </Layout>
          </UserProvider>
        </SnackbarProvider>
      </AppThemePrvoider>
    </BrowserRouter>
  );
}

export default App;
