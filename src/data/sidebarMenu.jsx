export const profileMenu = (hasLocalPassword) => [
  {
    id: "profile",
    label: "Profile",
    icon: "fa-user",
    children: [
      { id: "info", label: "My Profile", path: "/profile/my-profile" },
      { id: "banks", label: "Banks & Cards", path: "/profile/bank" },
      { id: "addresses", label: "Addresses", path: "/Addresses" },
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
