export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}

export interface UserPermissions {
  canManageUsers: boolean;
}

export const rolePermissions: Record<UserRole, UserPermissions> = {
  [UserRole.USER]: {
    canManageUsers: false,
  },
  [UserRole.ADMIN]: {
    canManageUsers: true,
  },
};
