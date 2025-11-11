import { supabase } from '../lib/supabase';

export async function addImagesToDatabase() {
  const imagesToAdd = [
    {
      category: 'hero',
      public_url: 'https://njzraszaigyivpommzhh.supabase.co/storage/v1/object/public/Extindro-Images/Wildfire-image.jpg',
      alt_text: 'Wildfire spreading across landscape'
    },
    {
      category: 'focus',
      public_url: 'https://njzraszaigyivpommzhh.supabase.co/storage/v1/object/public/Extindro-Images/Ext-1.jpg',
      alt_text: 'Wildland-Urban Interface Protection'
    },
    {
      category: 'focus',
      public_url: 'https://njzraszaigyivpommzhh.supabase.co/storage/v1/object/public/Extindro-Images/Ext-2.jpg',
      alt_text: 'Fire Spots Extinguishing'
    },
    {
      category: 'focus',
      public_url: 'https://njzraszaigyivpommzhh.supabase.co/storage/v1/object/public/Extindro-Images/Ext-3.jpg',
      alt_text: 'Self-Controlled Prescribed Burns'
    },
    {
      category: 'deployment',
      public_url: 'https://njzraszaigyivpommzhh.supabase.co/storage/v1/object/public/Extindro-Images/Drones-Team.jpg',
      alt_text: 'Team of drones deployment'
    }
  ];

  console.log('Adding images to database...');

  for (const image of imagesToAdd) {
    const { data: existing } = await supabase
      .from('images')
      .select('id')
      .eq('category', image.category)
      .eq('alt_text', image.alt_text)
      .maybeSingle();

    if (existing) {
      const { error } = await supabase
        .from('images')
        .update({ public_url: image.public_url })
        .eq('id', existing.id);

      if (error) {
        console.error(`Error updating ${image.alt_text}:`, error);
      } else {
        console.log(`✓ Updated ${image.alt_text}`);
      }
    } else {
      const { error } = await supabase
        .from('images')
        .insert(image);

      if (error) {
        console.error(`Error adding ${image.alt_text}:`, error);
      } else {
        console.log(`✓ Added ${image.alt_text}`);
      }
    }
  }

  console.log('Done!');
}
