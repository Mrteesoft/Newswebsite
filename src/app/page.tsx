'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import CategoryNav from '@/components/CategoryNav';
import TopStoriesSection from '@/components/sections/TopStoriesSection';
import EditorPicksSection from '@/components/sections/EditorPicksSection';
import FeaturedStoriesSection from '@/components/sections/FeaturedStoriesSection';
import LatestStoriesSection from '@/components/sections/LatestStoriesSection';
import MissedStoriesSection from '@/components/sections/MissedStoriesSection';
import FilteredStoriesSection from '@/components/sections/FilteredStoriesSection';
import TrendingStories from '@/components/TrendingStories';
import NewsletterSignup from '@/components/NewsletterSignup';
import BackToTop from '@/components/BackToTop';
import SearchResults from '@/components/SearchResults';
import CategoryStories from '@/components/CategoryStories';
import { useAppSelector } from '@/store/hooks';

export default function Home() {
  const searchQuery = useAppSelector((state) => state.categories.searchQuery);
  const selectedCategoryId = useAppSelector((state) => state.categories.selectedCategoryId);

  const showFilteredResults = searchQuery.trim() || selectedCategoryId;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Header />

      {/* Hero Section */}
      {!showFilteredResults && <HeroSection />}

      <main className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-8 lg:py-12">
        <div className="mb-4 sm:mb-8">
          <CategoryNav />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 xl:gap-12">
          {/* Main Content */}
          <div className="xl:col-span-3 space-y-6 sm:space-y-8 lg:space-y-12 xl:space-y-16">
            {showFilteredResults ? (
              <FilteredStoriesSection />
            ) : (
              <>
                <TopStoriesSection />
                <EditorPicksSection />
                <FeaturedStoriesSection />
                <LatestStoriesSection />
                <MissedStoriesSection />
              </>
            )}
          </div>

          {/* Sidebar - Hidden on mobile */}
          <div className="hidden xl:block xl:col-span-1 space-y-4 sm:space-y-6 lg:space-y-8">
            <TrendingStories />
            <div className="sticky top-8">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
                      Contact
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
                      Terms of Service
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <NewsletterSignup />
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}
