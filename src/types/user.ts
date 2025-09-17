export interface TUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isAuthenticated: boolean;
}

export interface UserMenuProps {
  user: TUser | null;
  onThemeToggle: () => void;
  isDarkTheme: boolean;
}
