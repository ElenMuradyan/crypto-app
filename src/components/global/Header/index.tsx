import { Flex, Select, Typography } from 'antd';
import { currencySelectOptions } from '../../../util/constants/currencySelectOptions';
import { useQueryParam } from '../../../hooks/useQueryParam';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ROUTE_PATHS } from '../../../util/constants/routes';

import './index.css';

const Header=()=>{
   const location = useLocation();
   const { setQueryParam, getQueryParam } = useQueryParam();
   const currency = getQueryParam('currency') || currencySelectOptions[0].value;
   const [ locationHome, setLocationHome ] = useState<boolean>(true);

   useEffect(() => {
      setLocationHome(window.location.pathname === '/');
   }, [window.location.pathname]);  

   return(
    <div className="main_header">
       <Flex justify="space-between" align="center">
       <div>
       {!locationHome && <Link to={`${ROUTE_PATHS.HOME}${location.search}`}><Typography.Title level={5} style={{color: 'white', margin: 0}}>Home</Typography.Title></Link>}
       </div>
       <Select
       className='select'
       options={currencySelectOptions}
       value={currency}
       onChange={(currency) => {
         setQueryParam({
            currency
         })
       }}
       />
       </Flex>
    </div>
         );
};

export default Header;