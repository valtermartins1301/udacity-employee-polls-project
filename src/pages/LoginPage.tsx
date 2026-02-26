import { useMemo, useState, type FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Select } from 'baseui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { login, setRedirectAfterLogin } from '@/features/auth/authSlice';

export function LoginPage() {
  const users = useAppSelector((state) => Object.values(state.users.entities));
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedUser, setSelectedUser] = useState<{ id: string; label: string }[]>([]);
  const [password, setPassword] = useState('');

  const options = useMemo(
    () => users.map((u) => ({ id: u.id, label: `${u.name} (${u.id})` })),
    [users],
  );

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const selected = selectedUser[0]?.id;
    if (!selected) return;

    const result = await dispatch(login({ userId: selected, password }));
    if (login.fulfilled.match(result)) {
      const from = (location.state as { from?: string } | null)?.from ?? auth.redirectAfterLogin ?? '/';
      dispatch(setRedirectAfterLogin(null));
      navigate(from, { replace: true });
    }
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-xl items-center px-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-center text-3xl">Employee Polls</CardTitle>
          <p className="text-center text-xl font-semibold">Log In</p>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={onSubmit}>
            <div>
              <label className="mb-2 block text-sm font-medium">User</label>
              <Select
                options={options}
                value={selectedUser}
                placeholder="Select a user"
                clearable={false}
                onChange={(params) => setSelectedUser(params.value as { id: string; label: string }[])}
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>
            {auth.error && <p className="text-sm text-red-700">{auth.error}</p>}
            <Button type="submit" className="w-full" disabled={!selectedUser.length || !password || auth.status === 'loading'}>
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
