const timestamp = Date.now();

export const IMAGE_URLS = {
  hero: `https://njzraszaigyivpommzhh.supabase.co/storage/v1/object/public/Extindro-Images/Wildfire-Image.png?t=${timestamp}`,
  focus1: `https://njzraszaigyivpommzhh.supabase.co/storage/v1/object/public/Extindro-Images/Ext-1-this-1.jpg?t=${timestamp}`,
  focus2: `https://njzraszaigyivpommzhh.supabase.co/storage/v1/object/public/Extindro-Images/Ext-2.jpg?t=${timestamp}`,
  focus3: `https://njzraszaigyivpommzhh.supabase.co/storage/v1/object/public/Extindro-Images/Ext-3.jpg?t=${timestamp}`,
  deployment: `https://njzraszaigyivpommzhh.supabase.co/storage/v1/object/public/Extindro-Images/Extindro-Team-of-Drones.jpg?t=${timestamp}`,
} as const;
