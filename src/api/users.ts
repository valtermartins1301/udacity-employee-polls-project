import { _getUsers } from '@/api/dataSource';
import type { User } from '@/types';

export async function fetchUsers(): Promise<Record<string, User>> {
  const users = await _getUsers();
  return users as Record<string, User>;
}
