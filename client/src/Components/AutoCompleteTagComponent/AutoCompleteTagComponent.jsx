import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import { Checkbox, FormHelperText, TextField } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

function AutoCompleteTagComponent({
   items,
   setValue,
   getValues,
   filed,
   value,
   label,
   placeholder,
   fieldName,
   labelText,
}) {
   return (
      <div className="w-full">
         <Autocomplete
            multiple
            limitTags={2}
            value={value?.length && value[0]?._id ? value : []}
            options={items}
            getOptionLabel={(option) => option[fieldName]}
            isOptionEqualToValue={(option, value) => option?._id === value?._id}
            onChange={(_, values) => {
               setValue(filed, values, {
                  shouldValidate: true,
               });
               setValue(
                  filed,
                  getValues(filed).filter((i) => values.find((v) => v.category === i.category))
               );
            }}
            sx={{ width: '100%' }}
            renderOption={(props, option, { selected }) => {
               return (
                  <li {...props}>
                     <Checkbox
                        icon={<CheckBoxOutlineBlankIcon />}
                        checkedIcon={<CheckBoxIcon />}
                        style={{ marginRight: 8 }}
                        checked={selected}
                     />
                     {option[fieldName]}
                  </li>
               );
            }}
            renderInput={(params) => <TextField {...params} label={label} placeholder={placeholder} />}
         />
         {!!labelText && <FormHelperText>{labelText}</FormHelperText>}
      </div>
   );
}

export default AutoCompleteTagComponent;
