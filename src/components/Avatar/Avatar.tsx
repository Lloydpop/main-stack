interface AvatarProps {
  name: string;
}

export const Avatar = ({ name }: AvatarProps) => {
  const getInitials = (name: string): string => {
    const names = name.split(" ");
    return names
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase();
  };

  return (
    <div className="bg-gradient-to-r from-gray-700 via-gray-600 to-gray-900  w-[32px] h-[32px] rounded-full text-white uppercase flex justify-center items-center">
      <span className="initials">{getInitials(name ?? "U U")}</span>
    </div>
  );
};
