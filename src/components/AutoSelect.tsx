// !from https://mui.com/material-ui/react-autocomplete/
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Avatar from 'react-avatar'
import { InputAdornment, Skeleton } from '@mui/material';
import { SearchSharp } from '@mui/icons-material';
import { useCustomers, useOrders } from '../hooks/sampleData';
import { Customer } from '../interfaces';
// const RenderedInput = (props) => {
//   const {orders, isLoading} = useOrders();
//   return (  
//   <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>

//     <Avatar name={props.option.name} size="32" className='mr-3' round={true} />
//     <p className='w-full'>{props.option.name} 
//     {!isLoading && (<b className='float-right'> {props.option.order} Orders, {props.option.total} SAR</b>)}
//     {isLoading && <Skeleton animation="wave" />}

//     </p >

//   </Box>
// )}
const RenderedInput = ({ props, option, isLoading }) => {
  
  return (
    <Box component="li" sx={{
      '& > img': { mr: 2, flexShrink: 0 },
    }}
    {...props}>


      <Avatar name={`${option.FirstName} ${option.LastName}`} size="32" className='mr-3' round={true} />
      <p className='w-full'>{`${option.FirstName} ${option.LastName}`}
      <b className='float-right'> 
        {!isLoading && ( <p>{option.order} Orders, {option.total} SAR</p> )}
        {isLoading && <Skeleton width={400} animation="wave" />}
        </b>
      </p >
    </Box>
  )
}
export default function AutoSelect({customers, isLoading, onCustomerSelected}) {
  // const {customers,isLoading}:{customers:Customer[], isLoading:boolean} = useCustomers();
  // const [items, setItems] = React.useState<Customer & null>(null);
  // React.useEffect(() => {
  //   setItems(customers.map((cus, id)=>({
  //     name:`${cus.FirstName} ${cus.LastName}`,
  //     total: '376.00', order: id
  //   })))
  // },[customers])
  return (
    <Autocomplete
      id="customer-select"
      sx={{ width: "100%" }}
      options={customers}
      autoHighlight
      onInputChange={(event, newInputValue) => {
        onCustomerSelected(newInputValue);
      }}
      getOptionLabel={(option:Customer) => `${option.FirstName} ${option.LastName}`}
      renderOption={(props, option) => (
        
        <RenderedInput props={props} isLoading={isLoading} option={option} />
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          className='dark:text-white'
          label=""
          inputProps={{
            ...params.inputProps,
            className:'dark:bg-transparent',
            style:{padding:"0"}
          }}
          InputProps={{
            ...params.InputProps,
            className:"dark:text-white",
            autoComplete: 'new-password', // disable autocomplete and autofill
            style: { outline: "0"},
            placeholder: "Choose a customer",
            startAdornment: (
              <InputAdornment className='dark:text-white' position="start">
                <SearchSharp />
              </InputAdornment>
            )
          }} 
        />
      )}
    />
  );
}

// interface ItemType {
//   name: string;
//   order: string;
//   total: string;
// }

// // From https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/countries.js
// const items: readonly ItemType[] = [
//   { name: 'John Smith', total: '376.00', order: "0" },
//   { name: 'Abdulla', total: '376.00', order: "1" },
//   { name: 'Amir Khan', total: '376.00', order: "2" },
//   { name: 'Jules', total: '376.00', order: "3" },
//   { name: 'John Eddy', total: '376.00', order: "4" },
// ];