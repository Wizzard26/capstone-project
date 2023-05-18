import styled from "styled-components";
import { StyledButton } from "@/components/StyledButton";
import { useState } from "react";
import Image from 'next/image';

export default function UserForm({ onSubmit, formName, defaultData }) {
  const [imageUrl, setImageUrl] =useState('')
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
      <StyledImageWrapper>
        <StyledImagePrev src={imageUrl ? imageUrl : defaultData.avatar} width={150} height={150} />
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
        id="avatar"
        name="avatar"
        type="hidden"
        onChange={handleFileChange}
        value={imageUrl ? imageUrl : defaultData.avatar}
      />
      <label htmlFor="firstname">Firstname:</label>
      <StyledInput
        id="firstname"
        name="firstname"
        type="text"
        defaultValue={defaultData?.firstname}
      />
      <label htmlFor="lastname">Lastname:</label>
      <StyledInput
        id="lastname"
        name="lastname"
        type="text"
        defaultValue={defaultData?.lastname}
      />
      <label htmlFor="name">User Name:</label>
      <StyledInput
        id="name"
        name="name"
        type="text"
        defaultValue={defaultData?.name}
      />
      <label htmlFor="email">User Mail:</label>
      <StyledInput
        id="email"
        name="email"
        type="email"
        defaultValue={defaultData?.email}
      />
      <label htmlFor="phone">Phone:</label>
      <StyledInput
        id="phone"
        name="phone"
        type="text"
        defaultValue={defaultData?.phone}
      />
      <StyledButton variant="secondary" type="submit">
          Update profile
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