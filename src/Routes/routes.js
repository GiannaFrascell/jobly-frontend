import Homepage from '../Components/Homepage/Homepage';
import Companies from '../Components/Companies/Companies';
import CompanyDetails from  '../Components/Companies/CompanyDetails';
import Jobs from '../Components/Jobs/Jobs';
import Login from '../Components/Login/Login';
import Signup from '../Components/SignUp/SignUp';
import Profile from '../Components/Profile/Profile';

const routes = [
  { path: '/', component: Homepage, name: 'Home', protected: false },
  { path: '/companies', component: Companies, name: 'Companies', protected: true },
  { path: '/companies/:handle', component: CompanyDetails, name: 'CompanyDetails', protected: true },
  { path: '/jobs', component: Jobs, name: 'Jobs', protected: true },
  { path: '/login', component: Login, name: 'Login', protected: false },
  { path: '/signup', component: Signup, name: 'Signup', protected: false },
  { path: '/profile', component: Profile, name: 'Profile', protected: true },
];

export default routes;

