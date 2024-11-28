import { Flex, Select } from 'antd';
import './index.css';

const Header=()=>{
   return(
    <div className="main_header">
       <Flex justify="space-between" align="center">
       <div>
         Logo
       </div>
       <Select
       />
       </Flex>
    </div>
         );
};

export default Header;