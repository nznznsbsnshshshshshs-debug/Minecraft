import {
  AlertTriangle,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Command,
  CreditCard,
  File,
  FileText,
  HelpCircle,
  Image,
  Laptop,
  Moon,
  MoreVertical,
  Pizza,
  Plus,
  Settings,
  SunMedium,
  Trash,
  Twitter,
  User,
  X,
} from "lucide-react"

export const Icons = {
  sun: SunMedium,
  moon: Moon,
  laptop: Laptop,
  twitter: Twitter,
  gitHub: ({...props}) => (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        d="M12 2C6.475 2 2 6.475 2 12C2 16.417 4.862 20.165 9.01 21.492C9.51 21.582 9.69 21.272 9.69 21.012C9.69 20.782 9.68 20.132 9.68 19.432C7.15 19.892 6.55 18.272 6.55 18.272C6.1 17.152 5.31 16.822 5.31 16.822C4.39 16.202 5.39 16.212 5.39 16.212C6.41 16.282 7.02 17.202 7.02 17.202C7.91 18.782 9.32 18.332 9.87 18.072C9.96 17.412 10.23 17.002 10.5 16.762C8.38 16.512 6.12 15.692 6.12 12.022C6.12 10.882 6.51 9.962 7.14 9.252C7.03 8.992 6.63 7.822 7.24 6.322C7.24 6.322 8.04 6.062 9.68 7.152C10.45 6.942 11.25 6.842 12.04 6.842C12.83 6.842 13.63 6.942 14.4 7.152C15.96 6.062 16.84 6.322 16.84 6.322C17.45 7.822 17.05 8.992 16.94 9.252C17.57 9.962 17.96 10.882 17.96 12.022C17.96 15.702 15.7 16.512 13.57 16.762C13.91 17.052 14.2 17.652 14.2 18.522C14.2 19.782 14.19 20.782 14.19 21.012C14.19 21.272 14.37 21.582 14.88 21.492C19.138 20.165 22 16.417 22 12C22 6.475 17.525 2 12 2Z"
        fill="currentColor"
      />
    </svg>
  ),
  logo: Command,
  close: X,
  spinner: ({...props}) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  ),
  arrowRight: ArrowRight,
  help: HelpCircle,
  pizza: Pizza,
  add: Plus,
  warning: AlertTriangle,
  user: User,
  arrowLeft: ChevronLeft,
  arrowUp: ChevronRight,
  check: Check,
  copy: ({...props}) => (
    <svg viewBox="0 0 24 24" {...props}>
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  ),
  copied: ({...props}) => (
    <svg viewBox="0 0 24 24" {...props}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  trash: Trash,
  post: FileText,
  page: File,
  media: Image,
  settings: Settings,
  billing: CreditCard,
  ellipsis: MoreVertical,
}
