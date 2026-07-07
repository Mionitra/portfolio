import { Facebook, Github, Linkedin } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'

const links = [
  { href: 'https://github.com/Mionitra', icon: Github, label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/lova-mionitra-rakotondradaoro-441954395/', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://www.facebook.com/younah.yzuki', icon: Facebook, label: 'Facebook' },
]

export default function SocialLinks() {
  const { darkMode } = useTheme()

  return (
    <div className="flex gap-4">
      {links.map(({ href, icon: Icon, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-full transition-colors duration-200 ${
            darkMode ? 'bg-[#1e293b] hover:bg-[#818cf8] hover:text-white' : 'bg-[#e9ecef] hover:bg-[#6366f1] hover:text-white'
          }`}
          aria-label={label}
        >
          <Icon />
        </a>
      ))}
    </div>
  )
}
