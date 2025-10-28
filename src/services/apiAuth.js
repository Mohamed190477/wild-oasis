import supabase, { supabaseUrl } from './supabase';

export async function signIn({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getAuthenticatedUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return user;
}

export async function signOut() {
  let { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

export async function signUp({ email, password, fullName }) {
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: '',
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  // update password or fullname
  let updateData = {};
  if (password) updateData.password = password;
  if (fullName) updateData.data = { fullName };

  const { data, error: updateError } = await supabase.auth.updateUser(
    updateData
  );
  if (updateError) throw new Error(updateError.message);

  if (!avatar) return data;

  // upload image to supabase
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(fileName, avatar);
  if (uploadError) throw new Error(uploadError.message);

  // update the avatar
  const { data: updatedData, error: avatarError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });
  if (avatarError) throw new Error(avatarError.message);

  return updatedData;
}
