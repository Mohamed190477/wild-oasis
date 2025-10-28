import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('cabins could not be loaded');
  }

  return data;
}

export async function addEditCabin(newCabin, id) {
  const hasImage = newCabin.image[0] === 'h';

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    '/',
    ''
  );
  const imagePath = hasImage
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  if (!hasImage) {
    const { error: imageError } = await supabase.storage
      .from('cabin-images')
      .upload(imageName, newCabin.image);

    if (imageError) {
      console.error(imageError);
      throw new Error('there was an error uploading the image to storage');
    }
  }

  let query = supabase.from('cabins');

  if (!id) {
    await query.insert([{ ...newCabin, image: imagePath }]);
  }

  if (id) {
    if (imageName !== '') {
      // we don't have an image to pass to supabase
      newCabin = { ...newCabin, image: imagePath };
    }
    await query.update(newCabin).eq('id', id);
  }

  const { data, error } = await query.select();

  if (error) {
    console.error(error);
    throw new Error(`There was an error ${id ? 'editing' : 'adding'} a cabin`);
  }

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error(`cabin with id: ${id} couldn't be deleted!`);
  }
}
