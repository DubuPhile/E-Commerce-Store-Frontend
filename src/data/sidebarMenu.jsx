export const profileMenu = (hasLocalPassword) => [
  {
    id: "profile",
    label: "Profile",
    icon: "fa-user",
    children: [
      { id: "info", label: "My Profile", path: "/profile/my-profile" },
      { id: "banks", label: "Banks & Cards", path: "/profile/bank" },
      { id: "addresses", label: "Addresses", path: "/profile/Addresses" },
      {
        id: "password",
        label: hasLocalPassword ? "Change Password" : "Set Password",
        path: hasLocalPassword
          ? "/profile/change-password"
          : "/profile/set-password",
      },
      { id: "privacy", label: "Privacy Settings", path: "/privacy-settings" },
    ],
  },
  {
    id: "Orders",
    label: "Orders",
    icon: "fa-bag-shopping",
    path: "/orders",
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: "fa-bell",
  },
  {
    id: "vouchers",
    label: "Vouchers",
    icon: "fa-ticket",
  },
];
