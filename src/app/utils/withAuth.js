import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const [isVerifying, setIsVerifying] = useState(true);
    const router = useRouter();

    useEffect(() => {
      const token = Cookies.get("jwtToken");
      if (token) {
        setIsVerifying(false);
      } else {
        router.push("/login");
      }
    }, [router]);

    if (isVerifying) {
      return (
        <div class="flex items-center justify-center min-h-screen p-5 bg-gray-100 min-w-screen">
          <div class="flex space-x-2 animate-pulse">
            <div class="w-3 h-3 bg-gray-500 rounded-full"></div>
            <div class="w-3 h-3 bg-gray-500 rounded-full"></div>
            <div class="w-3 h-3 bg-gray-500 rounded-full"></div>
          </div>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
