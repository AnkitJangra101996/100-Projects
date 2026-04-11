import React from "react";

const convertNameToAvatar = (name) => {
  if (name.includes(" ")) {
    const [firstName, lastName] = name.split(" ");
    return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
  }
  return name.charAt(0).toUpperCase() + name.charAt(1).toUpperCase();
};

function Avatar({ name }) {
  return (
    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white">
      {convertNameToAvatar(name)}
    </div>
  );
}
export default Avatar;
