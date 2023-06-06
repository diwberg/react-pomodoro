import { LuTimerReset, LuClipboardList } from 'react-icons/lu'
import { HeaderContainer } from './styles'
import logo from '../../assets/logo.svg'
import { NavLink } from 'react-router-dom'

export function Header() {
  return (
    <HeaderContainer>
      <img src={logo} alt="" title="Icyou Pomodoro" />
      <nav>
        <NavLink to="/">
          <LuTimerReset size={24} title="Timer" />
        </NavLink>
        <NavLink to="/history">
          <LuClipboardList size={24} title="Histórico" />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
