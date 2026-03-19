import "../../Styles/addressPage.css";
import { useState } from "react";
import {
  useAddAddressMutation,
  useGetAddressesQuery,
} from "../../features/address/addressApiSlice";
import AddAddressModal from "../../Components/AddAddressModal";
import { useToast } from "../../Context/ToastContext";
import useAuth from "../../hooks/useAuth";
import Spinner from "../../Components/Spinner";
import AddressLine from "../../Components/AddressLine";
import EditAddressModal from "../../Components/EditAddressModal";

const Addresses = () => {
  const { auth } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const [editAddress, setEditAddress] = useState(null);
  const [addAddress] = useAddAddressMutation();
  const {
    data: getAddress,
    isLoading: getAddressLoad,
    refetch,
  } = useGetAddressesQuery(auth.token, {
    skip: !auth.token,
  });

  const { triggerToast } = useToast();
  const addresses = getAddress?.data ?? [];

  const onAddAddress = () => {
    setOpenModal(true);
  };

  const handleEdit = (address) => {
    setEditAddress(address);
  };

  const onSubmitAddress = async (value) => {
    try {
      await addAddress({ value }).unwrap();
      setOpenModal(false);
      refetch();
      triggerToast("New Address has been Added!", "success");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="address-main">
      <h4> Addresses </h4>
      <button
        onClick={onAddAddress}
        className="add-address-button"
        style={{ marginLeft: "10px" }}
      >
        Add Address <i className="fa-solid fa-plus"></i>
      </button>
      {getAddressLoad ? (
        <Spinner />
      ) : addresses.length === 0 ? (
        ""
      ) : (
        addresses.map((address) => {
          return (
            <AddressLine
              key={address._id}
              address={address}
              onEdit={() => handleEdit(address)}
            />
          );
        })
      )}
      <AddAddressModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={onSubmitAddress}
      />
      {editAddress && (
        <EditAddressModal
          refetch={refetch}
          address={editAddress}
          onClose={() => setEditAddress(null)}
        />
      )}
    </section>
  );
};

export default Addresses;
