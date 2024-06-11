import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession, useSession } from "next-auth/react";
import Cookies from "js-cookie";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const [isVerifying, setIsVerifying] = useState(true);
    const router = useRouter();
    const { data: session, status } = useSession(); // Hook de NextAuth.js

    useEffect(() => {
      // Verificación de la sesión de NextAuth.js
      const verifySession = async () => {
        // Obtener la sesión de NextAuth.js desde el servidor
        const nextAuthSession = await getSession();
        
        // Obtener el token JWT desde las cookies
        const token = Cookies.get("jwtToken");

        // Verificar si hay una sesión válida (NextAuth o JWT)
        if (nextAuthSession || token) {
          setIsVerifying(false);
        } else {
          router.push("/login");
        }
      };

      verifySession();
    }, [router, session]);

    if (isVerifying) {
      return (
        <div className="flex items-center justify-center min-h-screen p-5 bg-gray-100 min-w-screen">
          <div className="flex space-x-2 animate-pulse">
            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
          </div>
        </div>  
      );
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
