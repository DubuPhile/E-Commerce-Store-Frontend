import "../Styles/addressPage.css";
import { useState } from "react";
import {
  useAddAddressMutation,
  useGetAddressesQuery,
} from "../features/address/addressApiSlice";
import AddAddressModal from "../Components/AddAddressModal";
import { useToast } from "../Context/ToastContext";
import useAuth from "../hooks/useAuth";
import Spinner from "../Components/Spinner";
import EditAddressModal from "../Components/EditAddressModal";
import SelectAddressLine from "./SelectAddressLine";

const ChangeAddressModal = ({ setAddress, onClose }) => {
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
    <section className="modal" style={{ display: "block" }} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered ">
        <div className="modal-content text-center">
          <header className="modal-header">
            <h5 className="modal-title">Change Address</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </header>
          <div className="change-Address-Modal-body">
            <button onClick={onAddAddress} className="add-address-button">
              Add Address <i className="fa-solid fa-plus"></i>
            </button>
            {getAddressLoad ? (
              <Spinner />
            ) : addresses.length === 0 ? (
              ""
            ) : (
              addresses.map((address) => {
                return (
                  <SelectAddressLine
                    key={address._id}
                    address={address}
                    onEdit={() => handleEdit(address)}
                    setAddress={setAddress}
                    onClose={onClose}
                  />
                );
              })
            )}
            {editAddress && (
              <EditAddressModal
                refetch={refetch}
                address={editAddress}
                onClose={() => setEditAddress(null)}
              />
            )}

            <AddAddressModal
              isOpen={openModal}
              onClose={() => setOpenModal(false)}
              onSubmit={onSubmitAddress}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChangeAddressModal;
