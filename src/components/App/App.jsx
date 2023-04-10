import 'modern-normalize';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, lazy } from 'react';
// import { fetchContacts } from 'redux/operations';
import { RotatingLines } from 'react-loader-spinner';
import { selectContacts, selectError, selectIsLoading } from 'redux/selectors';
import { ContactForm } from '../ContactForm/ContactForm';
import { Filter } from '../Filter/Filter';
import { ContactList } from '../ContactList/ContactList';
import css from './App.module.css';

import { Routes, Route } from 'react-router-dom';
import { Layout } from '../Layout';
import { PrivateRoute } from '../PrivateRoute';
import { RestrictedRoute } from '../RestrictedRoute';
import { refreshUser } from 'redux/auth/operations';
import { useAuth } from 'hooks/useAuth';

const HomePage = lazy(() => import('../../pages/Home'));
const RegisterPage = lazy(() => import('../../pages/Register'));
const LoginPage = lazy(() => import('../../pages/Login'));
const ContactsPage = lazy(() => import('../../pages/Contacts'));

export const App = () => {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <b>Refreshing user...</b>
  ) : (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />}></Route>
        <Route
          path="/register"
          element={
            <RestrictedRoute
              redirectTo="/contacts"
              component={<RegisterPage />}
            />
          }
        ></Route>
        <Route
          path="/login"
          element={
            <RestrictedRoute redirectTo="/contacts" component={<LoginPage />} />
          }
        ></Route>
        <Route
          path="/contacts"
          element={
            <PrivateRoute redirectTo="/login" component={<ContactsPage />} />
          }
        ></Route>
      </Route>
    </Routes>
  );
};

//   return (
//     <div className={css.wrapper}>
//       <ContactForm />
//       <h3>Contacts: {contacts.length}</h3>
//       <div style={{ position: 'relative' }}>
//         <Filter />

//         {isLoading && !error && (
//           <b className={css.spiner}>
//             <RotatingLines
//               strokeColor="#757398"
//               strokeWidth="5"
//               animationDuration="0.75"
//               width="60"
//               visible={true}
//             />
//           </b>
//         )}
//       </div>
//       {error && (
//         <p>
//           Sorry, the request ended with the following error: <b>{error}</b>{' '}
//           <br />
//           Please try again later.
//         </p>
//       )}

//       <ContactList />
//     </div>
//   );
// };

// import Header from 'components/Header/Header';
// import { lazy, Suspense, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Routes, Route } from 'react-router-dom';
// import authOperations from 'redux/auth/auth-operation';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import PrivateRoute from 'components/PrivateRoute';
// import RestictedRoute from 'components/RestictedRoute';
// import authSelector from 'redux/auth/auth-selector';

// const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
// const RegistrationPage = lazy(() =>
//   import('../../pages/RegistrationPage/RegistrationPage')
// );
// const LoginForm = lazy(() => import('../../pages/LogInPage/LogInPage'));

// const ContactPage = lazy(() => import('../../pages/ContactPage/ContactPage'));

// function App() {
//   const dispatch = useDispatch();
//   const isRefreshing = useSelector(authSelector.getIsRefreshing);

//   useEffect(() => {
//     dispatch(authOperations.refreshCurrentUser());
//   }, [dispatch]);

//   return isRefreshing ? (
//     <b>Loading...</b>
//   ) : (
//     <>
//       <ToastContainer />
//       <Header />
//       <Suspense fallback={<p>Loading...</p>}>
//         <Routes>
//           <Route path="/" element={<HomePage />}></Route>
//           <Route
//             path="registration"
//             element={
//               <RestictedRoute
//                 redirectTo="/contacts"
//                 component={<RegistrationPage />}
//               />
//             }
//           ></Route>
//           <Route
//             path="contacts"
//             element={
//               <PrivateRoute redirectTo="/log-in" component={<ContactPage />} />
//             }
//           ></Route>
//           <Route
//             path="log-in"
//             element={
//               <RestictedRoute
//                 redirectTo="/contacts"
//                 component={<LoginForm />}
//               />
//             }
//           ></Route>
//         </Routes>
//       </Suspense>
//     </>
//   );
// }

// export default App;
