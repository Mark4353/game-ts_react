
interface HeaderProps {
  title: string
}

const Header = ({ title }: HeaderProps) => (
  <div className="section-header">
    <h2>{title}</h2>
  </div>
)

export default Header
