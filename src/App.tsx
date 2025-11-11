import { useState, useEffect } from 'react';
import { ChevronDown, Mail, Phone, MapPin } from 'lucide-react';
import { IMAGE_URLS } from './constants/images';

function App() {
  const [images] = useState<Record<string, string>>(IMAGE_URLS);
  const [imagesLoaded] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    console.log('Using static image URLs from Supabase Storage:', images);
  }, [images]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToNextSection = () => {
    scrollToSection('our-focus');
  };

  return (
    <div className="min-h-screen">

      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 nav-mobile-landscape ${
        scrolled ? 'bg-slate-900/95 backdrop-blur-lg border-b border-amber-500/20 shadow-lg' : 'bg-black/40 backdrop-blur-md border-b border-white/10'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 flex items-center justify-center">
          <div className="flex-shrink-0 cursor-pointer text-center" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold hover:scale-105 transition-transform">
              <span style={{ background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF8C00 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Extin</span>
              <span style={{ background: 'linear-gradient(135deg, #FCD34D 0%, #6EE7B7 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>dro</span>
            </h1>
            <p className="text-sm sm:text-base lg:text-lg mt-1 font-bold text-teal-300 tracking-wide">Innovative Wildfires Fighting</p>
          </div>
        </div>
      </nav>

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 sm:pt-32 md:pt-36 lg:pt-40 hero-section" style={{ minHeight: '100svh' }}>
        {!imagesLoaded && (
          <div className="absolute inset-0 bg-slate-900 flex items-center justify-center z-10">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-white text-xl">Loading...</p>
            </div>
          </div>
        )}

        {imagesLoaded && !images.hero && (
          <div className="absolute inset-0 bg-gradient-to-br from-orange-900 via-slate-900 to-slate-800 z-0"></div>
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

        <div className="relative z-20 text-center px-4 sm:px-6 max-w-5xl mx-auto mt-12 sm:mt-16 md:mt-20 lg:mt-24 hero-content">
          <div className="mb-6 sm:mb-8 mt-4 sm:mt-6 md:mt-8 animate-fade-in">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-orange-400 leading-relaxed tracking-wide">
              Wildfires Are Growing More Intense and Destructive
            </h2>
            <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-light text-teal-300 leading-relaxed tracking-wide mt-3 sm:mt-4">
              To mitigate the risks, we are building
            </h3>
          </div>

          <div className="space-y-6 sm:space-y-8 animate-slide-up">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight max-w-4xl mx-auto">
              Innovative Solutions for On-Demand, Precision Fire Barriers
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold leading-tight">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-bold" style={{ background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF8C00 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Extin</span>
              <span className="text-3xl sm:text-4xl lg:text-5xl font-bold" style={{ background: 'linear-gradient(135deg, #FCD34D 0%, #6EE7B7 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>dro</span>
              <span className="text-amber-300"> restricts wildfires before they climb up into the canopy</span>
            </p>
          </div>

          <div className="mt-8 sm:mt-12 flex items-center gap-4 justify-center">
            <button
              onClick={scrollToNextSection}
              className="px-8 py-4 sm:px-8 sm:py-4 min-h-[44px] bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-base sm:text-lg font-medium rounded-full border-2 border-white/30 transition-all duration-300 hover:scale-105 active-touch flex items-center gap-2"
            >
              Learn More
              <ChevronDown className="w-5 h-5 animate-bounce" />
            </button>
          </div>
        </div>
      </section>

      <section id="our-focus" className="min-h-screen bg-slate-50 py-12 sm:py-16 lg:py-20 px-4 sm:px-6" style={{ paddingTop: '8rem' }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-slate-900 mb-12 sm:mb-16 lg:mb-20">
            Our Focus
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
            <div className="flex flex-col items-center text-center group">
              <div className="relative w-full sm:w-[85%] aspect-square rounded-full overflow-hidden mb-6 border-4 border-slate-200 group-hover:border-amber-500 transition-all duration-300 shadow-xl bg-gradient-to-br from-orange-400 to-amber-600">
                {!imagesLoaded && (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                {imagesLoaded && !images.focus1 && (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-6xl">🏘️</span>
                  </div>
                )}
                {imagesLoaded && images.focus1 && (
                  <img
                    src={images.focus1}
                    alt="Fire Barriers"
                    className="w-full h-full object-cover"
                    crossOrigin="anonymous"
                    loading="eager"
                    onError={(e) => {
                      console.error('Failed to load focus1 image');
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                )}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4">
                Pinpoint Barriers<br />
                Deployment
              </h3>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                Using accurate fire models<br />
                and real-time measurements
              </p>
            </div>

            <div className="flex flex-col items-center text-center group">
              <div className="relative w-full sm:w-[85%] aspect-square rounded-full overflow-hidden mb-6 border-4 border-slate-200 group-hover:border-amber-500 transition-all duration-300 shadow-xl bg-gradient-to-br from-red-500 to-orange-600">
                {!imagesLoaded && (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                {imagesLoaded && !images.focus2 && (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-6xl">🔥</span>
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
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4">
                Fire Spots<br />
                Extinguishing
              </h3>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                Critical Fast response,<br />
                unlimited access
              </p>
            </div>

            <div className="flex flex-col items-center text-center group sm:col-span-2 lg:col-span-1">
              <div className="relative w-full sm:w-[60%] lg:w-[85%] aspect-square rounded-full overflow-hidden mb-6 border-4 border-slate-200 group-hover:border-amber-500 transition-all duration-300 shadow-xl bg-gradient-to-br from-green-600 to-teal-600">
                {!imagesLoaded && (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                {imagesLoaded && !images.focus3 && (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-6xl">🌲</span>
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
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4">
                Self-Controlled<br />
                Prescribed Burns
              </h3>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                Via a patent-pending,<br />
                unique deployment method
              </p>
            </div>
          </div>

          <div className="mt-16 sm:mt-24 lg:mt-32 flex flex-col items-center">
            <div className="relative w-full sm:w-[90%] lg:w-[75%] max-w-2xl aspect-video rounded-2xl overflow-hidden border-4 border-slate-200 shadow-2xl bg-gradient-to-br from-slate-700 via-slate-600 to-slate-800">
              {!imagesLoaded && (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              {imagesLoaded && !images.deployment && (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-8xl">🚁</span>
                </div>
              )}
              {imagesLoaded && images.deployment && (
                <img
                  src={images.deployment}
                  alt="Extindro Deployment"
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                  loading="eager"
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
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-6 sm:mt-8">
              Extindro's team on its way
            </h3>
            <p className="text-lg sm:text-xl text-slate-600 mt-3 sm:mt-4 max-w-2xl mx-auto px-4">
              Deploy fire barriers exactly where needed most
            </p>
          </div>
        </div>
      </section>

      <section id="applications" className="min-h-screen bg-gradient-to-b from-slate-800 to-slate-900 text-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              Applications
            </h2>
            <div className="w-20 sm:w-24 h-1 bg-amber-400 mx-auto mb-4 sm:mb-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-8 max-w-5xl xl:max-w-6xl mx-auto">
            <div className="bg-slate-700/30 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-amber-500/20 hover:border-amber-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🏘️</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-amber-400 mb-2 sm:mb-3">Wildland-Urban<br />Interface Protection</h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Safeguarding residential areas in the Wildland-Urban Interface with precision barriers deployment.
              </p>
            </div>

            <div className="bg-slate-700/30 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-amber-500/20 hover:border-amber-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🌲</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-amber-400 mb-2 sm:mb-3">Forest Guard</h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Enabling self-controlled prescribed burns and reducing canopy fire risks.
              </p>
            </div>

            <div className="bg-slate-700/30 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-amber-500/20 hover:border-amber-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🏭</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-amber-400 mb-2 sm:mb-3">Critical Infrastructure</h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Protecting essential facilities with rapid-response fire barriers.
              </p>
            </div>

            <div className="bg-slate-700/30 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-amber-500/20 hover:border-amber-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🏞️</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-amber-400 mb-2 sm:mb-3">Natural Reserves</h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Preserving sensitive ecosystems while minimizing ecological impacts.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto mt-12 sm:mt-16">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl">
              <h3 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-4 sm:mb-6">Our Mission</h3>
              <p className="text-blue-800 text-base sm:text-lg leading-relaxed mb-4">
                Our mission is to significantly improve wildfire fighting by providing precision fire barriers exactly where needed most.
              </p>
              <p className="text-blue-800 text-base sm:text-lg leading-relaxed">
                We aim to provide quick, pinpoint and highly accessible respond to wildfires at previously inaccessible locations.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl">
              <h3 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-4 sm:mb-6">Solutions</h3>
              <ul className="space-y-3 sm:space-y-4">
                <li className="text-blue-800 text-base sm:text-lg leading-relaxed flex items-start">
                  <span className="text-blue-600 mr-2 mt-1">•</span>
                  <span>Extindro deploys Fire Barriers made of heat-resistance materials by a coordinated team of drones, along fire-restricting lines at the most critical locations.</span>
                </li>
                <li className="text-blue-800 text-base sm:text-lg leading-relaxed flex items-start">
                  <span className="text-blue-600 mr-2 mt-1">•</span>
                  <span>Extindro constructs <strong className="font-bold">self-controlled prescribed burns</strong>, for ultimate fire extinguishing.</span>
                </li>
                <li className="text-blue-800 text-base sm:text-lg leading-relaxed flex items-start">
                  <span className="text-blue-600 mr-2 mt-1">•</span>
                  <span>Extindro identifies and immediately <strong className="font-bold">extinguishes local fire spots</strong>.</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl">
              <h3 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-4 sm:mb-6">About</h3>
              <p className="text-blue-800 text-base sm:text-lg leading-relaxed mb-4">
                Extindro is a pioneering company dedicated to improving wildfire management through innovative fire restricting and extinguishing.
              </p>
              <p className="text-blue-800 text-base sm:text-lg leading-relaxed">
                We combine expertise in fire science, accurate wildfire models and advanced technologies to create solutions that protect communities, preserve ecosystems, and save lives.
              </p>
            </div>
          </div>

        </div>
      </section>

      <section id="contact" className="bg-slate-900 text-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              Get In <span className="text-amber-400">Touch</span>
            </h2>
            <div className="w-20 sm:w-24 h-1 bg-amber-400 mx-auto mb-4 sm:mb-6"></div>
            <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto px-4">
              Ready to revolutionize your wildfires management strategy? Let's talk.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-6 sm:space-y-8 mb-8 sm:mb-12">
              <div className="text-center">
                <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
                  <span style={{ background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF8C00 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Extin</span>
                  <span style={{ background: 'linear-gradient(135deg, #FCD34D 0%, #6EE7B7 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>dro</span>
                </h3>
                <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
                  Revolutionary wildfires fighting technology for a safer tomorrow.
                </p>
              </div>

              <div className="bg-slate-700/30 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-amber-500/20">
                <h4 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-amber-400 text-center">Contact Information</h4>
                <div className="space-y-4 sm:space-y-6">
                  <a href="mailto:Info@Extindro.com" className="flex items-center gap-3 sm:gap-4 text-slate-300 hover:text-amber-400 transition-colors group min-h-[44px] active-touch">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 bg-amber-500/20 rounded-full flex items-center justify-center group-hover:bg-amber-500/30 transition-colors flex-shrink-0">
                      <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-slate-400">Email</p>
                      <span className="text-sm sm:text-base lg:text-lg font-medium break-all">Info@Extindro.com</span>
                    </div>
                  </a>
                  <a href="tel:+972523793224" className="flex items-center gap-3 sm:gap-4 text-slate-300 hover:text-amber-400 transition-colors group min-h-[44px] active-touch">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 bg-amber-500/20 rounded-full flex items-center justify-center group-hover:bg-amber-500/30 transition-colors flex-shrink-0">
                      <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-slate-400">Phone</p>
                      <span className="text-sm sm:text-base lg:text-lg font-medium">+972-523-793-224</span>
                    </div>
                  </a>
                  <div className="flex items-center gap-3 sm:gap-4 text-slate-300 min-h-[44px]">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 bg-amber-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-slate-400">Location</p>
                      <span className="text-sm sm:text-base lg:text-lg font-medium">Israel, the Northern District</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-black text-white py-6 sm:py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-400 text-sm sm:text-base lg:text-lg">
            &copy; {new Date().getFullYear()} Extindro. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
