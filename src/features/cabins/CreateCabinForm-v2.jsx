import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';

import { addCabin } from '../../services/apiCabins';

function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: addCabin,
    onSuccess: () => {
      toast.success('Cabin was successfully deleted!');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const { errors } = formState;

  function onSubmit(data) {
    data = {
      ...data,
      maxCapacity: parseInt(data.maxCapacity),
      regularPrice: parseInt(data.regularPrice),
      discount: parseInt(data.discount),
      image: data.image[0],
    };

    mutate(data);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow error={errors?.name?.message} label="Cabin name">
        <Input
          type="text"
          id="name"
          disabled={isPending}
          {...register('name', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isPending}
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
          disabled={isPending}
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
          disabled={isPending}
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
          disabled={isPending}
          defaultValue=""
          {...register('description', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow label="Cabin photot">
        <FileInput
          id="image"
          disabled={isPending}
          accept="image/*"
          {...register('image')}
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isPending}>
          {isPending ? 'Adding a cabin...' : 'Add cabin'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
