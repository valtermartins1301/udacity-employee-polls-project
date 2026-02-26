import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAppSelector } from '@/app/hooks';
import { selectLeaderboardRows } from '@/selectors/leaderboardSelectors';

export function LeaderboardPage() {
  const rows = useAppSelector(selectLeaderboardRows);

  return (
    <section className="mx-auto max-w-5xl overflow-hidden rounded-lg border bg-white">
      <table className="w-full border-collapse">
        <thead className="bg-slate-100 text-left">
          <tr>
            <th className="p-4">Users</th>
            <th className="p-4">Answered</th>
            <th className="p-4">Created</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-t">
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={row.avatarURL} alt={row.name} />
                    <AvatarFallback>{row.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{row.name}</p>
                    <p className="text-sm text-slate-500">{row.id}</p>
                  </div>
                </div>
              </td>
              <td className="p-4">{row.answered}</td>
              <td className="p-4">{row.created}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
