import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { setRedirectAfterLogin } from '@/features/auth/authSlice';

export function ProtectedRoute() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const authedUserId = useAppSelector((state) => state.auth.authedUserId);

  useEffect(() => {
    if (!authedUserId) {
      dispatch(setRedirectAfterLogin(`${location.pathname}${location.search}`));
    }
  }, [authedUserId, dispatch, location.pathname, location.search]);

  if (!authedUserId) {
    const redirectTo = `${location.pathname}${location.search}`;
    return <Navigate to="/login" replace state={{ from: redirectTo }} />;
  }

  return <Outlet />;
}
