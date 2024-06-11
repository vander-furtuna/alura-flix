import vanderFlixLogo from '../../../assets/vander-flix-logo.png'

export function Footer() {
  return (
    <footer className="relative mt-16 w-full p-10">
      <img
        src={vanderFlixLogo}
        alt="Vander Flix Logo"
        className="m-auto h-12 w-auto"
      />
    </footer>
  )
}
