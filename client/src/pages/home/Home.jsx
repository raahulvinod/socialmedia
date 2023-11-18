import { Box } from '@mui/material';
import Navbar from 'pages/navbar/Navbar';
import UserWidget from 'components/widgets/UserWidget';

const Home = () => {
  return (
    <Box>
      <Navbar />
      <UserWidget />
    </Box>
  );
};

export default Home;
