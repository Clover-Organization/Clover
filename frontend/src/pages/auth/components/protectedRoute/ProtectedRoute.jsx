import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const checkToken = async () => {

      if (token) {
        try {
          const response = await fetch('http://localhost:8080/token', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const responseBody = await response.json();
            const role = responseBody.role;
            localStorage.setItem('role', role);
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);

            // Exibir alerta de erro
            Swal.fire({
              icon: 'error',
              title: 'Erro',
              text: 'Invalid or expired token!',
            });
          }
        } catch (error) {
          // Exibir alerta de erro
          Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'Error fetching token!',
          });

          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    };

    checkToken();
  }, [token, setIsAuthenticated]);

  if (isAuthenticated === null) {
    return null;
  }

  return isAuthenticated ? <Element {...rest} /> : <Navigate to="/Welcome" />;
};

export default ProtectedRoute;
