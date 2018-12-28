import Loadable from 'react-loadable';
import Loading from 'Loading';

const Anchor = Loadable({
  loader: () => import('./Test'),
  loading: Loading,
});
export default Anchor;
