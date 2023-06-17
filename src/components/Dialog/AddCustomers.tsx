import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import BaseIcon from '../BaseIcon';
import { mdiAlertOutline, mdiGreaterThan,  mdiPlus } from '@mdi/js';
import { useAppSelector } from '../../stores/hooks';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useCustomHook } from '../../hooks/customHooks';
import { customerService } from "../../services/customerService"

const Adver = ({setOpen}) => {

  const [show, setShow] = React.useState(true);
  return (
    <div className={`w-full dark:text-white dark:bg-slate-800 py-1 rounded-lg mt-3 bg-green-100 grid grid-cols-8 ${show ? "" : "hidden"}`}>
      <BaseIcon className='text-yellow-400 float-left my-auto ml-3' size={40} path={mdiAlertOutline} />
      <div className='col-span-6'>
        <p className='text-xs' style={{marginTop:0}}>1 customers found, would you like to select from the list</p>
        <p className='text-xs' style={{marginTop:0}}> Or you can still add this customer.</p>
      </div>
      <a className='my-auto' onClick={() => setOpen(false)}><BaseIcon className=' cursor-pointer hover:bg-green-200 rounded-full' path={mdiGreaterThan} /></a>
    </div>
  )
}
export default function AddCustomers({onChange}) {
  const { state, dispatch, addToastMsg, startLoading, endLoading } = useCustomHook();
  const [open, setOpen] = React.useState(false);
  const [isExistUser, setExistUser]= React.useState(false);
  const [customer, setCustomer] = React.useState({
    FirstName: '',
    LastName: '',
    Phone: '',
    Email: '',
    Notes:'Notes'
  })

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = async () => {
    startLoading();
    try {
      if (Object.values(customer).every(val => val.trim() !== "")) {
        const { data, isOK } = await customerService.add(customer);
        if (isOK) {
          addToastMsg(`Details saved : ${data.FirstName} ${data.Phone}`, "success");
          onChange(customer);
          setCustomer({
            FirstName: '',
            LastName: '',
            Phone: '',
            Email: '',
            Notes:''
          });
          
          setOpen(false);
        } else {
          throw new Error("Internal server error");
        }
      } else {
        addToastMsg("Please fill all the fields required.", "warning");
      }
    } catch (e) {
      console.error("error saving form", e);
      addToastMsg(
        "Unable to save details, please re validate entered values",
        "error"
      );
    }
    endLoading();
  }

  React.useEffect(() => {
    startLoading();
    (async () => {
      const { data, isOK } = await customerService.findByPhone(customer.Phone);
      setExistUser(data?.length>0);
    })();
    endLoading();
  }, [customer.Phone])

  const darkMode = useAppSelector((s) => s.style.darkMode)

  return (
    <div>
      <Button variant='outlined' color='primary' className='my-2 mx-0 md:mx-4 px-0 md:px-3 text-xs md:text-sm ' onClick={handleClickOpen}>
        <BaseIcon
          path={mdiPlus}
        /> Add New Customer
      </Button>
      <Dialog sx={
        {
          '&  div.MuiPaper-root, & input': {
            backgroundColor: darkMode ? "rgb(15 23 42 )" : "white",
            border: `1px solid ${darkMode ? "white" : "black"}`
          },
          '& p,h2,input': {
            mt: 3,
            color: `${darkMode ? "white" : "black"}`
          }
        }
      } open={open} onClose={handleClose}>
        <DialogTitle>Add a new customer</DialogTitle>
        <DialogContent>
          <DialogContentText>
            First Name
          </DialogContentText>
          <input required type='text' size={50} value={customer.FirstName} onChange={e => setCustomer(prev => ({ ...prev, FirstName: e.target.value }))} className='rounded-lg' placeholder="Enter the customer's first name" />
          <DialogContentText>
            Last Name(optional)
          </DialogContentText>
          <input required type='text' size={50} value={customer.LastName} onChange={e => setCustomer(prev => ({ ...prev, LastName: e.target.value }))} className='rounded-lg' placeholder="Enter the customer's last name" />

          <DialogContentText>
            Phone Number
          </DialogContentText>
          <PhoneInput
            isValid={(value, country) => {
              if (value.length <= 3) return 'Phone number is too short.'
              if (value.match(/12345/)) {
                return 'Invalid value: ' + value + ', ' + country.name;
              } else if (value.match(/1234/)) {
                return false;
              } else {
                return true;
              }
            }}
            placeholder='(966) 123 456 7890'
            onChange={e => setCustomer(prev => ({ ...prev, Phone: e }))}
            value={customer.Phone}
            inputStyle={{ width: "100%", backgroundColor: darkMode ? "rgb(15 23 42 )" : "white" }}
            buttonStyle={{ backgroundColor: darkMode ? "rgb(15 23 42 )" : "white", }}
            // dropdownStyle={{backgroundColor: darkMode ? "rgb(15 23 42 )" : "white",color: darkMode ? "white" : "black",}}
            country={'sa'}

          />
          <DialogContentText>
            Personal Email(optional)
          </DialogContentText>
          <input required type='email' size={50} value={customer.Email} onChange={e => setCustomer(prev => ({ ...prev, Email: e.target.value }))} className='rounded-lg' placeholder="Enter the customer's email address" />
            {isExistUser && <Adver setOpen={setOpen} />}
            
        </DialogContent>
        <DialogActions sx={
          darkMode ? {
            "& button": { color: 'white', border: "1px solid white" }
          } : []
        }>
          <Button className='dark:text-white' onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAdd}>Add Customer</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}