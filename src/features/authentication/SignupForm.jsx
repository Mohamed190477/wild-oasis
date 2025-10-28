import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import useSignup from './useSignup';
import SpinnerMini from '../../ui/SpinnerMini';

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  // get values used if you need to get early access to form field values
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const { signUp, isPending } = useSignup();

  function onSubmit({ email, password, fullName }) {
    signUp(
      { email, password, fullName },
      {
        onSuccess: () => reset(),
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullname?.message}>
        <Input
          type="text"
          id="fullName"
          diabled={isPending}
          {...register('fullName', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          diabled={isPending}
          {...register('email', {
            required: 'This field is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'An email should contain the @ and . symobls',
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          diabled={isPending}
          {...register('password', {
            required: 'This field is required',
            minLength: {
              value: 8,
              message:
                'The password is weak, it should contain at least 8 characters',
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          diabled={isPending}
          {...register('passwordConfirm', {
            required: 'This field is required',
            validate: (value) =>
              value === getValues().password ||
              `The password and confirm password are not the same`,
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isPending}>
          {isPending ? <SpinnerMini /> : 'Create new user'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
