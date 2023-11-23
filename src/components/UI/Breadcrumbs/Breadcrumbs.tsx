import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs: React.FC = () => {
   const location = useLocation();
   const pathnames = location.pathname.split('/').filter((x) => x);

   return (
       <nav>
           {pathnames.map((path, index) => {
               const to = `/${pathnames.slice(0, index + 1).join('/')}`;
               return (
                    <Link to={to}>
                        {path}/
                    </Link>
               );
           })}
       </nav>
   );
};

export default Breadcrumbs;
