import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import BaseIcon from '../BaseIcon';
import { mdiAlertOutline, mdiGreaterThan, mdiPlus, mdiPlusCircle, mdiPlusCircleOutline, mdiPlusOutline } from '@mdi/js';
import { useAppSelector } from '../../stores/hooks';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useCustomHook } from '../../hooks/customHooks';
import ImageReader from '../ImageReader';
import { FormControlLabel, Input, Switch, SwitchProps, TextareaAutosize, ToggleButton, ToggleButtonGroup, styled } from '@mui/material';
import { catalogService } from '../../services/catalogService';

export const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 62,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(36px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
  '& .MuiFormControlLabel-label': {
    backgroundColor: theme.palette.mode === 'light' ? 'red' : 'blue',
  },
}));
export const QuantityItem = ({ className = '', onChange = null }) => {
  const [isLimited, setLimited] = React.useState('Unlimited');
  const [qty, setQty] = React.useState(1);
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    newAlignment !== null && setLimited(newAlignment);
  };
  React.useEffect(() => {
    if (onChange) {
      onChange(isLimited === "Limited" ? qty : isLimited)
    }
  }, [qty, isLimited])
  return (
    <div className={`${className}`}>
      <div className='w-fit inline-block'>
        <ToggleButtonGroup className=' '
          sx={{
            "& .Mui-selected": {
              backgroundColor: "black",
              color: "white"
            },
            "& button": {
              backgroundColor: "white",
              color: "black"
            },
            "& button:hover,& .Mui-selected:hover": {
              backgroundColor: "gray",
              color: "white"
            }
          }}
          color="success"
          value={isLimited}
          onChange={handleChange}
          exclusive
          aria-label="Platform"
        >
          <ToggleButton value="Unlimited">Unlimited</ToggleButton>
          <ToggleButton value="Limited">Limited</ToggleButton>
        </ToggleButtonGroup>
      </div>
      <div className={`overflow-hidden duration-300 transition-all w-${isLimited === "Limited" ? '32' : '0'} flex self-center float-right  h-full`}>
        <input className='w-24 rounded-sm dark:bg-transparent' value={qty} onChange={e => setQty(Number(e.target.value))} style={{ margin: 4, padding: 1 }} type='number' min={1} />
      </div>
    </div>
  )
}

type BlobNull = {
  0: Blob | null
  1: Blob | null
  2: Blob | null
  3: Blob | null
}
export default function AddCatalogs() {
  const { state, dispatch, addToastMsg, startLoading, endLoading } = useCustomHook();
  const [open, setOpen] = React.useState(false);

  const [blobs, setBlobs] = React.useState<BlobNull>({
    0: null,
    1: null,
    2: null,
    3: null,
  })

  const [catalog, setCatalog] = React.useState({
    ProductName: "",
    cShopVisiblity: true,
    Delivery: true,
    ItemPrice: "",
    Quantity: "",
    Notes: "Notes"
  })

  const darkMode = useAppSelector((s) => s.style.darkMode)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = async () => {
    startLoading();
    try {
      if (Object.values(catalog).every(val => val.toString().trim() !== "")) {


        const formData = new FormData();
        Object.keys(catalog).forEach(key => formData.append(key, catalog[key]));
        Object.values(blobs).filter(val => val !== null).forEach((blob, id) => formData.append(`Img`, blob))

        const { data, isOK } = await catalogService.add(formData);
        if (isOK) {
          addToastMsg(`Details saved : ${data.ProductName} ${data.Quantity}`, "success");
          setCatalog({
            ProductName: "",
            cShopVisiblity: true,
            Delivery: true,
            ItemPrice: "",
            Quantity: "",
            Notes: "Notes"
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


  return (
    <div>
      <Button variant='outlined' color='primary' className='my-2 mx-0 md:mx-4 px-0 md:px-3 text-xs md:text-sm ' onClick={handleClickOpen}>
        <BaseIcon
          path={mdiPlus}
        /> Add Item
      </Button>
      <Dialog fullWidth={true} maxWidth={"lg"} sx={
        {
          '&  div.MuiPaper-root, & input, & textarea ': {
            backgroundColor: darkMode ? "rgb(15 23 42 )" : "white",
            border: `1px solid ${darkMode ? "white" : "black"}`
          },
          '& p,h2,input ': {
            mt: 1,
            color: `${darkMode ? "white" : "black"}`
          },
          '& b, & textarea ': {
            color: `${darkMode ? "white" : "black"}`
          }
        }
      } open={open} onClose={handleClose}>
        <DialogTitle sx={{
          "&": {
            fontWeight: "bold",
            fontSize: "30px"
          }
        }} className=''> Create a new item </DialogTitle>
        <DialogContent>
          <div className='grid grid-cols-5'>
            <div>
              <p><b>Photos</b></p>
              <p> (Optional) </p>
            </div>
            {([0, 1, 2, 3]).map((_, id) => <ImageReader key={id} onHandleChange={imgBlob => setBlobs(prev => ({ ...prev, [id]: imgBlob }))} />)}
          </div>
          <hr />
          <p className='font-bold text-xl'>Product Information</p>
          <div className='grid grid-cols-5'>
            <div className='col-span-3 pr-2'>
              <p>Name of Product or service</p>

              <input required type='text' onChange={(e) => setCatalog(prev => ({ ...prev, ProductName: e.target.value }))} className='rounded-lg w-full' placeholder="Name of Product or service" />
            </div>
            <div className='col-span-2 pl-2'>
              <p>Price (Inclusive of VAT)</p>
              <p className='rounded-lg border-2 grid grid-cols-8'>
                <div className=' flex text-center border-r align-middle h-full line-clamp-1 bg-slate-700/20'><b className='inline-block w-full self-center'>SAR</b></div>
                <input style={{ border: 0, marginTop: 0 }}
                  onChange={(e) => setCatalog(prev => ({ ...prev, ItemPrice: e.target.value }))}
                  required type='number' step={0.01} onBlur={(e) => { e.target.value = (Number(e.target.value)).toFixed(2) }} className='w-full inline-block col-span-7' placeholder="0.00" />
              </p>

            </div>

          </div>
          <p>Description Optional</p>
          <TextareaAutosize className='w-full rounded-lg'
            onChange={(e) => setCatalog(prev => ({ ...prev, Notes: e.target.value }))}
            minRows={3} placeholder='Describe this item' />
          <div className='grid grid-cols-3'>
            <div className='col-span-2'>
              <p><b>Quantity</b></p>
              <p>You have an endless stock available.</p>
            </div>
            <div className='flex self-center text-center'>
              <QuantityItem onChange={(value) => setCatalog(prev => ({ ...prev, Quantity: value }))} className='w-full' />
            </div>
          </div>
          <hr />
          <div className='grid grid-cols-3'>
            <div className='col-span-2'>
              <p><b>Visible on my e-store</b></p>
              <p>Switching this on will allow the item to be visible in your eStore.</p>
            </div>
            <div className='flex self-center text-center w-full'>
              <div className='w-full'>
                <FormControlLabel className=''
                  onChange={(e) => setCatalog(prev => ({ ...prev, cShopVisiblity: e.target.checked }))}
                  style={{ color: darkMode ? 'white' : 'black' }}
                  control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                  label=""
                />
              </div>

            </div>
          </div>
          <hr />
          <div className='grid grid-cols-3'>
            <div className='col-span-2'>
              <p><b>Delivery</b></p>
              <p>Switching this on will allow you to deliver this product and collect customer address.</p>
            </div>
            <div className='flex self-center text-center w-full'>
              <div className='w-full'>
                <FormControlLabel className=''
                  onChange={(e) => setCatalog(prev => ({ ...prev, Delivery: e.target.checked }))}
                  style={{ color: darkMode ? 'white' : 'black' }}
                  control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                  label=""
                />
              </div>

            </div>
          </div>
        </DialogContent>
        <DialogActions sx={
          darkMode ? {
            "& button": { color: 'white', border: "1px solid white" }
          } : []
        }>
          <Button onClick={handleAdd}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}