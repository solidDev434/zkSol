import { clsx, type ClassValue } from "clsx"
import { FormikProps } from "formik"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const truncateWalletAddress = (address: string) => {
  return `${address.substring(0, 5)}••••${address.substring(address.length - 4, address.length)}`
}

function getIn(obj: any, path: string): any {
  if (!obj) return undefined;
  const pathArray = path
    .replace(/\[(\w+)\]/g, ".$1")
    .replace(/^\./, "")
    .split(".");
  
  return pathArray.reduce((acc, key) => (acc ? acc[key] : undefined), obj);
}

export function getFieldError<T>(
  formik: FormikProps<T>,
  fieldPath: string 
) {
  const isTouched = !!getIn(formik.touched, fieldPath);
  const error = getIn(formik.errors, fieldPath);

  return {
    isInvalid: isTouched && !!error,
    message: isTouched && error ? error : "",
  };
}