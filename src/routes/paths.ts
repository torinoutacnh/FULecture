import EvaluationBoards from '../pages/EvaluationBoards/EvaluationBoards';
import MentorReview from '../pages/Topics/components/MentorReview';
// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  register: path(ROOTS_AUTH, '/register'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  verify: path(ROOTS_AUTH, '/verify')
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page404: '/404',
  page500: '/500',
  components: '/components'
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    app: path(ROOTS_DASHBOARD, '/app'),
    ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
    analytics: path(ROOTS_DASHBOARD, '/analytics')
  },
  mail: {
    root: path(ROOTS_DASHBOARD, '/mail'),
    all: path(ROOTS_DASHBOARD, '/mail/all')
  },
  chat: {
    root: path(ROOTS_DASHBOARD, '/chat'),
    new: path(ROOTS_DASHBOARD, '/chat/new'),
    conversation: path(ROOTS_DASHBOARD, '/chat/:conversationKey')
  },
  calendar: path(ROOTS_DASHBOARD, '/calendar'),
  kanban: path(ROOTS_DASHBOARD, '/kanban'),
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    profile: path(ROOTS_DASHBOARD, '/user/profile'),
    cards: path(ROOTS_DASHBOARD, '/user/cards'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    newUser: path(ROOTS_DASHBOARD, '/user/new'),
    editById: path(ROOTS_DASHBOARD, '/user/ada-lindgren/edit'),
    account: path(ROOTS_DASHBOARD, '/user/account')
  },
  eCommerce: {
    root: path(ROOTS_DASHBOARD, '/e-commerce'),
    shop: path(ROOTS_DASHBOARD, '/e-commerce/shop'),
    product: path(ROOTS_DASHBOARD, '/e-commerce/product/:name'),
    productById: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-air-force-1-ndestrukt'),
    list: path(ROOTS_DASHBOARD, '/e-commerce/list'),
    newProduct: path(ROOTS_DASHBOARD, '/e-commerce/product/new'),
    editById: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-blazer-low-77-vintage/edit'),
    checkout: path(ROOTS_DASHBOARD, '/e-commerce/checkout'),
    invoice: path(ROOTS_DASHBOARD, '/e-commerce/invoice')
  },
  products: {
    root: path(ROOTS_DASHBOARD, '/products'),
    list: path(ROOTS_DASHBOARD, '/products'),
    editById: path(ROOTS_DASHBOARD, '/products/:id'),
    master: path(ROOTS_DASHBOARD, '/products/master'),
    newProduct: path(ROOTS_DASHBOARD, '/products/new')
  },
  collections: {
    root: path(ROOTS_DASHBOARD, '/collections'),
    list: path(ROOTS_DASHBOARD, '/collections'),
    editById: path(ROOTS_DASHBOARD, '/collections/:id'),
    new: path(ROOTS_DASHBOARD, '/collections/new')
  },
  menus: {
    root: path(ROOTS_DASHBOARD, '/menus'),
    list: path(ROOTS_DASHBOARD, '/menus'),
    editById: path(ROOTS_DASHBOARD, '/menus/:id'),
    newProduct: path(ROOTS_DASHBOARD, '/menus/new'),
    storeMenu: path(ROOTS_DASHBOARD, '/menu-in-store')
  },
  stores: {
    root: path(ROOTS_DASHBOARD, '/stores'),
    list: path(ROOTS_DASHBOARD, '/stores'),
    editById: path(ROOTS_DASHBOARD, '/stores/:id'),
    new: path(ROOTS_DASHBOARD, '/stores/new')
  },
  blog: {
    root: path(ROOTS_DASHBOARD, '/blog'),
    posts: path(ROOTS_DASHBOARD, '/blog/posts'),
    post: path(ROOTS_DASHBOARD, '/blog/post/:title'),
    postById: path(ROOTS_DASHBOARD, '/blog/post/portfolio-review-is-this-portfolio-too-creative'),
    newPost: path(ROOTS_DASHBOARD, '/blog/new-post')
  },
  categories: {
    root: path(ROOTS_DASHBOARD, '/categories'),
    list: path(ROOTS_DASHBOARD, '/categories'),
    editById: path(ROOTS_DASHBOARD, '/categories/:id'),
    new: path(ROOTS_DASHBOARD, '/categories/new')
  },
  topics: {
    root: path(ROOTS_DASHBOARD, '/topics'),
    list: path(ROOTS_DASHBOARD, '/topics/all'),
    submitted: path(ROOTS_DASHBOARD, '/topics/submitted'),
    mentoring: path(ROOTS_DASHBOARD, '/topics/mentoring'),
    editById: path(ROOTS_DASHBOARD, '/topics/:id'),
    updateTopic: path(ROOTS_DASHBOARD, '/topics/updateTopic'),
    addTopic: path(ROOTS_DASHBOARD, '/topics/new'),
    topicDetail: path(ROOTS_DASHBOARD, '/topics/topicDetail'),
    TopicApproving: path(ROOTS_DASHBOARD, '/topics/approving')
  },
  profile: {
    root: path(ROOTS_DASHBOARD, '/profile')
  },
  projects: {
    root: path(ROOTS_DASHBOARD, '/projects'),
    list: path(ROOTS_DASHBOARD, '/projects/all'),
    projectDetail: path(ROOTS_DASHBOARD, '/projects/projectDetail'),
    invidualReport: path(ROOTS_DASHBOARD, '/projects/projectDetail/invidualReport'),
    weeklyReport: path(ROOTS_DASHBOARD, '/projects/projectDetail/weeklyReport'),
    mentorReview: path(ROOTS_DASHBOARD, '/projects/projectDetail/mentorReview')
  },
  reviews: {
    list: path(ROOTS_DASHBOARD, '/reviews')
  },
  applications: {
    list: path(ROOTS_DASHBOARD, '/applications')
  },
  semester: {
    root: path(ROOTS_DASHBOARD, '/semesters')
  },
  announcement: {
    detail: path(ROOTS_DASHBOARD, '/announcements/detail')
  },
  LecturerGroups: {
    root: path(ROOTS_DASHBOARD, '/LecturerGroups'),
    list: path(ROOTS_DASHBOARD, '/LecturerGroups'),
    LecturerGroupDetail: path(ROOTS_DASHBOARD, '/LecturerGroups/LecturerGroupDetail')
  },
  teams: {
    root: path(ROOTS_DASHBOARD, '/teams'),
    list: path(ROOTS_DASHBOARD, '/teams'),
    teamDetail: path(ROOTS_DASHBOARD, '/teams/teamDetail')
  },
  EvaluationBoards: {
    root: path(ROOTS_DASHBOARD, '/evaluationboards'),
    list: path(ROOTS_DASHBOARD, '/evaluationboards'),
    councils: path(ROOTS_DASHBOARD, '/evaluationboards/councils'),
    councilDetail: path(ROOTS_DASHBOARD, '/evaluationboards/councils/councilDetail'),
    marks: path(ROOTS_DASHBOARD, '/evaluationboards/councils/councilDetail/marks')
  }
};

export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';
