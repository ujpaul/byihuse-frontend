import UserPanel from "Container/UserPanel";

const Byiza = () => import("Views/byiza");
const Rental = () => import("Views/Renting");
const RentalDetails = () => import("Views/rental");
const TractorRenting = () => import("Views/TractorRenting");
const HouseRenting = () => import("Views/HouseRenting");
const LandRenting = () => import("Views/LandRenting");
const DecorationRenting = () => import("Views/DecorationRenting");
const SonorisationRenting = () => import("Views/SonorisationRenting");
const Drycleaning = () => import("Views/Byoroshye");
const Lawyers = () => import("Views/Byemewe");
const Byizewe = () => import("Views/Byizewe");
const SearchLawyers = () => import("Views/LawyersPage");
const TechniciansPage = () => import("Views/TechniciansPage");
const Search = () => import("Views/search");
const HomeV1 = () => import("Views/HomeV1");
const services = () => import("Views/services.vue");
const MadeInRwanda = () => import("Views/MadeInRwanda.vue");
const ProductCategoies = () => import("Views/productcategories");
const ProductDepartments = () => import("Views/productDepartment");
const Product = () => import("Views/MadeInRwanda.vue");
// const Product = () => import('Views/Product');
const Payment = () => import("Views/Payment/Payment");
const PaymentCommand = () => import("Views/Payment/CommandPayment");
const DryCleanerPayment = () => import("Views/Payment/DryCleanerPayment");
const Cart = () => import("Views/Cart");
const CommandCart = () => import("Views/CommandCart");
const FinalReceipt = () => import("Views/FinalReceipt");
const ProductDetail = () => import("Views/ProductDetail");
const AboutUs = () => import("Views/AboutUs");
const TermCondiition = () => import("Views/TermsAndCondition");
const Faq = () => import("Views/Faq");
const Account = () => import("Views/UserAccount/Account.vue");
const OrderHistory = () => import("Views/UserAccount/OrderHistory.vue");
const Profile = () => import("Views/UserAccount/Profile.vue");
const AgentProfile = () => import("Views/UserAccount/Agent/AgentProfile.vue");
const AgentBalance = () => import("Views/UserAccount/Agent/AgentBalance.vue");
const AgentEditAddress = () =>
  import("Views/UserAccount/Agent/EditAgentAddress.vue");
const AgentEditNames = () =>
  import("Views/UserAccount/Agent/EditAgentNames.vue");
const AgentEditEmail = () =>
  import("Views/UserAccount/Agent/EditAgentEmail.vue");
const AgentEditPassword = () =>
  import("Views/UserAccount/Agent/EditAgentPassword.vue");
const Address = () => import("Views/UserAccount/Address.vue");
const Cards = () => import("Views/UserAccount/Cards.vue");
const EditProfile = () => import("Views/UserAccount/EditProfile.vue");
const editEmail = () => import("Views/UserAccount/editEmail.vue");
const editNames = () => import("Views/UserAccount/editNames.vue");
const wallet = () => import("Views/UserAccount/Wallet.vue");
const editPassword = () => import("Views/UserAccount/editPassword.vue");
const BlogDetail = () => import("Views/Blogs/BlogDetails");
const ContactUs = () => import("Views/Contact");
const PrivacyPolicy = () => import("Views/PrivacyPolicy");
const Register = () => import("Views/Sessions/Register");
const ForgotPassword = () => import("Views/Sessions/ForgotPassword");
const ThankYou = () => import("Views/Sessions/ThankYou");
const ThankYouCustomerProperty = () =>
  import("Views/Sessions/ThankYouCustomerProperty");
const ThankYouCommand = () => import("Views/Sessions/ThankYouCommand");
const ThankYouRenting = () => import("Views/Sessions/ThankYouRenting");
const ThankYouSonorisation = () =>
  import("Views/Sessions/ThankYouSonorisation");
const ThankYouHouseRenting = () =>
  import("Views/Sessions/ThankYouHouseRenting");
const ThankYouTechnicianOrder = () =>
  import("Views/Sessions/ThankyouTechnicianOrder");
const ThankYouLawyer = () => import("Views/Sessions/ThankYouLawyer");
const ThankYouDecoration = () => import("Views/Sessions/ThankYouDecoration");
const ThankYouTechnician = () => import("Views/Sessions/ThankYouTechnicians");
const ThankYouDryCleaner = () => import("Views/Sessions/ThankYouDryCleaner");
const ThankYouHousing = () => import("Views/Sessions/ThankYouHousing");
const ThankYouAgent = () => import("Views/Sessions/ThankYouAgent");
const SignIn = () => import("Views/Sessions/SignIn");
const Cars = () => import("Views/Cars");
const Tractors = () => import("Views/Tractors");
const House = () => import("Views/House");
const Land = () => import("Views/Land");
const Sonorisation = () => import("Views/Sonorisation");
const Decoration = () => import("Views/Decoration");
const Band = () => import("Views/Band");
const Command = () => import("Views/Command");
const myCommand = () => import("Views/UserAccount/MyCommand");
const DryCleanerCart = () => import("Views/DryCleanerCart");
const TrackOrder = () => import("Views/TrackOrder");
const TrackProcess = () => import("Views/TrackingProcess");
const TechnicianProfile = () => import("Views/TechnicianProfile");
const RegisterHouse = () => import("Views/RegisterHouse");
const RegisterBand = () => import("Views/RegisterBand");
const RegisterLand = () => import("Views/RegisterLand");
const RegisterSonorisation = () => import("Views/RegisterSonorisation");
const RegisterDecoration = () => import("Views/RegisterDecoration");
const TermsAndConditions = () => import("Views/TermsAndConditions");
const Agent = () => import("Views/addAgent");
const ReceiveCommand = () => import("Views/receiveCommand");
export default {
  path: "/",
  component: UserPanel,
  redirect: "en/home",
  children: [
    {
      path: "home",
      component: HomeV1,
      meta: {
        header: 1,
      },
    },
    {
      path: "rental",
      component: Rental,
      name: "Rental",
    },
    {
      path: "cars",
      component: Cars,
      name: "cars",
    },
    {
      path: "tractors",
      component: Tractors,
      name: "tractors",
    },
    {
      path: "band-music",
      component: Band,
      name: "band",
    },
    {
      path: "house",
      component: House,
      name: "house",
    },
    {
      path: "land",
      component: Land,
      name: "land",
    },
    {
      path: "sonorisation",
      component: Sonorisation,
      name: "sonorisation",
    },
    {
      path: "decoration",
      component: Decoration,
      name: "decoration",
    },
    {
      path: "byiza",
      component: Byiza,
      name: "Byiza",
    },
    {
      path: "byoroshye",
      component: Drycleaning,
      name: "Drycleaning",
    },
    {
      path: "byemewe",
      component: Lawyers,
      name: "Lawyers",
    },
    {
      path: "byizewe",
      component: Byizewe,
      name: "Byizewe",
    },
    {
      path: "lawyers/:keyword/:type",
      component: SearchLawyers,
      name: "LawyerSearch",
    },
    {
      path: "technicians/:type",
      component: TechniciansPage,
      name: "TechniciansPage",
    },
    {
      path: "technician/profile/:userId",
      component: TechnicianProfile,
      name: "tech",
    },
    {
      path: "track-order/:trackNumber",
      component: TrackOrder,
      name: "TrackOrder",
    },
    {
      path: "track-construction-process/:trackNumber",
      component: TrackProcess,
      name: "TrackProcess",
    },
    {
      path: "search/:keyword",
      component: Search,
      name: "Search",
    },
    {
      path: "services",
      component: services,
      name: "services",
    },
    {
      path: "products/:title",
      component: ProductDepartments,
      name: "Products",
    },
    {
      path: "products/:department/:category",
      component: ProductCategoies,
      name: "Products",
    },
    {
      path: "products",
      component: Product,
      name: "all Products",
    },
    {
      path: "made-in-rwanda",
      component: MadeInRwanda,
      name: "made in rwanda Products",
    },
    {
      path: "product-commande",
      component: Command,
      name: "command",
    },
    {
      path: "checkout/payment",
      component: Payment,
    },
    {
      path: "checkout/command-payment",
      component: PaymentCommand,
    },
    {
      path: "checkout/dry-cleaner-payment",
      component: DryCleanerPayment,
    },
    {
      path: "cart",
      component: Cart,
    },
    {
      path: "commandcart",
      component: CommandCart,
    },
    {
      path: "dryCleaner-cart",
      component: DryCleanerCart,
    },
    {
      path: "products/:title/:category/:id",
      component: ProductDetail,
      name: "productDetail",
    },
    {
      path: "renting/Cars/:title/:id",
      component: RentalDetails,
      name: "productDetail",
    },
    {
      path: "renting/Tractors/:title/:id",
      component: TractorRenting,
      name: "TractorRenting",
    },
    {
      path: "renting/House/:title/:id",
      component: HouseRenting,
      name: "HouseRenting",
    },
    {
      path: "renting/Land/:title/:id",
      component: LandRenting,
      name: "LandRenting",
    },
    {
      path: "renting/Decoration/:title/:id",
      component: DecorationRenting,
      name: "DecorationRenting",
    },
    {
      path: "renting/Sonorisation/:title/:id",
      component: SonorisationRenting,
      name: "SonorisationRenting",
    },
    {
      path: "register-house",
      component: RegisterHouse,
      name: "RegisterHouse",
    },
    {
      path: "register-band",
      component: RegisterBand,
      name: "RegisterBand",
    },
    {
      path: "register-land",
      component: RegisterLand,
      name: "RegisterLand",
    },
    {
      path: "register-sonorisation",
      component: RegisterSonorisation,
      name: "RegisterSonorisation",
    },
    {
      path: "register-decoration",
      component: RegisterDecoration,
      name: "RegisterDecoration",
    },
    {
      path: "terms",
      component: TermsAndConditions,
      name: "TermsAndConditions",
    },
    {
      path: "checkout/final-receipt",
      component: FinalReceipt,
      name: "FinalReceipt",
    },
    {
      path: "about",
      component: AboutUs,
      name: "about",
    },
    {
      path: "term-condition",
      component: TermCondiition,
      name: "term-condition",
    },
    {
      path: "agent",
      component: Agent,
      name: "Agent",
    },
    {
      path: "confirm-commande",
      component: ReceiveCommand,
      name: "ReceiveCommand",
    },
    {
      path: "faq",
      component: Faq,
      name: "Faq",
    },
    {
      path: "/",
      component: Account,
      name: "Account",
      children: [
        {
          path: "account/order-history",
          name: "OrderHistory",
          component: OrderHistory,
        },
        {
          path: "account/profile",
          name: "Profile",
          component: Profile,
        },
        {
          path: "account/address",
          name: "Address",
          component: Address,
        },
        {
          path: "account/cards",
          name: "Cards",
          component: Cards,
        },
        {
          path: "account/profile/edit",
          name: "EditProfile",
          component: EditProfile,
        },
        {
          path: "account/my-wallet",
          name: "balnce",
          component: wallet,
        },
        // {
        // 	path: '/account/profile/edit',name:'EditAddress',component: EditAddress
        // },
        {
          path: "account/profile-edit/name",
          name: "editNames",
          component: editNames,
        },
        {
          path: "account/command",
          name: "editNames",
          component: myCommand,
        },
        {
          path: "account/profile-edit/email",
          name: "editEmail",
          component: editEmail,
        },
        {
          path: "account/profile-edit/password",
          name: "editPassword",
          component: editPassword,
        },
        // {
        // 	path: '/account/profile/edit',name:'EditProfileInfo',component: EditProfileInfo,
        // },
      ],
    },
    {
      path: "/",
      component: AgentProfile,
      name: "AgentProfile",
      children: [
        {
          path: "agent/profile",
          name: "Profile",
          component: Profile,
        },
        {
          path: "agent/agent-balance",
          name: "AgentBalance",
          component: AgentBalance,
        },
        // {
        //   path: "agent/agent-profile",
        //   name: "AgentProfile",
        //   component: AgentProfile,
        // },
        {
          path: "agent/profile/edit",
          name: "AgentEditProfile",
          component: AgentEditAddress,
        },
        {
          path: "agent/password/edit",
          name: "AgentEditPassword",
          component: AgentEditPassword,
        },
        {
          path: "agent/names/edit",
          name: "AgentEditNames",
          component: AgentEditNames,
        },
        {
          path: "agent/email/edit",
          name: "AgentEditEmail",
          component: AgentEditEmail,
        },
        {
          path: "agent/my-wallet",
          name: "balnce",
          component: wallet,
        },
        // {
        // 	path: '/account/profile/edit',name:'EditAddress',component: EditAddress
        // },
        {
          path: "agent/profile-edit/name",
          name: "editNames",
          component: editNames,
        },
        {
          path: "agent/command",
          name: "editNames",
          component: myCommand,
        },
        {
          path: "agent/profile-edit/email",
          name: "editEmail",
          component: editEmail,
        },
        {
          path: "agent/profile-edit/password",
          name: "editPassword",
          component: editPassword,
        },
        // {
        // 	path: '/account/profile/edit',name:'EditProfileInfo',component: EditProfileInfo,
        // },
      ],
    },
    {
      path: "/blog-detail/:id",
      component: BlogDetail,
      name: "BlogDetail;",
    },
    {
      path: "contact",
      component: ContactUs,
      name: "ContactUs",
    },

    {
      path: "/privacy-policy",
      component: PrivacyPolicy,
      name: "PrivacyPolicy",
    },
    {
      path: "session/signup",
      component: Register,
      name: "Register",
    },
    {
      path: "/session/forgot-password",
      component: ForgotPassword,
      name: "ForgotPassword",
    },
    {
      path: "session/thank-you",
      component: ThankYou,
      name: "ThankYou",
    },
    {
      path: "session/thank-you-tech-order",
      component: ThankYouTechnicianOrder,
      name: "ThankYouTechnicianOrder",
    },
    {
      path: "session/thank-you-housing",
      component: ThankYouHousing,
      name: "ThankYouHousing",
    },
    {
      path: "session/thank-you-agent",
      component: ThankYouAgent,
      name: "ThankYouAgent",
    },
    {
      path: "session/thank-you-command",
      component: ThankYouCommand,
      name: "ThankYouCommand",
    },
    {
      path: "session/thank-you-renting",
      component: ThankYouRenting,
      name: "ThankYouRenting",
    },
    {
      path: "session/thank-you-sonorisation",
      component: ThankYouSonorisation,
      name: "ThankYouSonorisation",
    },
    {
      path: "session/thank-you-customer-property",
      component: ThankYouCustomerProperty,
      name: "ThankYouCustomerProperty",
    },
    {
      path: "session/thank-you-decoration",
      component: ThankYouDecoration,
      name: "ThankYouDecoration",
    },
    {
      path: "session/thank-you-house-renting",
      component: ThankYouHouseRenting,
      name: "ThankYouHouseRenting",
    },
    {
      path: "session/thank-you-lawyer",
      component: ThankYouLawyer,
      name: "ThankYouLawyer",
    },
    {
      path: "session/thank-you-technician",
      component: ThankYouTechnician,
      name: "ThankYouTechnician",
    },
    {
      path: "session/thank-you-dry-cleaner",
      component: ThankYouDryCleaner,
      name: "ThankYouDryCleaner",
    },
    {
      path: "session/signin",
      component: SignIn,
      name: "SignIn",
    },
  ],
};
