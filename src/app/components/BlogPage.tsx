import { motion } from 'motion/react';
import { Calendar, Tag, ArrowRight, TrendingUp, Award, Users, Globe } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function BlogPage() {
  const pressReleases = [
    {
      id: 1,
      date: 'December 15, 2025',
      category: 'Expansion',
      title: 'Pizza Anytime Expands to 50 Locations Nationwide',
      excerpt: 'Revolutionary vending technology brings fresh pizza to transit hubs, corporate campuses, and universities across the country.',
      image: 'https://images.unsplash.com/photo-1689942007101-de5d836afcf4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB0ZWNobm9sb2d5JTIwaW5kdXN0cmlhbHxlbnwxfHx8fDE3NjYwNjY3MDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      content: 'We are thrilled to announce that Pizza Anytime has reached a major milestone with our 50th installation. Our automated pizza vending machines are now serving customers in major metropolitan areas, bringing the convenience of fresh, hot pizza to locations where it matters most.',
      icon: Globe
    },
    {
      id: 2,
      date: 'November 28, 2025',
      category: 'Awards',
      title: 'Innovation Award: Best Automated Food Service 2025',
      excerpt: 'Industry recognition for pioneering smart vending machine technology and revolutionizing the quick-service food industry.',
      image: 'https://images.unsplash.com/photo-1652212976547-16d7e2841b8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHRlY2hub2xvZ3klMjBibHVlfGVufDF8fHx8MTc2NjAxMzUyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      content: 'Pizza Anytime has been honored with the prestigious Food Service Innovation Award 2025, recognizing our groundbreaking approach to automated food preparation and delivery. This award celebrates our commitment to excellence in technology and customer service.',
      icon: Award
    },
    {
      id: 3,
      date: 'November 10, 2025',
      category: 'Partnership',
      title: 'Strategic Partnership with Leading Food Chains Announced',
      excerpt: 'Major collaboration to revolutionize quick-service restaurant industry through advanced automation technology.',
      image: 'https://images.unsplash.com/photo-1642789736356-d7122adfe91b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMGNsb3NlJTIwdXB8ZW58MXx8fHwxNzY1OTk5MDM5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      content: 'Today we announced a strategic partnership with several leading food service brands to integrate our technology into their operations. This collaboration will bring automated pizza preparation to millions of new customers.',
      icon: Users
    },
    {
      id: 4,
      date: 'October 22, 2025',
      category: 'Technology',
      title: 'AI-Powered Quality Control System Launch',
      excerpt: 'New machine learning algorithms ensure consistent quality and reduce waste by 40%.',
      image: 'https://images.unsplash.com/photo-1754195451509-00c25c20fdde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwdmVuZGluZyUyMG1hY2hpbmV8ZW58MXx8fHwxNzY2MDY1NjY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      content: 'Our latest software update introduces advanced AI algorithms that monitor every aspect of the cooking process. The system learns from millions of data points to optimize temperature, timing, and ingredient distribution for perfect results every time.',
      icon: TrendingUp
    },
    {
      id: 5,
      date: 'October 5, 2025',
      category: 'Sustainability',
      title: 'Carbon Neutral Operations Achieved',
      excerpt: 'Pizza Anytime becomes first automated food service to reach carbon neutrality.',
      image: 'https://images.unsplash.com/photo-1689942007101-de5d836afcf4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB0ZWNobm9sb2d5JTIwaW5kdXN0cmlhbHxlbnwxfHx8fDE3NjYwNjY3MDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      content: 'We are proud to announce that all Pizza Anytime operations are now carbon neutral. Through energy-efficient design, renewable energy partnerships, and sustainable sourcing, we are leading the industry in environmental responsibility.',
      icon: Globe
    },
    {
      id: 6,
      date: 'September 18, 2025',
      category: 'Product Launch',
      title: 'PizzaMatic Pro X1 - Next Generation Machine Unveiled',
      excerpt: 'New model features enhanced capacity, faster cooking, and advanced customization options.',
      image: 'https://images.unsplash.com/photo-1652212976547-16d7e2841b8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHRlY2hub2xvZ3klMjBibHVlfGVufDF8fHx8MTc2NjAxMzUyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      content: 'Introducing the PizzaMatic Pro X1, our most advanced vending machine yet. With 70-pizza capacity, IoT connectivity, and AI-powered cooking, this machine sets a new standard for automated food service.',
      icon: TrendingUp
    }
  ];

  const categories = ['All', 'Expansion', 'Awards', 'Partnership', 'Technology', 'Sustainability', 'Product Launch'];

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1929] via-[#132f4c] to-[#0a1929] overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -top-1/2 right-0 w-96 h-96 bg-[#00c9db]/20 rounded-full blur-3xl"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00c9db]/20 border border-[#00c9db]/30 rounded-full mb-6">
              <span className="text-[#00c9db]">Latest News</span>
            </div>
            <h1 className="text-5xl md:text-6xl mb-6 text-white">
              Press <span className="text-[#00c9db]">Releases</span>
            </h1>
            <p className="text-xl text-[#b2c9e0] max-w-2xl mx-auto">
              Stay updated with the latest developments, innovations, and achievements from Pizza Anytime
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-b border-[#00c9db]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className={`px-6 py-2 rounded-full transition-all ${
                  category === 'All'
                    ? 'bg-gradient-to-r from-[#00c9db] to-[#0088cc]'
                    : 'bg-[#132f4c] border-2 border-[#00c9db]/30 hover:border-[#00c9db]/50'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Press Releases Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {pressReleases.map((release, index) => (
              <motion.article
                key={release.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="grid md:grid-cols-3 gap-6 p-6 bg-gradient-to-br from-[#082032] to-[#0a2a3f] border border-[#008B8B]/20 rounded-2xl hover:border-[#008B8B]/50 transition-all">
                  {/* Image */}
                  <div className="relative rounded-xl overflow-hidden aspect-video md:aspect-square">
                    <ImageWithFallback
                      src={release.image}
                      alt={release.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#082032]/80 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#008B8B] to-[#00D1FF] rounded-lg flex items-center justify-center">
                        <release.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="md:col-span-2 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-4 mb-4">
                        <div className="flex items-center gap-2 text-[#D9DEE2]">
                          <Calendar className="w-4 h-4" />
                          <span>{release.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Tag className="w-4 h-4 text-[#00D1FF]" />
                          <span className="px-3 py-1 bg-[#008B8B]/20 text-[#00D1FF] rounded-full">
                            {release.category}
                          </span>
                        </div>
                      </div>

                      <h2 className="text-2xl md:text-3xl mb-4 group-hover:text-[#008B8B] transition-colors">
                        {release.title}
                      </h2>

                      <p className="text-[#D9DEE2] mb-4 line-clamp-2">
                        {release.excerpt}
                      </p>

                      <p className="text-[#D9DEE2]/80 line-clamp-3">
                        {release.content}
                      </p>
                    </div>

                    <div className="mt-4">
                      <motion.button
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-2 text-[#008B8B] group-hover:text-[#00D1FF] transition-colors"
                      >
                        Read Full Release
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Load More */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border border-[#008B8B] rounded-lg hover:bg-[#008B8B]/10 transition-colors"
            >
              Load More Articles
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00c9db]/20 to-[#0088cc]/20" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl mb-6 text-white">Stay in the Loop</h2>
            <p className="text-xl text-[#b2c9e0] mb-8">
              Subscribe to receive the latest press releases and company updates
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 bg-[#082032] border border-[#00c9db]/30 rounded-lg focus:outline-none focus:border-[#00c9db] transition-colors text-white placeholder:text-[#b2c9e0]"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-[#00c9db] to-[#0088cc] rounded-lg whitespace-nowrap shadow-lg shadow-[#00c9db]/40"
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}