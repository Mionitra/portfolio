export function getRoles(language) {
  const fr = language === 'fr'
  return [
    {
      id: 1,
      period: '2025 — 2026',
      title: fr ? 'Présidente' : 'President',
      org: 'Club DSA',
      full: 'Data Structure & Algorithm — INSI',
      description: fr
        ? 'Diriger une communauté de passionnés d\'algorithmique, organiser des sessions de formation, des compétitions de code et des workshops techniques.'
        : 'Leading a community of algorithm enthusiasts, organizing training sessions, coding competitions, and technical workshops.',
      icon: 'Trophy',
      tag: fr ? 'Leadership' : 'Leadership',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80',
      stat: fr ? '50+ membres' : '50+ members',
    },
    {
      id: 2,
      period: '2026',
      title: fr ? 'Membre' : 'Member',
      org: 'RISE Community',
      full: fr ? 'Réseau d\'Innovation & de Synergie Étudiante' : 'Student Innovation & Synergy Network',
      description: fr
        ? 'Intégrer un réseau d\'excellence dédié à l\'innovation, au partage de connaissances et à l\'émergence des futurs leaders technologiques.'
        : 'Part of a network of excellence dedicated to innovation, knowledge-sharing, and nurturing the next generation of tech leaders.',
      icon: 'Globe',
      tag: fr ? 'Innovation' : 'Innovation',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80',
      stat: fr ? 'Réseau actif' : 'Active network',
    },
    {
      id: 3,
      period: '2026',
      title: 'Staff',
      org: 'HIU 2026',
      full: fr ? 'Hackathon Inter-Universitaire 2026' : 'Inter-University Hackathon 2026',
      description: fr
        ? 'Contribuer à l\'organisation d\'un hackathon majeur rassemblant les meilleures équipes universitaires, gérer la logistique et accompagner les participants.'
        : 'Helping organize a major hackathon bringing together top university teams, handling logistics and supporting participants.',
      icon: 'Zap',
      tag: fr ? 'Événementiel' : 'Events',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80',
      stat: fr ? 'Multi-universités' : 'Multi-university',
    },
  ]
}
