import { useState, useEffect } from 'react';
import { ChevronDown, Mail, Phone, MapPin, Linkedin, Twitter } from 'lucide-react';
import ContactForm from './components/ContactForm';
import { supabase } from './lib/supabase';

function App() {
  const [images, setImages] = useState<Record<string, string>>({});
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [imagesError, setImagesError] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const loadImages = async () => {
      try {
        console.log('Loading images from database...');
        const { data: allImages, error } = await supabase
          .from('images')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        console.log('Fetched images:', allImages);

        const imageMap: Record<string, string> = {};

        const heroImages = allImages?.filter(img => img.category === 'hero') || [];
        if (heroImages.length > 0) {
          imageMap.hero = heroImages[0].public_url;
        }

        const focusImages = allImages?.filter(img => img.category === 'focus') || [];

        if (!imageMap.focus1) {
          const focus1Image = focusImages.find(img =>
            img.alt_text?.toLowerCase().includes('interface') ||
            img.alt_text?.toLowerCase().includes('barrier') ||
            img.alt_text?.toLowerCase().includes('urban')
          );
          if (focus1Image) imageMap.focus1 = focus1Image.public_url;
        }

        if (!imageMap.focus2) {
          const focus2Image = focusImages.find(img =>
            img.alt_text?.toLowerCase().includes('rapid') ||
            img.alt_text?.toLowerCase().includes('spot') ||
            img.alt_text?.toLowerCase().includes('extinguish')
          );
          if (focus2Image) imageMap.focus2 = focus2Image.public_url;
        }

        if (!imageMap.focus3) {
          const focus3Image = focusImages.find(img =>
            img.alt_text?.toLowerCase().includes('prescribed') ||
            img.alt_text?.toLowerCase().includes('burn') ||
            img.alt_text?.toLowerCase().includes('controlled')
          );
          if (focus3Image) imageMap.focus3 = focus3Image.public_url;
        }

        if (focusImages.length > 0 && !imageMap.focus1) {
          imageMap.focus1 = focusImages[0].public_url;
        }
        if (focusImages.length > 1 && !imageMap.focus2) {
          imageMap.focus2 = focusImages[1].public_url;
        }
        if (focusImages.length > 2 && !imageMap.focus3) {
          imageMap.focus3 = focusImages[2].public_url;
        }

        const deploymentImages = allImages?.filter(img => img.category === 'deployment') || [];
        if (deploymentImages.length > 0) {
          imageMap.deployment = deploymentImages[0].public_url;
        }

        console.log('Image map created:', imageMap);
        setImages(imageMap);
        setImagesLoaded(true);
        setImagesError(false);
      } catch (error) {
        console.error('Error loading images:', error);
        setImagesLoaded(true);
        setImagesError(true);
      }
    };

    loadImages();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToNextSection = () => {
    scrollToSection('our-focus');
  };

  return (
    <div className="min-h-screen">

      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-slate-900/95 backdrop-blur-lg border-b border-amber-500/20 shadow-lg' : 'bg-black/40 backdrop-blur-md border-b border-white/10'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center">
          <div className="flex-shrink-0 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <h1 className="text-5xl font-bold hover:scale-105 transition-transform">
              <span style={{ background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF8C00 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Extin</span>
              <span style={{ background: 'linear-gradient(135deg, #FCD34D 0%, #6EE7B7 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>dro</span>
            </h1>
            <p className="text-lg mt-1 font-bold text-teal-300 tracking-wide">Innovative Wildfires Fighting</p>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 flex gap-8">
            <div className="relative group">
              <button
                className="text-white text-lg font-medium hover:text-amber-400 transition-all duration-300 relative"
              >
                Our Mission
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 group-hover:w-full transition-all duration-300"></span>
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[600px] max-h-[70vh] overflow-y-auto bg-slate-800/95 backdrop-blur-lg border border-amber-500/20 rounded-lg p-8 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-xl z-50">
                <h4 className="text-amber-400 text-2xl font-bold mb-6">Our Mission</h4>
                <p className="text-white text-lg leading-relaxed mb-6">
                  Our mission is to significantly improve wildfire fighting by providing precision fire barriers exactly where needed most.
                </p>
                <p className="text-white text-lg leading-relaxed">
                  We aim to provide quick, pinpoint and highly accessible respond to wildfires at previously unaccusable locations.
                </p>
              </div>
            </div>
            <div className="relative group">
              <button
                className="text-white text-lg font-medium hover:text-amber-400 transition-all duration-300 relative"
              >
                Solutions
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 group-hover:w-full transition-all duration-300"></span>
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[600px] max-h-[70vh] overflow-y-auto bg-slate-800/95 backdrop-blur-lg border border-amber-500/20 rounded-lg p-8 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-xl z-50">
                <h4 className="text-amber-400 text-2xl font-bold mb-6">Solutions</h4>
                <ul className="space-y-4">
                  <li className="text-white text-lg leading-relaxed flex items-start">
                    <span className="text-amber-400 mr-3 mt-1.5">•</span>
                    <span>Extindro deploys Fire Barriers made of heat-resistance materials by a coordinated team of drones, along fire-restricting lines at the most critical locations.</span>
                  </li>
                  <li className="text-white text-lg leading-relaxed flex items-start">
                    <span className="text-amber-400 mr-3 mt-1.5">•</span>
                    <span>Extindro constructs <strong className="font-bold">self-controlled prescribed burns</strong>, for ultimate fire extinguishing.</span>
                  </li>
                  <li className="text-white text-lg leading-relaxed flex items-start">
                    <span className="text-amber-400 mr-3 mt-1.5">•</span>
                    <span>Extindro identifies and immediately <strong className="font-bold">extinguish local fire spots</strong>.</span>
                  </li>
                  <li className="text-white text-lg leading-relaxed flex items-start">
                    <span className="text-amber-400 mr-3 mt-1.5">•</span>
                    <span>We use accurate wildfires models considering local topography, vegetation and real-time measurements (e.g. wind direction).</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="relative group">
              <button
                className="text-white text-lg font-medium hover:text-amber-400 transition-all duration-300 relative"
              >
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 group-hover:w-full transition-all duration-300"></span>
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[600px] max-h-[70vh] overflow-y-auto bg-slate-800/95 backdrop-blur-lg border border-amber-500/20 rounded-lg p-8 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-xl z-50">
                <h4 className="text-amber-400 text-2xl font-bold mb-6">About</h4>
                <p className="text-white text-lg leading-relaxed mb-6">
                  Extindro is a pioneering company dedicated to improving wildfire management through innovative fire restricting and extinguishing.
                </p>
                <p className="text-white text-lg leading-relaxed">
                  We combine expertise in fire science and advanced technologies to create solutions that protect communities, preserve ecosystems, and save lives.
                </p>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative h-screen flex items-center justify-center overflow-hidden" style={{ paddingTop: '3rem' }}>
        {!imagesLoaded && (
          <div className="absolute inset-0 bg-slate-900 flex items-center justify-center z-10">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-white text-xl">Loading images...</p>
            </div>
          </div>
        )}

        {imagesLoaded && !images.hero && (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 z-0"></div>
        )}

        {imagesLoaded && images.hero && (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
              style={{
                backgroundImage: `url(${images.hero})`,
                filter: 'brightness(0.7)'
              }}
            ></div>
            <img
              src={images.hero}
              alt=""
              style={{ display: 'none' }}
              onError={(e) => {
                console.error('Failed to load hero background image:', images.hero);
                console.error('Error:', e);
              }}
              onLoad={() => {
                console.log('Hero image loaded successfully:', images.hero);
              }}
            />
          </>
        )}

        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70 z-10"></div>

        <div className="relative z-20 text-center px-6 max-w-5xl mx-auto mt-16">
          <div className="mb-8 animate-fade-in">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-orange-400 leading-relaxed tracking-wide">
              Wildfires Are Growing More Intense and Destructive
            </h2>
            <h3 className="text-lg md:text-xl lg:text-2xl font-light text-teal-300 leading-relaxed tracking-wide mt-4">
              To mitigate the risks, we are building
            </h3>
          </div>

          <div className="space-y-8 animate-slide-up">
            <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight max-w-4xl mx-auto">
              Innovative Solutions for On-Demand, Precision Fire Barriers
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl font-semibold leading-tight">
              <span className="text-5xl font-bold" style={{ background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF8C00 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Extin</span>
              <span className="text-5xl font-bold" style={{ background: 'linear-gradient(135deg, #FCD34D 0%, #6EE7B7 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>dro</span>
              <span className="text-amber-300"> restricts wildfires before they climb up into the canopy</span>
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
              <div className="relative w-[85%] aspect-square rounded-full overflow-hidden mb-6 border-4 border-slate-200 group-hover:border-amber-500 transition-all duration-300 shadow-xl bg-slate-300">
                {!imagesLoaded && (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                {imagesLoaded && images.focus1 && (
                  <img
                    src={images.focus1}
                    alt="Fire Barriers"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.error('Failed to load focus1 image');
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                )}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Wildland-Urban<br />
                Interface Protection
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                Using accurate fire models<br />
                and real-time measurements
              </p>
            </div>

            <div className="flex flex-col items-center text-center group">
              <div className="relative w-[85%] aspect-square rounded-full overflow-hidden mb-6 border-4 border-slate-200 group-hover:border-amber-500 transition-all duration-300 shadow-xl bg-slate-300">
                {!imagesLoaded && (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                {imagesLoaded && images.focus2 && (
                  <img
                    src={images.focus2}
                    alt="Rapid Deployment"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.error('Failed to load focus2 image');
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                )}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Fire Spots<br />
                Extinguishing
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                Critical Fast response,<br />
                unlimited access
              </p>
            </div>

            <div className="flex flex-col items-center text-center group">
              <div className="relative w-[85%] aspect-square rounded-full overflow-hidden mb-6 border-4 border-slate-200 group-hover:border-amber-500 transition-all duration-300 shadow-xl bg-slate-300">
                {!imagesLoaded && (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                {imagesLoaded && images.focus3 && (
                  <img
                    src={images.focus3}
                    alt="Prescribed Burns"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.error('Failed to load focus3 image');
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                )}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Self-Controlled<br />
                Prescribed Burns
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                Via a patent-pending,<br />
                unique deployment method
              </p>
            </div>
          </div>

          <div className="mt-32 flex flex-col items-center">
            <div className="relative w-[75%] max-w-2xl aspect-video rounded-2xl overflow-hidden border-4 border-slate-200 shadow-2xl bg-slate-300">
              {!imagesLoaded && (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              {imagesLoaded && images.deployment && (
                <img
                  src={images.deployment}
                  alt="Extindro Deployment"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error('Failed to load deployment image:', images.deployment);
                    console.error('Error event:', e);
                    e.currentTarget.style.display = 'none';
                  }}
                  onLoad={() => {
                    console.log('Deployment image loaded successfully:', images.deployment);
                  }}
                />
              )}
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mt-8">
              Extindro's team on its way
            </h3>
            <p className="text-xl text-slate-600 mt-4 max-w-2xl mx-auto">
              Deploy fire barriers exactly where needed most
            </p>
          </div>
        </div>
      </section>

      <section id="applications" className="min-h-screen bg-gradient-to-b from-slate-800 to-slate-900 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Applications
            </h2>
            <div className="w-24 h-1 bg-amber-400 mx-auto mb-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-slate-700/30 backdrop-blur-sm rounded-2xl p-8 border border-amber-500/20 hover:border-amber-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl">🏘️</span>
              </div>
              <h3 className="text-2xl font-bold text-amber-400 mb-4">Urban Protection</h3>
              <p className="text-lg text-slate-300 leading-relaxed">
                Safeguarding residential areas in wildland-urban interface zones with precision barrier deployment, protecting homes and communities from advancing wildfires.
              </p>
            </div>

            <div className="bg-slate-700/30 backdrop-blur-sm rounded-2xl p-8 border border-amber-500/20 hover:border-amber-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl">🌲</span>
              </div>
              <h3 className="text-2xl font-bold text-amber-400 mb-4">Forest Management</h3>
              <p className="text-lg text-slate-300 leading-relaxed">
                Supporting controlled prescribed burns and preventing canopy fires in managed forests, enabling sustainable forestry practices while reducing wildfire risk.
              </p>
            </div>

            <div className="bg-slate-700/30 backdrop-blur-sm rounded-2xl p-8 border border-amber-500/20 hover:border-amber-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl">🏭</span>
              </div>
              <h3 className="text-2xl font-bold text-amber-400 mb-4">Critical Infrastructure</h3>
              <p className="text-lg text-slate-300 leading-relaxed">
                Protecting power lines, communication towers, and essential facilities with rapid-response fire barriers that can be deployed in minutes.
              </p>
            </div>

            <div className="bg-slate-700/30 backdrop-blur-sm rounded-2xl p-8 border border-amber-500/20 hover:border-amber-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl">🏞️</span>
              </div>
              <h3 className="text-2xl font-bold text-amber-400 mb-4">Natural Reserves</h3>
              <p className="text-lg text-slate-300 leading-relaxed">
                Preserving sensitive ecosystems and protected areas with environmentally-conscious fire management solutions that minimize ecological impact.
              </p>
            </div>
          </div>

        </div>
      </section>

      <section id="contact" className="bg-slate-900 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Get In <span className="text-amber-400">Touch</span>
            </h2>
            <div className="w-24 h-1 bg-amber-400 mx-auto mb-6"></div>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Ready to revolutionize your wildfires management strategy? Let's talk.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 max-w-6xl mx-auto">
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold mb-4">
                  <span style={{ background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF8C00 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Extin</span>
                  <span style={{ background: 'linear-gradient(135deg, #FCD34D 0%, #6EE7B7 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>dro</span>
                </h3>
                <p className="text-slate-400 text-lg leading-relaxed">
                  Revolutionary wildfires fighting technology for a safer tomorrow.
                </p>
              </div>

              <div className="bg-slate-700/30 backdrop-blur-sm rounded-2xl p-8 border border-amber-500/20">
                <h4 className="text-2xl font-bold mb-6 text-amber-400">Contact Information</h4>
                <div className="space-y-6">
                  <div className="flex items-center gap-4 text-slate-300 hover:text-amber-400 transition-colors group">
                    <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center group-hover:bg-amber-500/30 transition-colors">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Email</p>
                      <a href="mailto:Ronen0593@gmail.com" className="text-lg font-medium">Ronen0593@gmail.com</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-slate-300 hover:text-amber-400 transition-colors group">
                    <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center group-hover:bg-amber-500/30 transition-colors">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Phone</p>
                      <a href="tel:+972523793224" className="text-lg font-medium">+972-523-793-224</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-slate-300">
                    <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Location</p>
                      <span className="text-lg font-medium">Israel, the Northern region</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      <footer className="bg-black text-white py-8 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-400 text-lg">
            &copy; {new Date().getFullYear()} Extindro. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
