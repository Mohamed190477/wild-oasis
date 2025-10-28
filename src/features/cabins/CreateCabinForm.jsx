import { useForm } from 'react-hook-form';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';

import useAddCabin from './useAddCabin';
import useEditCabin from './useEditCabin';

function CreateCabinForm({ cabinToEdit, onClose }) {
  const { id: editId, ...editValues } = cabinToEdit ? cabinToEdit : {};
  const isEdit = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEdit ? editValues : {},
  });
  const { isAdding, addCabin } = useAddCabin();
  const { isEditing, editCabin } = useEditCabin();

  const { errors } = formState;

  function onSubmit(data) {
    data = {
      ...data,
      maxCapacity: parseInt(data.maxCapacity),
      regularPrice: parseInt(data.regularPrice),
      discount: parseInt(data.discount),
      image: data.image[0] === 'h' ? data.image : data.image[0],
    };

    if (isEdit) {
      editCabin(
        { newCabin: data, id: editId },
        {
          onSuccess: () => {
            reset();
            onClose?.();
          },
        }
      );
    } else {
      addCabin(
        { newCabin: data, id: '' },
        {
          onSuccess: () => {
            reset();
            onClose?.();
          },
        }
      );
    }
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onClose ? 'modal' : 'regular'}
    >
      <FormRow error={errors?.name?.message} label="Cabin name">
        <Input
          type="text"
          id="name"
          disabled={isAdding || isEditing}
          {...register('name', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isAdding || isEditing}
          {...register('maxCapacity', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'The maximum capacity should be greater than 1',
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isAdding || isEditing}
          {...register('regularPrice', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'The Regular price should be greater than 50',
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isAdding || isEditing}
          defaultValue={0}
          {...register('discount', {
            required: 'This field is required',
            validate: (value) =>
              value < parseInt(getValues().regularPrice) ||
              'The discount should be less than the regular price',
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          disabled={isAdding || isEditing}
          defaultValue=""
          {...register('description', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          disabled={isAdding || isEditing}
          accept="image/*"
          {...register('image', {
            required: isEdit ? false : 'This field is required',
          })}
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset" onClick={() => onClose?.()}>
          Cancel
        </Button>
        <Button disabled={isAdding || isEditing}>
          {isAdding && !isEdit && 'Adding a cabin...'}
          {isEditing && isEdit && 'Editing a cabin...'}
          {!isEditing && isEdit && 'Edit cabin'}
          {!isAdding && !isEdit && 'Add cabin'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
