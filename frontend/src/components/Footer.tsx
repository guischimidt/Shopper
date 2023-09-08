import Typography from '@mui/material/Typography';

const Footer = () => {
  return (
    <footer style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#1e2044' }}>
      <Typography variant="body2" sx={{ color: '#fff' }}>
        © {new Date().getFullYear()} Shopper.com.br
      </Typography>
    </footer>
  );
}

export default Footer;