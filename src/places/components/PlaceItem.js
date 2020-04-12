import React, { useState, useContext } from 'react';

import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import Map from '../../shared/components/UIElements/Map';
import { AuthContext } from '../../shared/context/auth-context';
import './PlaceItem.scss';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const PlaceItem = ({
  id,
  image,
  title,
  description,
  address,
  creatorId,
  coordinates,
  onDelete,
}) => {
  const auth = useContext(AuthContext);
  const { sendRequest, error, clearError, isLoading } = useHttpClient();
  const [showMap, setshowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const openMap = () => setshowMap(true);
  const closeMap = () => setshowMap(false);

  const showDeleteWarning = () => setShowConfirmModal(true);
  const cancelDeleteWarning = () => setShowConfirmModal(false);

  const deletePlace = async () => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/places/${id}`,
        'DELETE',
        null,
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      onDelete(id);
    } catch (err) {}
  };

  const confirmDelete = () => {
    setShowConfirmModal(false);
    // console.log('Deleting...');
    deletePlace();
  };
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showMap}
        onCancel={closeMap}
        header={address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMap}>CLOSE</Button>}
      >
        <div className="map-container">
          <Map center={coordinates} zoom={16} />
        </div>
      </Modal>

      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteWarning}
        header="Are you sure?"
        footerClass="place-item__modal-action"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteWarning}>
              Cancel
            </Button>
            <Button danger onClick={confirmDelete}>
              Delete
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Are you sure you want to delete this place? Please note that it can't
          be undone after!
        </p>
      </Modal>

      <li className="place-item">
        <Card className="place-item__content">
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="place-item__image">
            <img
              src={`${process.env.REACT_APP_ASSET_URL}/${image}`}
              alt={title}
            />
          </div>
          <div className="place-item__info">
            <h2>{title}</h2>
            <h3>{address}</h3>
            <p>{description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMap}>
              View on map
            </Button>
            {auth.userId === creatorId && (
              <Button to={`/places/${id}`}>Edit</Button>
            )}
            {auth.userId === creatorId && (
              <Button danger onClick={showDeleteWarning}>
                Delete
              </Button>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;
