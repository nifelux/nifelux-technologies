export const SITE = {
  name: 'Nifelux Technologies',
  tagline: 'Building the Future of Technology in Africa.',
  founder: 'Oluwanifemi Abdullahi Olude',
  founderRole: 'Founder & CEO',
  email: 'contact@nifelux.com',
  phone: '+234 000 000 0000',
  url: process.env.NEXT_PUBLIC_APP_URL ?? 'https://nifelux.com',
}

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Robotics', href: '/robotics' },
  { label: 'Certifications', href: '/certifications' },
  { label: 'Contact', href: '/contact' },
]

export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/',
  telegram: 'https://t.me/',
  whatsapp: 'https://wa.me/',
  twitter: 'https://twitter.com/',
}

export const SERVICES = [
  { id: 'ai', title: 'Artificial Intelligence', description: 'Building intelligent systems that learn, adapt, and solve real-world problems across education, business, and society.', icon: '🧠', color: 'blue' },
  { id: 'robotics', title: 'Robotics', description: 'Designing and developing smart robotic systems for automation, research, and industrial applications in Africa.', icon: '🤖', color: 'blue' },
  { id: 'edtech', title: 'Educational Technology', description: 'AI-powered learning platforms that personalize education for students across Nigeria and Africa.', icon: '🎓', color: 'red' },
  { id: 'software', title: 'Software Development', description: 'End-to-end software solutions built with modern frameworks and company-grade engineering standards.', icon: '💻', color: 'blue' },
  { id: 'web', title: 'Web Development', description: 'Premium, performant web applications and platforms — from landing pages to full enterprise systems.', icon: '🌐', color: 'blue' },
  { id: 'mobile', title: 'Mobile App Development', description: 'Cross-platform mobile applications that deliver native-quality experiences on iOS and Android.', icon: '📱', color: 'red' },
  { id: 'automation', title: 'Automation Systems', description: 'Smart automation solutions that streamline operations, reduce costs, and eliminate repetitive work.', icon: '⚙️', color: 'blue' },
  { id: 'cloud', title: 'Cloud & Infrastructure', description: 'Scalable cloud architecture, DevOps pipelines, and infrastructure built for growth.', icon: '☁️', color: 'blue' },
  { id: 'research', title: 'Research & Innovation', description: 'Pushing the boundaries of technology through applied research in AI, robotics, and smart systems.', icon: '🔬', color: 'red' },
]

export const STATS = [
  { value: '2024', label: 'Founded' },
  { value: '9+', label: 'Service Areas' },
  { value: '∞', label: 'Innovation Drive' },
  { value: '🇳🇬', label: 'Made in Nigeria' },
]

export const CONTRIBUTION_TIERS = [
  {
    id: 'supporter',
    label: 'Supporter',
    amount: 500,
    description: 'Help us keep the lights on and push our research forward.',
    perks: ['Supporter badge', 'Name in our thank you list'],
  },
  {
    id: 'builder',
    label: 'Builder',
    amount: 2000,
    description: 'Fuel a week of development on NIRA AI or our robotics lab.',
    perks: ['Builder badge', 'Exclusive project update', 'Priority acknowledgement'],
  },
  {
    id: 'pioneer',
    label: 'Pioneer',
    amount: 10000,
    description: 'Be part of shaping the future of technology in Africa.',
    perks: ['Pioneer badge', 'Direct founder acknowledgement', 'Early access to platforms'],
  },
]
