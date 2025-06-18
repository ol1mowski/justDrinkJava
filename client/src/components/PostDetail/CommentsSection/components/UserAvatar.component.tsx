import { memo } from "react";
import type { UserAvatarProps } from "../types";

const sizeClasses = {
  sm: "w-6 h-6 text-xs",
  md: "w-8 h-8 text-sm",
  lg: "w-10 h-10 text-base",
} as const;

export const UserAvatar = memo<UserAvatarProps>(({ username, size = "md" }) => {
  const initial = username?.charAt(0).toUpperCase() || "U";

  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-gradient-to-r from-java-orange to-java-red 
                    flex items-center justify-center text-white font-medium flex-shrink-0`}
    >
      {initial}
    </div>
  );
});

UserAvatar.displayName = "UserAvatar";
