import { useState, useEffect } from 'react';
import { ChevronDown, Upload, Menu } from 'lucide-react';
import { ImageUploadModal } from './components/ImageUploadModal';
import { supabase } from './lib/supabase';

function App() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [heroImageUrl, setHeroImageUrl] = useState<string>('https://images.pexels.com/photos/1107717/pexels-photo-1107717.jpeg?auto=compress&cs=tinysrgb&w=1920');
  const [focus1Url, setFocus1Url] = useState<string>('https://images.pexels.com/photos/266487/pexels-photo-266487.jpeg?auto=compress&cs=tinysrgb&w=800');
  const [focus2Url, setFocus2Url] = useState<string>('https://images.pexels.com/photos/1112048/pexels-photo-1112048.jpeg?auto=compress&cs=tinysrgb&w=800');
  const [focus3Url, setFocus3Url] = useState<string>('https://images.pexels.com/photos/1027509/pexels-photo-1027509.jpeg?auto=compress&cs=tinysrgb&w=800');
  const [exitndroUrl, setExitndroUrl] = useState<string>('https://images.pexels.com/photos/1112048/pexels-photo-1112048.jpeg?auto=compress&cs=tinysrgb&w=800');

  const loadImages = async () => {
    try {
      if (import.meta.env.VITE_SUPABASE_URL) {
        const { data: publicData } = supabase.storage
          .from('wildfire-images')
          .getPublicUrl('hero-background.jpg');

        if (publicData.publicUrl) setHeroImageUrl(publicData.publicUrl);

        const { data: focus1Data } = supabase.storage
          .from('wildfire-images')
          .getPublicUrl('focus-1.jpg');
        if (focus1Data.publicUrl) setFocus1Url(focus1Data.publicUrl);

        const { data: focus2Data } = supabase.storage
          .from('wildfire-images')
          .getPublicUrl('focus-2.jpg');
        if (focus2Data.publicUrl) setFocus2Url(focus2Data.publicUrl);

        const { data: focus3Data } = supabase.storage
          .from('wildfire-images')
          .getPublicUrl('focus-3.jpg');
        if (focus3Data.publicUrl) setFocus3Url(focus3Data.publicUrl);

        const { data: exitndroData } = supabase.storage
          .from('wildfire-images')
          .getPublicUrl('exitndro-deployment.jpg');
        if (exitndroData.publicUrl) setExitndroUrl(exitndroData.publicUrl);
      }
    } catch (error) {
      console.log('Using default images');
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  const scrollToNextSection = () => {
    document.getElementById('our-focus')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleUploadComplete = () => {
    loadImages();
  };

  return (
    <div className="min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex flex-col">
            <div className="text-4xl font-bold">
              <span className="text-yellow-300">Extin</span>
              <span className="text-emerald-300">dro</span>
            </div>
            <p className="text-base text-green-300 mt-1">Innovative Wildfire Fighting</p>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <button className="text-lg text-white hover:text-amber-400 font-medium transition-colors">About</button>
            <button className="text-lg text-white hover:text-amber-400 font-medium transition-colors">Our Solutions</button>
            <button className="text-lg text-white hover:text-amber-400 font-medium transition-colors">Applications</button>
            <button className="text-lg text-white hover:text-amber-400 font-medium transition-colors">Contact Us</button>
          </nav>
        </div>
      </header>

      <button
        onClick={() => setIsUploadModalOpen(true)}
        className="fixed bottom-6 right-6 z-40 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-full shadow-lg flex items-center gap-2 transition-all hover:scale-105"
      >
        <Upload className="w-5 h-5" />
        Upload Images
      </button>

      <ImageUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUploadComplete={handleUploadComplete}
      />

      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70 z-10"></div>

        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${heroImageUrl || 'https://images.pexels.com/photos/1107717/pexels-photo-1107717.jpeg?auto=compress&cs=tinysrgb&w=1920'})`,
            filter: 'brightness(0.7)'
          }}
        ></div>

        <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed pt-16 text-orange-400">
              Wildfires are growing more intense and destructive
            </h2>
          </div>

          <div className="mb-16">
            <h1 className="text-lg md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white leading-tight">
              <div className="whitespace-nowrap mb-6">Our Innovative Solutions Provide On-Call, Pinpoint Fire Barriers</div>
              <div>Without the Traditional Firefighting Materials</div>
            </h1>
          </div>

          <div className="mb-16">
            <p className="text-xl md:text-2xl lg:text-3xl font-semibold leading-tight whitespace-nowrap">
              <span className="text-yellow-300">Extin</span><span className="text-emerald-300">dro</span> <span className="text-amber-400">restricts Wildfires before They Climb Up Into the Canopy</span>
            </p>
          </div>

          <button
            onClick={scrollToNextSection}
            className="mt-16 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-lg font-medium rounded-full border-2 border-white/30 transition-all duration-300 hover:scale-105 flex items-center gap-2 mx-auto"
          >
            Learn More
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </button>
        </div>
      </section>

      <section id="our-focus" className="min-h-screen bg-slate-50 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-slate-900 mb-12">
            Our Focus
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="flex flex-col items-center text-center group">
              <div className="relative w-full aspect-square rounded-full overflow-hidden mb-6 border-4 border-slate-200 group-hover:border-amber-500 transition-all duration-300 shadow-xl">
                <img
                  src={focus1Url || 'https://images.pexels.com/photos/266487/pexels-photo-266487.jpeg?auto=compress&cs=tinysrgb&w=800'}
                  alt="Fire Barriers"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                Wildland-Urban Interface
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                Pinpoint deployment based on fire models and real-time measurements
              </p>
            </div>

            <div className="flex flex-col items-center text-center group">
              <div className="relative w-full aspect-square rounded-full overflow-hidden mb-6 border-4 border-slate-200 group-hover:border-amber-500 transition-all duration-300 shadow-xl">
                <img
                  src={focus2Url || 'https://images.pexels.com/photos/1112048/pexels-photo-1112048.jpeg?auto=compress&cs=tinysrgb&w=800'}
                  alt="Rapid Deployment"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                Rapid Fire Barriers Deployment
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                Fast response, Unrestricted Access
              </p>
            </div>

            <div className="flex flex-col items-center text-center group">
              <div className="relative w-full aspect-square rounded-full overflow-hidden mb-6 border-4 border-slate-200 group-hover:border-amber-500 transition-all duration-300 shadow-xl">
                <img
                  src={focus3Url || 'https://images.pexels.com/photos/1027509/pexels-photo-1027509.jpeg?auto=compress&cs=tinysrgb&w=800'}
                  alt="Prescribed Burns"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                Prescribed Burns
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                Patent-pending barriers deployment
              </p>
            </div>
          </div>

          <div className="mt-16 flex flex-col items-center">
            <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden border-4 border-slate-200 shadow-xl bg-slate-100">
              <img
                src={exitndroUrl || 'https://images.pexels.com/photos/1112048/pexels-photo-1112048.jpeg?auto=compress&cs=tinysrgb&w=800'}
                alt="Exitndro Deployment"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-2xl font-semibold text-slate-900 mt-8">
              Exitndro on its way to deployment
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
