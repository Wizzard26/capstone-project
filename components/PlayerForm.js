import styled from "styled-components";
import { StyledButton } from "@/components/StyledButton";
import DatePicker from "react-datepicker";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Image from 'next/image';

export default function PlayerForm({ onSubmit, formName, defaultData }) {
  const [startDate, setStartDate] = useState(new Date());
  const [addressInfos, setAddressInfos] = useState({ latitude: "", longitude: "", country: "",countryCode: "", state: "" });
  const [addressFields, setAddressFields] = useState({
    postcode: "",
    city: "",
    street: "",
    streetnumber: ""
  });

  const [imageUrl, setImageUrl] = useState('');
  const [image, setImage] = useState(null);
  const [imageValue, setImageValue] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);


  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    onSubmit(data);
  }

  async function fetchAddressInfos(name, value) {
    const newAddressFields = { ...addressFields, [name]: value };
    setAddressFields(newAddressFields);
    const { postcode, city, street, streetnumber } = newAddressFields;
    if (!postcode || !city) {
      return;
    }
    const url = `https://nominatim.openstreetmap.org/?addressdetails=1&q=${street} ${streetnumber}, ${city}&city=${city}&postalcode=${postcode}&format=json&limit=1`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const { lat, lon } = data[0];
          const { country_code, country, state,} = data[0].address
          setAddressInfos({ latitude: lat, longitude: lon, country: country, countryCode: country_code, state: state });
        }
      })
      .catch((error) => console.error(error));
  }

  function handleAddressChange(event) {
    const { name, value } = event.target;
    fetchAddressInfos(name, value);
  }

  // Cloudinary Upload handler

  function handleFileChange(event) {
    const file = event.target.files[0];
    setImage(file);
    setImageValue(event.target.value);
  }

  async function handleFileUpload(event) {
    event.preventDefault();
    setIsUploading(true);

    const formData = new FormData();

    formData.append('file', image);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_UPLOAD_PRESET);
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDNAME}/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );
      const json = await response.json();
      const secureUrl = json.secure_url;

      setUploadedImage(json);

      setImageUrl(secureUrl)
    } catch (error) {
      console.error(error);
    } finally {
      setIsUploading(false);
      setImage(null);
      setImageValue('');
    }
  }

  return (
    <FormContainer aria-labelledby={formName} onSubmit={handleSubmit}>
      <label htmlFor="playerImage">Player Image:</label>
      <StyledImageWrapper>
        <StyledImagePrev src={imageUrl ? imageUrl : defaultData.playerImage} width={150} height={150} alt="" />
        {image && (
          <Image
            src={URL.createObjectURL(image)}
            width={150}
            height={150}
            alt="Preview Avatar"
            style={{ objectFit: 'cover' }}
          />
        )}
      </StyledImageWrapper>
      <StyledInputUpload
        type="file"
        id="avatar"
        onChange={handleFileChange}
        value={imageValue}
      />
      <StyledButton variant={'primary'} width={300} type="button" onClick={handleFileUpload} disabled={!image}>
        {isUploading ? 'Uploading …' : 'Upload'}
      </StyledButton>
      <StyledInput
        id="playerImage"
        name="playerImage"
        type="hidden"
        onChange={handleFileChange}
        value={imageUrl ? imageUrl : defaultData.playerImage}
      />
      <label htmlFor="firstname">First Name:</label>
      <StyledInput
        id="firstname"
        name="firstname"
        type="text"
        defaultValue={defaultData?.firstname}
      />
      <label htmlFor="lastname">Last Name:</label>
      <StyledInput
        id="lastname"
        name="lastname"
        type="text"
        defaultValue={defaultData?.lastname}
      />
      <label htmlFor="nickname">Nickname:</label>
      <StyledInput
        id="nickname"
        name="nickname"
        type="text"
        defaultValue={defaultData?.nickname}
      />
      <label htmlFor="birthday">Birthday:</label>
      <StyledDatePicker
        id="birthday"
        name="birthday"
        defaultValue={defaultData?.birthday}
        dateFormat="dd MMMM yyyy"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
      <StyledAddress>
        <div>
          <label htmlFor="street">Home Street:</label>
          <StyledInput
            id="street"
            name="street"
            type="text"
            defaultValue={defaultData?.street}
            onChange={handleAddressChange}
          />
        </div>
        <div>
          <label htmlFor="streetnumber">Nr:</label>
          <StyledInput
            id="streetnumber"
            name="streetnumber"
            type="text"
            defaultValue={defaultData?.streetnumber}
            onChange={handleAddressChange}
          />
        </div>
      </StyledAddress>
      <label htmlFor="postcode">Postcode:</label>
      <StyledInput
        id="postcode"
        name="postcode"
        type="text"
        defaultValue={defaultData?.postcode}
        onChange={handleAddressChange}
      />
      <label htmlFor="city">city:</label>
      <StyledInput
        id="city"
        name="city"
        type="text"
        defaultValue={defaultData?.city}
        onChange={handleAddressChange}
      />
      <label htmlFor="nationality">Nationality:</label>
      <StyledInput
        id="nationality"
        name="nationality"
        type="text"
        defaultValue={defaultData?.nationality}
      />
      <StyledInput
        name="state"
        type="hidden"
        value={addressInfos.state ? addressInfos.state : defaultData?.state}
      />
      <StyledInput
        name="country"
        type="hidden"
        value={addressInfos.country ? addressInfos.country : defaultData?.country}
      />
      <StyledInput
        name="countryCode"
        type="hidden"
        value={addressInfos.countryCode ? addressInfos.countryCode : defaultData?.countryCode}
      />
      <input
        type="hidden"
        name="latitude"
        value={addressInfos.latitude ? addressInfos.latitude : defaultData?.latitude}
      />
      <input
        type="hidden"
        name="longitude"
        value={addressInfos.longitude ? addressInfos.longitude : defaultData?.longitude}
      />
      <label htmlFor="handiness">Handiness:</label>
      <StyledInput
        id="handiness"
        name="handiness"
        type="text"
        defaultValue={defaultData?.handiness}
      />
      <label htmlFor="darts">Darts:</label>
      <StyledInput
        id="darts"
        name="darts"
        type="text"
        defaultValue={defaultData?.darts}
      />
      <label htmlFor="worldRanking">World Rank:</label>
      <StyledInput
        id="worldRanking"
        name="worldRanking"
        type="text"
        defaultValue={defaultData?.worldRanking}
      />
      <label htmlFor="description">Description:</label>
      <Textarea
        id="description"
        name="description"
        cols="30"
        rows="10"
        defaultValue={defaultData?.description}
      ></ Textarea>
      <StyledButton variant="secondary" type="submit">
        {defaultData ? "Update player" : "Add player"}
      </StyledButton>
    </FormContainer>
  )
}

const FormContainer = styled.form`
  display: grid;
  gap: .75rem;
`;

const StyledInput = styled.input`
  padding: 0.5rem;
  font-size: inherit;
  border: none;
  border-radius: 0;
`;

const StyledDatePicker = styled(DatePicker)`
  padding: 0.5rem;
  font-size: inherit;
  border: none;
  border-radius: 0;
`;

const Textarea = styled.textarea`
  border: none;
  border-radius: 0;
  padding: 0.5rem;
`;

const StyledAddress = styled.div`
  display: grid;
  grid-template-columns: 1fr 80px;
  gap: 20px;
  
  div {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

const StyledImageWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

const StyledInputUpload = styled.input`
  
  &::file-selector-button {
    border-radius: 3px;
    background: #E29B17;
    border: none;
    color: #EBEBEB;
    cursor: pointer;
    padding: 8px 15px;
    
    &:hover {
      background: #D19015;
    }
  }
`;

const StyledImagePrev = styled(Image)`
  border: 2px solid #ADAFB1;
  background-image: url('/img/players/darts-player.jpg');
  background-size: cover;
`;