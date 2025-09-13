import React from "react";

export const deepClone = (data) => {
  return JSON.parse(JSON.stringify(data));
};

// export const imageToBase = async (image) => {
//   const reader = new FileReader();
//   reader.readAsDataURL(image);
//   const data = await  new Promise((resolve, reject) => {
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = (err) => reject(err)
//
//   });
//   return data
// };

export const imageToBase = async (image) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const img = new Image();

  img.src = URL.createObjectURL(image);

  await new Promise((resolve) => {
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      resolve();
    };
  });

  return canvas.toDataURL('image/webp');
};


export const checkField = (data, name , message, setMessage) => {
  if (!data?.[name] || (Array.isArray(data?.[name]) && (data?.[name]?.length === 0))) {
    setMessage({[name]: true, text: message})
    return false;
  }
  return true;
};

export const CustomToggle = React.forwardRef(({children, onClick}, ref) => (
    <a
        href=""
        ref={ref}
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
    >
      {children}
    </a>
))

