import { MenuitemsType } from "@/types/menu";
import { createSlice } from "@reduxjs/toolkit";
import {
  IconAperture,
  IconUsers,
  IconUserShield,
  IconFileSpreadsheet,
  IconListDetails,
  IconList,
  IconExclamationCircle,
  IconCoins,
} from "@tabler/icons-react";
import { IconWorld } from "@tabler/icons-react";
import { appPaths } from "@/utils/helper/appPaths";
import { uniqueId } from "lodash";
import { IconSettings } from "@tabler/icons-react";
import { IconWorldDownload } from "@tabler/icons-react";

const initialState: MenuitemsType[] = [
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
    title: "Domains",
    icon: IconWorld,
    href: appPaths.DOMAINS.LIST,
    display: false,
    slug: "domains",
    children: [
      {
        id: uniqueId(),
        title: "Manage Domains",
        icon: IconCoins,
        href: appPaths.DOMAINS.LIST,
        display: false,
        slug: "manage-domain",
      },
      {
        id: uniqueId(),
        title: "Import Redirect (Bulk)",
        icon: IconWorldDownload,
        href: appPaths.DOMAINS.BULK_IMPORT,
        display: false,
        slug: "import-redirect",
      },
      {
        id: uniqueId(),
        title: "Import Domain (Bulk)",
        icon: IconWorldDownload,
        href: appPaths.DOMAINS.BULK_IMPORT_DOMAIN,
        display: false,
        slug: "import-domain",
      },
    ],
  },
  {
    id: uniqueId(),
    title: "DNS Record Templates",
    icon: IconFileSpreadsheet,
    href: appPaths.DNS_RECORDS_TEMPLATE.LIST,
    display: false,
    slug: "template_dns_records",
  },
  {
    id: uniqueId(),
    title: "Roles & Permissions",
    icon: IconUserShield,
    href: appPaths.ROLES_AND_PERMISSIONS.LIST,
    display: false,
    slug: "role_permissions",
  },
  {
    id: uniqueId(),
    title: "Users",
    icon: IconUsers,
    href: appPaths.USERS.LIST,
    display: false,
    slug: "users",
  },
  {
    id: uniqueId(),
    title: "Logs",
    icon: IconList,
    href: appPaths.LOGS.ACTIVITY_LOGS,
    display: false,
    slug: "log_records",
    children: [
      {
        id: uniqueId(),
        title: "Activity Logs",
        icon: IconListDetails,
        href: appPaths.LOGS.ACTIVITY_LOGS,
        display: false,
        slug: "activity-logs",
      },
      {
        id: uniqueId(),
        title: "Error Logs",
        icon: IconExclamationCircle,
        href: appPaths.LOGS.ERROR_LOGS,
        display: false,
        slug: "error-logs",
      },
    ],
  },
  {
    id: uniqueId(),
    title: "Site Settings",
    icon: IconSettings,
    href: appPaths.SITE_SETTINGS.LIST,
    display: false,
    slug: "site_settings",
  },
];

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setMenuItems: (state: MenuitemsType[], action) => {
      const menu = [...state];
      if (action?.payload?.profile?.isSuperAdmin) {
        menu.forEach((item, i) => {
          menu[i].display = true;
        });
      } else {
        if (action?.payload?.profile?.role) {
          menu.forEach((item, i) => {
            if (item.slug !== "dashboard") {
              const modulePermission =
                action?.payload?.profile.role?.permissions?.find(
                  (mod: { module: string }) => mod.module === item.slug
                )?.value ?? false;
              menu[i].display = modulePermission;
            }
          });
        }
      }
      state = menu;
    },
    resetMenuItems: (state: MenuitemsType[]) => {
      state = initialState;
    },
  },
});

export const { setMenuItems, resetMenuItems } = menuSlice.actions;

export default menuSlice.reducer;
