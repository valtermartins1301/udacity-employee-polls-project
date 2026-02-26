import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { logout } from '@/features/auth/authSlice';

const navClass = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-2 text-sm font-medium ${isActive ? 'text-sky-800 border-b-2 border-sky-800' : 'text-slate-700'}`;

export function NavBar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authedUserId = useAppSelector((state) => state.auth.authedUserId);
  const user = useAppSelector((state) => (authedUserId ? state.users.entities[authedUserId] : null));

  if (!user) return null;

  return (
    <header className="border-b bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <NavLink to="/" className={navClass}>
            Home
          </NavLink>
          <NavLink to="/leaderboard" className={navClass}>
            Leaderboard
          </NavLink>
          <NavLink to="/add" className={navClass}>
            New
          </NavLink>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 text-sm text-slate-700">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatarURL} alt={user.name} />
              <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <span>{user.id}</span>
          </Link>
          <Button
            variant="ghost"
            onClick={() => {
              dispatch(logout());
              navigate('/login', { replace: true });
            }}
          >
            Logout
          </Button>
        </div>
      </nav>
    </header>
  );
}
