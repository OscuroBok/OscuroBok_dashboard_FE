import { uniqueId } from "lodash";

interface MenuitemsType {
  [x: string]: any;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: any;
  href?: string;
  children?: MenuitemsType[];
  chip?: string;
  chipColor?: string;
  variant?: string;
  external?: boolean;
}
import {
  IconAperture,
  IconSettings,
  IconWorld,
  IconCoins,
  IconWorldDownload,
  IconFileSpreadsheet,
  IconUserShield,
  IconUsers,
  IconList,
  IconListDetails,
  IconExclamationCircle,
} from "@tabler/icons-react";
import { appPaths } from "@/utils/helper/appPaths";

const Menuitems: MenuitemsType[] = [
  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconAperture,
    href: appPaths.AUTH_ROUTES.DASHBOARD,
    chipColor: "secondary",
    display: true,
    slug: "dashboard",
  },
  {
    id: uniqueId(),
    title: "Users",
    icon: IconUsers,
    href: appPaths.USERS.LIST,
    display: false,
    slug: "users",
  },
];

export default Menuitems;
