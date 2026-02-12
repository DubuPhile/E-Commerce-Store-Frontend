import Cropper from "react-easy-crop";
import { useState } from "react";
import { getCroppedImage } from "../utils/cropImage";
import "../Styles/cropperModal.css";

function ImageCropperModal({ image, aspect = 1, onSave, onCancel }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    try {
      setLoading(true);

      const croppedBlob = await getCroppedImage(image, croppedAreaPixels, 0.7);

      onSave(croppedBlob);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cropper-overlay">
      <div className="cropper-modal">
        <div className="cropper-container">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            cropShape={aspect === 1 ? "round" : "rect"}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={(area, areaPixels) =>
              setCroppedAreaPixels(areaPixels)
            }
          />
        </div>

        <input
          type="range"
          min={1}
          max={3}
          step={0.1}
          value={zoom}
          onChange={(e) => setZoom(e.target.value)}
        />

        <div className="cropper-buttons">
          <button
            className="cropper-button-cancel"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="cropper-button-save"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Processing..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageCropperModal;
