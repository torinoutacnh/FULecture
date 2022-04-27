// routes
import {
  PeopleAltOutlined,
  NotificationImportantOutlined,
  ClassOutlined,
  HomeOutlined,
  Assignment,
  AppsRounded,
  EventOutlined,
  PlaylistAdd,
  PlaylistAddOutlined,
  PlaylistAddCheckOutlined,
  Group,
  CollectionsBookmarkOutlined,
  RateReview
} from '@material-ui/icons';
import { PATH_STORE_APP } from 'routes/storeAppPaths';
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Label from '../../components/Label';
import SvgIconStyle from '../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <SvgIconStyle src={`/static/icons/navbar/${name}.svg`} sx={{ width: '100%', height: '100%' }} />
);

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  kanban: getIcon('ic_kanban'),
  tag: getIcon('tag'),
  menu: getIcon('menu'),
  store: getIcon('ic_store'),
  order: getIcon('ic_order')
};

const sidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'product-subheader',
    items: [
      // MANAGEMENT : PRODUCT
      {
        title: 'product',
        path: PATH_DASHBOARD.products.root,
        icon: ICONS.tag,
        children: [
          {
            title: 'master',
            path: PATH_DASHBOARD.products.list
          },
          {
            title: 'collection',
            path: PATH_DASHBOARD.collections.list
          },
          {
            title: 'categories',
            path: PATH_DASHBOARD.categories.list
          }
        ]
      }
    ]
  },
  {
    subheader: 'menu-subheader',
    items: [
      {
        title: 'menu',
        path: PATH_DASHBOARD.menus.list,
        icon: ICONS.menu,
        children: [
          { title: 'list', path: PATH_DASHBOARD.menus.list },
          { title: 'store-menu', path: PATH_DASHBOARD.menus.storeMenu }
        ]
      }
    ]
  },

  {
    subheader: 'store-subheader',
    items: [
      {
        title: 'store',
        path: PATH_DASHBOARD.stores.list,
        icon: ICONS.store
      }
    ]
  }
];

export const storeAppSidebarConfig = [
  {
    subheader: 'dashboard',
    items: [
      // MANAGEMENT : TOPIC

      {
        title: 'dashboard',
        path: PATH_DASHBOARD.root,
        icon: <HomeOutlined />
      }
    ]
  },
  {
    subheader: 'my project',
    items: [
      // MANAGEMENT : TOPIC
      {
        title: 'project',
        path: PATH_DASHBOARD.projects.list,
        icon: <AppsRounded />
      },
      {
        title: 'topic',
        path: PATH_DASHBOARD.topics.submitted,
        icon: <Assignment />
      },
      {
        title: 'application',
        path: PATH_DASHBOARD.applications.list,
        icon: <PlaylistAddCheckOutlined />
      }
    ]
  },
  {
    subheader: 'evaluation',
    items: [
      // {
      //   title: 'review',
      //   path: PATH_DASHBOARD.reviews.list,
      //   icon: <RateReview />
      // },
      {
        title: 'council',
        path: PATH_DASHBOARD.EvaluationBoards.list,
        icon: <EventOutlined />
      }
    ]
  },
  {
    subheader: 'fptu-capstone',
    items: [
      {
        title: 'topic',
        path: PATH_DASHBOARD.topics.list,
        icon: <Assignment />
      },
      {
        title: 'team',
        path: PATH_DASHBOARD.teams.list,
        icon: <Group />
      }
      // {
      //   title: 'checkpoint',
      //   path: PATH_DASHBOARD.LecturerGroups.list,
      //   icon: <CollectionsBookmarkOutlined />
      // }
    ]
  }
];

export default sidebarConfig;
