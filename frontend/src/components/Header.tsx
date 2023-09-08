import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

function Header() {
    const appBarStyle = {
        backgroundColor: '#1e2044',
    };
    return (
        <AppBar position="static" style={appBarStyle}>
            <Toolbar>
                <Typography variant="h6" component={Link} to="/" style={{ flexGrow: 1 }}>
                    <img src="../../public/logo.png" alt="Logo" style={{ width: '140px' }} />
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
