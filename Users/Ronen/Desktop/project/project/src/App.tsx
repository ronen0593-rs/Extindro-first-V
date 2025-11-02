import { useState, useEffect } from 'react';
import { ChevronDown, Upload } from 'lucide-react';
import { ImageUploadModal } from './components/ImageUploadModal';
import { supabase } from './lib/supabase';

function App() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [heroImageUrl, setHeroImageUrl] = useState<string>('https://images.pexels.com/photos/1107717/pexels-photo-1107717.jpeg?auto=compress&cs=tinysrgb&w=1920');
  const [focus1Url, setFocus1Url] = useState<string>('https://images.pexels.com/photos/266487/pexels-photo-266487.jpeg?auto=compress&cs=tinysrgb&w=800');
  const [focus2Url, setFocus2Url] = useState<string>('https://images.pexels.com/photos/1112048/pexels-photo-1112048.jpeg?auto=compress&cs=tinysrgb&w=800');
  const [focus3Url, setFocus3Url] = useState<string>('https://images.pexels.com/photos/1027509/pexels-photo-1027509.jpeg?auto=compress&cs=tinysrgb&w=800');
  const [deploymentUrl, setDeploymentUrl] = useState<string>('https://images.pexels.com/photos/1053687/pexels-photo-1053687.jpeg?auto=compress&cs=tinysrgb&w=1200');

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

        const { data: deploymentData } = supabase.storage
          .from('wildfire-images')
          .getPublicUrl('deployment.jpg');
        if (deploymentData.publicUrl) setDeploymentUrl(deploymentData.publicUrl);
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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center">
          <div className="flex-shrink-0">
            <h1 className="text-5xl font-bold">
              <span style={{ background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF8C00 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Extin</span>
              <span style={{ background: 'linear-gradient(135deg, #FCD34D 0%, #6EE7B7 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>dro</span>
            </h1>
            <p className="text-lg mt-1 font-bold text-teal-300">Innovative Wildfire Fighting</p>
          </div>

          <div className="flex gap-8 items-center ml-auto">
            <div className="flex gap-8 mr-12">
              <button className="text-white text-lg font-medium hover:text-amber-400 transition-colors">About</button>
              <button className="text-white text-lg font-medium hover:text-amber-400 transition-colors">Our Solutions</button>
              <button className="text-white text-lg font-medium hover:text-amber-400 transition-colors">Applications</button>
            </div>
            <button className="text-white text-lg font-medium hover:text-amber-400 transition-colors">Contact Us</button>
          </div>
        </div>
      </nav>

      <ImageUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUploadComplete={handleUploadComplete}
      />

      <section className="relative h-screen flex items-center justify-center overflow-hidden" style={{ paddingTop: '3rem' }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70 z-10"></div>

        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${heroImageUrl || 'https://images.pexels.com/photos/1107717/pexels-photo-1107717.jpeg?auto=compress&cs=tinysrgb&w=1920'})`,
            filter: 'brightness(0.7)'
          }}
        ></div>

        <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
          <div className="mb-6">
            <h2 className="text-base md:text-xl lg:text-2xl font-light text-orange-400 leading-relaxed">
              Wildfires Are Growing More Intense and Destructive
            </h2>
          </div>

          <div className="space-y-6">
            <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-3xl font-bold text-white leading-tight">
              Our Innovative Solutions Provide On-Call, Pinpoint Fire Barriers Without the Traditional Firefighting Materials
            </h1>
            <p className="text-xl md:text-2xl lg:text-2xl font-semibold leading-tight whitespace-nowrap">
              <span className="text-4xl font-bold" style={{ background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF8C00 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Extin</span>
              <span className="text-4xl font-bold" style={{ background: 'linear-gradient(135deg, #FCD34D 0%, #6EE7B7 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>dro</span>
              <span className="text-amber-300"> Restricts Wildfires before They Climb Up Into the Canopy</span>
            </p>
          </div>

          <div className="mt-12 flex items-center gap-4 justify-center">
            <button
              onClick={scrollToNextSection}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-lg font-medium rounded-full border-2 border-white/30 transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              Learn More
              <ChevronDown className="w-5 h-5 animate-bounce" />
            </button>
            {import.meta.env.DEV && (
              <button
                onClick={() => setIsUploadModalOpen(true)}
                className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-full shadow-lg flex items-center gap-2 transition-all hover:scale-105"
              >
                <Upload className="w-5 h-5" />
                Upload Images
              </button>
            )}
          </div>
        </div>
      </section>

      <section id="our-focus" className="min-h-screen bg-slate-50 py-20 px-6" style={{ paddingTop: '10rem' }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-slate-900 mb-20">
            Our Focus
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
            <div className="flex flex-col items-center text-center group">
              <div className="relative w-[85%] aspect-square rounded-full overflow-hidden mb-6 border-4 border-slate-200 group-hover:border-amber-500 transition-all duration-300 shadow-xl">
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
              <div className="relative w-[85%] aspect-square rounded-full overflow-hidden mb-6 border-4 border-slate-200 group-hover:border-amber-500 transition-all duration-300 shadow-xl">
                <img
                  src={focus2Url || 'https://images.pexels.com/photos/1112048/pexels-photo-1112048.jpeg?auto=compress&cs=tinysrgb&w=800'}
                  alt="Rapid Deployment"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                Rapid Deployment
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                Fast response,<br />
                Unlimited acess
              </p>
            </div>

            <div className="flex flex-col items-center text-center group">
              <div className="relative w-[85%] aspect-square rounded-full overflow-hidden mb-6 border-4 border-slate-200 group-hover:border-amber-500 transition-all duration-300 shadow-xl">
                <img
                  src={focus3Url || 'https://images.pexels.com/photos/1027509/pexels-photo-1027509.jpeg?auto=compress&cs=tinysrgb&w=800'}
                  alt="Prescribed Burns"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                Prescribed Burns
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                Petent-panding of unique<br />
                deployment method
              </p>
            </div>
          </div>

          <div className="mt-32 flex flex-col items-center">
            <div className="relative w-[75%] max-w-2xl aspect-video rounded-2xl overflow-hidden border-4 border-slate-200 shadow-2xl">
              <img
                src={deploymentUrl || 'https://images.pexels.com/photos/1053687/pexels-photo-1053687.jpeg?auto=compress&cs=tinysrgb&w=1200'}
                alt="Extindro Deployment"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mt-8">
              Extindro on its way to deploy Fire barriers
            </h3>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
