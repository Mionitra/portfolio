const certifications = (language = 'en') => [
  {
    name: language === 'fr' ? 'Anglais pour les affaires et l\'entrepreneuriat' : 'English for Business and Entrepreneurship',
    icon: '☁️',
    image: '/images/certificats/be.jpg',
  },
  {
    name: language === 'fr' ? 'Anglais pour le développement de carrière' : 'English for Career Development',
    icon: '🎯',
    image: '/images/certificats/cd.jpg',
  },
  {
    name: language === 'fr' ? 'Anglais pour les STEM' : 'English for STEM',
    icon: '⚡',
    image: '/images/certificats/stem.jpg',
  },
]

export default certifications
