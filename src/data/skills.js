const skillsData = (language = 'en') => [
  { name: 'React', category: 'frontend', proficiency: 95, icon: 'Atom', iconColor: 'text-blue-400', keySkills: ['Redux & Context API', 'React Hooks', 'React Testing Library'] },
  { name: 'Vue.js', category: 'frontend', proficiency: 85, icon: 'Triangle', iconColor: 'text-green-500', keySkills: ['Vuex', 'Vue Router', 'Composition API'] },
  { name: 'JavaScript', category: 'frontend', proficiency: 92, icon: 'FileJson', iconColor: 'text-yellow-400', keySkills: language === 'fr' ? ['ES6+', 'Async/Await', 'Manipulation DOM'] : ['ES6+', 'Async/Await', 'DOM Manipulation'] },
  { name: 'HTML5', category: 'frontend', proficiency: 95, icon: 'Code2', iconColor: 'text-orange-500', keySkills: language === 'fr' ? ['Sémantique', 'Accessibilité', 'SEO'] : ['Semantic HTML', 'Accessibility', 'SEO'] },
  { name: 'GSAP', category: 'frontend', proficiency: 70, icon: 'Code2', iconColor: 'text-green-500', keySkills: language === 'fr' ? ['Animations', 'Timeline', 'ScrollTrigger'] : ['Animations', 'Timelines', 'ScrollTrigger'] },
  { name: 'CSS3', category: 'frontend', proficiency: 90, icon: 'Paintbrush', iconColor: 'text-blue-500', keySkills: ['Flexbox', 'Grid', 'Animations'] },
  { name: 'TailwindCSS', category: 'frontend', proficiency: 95, icon: 'Wind', iconColor: 'text-cyan-400', keySkills: language === 'fr' ? ['Design Responsive', 'Composants UI', 'Mode Sombre'] : ['Responsive Design', 'UI Components', 'Dark Mode'] },
  { name: 'Bootstrap 5', category: 'frontend', proficiency: 88, icon: 'Layout', iconColor: 'text-purple-600', keySkills: language === 'fr' ? ['Système de Grille', 'Composants', 'Utilitaires'] : ['Grid System', 'Components', 'Utilities'] },
  { name: 'Sass/SCSS', category: 'frontend', proficiency: 87, icon: 'Palette', iconColor: 'text-pink-500', keySkills: ['Variables', 'Mixins', 'Nesting'] },
  { name: 'Django', category: 'backend', proficiency: 80, icon: 'Server', iconColor: 'text-green-700', keySkills: language === 'fr' ? ['Django REST Framework', 'ORM Django', 'Authentification'] : ['Django REST Framework', 'Django ORM', 'Authentication'] },
  { name: 'Spring Boot', category: 'backend', proficiency: 70, icon: 'Leaf', iconColor: 'text-green-600', keySkills: language === 'fr' ? ['Spring Security', 'JPA/Hibernate', 'API REST'] : ['Spring Security', 'JPA/Hibernate', 'REST APIs'] },
  { name: 'PHP', category: 'backend', proficiency: 70, icon: 'Code', iconColor: 'text-indigo-400', keySkills: language === 'fr' ? ['POO', 'Laravel/Symfony', 'API'] : ['OOP', 'Laravel/Symfony', 'APIs'] },
  { name: 'React Native', category: 'mobile', proficiency: 70, icon: 'Smartphone', iconColor: 'text-blue-400', keySkills: language === 'fr' ? ['Expo', 'Navigation', 'API Natives'] : ['Expo', 'Navigation', 'Native APIs'] },
  { name: 'Flutter', category: 'mobile', proficiency: 70, icon: 'Zap', iconColor: 'text-blue-500', keySkills: ['Dart', 'Widgets', 'State Management'] },
  { name: 'MySQL', category: 'database', proficiency: 85, icon: 'Database', iconColor: 'text-blue-600', keySkills: language === 'fr' ? ['Requêtes SQL', 'Optimisation', 'Indexation'] : ['SQL Queries', 'Optimization', 'Indexing'] },
  { name: 'PostgreSQL', category: 'database', proficiency: 90, icon: 'DatabaseZap', iconColor: 'text-blue-700', keySkills: language === 'fr' ? ['Requêtes Avancées', 'Triggers', 'Performance'] : ['Advanced Queries', 'Triggers', 'Performance'] },
  { name: 'Oracle', category: 'database', proficiency: 70, icon: 'HardDrive', iconColor: 'text-red-600', keySkills: language === 'fr' ? ['PL/SQL', 'Stored Procedures', 'Administration'] : ['PL/SQL', 'Stored Procedures', 'Administration'] },
  { name: 'Git/GitHub', category: 'others', proficiency: 90, icon: 'GitBranch', iconColor: 'text-gray-800 dark:text-gray-300', keySkills: language === 'fr' ? ['Contrôle de Version', 'Branches', 'Collaboration'] : ['Version Control', 'Branching', 'Collaboration'] },
  { name: 'Docker', category: 'others', proficiency: 80, icon: 'Container', iconColor: 'text-blue-500', keySkills: language === 'fr' ? ['Containerisation', 'Docker Compose', 'Déploiement'] : ['Containerization', 'Docker Compose', 'Deployment'] },
  { name: 'UI/UX Design', category: 'others', proficiency: 85, icon: 'Figma', iconColor: 'text-purple-500', keySkills: ['Figma', 'Prototyping', 'Design System'] },
]

export default skillsData
