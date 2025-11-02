import { useState } from 'react';
import { X, Upload, Check } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadComplete: () => void;
}

export function ImageUploadModal({ isOpen, onClose, onUploadComplete }: ImageUploadModalProps) {
  const [heroImage, setHeroImage] = useState<File | null>(null);
  const [focus1Image, setFocus1Image] = useState<File | null>(null);
  const [focus2Image, setFocus2Image] = useState<File | null>(null);
  const [focus3Image, setFocus3Image] = useState<File | null>(null);
  const [deploymentImage, setDeploymentImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string>('');

  if (!isOpen) return null;

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (file: File | null) => void
  ) => {
    if (e.target.files && e.target.files[0]) {
      setter(e.target.files[0]);
    }
  };

  const uploadImage = async (file: File, path: string) => {
    const { error } = await supabase.storage
      .from('wildfire-images')
      .upload(path, file, { upsert: true });

    if (error) throw error;

    const { data: publicData } = supabase.storage
      .from('wildfire-images')
      .getPublicUrl(path);

    return publicData.publicUrl;
  };

  const handleUpload = async () => {
    setUploading(true);
    setUploadProgress('Starting upload...');

    try {
      if (heroImage) {
        setUploadProgress('Uploading hero background...');
        await uploadImage(heroImage, 'hero-background.jpg');
      }

      if (focus1Image) {
        setUploadProgress('Uploading focus image 1...');
        await uploadImage(focus1Image, 'focus-1.jpg');
      }

      if (focus2Image) {
        setUploadProgress('Uploading focus image 2...');
        await uploadImage(focus2Image, 'focus-2.jpg');
      }

      if (focus3Image) {
        setUploadProgress('Uploading focus image 3...');
        await uploadImage(focus3Image, 'focus-3.jpg');
      }

      if (deploymentImage) {
        setUploadProgress('Uploading deployment image...');
        await uploadImage(deploymentImage, 'deployment.jpg');
      }

      setUploadProgress('✓ Upload complete! Refreshing...');
      setTimeout(() => {
        onUploadComplete();
        onClose();
        setUploadProgress('');
      }, 1500);
    } catch (error: any) {
      console.error('Upload error:', error);
      const errorMessage = error.message || error.error_description || error.statusText || 'Connection error. Please check your network and try again.';
      setUploadProgress(`Upload failed: ${errorMessage}`);
      setTimeout(() => {
        setUploadProgress('');
      }, 5000);
    } finally {
      setUploading(false);
    }
  };

  const hasAnyFile = heroImage || focus1Image || focus2Image || focus3Image || deploymentImage;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Upload Images</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            disabled={uploading}
          >
            <X className="w-6 h-6 text-slate-600" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-sm text-amber-900">
              Upload images for your homepage. All images are optional. Recommended size: Hero background (1920x1080), Focus images (800x800), Deployment image (1200x675).
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Hero Background Image
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, setHeroImage)}
                  className="hidden"
                  id="hero-upload"
                  disabled={uploading}
                />
                <label
                  htmlFor="hero-upload"
                  className="flex items-center justify-center gap-3 p-6 border-2 border-dashed border-slate-300 rounded-lg hover:border-amber-500 hover:bg-amber-50 transition-colors cursor-pointer"
                >
                  {heroImage ? (
                    <>
                      <Check className="w-5 h-5 text-green-600" />
                      <span className="text-slate-900 font-medium">{heroImage.name}</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5 text-slate-400" />
                      <span className="text-slate-600">Click to upload hero background</span>
                    </>
                  )}
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Focus Area 1 - Fire Barriers
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, setFocus1Image)}
                  className="hidden"
                  id="focus1-upload"
                  disabled={uploading}
                />
                <label
                  htmlFor="focus1-upload"
                  className="flex items-center justify-center gap-3 p-6 border-2 border-dashed border-slate-300 rounded-lg hover:border-amber-500 hover:bg-amber-50 transition-colors cursor-pointer"
                >
                  {focus1Image ? (
                    <>
                      <Check className="w-5 h-5 text-green-600" />
                      <span className="text-slate-900 font-medium">{focus1Image.name}</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5 text-slate-400" />
                      <span className="text-slate-600">Click to upload focus image 1</span>
                    </>
                  )}
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Focus Area 2 - Rapid Deployment
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, setFocus2Image)}
                  className="hidden"
                  id="focus2-upload"
                  disabled={uploading}
                />
                <label
                  htmlFor="focus2-upload"
                  className="flex items-center justify-center gap-3 p-6 border-2 border-dashed border-slate-300 rounded-lg hover:border-amber-500 hover:bg-amber-50 transition-colors cursor-pointer"
                >
                  {focus2Image ? (
                    <>
                      <Check className="w-5 h-5 text-green-600" />
                      <span className="text-slate-900 font-medium">{focus2Image.name}</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5 text-slate-400" />
                      <span className="text-slate-600">Click to upload focus image 2</span>
                    </>
                  )}
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Focus Area 3 - Prescribed Burns
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, setFocus3Image)}
                  className="hidden"
                  id="focus3-upload"
                  disabled={uploading}
                />
                <label
                  htmlFor="focus3-upload"
                  className="flex items-center justify-center gap-3 p-6 border-2 border-dashed border-slate-300 rounded-lg hover:border-amber-500 hover:bg-amber-50 transition-colors cursor-pointer"
                >
                  {focus3Image ? (
                    <>
                      <Check className="w-5 h-5 text-green-600" />
                      <span className="text-slate-900 font-medium">{focus3Image.name}</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5 text-slate-400" />
                      <span className="text-slate-600">Click to upload focus image 3</span>
                    </>
                  )}
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Deployment Image
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, setDeploymentImage)}
                  className="hidden"
                  id="deployment-upload"
                  disabled={uploading}
                />
                <label
                  htmlFor="deployment-upload"
                  className="flex items-center justify-center gap-3 p-6 border-2 border-dashed border-slate-300 rounded-lg hover:border-amber-500 hover:bg-amber-50 transition-colors cursor-pointer"
                >
                  {deploymentImage ? (
                    <>
                      <Check className="w-5 h-5 text-green-600" />
                      <span className="text-slate-900 font-medium">{deploymentImage.name}</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5 text-slate-400" />
                      <span className="text-slate-600">Click to upload deployment image</span>
                    </>
                  )}
                </label>
              </div>
            </div>
          </div>

          {uploadProgress && (
            <div className="bg-slate-100 rounded-lg p-4">
              <p className="text-sm text-slate-900 text-center">{uploadProgress}</p>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-900 font-medium rounded-lg transition-colors"
              disabled={uploading}
            >
              Cancel
            </button>
            <button
              onClick={handleUpload}
              disabled={!hasAnyFile || uploading}
              className="flex-1 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? 'Uploading...' : 'Upload Images'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
