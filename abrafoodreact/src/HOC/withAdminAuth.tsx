import jwt_decode from "jwt-decode"
import { SD_Roles } from "../Utility/SD";

const withAdminAuth = (WrappedComponent : any) => {
    return(props: any) => {
        const accessToken = localStorage.getItem("token") ?? "" ;
        if(accessToken) {
        const decode: {role: string; } = jwt_decode(accessToken);
        
        if(decode.role !== SD_Roles.ADMIN){
            window.location.replace("/accessDenied");
            return null;
        }
    }
    else {
        window.location.replace("/login");
        return null;
    }
        if(!accessToken){
            window.location.replace("/login");
            return null;
        }
        return <WrappedComponent{...props}/>
    }
}
export default withAdminAuth;


// Another implementation
// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import jwt_decode from "jwt-decode";
// import { SD_Roles } from "../Utility/SD";

// const withAdminAuth = (WrappedComponent: React.ComponentType<any>) => {return (props: any) => {
//   
//     const navigate = useNavigate();
//     const accessToken = localStorage.getItem("token") ?? "";

//     useEffect(() => {
//       if (!accessToken) {
//         // Eğer token yoksa login sayfasına yönlendir
//         navigate("/login", { replace: true });
//         return;
//       }

//       try {
//         const decoded: { role: string } = jwt_decode(accessToken);
//         if (decoded.role !== SD_Roles.ADMIN) {
//           // Eğer kullanıcı admin değilse erişim reddi sayfasına yönlendir
//           navigate("/accessDenied", { replace: true });
//         }
//       } catch (error) {
//         // Eğer token decode edilemezse (ör. bozuk token), login sayfasına yönlendir
//         navigate("/login", { replace: true });
//       }
//     }, [accessToken, navigate]);

//     // Yönlendirme sırasında hiçbir şey render edilmemesi için null döndür
//     if (!accessToken) {
//       return null;
//     }

//     return <WrappedComponent {...props} />;
//   };
// };

// export default withAdminAuth;
