import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface MessageProps {
    type: 'success' | 'error';
    message: string;
    open: boolean;
    onClose: () => void;
}

function Message({ type, message, open, onClose }: MessageProps) {
    return (
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={open} autoHideDuration={6000} onClose={onClose}>
            <Alert onClose={onClose} severity={type}>
                {message}
            </Alert>
        </Snackbar>
    );
}

export default Message;
