import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './PlaceForm.css';
import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import Button from '../../shared/components/FormElements/Button';
import { useForm } from '../../shared/hooks/FormHook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/AuthContext';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';

function NewPlace() {
  const auth = useContext(AuthContext);
  const { sendRequest, error, clearError, isLoading } = useHttpClient();
  
  const [formState, inputHandler] = useForm(
    {
      title: { value: '', isValid: false },
      description: { value: '', isValid: false },
      address: { value: '', isValid: false },
      image: { value: null, isValid: false }
    },
    false
  );

  const navigate = useNavigate();

  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', formState.inputs.title.value);
      formData.append('description', formState.inputs.description.value);
      formData.append('address', formState.inputs.address.value);
      formData.append('image', formState.inputs.image.value);

      await sendRequest('http://localhost:5000/api/places/', 'POST', formData,{
        Authorization: 'Bearer ' + auth.token
      });
      navigate('/'); 
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form onSubmit={placeSubmitHandler} className="place-form">
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          errorText="Please enter a valid title"
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          onInput={inputHandler}
          errorText="Please enter a valid description"
        />
        <Input
          id="address"
          element="input"
          label="Address"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          errorText="Please enter a valid address"
        />
        <ImageUpload id="image" onInput={inputHandler} errorText="Please provide an image." />
        <Button type="submit" disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
    </React.Fragment>
  );
}

export default NewPlace;
