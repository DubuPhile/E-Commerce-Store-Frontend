import "../../Styles/addressPage.css";
import { useState } from "react";
import {
  useAddAddressMutation,
  useGetAddressesQuery,
} from "../../features/auth/authApiSlice";
import AddAddressModal from "../../Components/AddAddressModal";
import { useToast } from "../../Context/ToastContext";
import useAuth from "../../hooks/useAuth";
import Spinner from "../../Components/Spinner";
import AddressLine from "../../Components/AddressLine";

const Addresses = () => {
  const { auth } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const [addAddress] = useAddAddressMutation();
  const { data: getAddress, isLoading: getAddressLoad } = useGetAddressesQuery(
    auth.token,
    {
      skip: !auth.token,
    },
  );

  const { triggerToast } = useToast();
  const addresses = getAddress?.data ?? [];

  const onAddAddress = () => {
    setOpenModal(true);
  };

  const onSubmitAddress = async (value) => {
    try {
      await addAddress({ value }).unwrap();
      setOpenModal(false);
      triggerToast("New Address has been Added!", "success");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="address-main">
      <h4> Addresses </h4>
      <button onClick={onAddAddress}>
        Add Address <i className="fa-solid fa-plus"></i>
      </button>
      <ul>
        {getAddressLoad ? (
          <Spinner />
        ) : addresses.length === 0 ? (
          ""
        ) : (
          addresses.map((address) => {
            return <AddressLine key={address._id} address={address} />;
          })
        )}
      </ul>
      <AddAddressModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={onSubmitAddress}
      />
    </section>
  );
};

export default Addresses;
