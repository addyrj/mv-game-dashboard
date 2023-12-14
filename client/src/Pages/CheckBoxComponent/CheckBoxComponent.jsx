import React from 'react';
import { Switch } from 'antd';

function CheckBoxComponent({ heading, name, control, Controller }) {
   return (
      <div>
         <div className="flex items-center space-x-2 mt-4">
            <div className="w-1/6">
               <p className="text-gray-300 font-medium text-sm">{heading}</p>
            </div>
            <Controller
               name={name}
               control={control}
               render={({ field: { onChange, value } }) => (
                  <Switch defaultChecked onChange={onChange} checked={value} />
               )}
            />
         </div>
      </div>
   );
}

export default CheckBoxComponent;
