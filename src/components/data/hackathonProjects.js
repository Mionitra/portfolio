const projects = (language = "en") => [
    {
      id: 1,
      title: "DevFest Antsirabe",
      date: "Oct 18–19, 2025",
      rank: language === 'fr' ? "1er prix" : "1st place",
      color: "from-blue-500 to-purple-600",
      badge: "🥇",
      description: language === 'fr'
        ? "Application web utilisant l'IA pour proposer des idées d'entreprise et suivre leur évolution."
        : "Web application using AI to suggest business ideas and track their evolution.",
      tags: ["AI", "Business", "Web App"]
    },
    {
      id: 2,
      title: "INSI DevWeb Hackathon",
      date: "Feb 2025",
      rank: language === 'fr' ? "3e place" : "3rd place",
      color: "from-purple-500 to-blue-600",
      description: language === 'fr'
        ? "Application web pour le suivi des animaux endémiques dans les réserves naturelles et la surveillance de la déforestation."
        : "Web application for tracking endemic animals in nature reserves and monitoring deforestation.",
      tags: ["Ecology", "Conservation", "Web"]
    },
    {
      id: 3,
      title: "Stupid Hackathon",
      date: "Jul 26, 2025",
      rank: language === 'fr' ? "Coup de cœur du jury" : "Jury's favorite",
      color: "from-blue-600 to-purple-500",
      description: language === 'fr'
        ? "Projet humoristique présenté lors d'un hackathon non conventionnel."
        : "Humorous project presented at an unconventional hackathon.",
      tags: ["Fun", "Creativity", "Innovation"]
    },
    {
      id: 4,
      title: "MAT",
      date: "Aug 2025",
      rank: language === 'fr' ? "Participation" : "Participation",
      color: "from-purple-600 to-blue-500",
      description: language === 'fr'
        ? "Résolution d'algorithmes complexes en Python sous contrainte de temps."
        : "Solving complex algorithms in Python under time constraints.",
      tags: ["Python", "Algorithms", "Performance"]
    },
    {
      id: 5,
      title: "Webcup Madagascar",
      date: "May 2025",
      rank: language === 'fr' ? "Participation" : "Participation",
      color: "from-blue-500 to-purple-500",
      description: language === 'fr'
        ? "Développement en 24 heures de 'The End Page', une plateforme pour rédiger un message final avant un départ définitif."
        : "24-hour development of 'The End Page', a platform for writing a final message before a definitive departure.",
      tags: ["24h", "Challenge", "Platform"]
    },
    {
      id: 6,
      title: "Redshalk Hackathon",
      date: "Nov 29, 2024",
      rank: language === 'fr' ? "Participation" : "Participation",
      color: "from-purple-500 to-blue-600",
      description: language === 'fr'
        ? "Application pour le suivi des races de porcs et la gestion des exploitations."
        : "Application for tracking pig breeds and farm management.",
      tags: ["AgriTech", "Management", "Tracking"]
    }
  ];
export default projects;