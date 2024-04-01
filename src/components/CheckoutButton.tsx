/*import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import LoadingButton from "./LoadingButton";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import UserProfileForm, {
  UserFormData,
} from "@/forms/user-profile-form/UserProfileForm";
import { useGetMyUser } from "@/api/MyUserApi";

type Props = {
  onCheckout: (userFormData: UserFormData) => void;
  disabled: boolean;
  isLoading: boolean;
};

const CheckoutButton = ({ onCheckout, disabled, isLoading }: Props) => {
  const {
    isAuthenticated,
    isLoading: isAuthLoading,
    loginWithRedirect,
  } = useAuth0();

  const { pathname } = useLocation();

  const { currentUser, isLoading: isGetUserLoading } = useGetMyUser();

  const onLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: pathname,
      },
    });
  };

  if (!isAuthenticated) {
    return (
      <Button onClick={onLogin} className="bg-orange-500 flex-1">
        Log in to check out
      </Button>
    );
  }

  if (isAuthLoading || !currentUser || isLoading) {
    return <LoadingButton />;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={disabled} className="bg-orange-500 flex-1">
          Go to checkout
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] md:min-w-[700px] bg-gray-50">
        <UserProfileForm
          currentUser={currentUser}
          onSave={onCheckout}
          isLoading={isGetUserLoading}
          title="Confirm Deliery Details"
          buttonText="Continue to payment"
        />
      </DialogContent>
  </Dialog>
  );
};

export default CheckoutButton;*/

import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import LoadingButton from "./LoadingButton";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import UserProfileForm, {
  UserFormData,
} from "@/forms/user-profile-form/UserProfileForm";
import { useGetMyUser } from "@/api/MyUserApi";
import { useNavigate } from 'react-router-dom';


type Props = {
  onCheckout: (userFormData: UserFormData) => void;
  disabled: boolean;
  isLoading: boolean;
};

const CheckoutButton = ({ onCheckout, disabled, isLoading }: Props) => {
  const {
     isAuthenticated,
     isLoading: isAuthLoading,
     loginWithRedirect,
  } = useAuth0();
 
  const { pathname } = useLocation();
  const navigate = useNavigate(); // Add this line
 
  const { currentUser, isLoading: isGetUserLoading } = useGetMyUser();
 
  const onLogin = async () => {
     await loginWithRedirect({
       appState: {
         returnTo: pathname,
       },
     });
  };
 
  if (!isAuthenticated) {
     return (
       <Button onClick={onLogin} className="bg-orange-500 flex-1">
         Log in to check out
       </Button>
     );
  }
 
  if (isAuthLoading || !currentUser || isLoading) {
     return <LoadingButton />;
  }
 
  // Modify the onCheckout function to handle navigation
  const handleCheckout = async (userFormData: UserFormData) => {
     try {
       await onCheckout(userFormData);
       // Assuming onCheckout resolves successfully for a successful checkout
       navigate('/checkout/success');
     } catch (error) {
       // Handle checkout failure
       console.error('Checkout failed:', error);
       navigate('/checkout/cancel');
     }
  };
 
  return (
     <Dialog>
       <DialogTrigger asChild>
         <Button disabled={disabled} className="bg-orange-500 flex-1">
           Go to checkout
         </Button>
       </DialogTrigger>
       <DialogContent className="max-w-[425px] md:min-w-[700px] bg-gray-50">
         <UserProfileForm
           currentUser={currentUser}
           onSave={handleCheckout} // Use handleCheckout instead of onCheckout
           isLoading={isGetUserLoading}
           title="Confirm Delivery Details"
           buttonText="Continue to payment"
         />
       </DialogContent>
     </Dialog>
  );
 };

 export default CheckoutButton;
 