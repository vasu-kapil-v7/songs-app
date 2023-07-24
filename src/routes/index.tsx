import { Routes, Route } from "react-router-dom";
import AppBarComponent from "../components/AppBar";
import { makeStyles} from '@mui/styles';
import SongsGrid from "../components/SongGrid";
import PageNotFound from "../pages/PageNotFound/PageNotFound";
import FavoritesSidebar from "../components/Favorites";
import Player from "../components/SongPlayer";


const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
  },
  content: {
    flex: 1,
  
  },
}));

const AppRoutes: React.FC = () => {
  const classes = useStyles();

  return (
    <div>
      <Routes>
        <Route path="/" element={<AppBarComponent />}>
          <Route index element={<div className={classes.content}><SongsGrid term="love" offset={0} /></div>} />
        </Route>
        <Route path="/check" element={<div className={classes.content}><SongsGrid term="love" offset={0} /></div>} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
