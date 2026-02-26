import { Link } from 'react-router-dom';
import type { Question } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppSelector } from '@/app/hooks';
import { formatDate } from '@/lib/utils';

interface QuestionCardProps {
  question: Question;
}

export function QuestionCard({ question }: QuestionCardProps) {
  const author = useAppSelector((state) => state.users.entities[question.author]);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{author?.id ?? question.author}</CardTitle>
        <p className="text-sm text-slate-500">{formatDate(question.timestamp)}</p>
      </CardHeader>
      <CardContent>
        <Link
          to={`/questions/${question.id}`}
          className="inline-flex h-10 w-full items-center justify-center rounded-md border border-slate-300 bg-white px-4 text-sm font-medium hover:bg-slate-100"
        >
          Show
        </Link>
      </CardContent>
    </Card>
  );
}
