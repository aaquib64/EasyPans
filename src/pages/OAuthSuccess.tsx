// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const API_BASE_URL =
//   import.meta.env.VITE_API_BASE_URL || "http://localhost:5001";

// const OAuthSuccess = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     const token = params.get("token");

//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     // 1️⃣ Save token
//     localStorage.setItem("token", token);

//     // 2️⃣ Fetch logged-in user using token
//     fetch(`${API_BASE_URL}/api/auth/me`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((res) => res.json())
//       .then((user) => {
//         // 3️⃣ Save userInfo just like email login
//         localStorage.setItem("userInfo", JSON.stringify(user));

//         // 4️⃣ Redirect
//         navigate("/recipes");
//       })
//       .catch(() => {
//         navigate("/login");
//       });
//   }, [navigate]);

//   return <p className="text-center mt-10">Signing you in with Google...</p>;
// };

// export default OAuthSuccess;


import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5001";

const OAuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const loginWithGoogle = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        // 1️⃣ Get user profile using token
        const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const user = await res.json();

        if (!res.ok) throw new Error("Failed to fetch user");

        // 2️⃣ Store EXACT same structure as email login
        localStorage.setItem(
          "userInfo",
          JSON.stringify({
            ...user,
            token,
          })
        );

        // 3️⃣ Redirect like normal login
        navigate(user.role === "admin" ? "/admin" : "/recipes");
      } catch (error) {
        console.error(error);
        navigate("/login");
      }
    };

    loginWithGoogle();
  }, []);

  return <p>Signing you in with Google...</p>;
};

export default OAuthSuccess;
