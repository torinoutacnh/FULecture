import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';

// layouts
import MainLayout from '../layouts/main';
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import AuthGuard from '../guards/AuthGuard';
import GuestGuard from '../guards/GuestGuard';
// import RoleBasedGuard from '../guards/RoleBasedGuard';

// components
import LoadingScreen from '../components/LoadingScreen';
import RoleBasedGuard from '../guards/RoleBasedGuard';

// ----------------------------------------------------------------------

const Loadable = (Component: any) => (props: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();
  const isDashboard = pathname.includes('/dashboard');

  return (
    <Suspense
      fallback={
        <LoadingScreen
          sx={{
            ...(!isDashboard && {
              top: 0,
              left: 0,
              width: 1,
              zIndex: 9999,
              position: 'fixed'
            })
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          )
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          )
        },
        { path: 'login-unprotected', element: <Login /> },
        { path: 'register-unprotected', element: <Register /> },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'verify', element: <VerifyCode /> }
      ]
    },

    // Dashboard Routes
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <RoleBasedGuard accessibleRoles={['lecturer']}>
            <DashboardLayout />
          </RoleBasedGuard>
        </AuthGuard>
      ),
      children: [
        { path: '', element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <GeneralApp /> },
        { path: 'ecommerce', element: <GeneralEcommerce /> },
        {
          path: 'analytics',
          element: <GeneralAnalytics />
        },
        {
          path: 'products',
          children: [
            { path: '', element: <Products /> },
            { path: 'new', element: <CreateProduct /> },
            { path: ':id', element: <UpdateProduct /> },
            { path: 'master', element: <Products /> }
          ]
        },
        {
          path: 'LecturerGroups',
          children: [
            { path: '', element: <LecturerGroup /> },
            { path: 'LecturerGroupDetail/:id', element: <LecturerGroupDetail /> }
          ]
        },
        {
          path: 'teams',
          children: [
            { path: '', element: <Team /> },
            { path: 'teamDetail/:id', element: <TeamDetail /> }
          ]
        },
        {
          path: 'topics',
          children: [
            { path: '', element: <TopicList /> },
            { path: 'all', element: <TopicList /> },
            { path: 'new', element: <AddTopic /> },
            { path: 'topicDetail/:id', element: <TopicDetail /> },
            { path: 'updateTopic/:id', element: <UpdateTopic /> },
            { path: 'submitted', element: <TopicSubmittedList /> },
            { path: 'approving', element: <TopicApproving /> }
          ]
        },
        {
          path: 'projects',
          children: [
            { path: '', element: <MentoringProjects /> },
            { path: 'all', element: <MentoringProjects /> },
            { path: 'projectDetail/:id', element: <ProjectDetail /> },
            {
              path: 'projectDetail/weeklyReport/:id',
              element: <WeeklyReport />
            },
            {
              path: 'projectDetail/invidualReport/:pId/:studentName',
              element: <InvidualReport />
            },
            {
              path: 'projectDetail/mentorReview/:id/:teamId',
              element: <MentorReview />
            }
          ]
        },
        {
          path: 'reviews',
          children: [
            { path: '', element: <Review /> },
            { path: 'all', element: <Review /> }
          ]
        },
        {
          path: 'announcements',
          children: [{ path: 'detail/:id', element: <AnnoucementDetail /> }]
        },
        {
          path: 'applications',
          children: [
            { path: '', element: <Applications /> },
            { path: 'all', element: <Applications /> }
          ]
        },
        {
          path: 'evaluationboards',
          children: [
            { path: '', element: <EvaluationBoards /> },
            { path: 'councils/:id', element: <Councils /> },
            { path: 'councils/councilDetail/:id/:boardId', element: <CouncilDetail /> },
            {
              path: 'councils/councilDetail/marks/:teamId/:boardId/:councilId',
              element: <Marks />
            }
          ]
        },
        {
          path: 'semesters',
          children: [{ path: '', element: <SemesterList /> }]
        },
        {
          path: 'profile',
          children: [{ path: '', element: <LecturerProfile /> }]
        },
        {
          path: 'collections',
          children: [
            { path: '', element: <CollectionListPage /> },
            { path: 'new', element: <CreateCollectionPage /> },
            { path: ':id', element: <UpdateCollectionPage /> }
          ]
        },
        {
          path: 'categories',
          children: [{ path: '', element: <CategoryListPage /> }]
        },
        {
          path: 'menus',
          children: [
            { path: '', element: <MenusPage /> },
            { path: ':id', element: <UpdateMenuPage /> }
          ]
        },
        { path: 'menu-in-store', element: <MenuInStorePage /> },
        {
          path: 'stores',
          children: [
            { path: '', element: <StoreListPage /> },
            {
              path: 'new',
              element: <CreateStorePage />
            },
            { path: ':id', element: <UpdateStorePage /> }
          ]
        }
      ]
    },
    // FOR STORE ADMIN
    {
      path: 'store-admin',
      element: (
        <AuthGuard>
          <RoleBasedGuard accessibleRoles={['lecturer']}>
            <DashboardLayout />
          </RoleBasedGuard>
        </AuthGuard>
      ),
      children: [
        { path: '', element: <Navigate to="/store-admin/orders" replace /> },
        { path: 'app', element: <GeneralApp /> },

        {
          path: 'orders',
          children: [
            { path: '', element: <OrderListPage /> },
            {
              path: 'new',
              element: <CreateStorePage />
            },
            { path: ':id', element: <UpdateStorePage /> }
          ]
        },
        {
          path: 'menus',
          element: <MenuStoreManagementPage />
        }
      ]
    },

    {
      path: '',
      element: <Navigate to="auth/login" replace />
    },
    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'coming-soon', element: <ComingSoon /> },
        { path: 'topic', element: <TopicList /> },
        { path: 'add-topic', element: <AddTopic /> },
        { path: '500', element: <Page500 /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}

// IMPORT COMPONENTS

// Authentication
const Login = Loadable(lazy(() => import('../pages/authentication/Login')));
const Register = Loadable(lazy(() => import('../pages/authentication/Register')));
const ResetPassword = Loadable(lazy(() => import('../pages/authentication/ResetPassword')));
const VerifyCode = Loadable(lazy(() => import('../pages/authentication/VerifyCode')));
// Dashboard
const GeneralApp = Loadable(lazy(() => import('../pages/dashboard/GeneralApp')));
const GeneralEcommerce = Loadable(lazy(() => import('../pages/dashboard/GeneralEcommerce')));
const GeneralAnalytics = Loadable(lazy(() => import('../pages/dashboard/GeneralAnalytics')));

const ComingSoon = Loadable(lazy(() => import('../pages/ComingSoon')));

const Page500 = Loadable(lazy(() => import('../pages/Page500')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
// Components
const Products = Loadable(lazy(() => import('../pages/Products/Products')));
const UpdateProduct = Loadable(lazy(() => import('../pages/Products/UpdateProduct')));
const CreateProduct = Loadable(lazy(() => import('../pages/Products/create')));

// Menu
const MenusPage = Loadable(lazy(() => import('../pages/Menus')));
const UpdateMenuPage = Loadable(lazy(() => import('../pages/Menus/update')));
const MenuInStorePage = Loadable(lazy(() => import('../pages/Menus/MenuInStore')));

// Collection
const CollectionListPage = Loadable(lazy(() => import('../pages/collections')));
const UpdateCollectionPage = Loadable(lazy(() => import('../pages/collections/update')));
const CreateCollectionPage = Loadable(lazy(() => import('../pages/collections/create')));

// Store
const StoreListPage = Loadable(lazy(() => import('../pages/Stores')));
const CreateStorePage = Loadable(lazy(() => import('../pages/Stores/create')));
const UpdateStorePage = Loadable(lazy(() => import('../pages/Stores/update')));

// Store-Order
const OrderListPage = Loadable(lazy(() => import('../pages/Orders/OrderList')));
const MenuStoreManagementPage = Loadable(lazy(() => import('../pages/Orders/MenuOfStore')));

// Categories
const CategoryListPage = Loadable(lazy(() => import('../pages/Categories')));

// Topics
const TopicList = Loadable(lazy(() => import('../pages/Topics/Topics')));
const UpdateTopic = Loadable(lazy(() => import('../pages/Topics/UpdateTopic')));
const AddTopic = Loadable(lazy(() => import('../pages/Topics/AddTopic')));
const TopicApproving = Loadable(lazy(() => import('../pages/Topics/TopicApproving')));

// Profile
const LecturerProfile = Loadable(lazy(() => import('../pages/LecturerProfile')));

// TopicDetail
const TopicDetail = Loadable(lazy(() => import('../pages/Topics/TopicDetail')));
const MentoringProjects = Loadable(
  lazy(() => import('../pages/Topics/components/MentoringProjects'))
);
const ProjectDetail = Loadable(lazy(() => import('../pages/Topics/ProjectDetail')));
const TopicSubmittedList = Loadable(
  lazy(() => import('../pages/Topics/components/TopicSubmittedList'))
);
const Applications = Loadable(lazy(() => import('../pages/Applications/Applications')));
const WeeklyReport = Loadable(lazy(() => import('../pages/WeeklyReport/WeeklyReport')));
const InvidualReport = Loadable(lazy(() => import('../pages/WeeklyReport/InvidualReport')));
const MentorReview = Loadable(lazy(() => import('../pages/Topics/components/MentorReview')));
// Semester
const SemesterList = Loadable(lazy(() => import('../pages/Semesters/SemesterList')));
// LecturerGroup
const LecturerGroup = Loadable(lazy(() => import('../pages/LecturerGroups/LecturerGroup')));
const Review = Loadable(lazy(() => import('../pages/LecturerGroups/Review')));
const LecturerGroupDetail = Loadable(
  lazy(() => import('../pages/LecturerGroups/LecturerGroupDetail'))
);

// Team
const Team = Loadable(lazy(() => import('../pages/Teams/Team')));
const TeamDetail = Loadable(lazy(() => import('../pages/Teams/TeamDetail')));
// EvaluationBoard
const EvaluationBoards = Loadable(lazy(() => import('../pages/EvaluationBoards/EvaluationBoards')));
const Councils = Loadable(lazy(() => import('../pages/EvaluationBoards/Councils')));
const CouncilDetail = Loadable(lazy(() => import('../pages/EvaluationBoards/CouncilDetail')));
const Marks = Loadable(lazy(() => import('../pages/Marks/Marks')));
// Annoucements detail
const AnnoucementDetail = Loadable(
  lazy(() => import('../pages/LecturerDashboard/AnnoucementDetail'))
);
