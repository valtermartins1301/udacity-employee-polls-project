import { QuestionCard } from '@/components/QuestionCard';
import { useAppSelector } from '@/app/hooks';

interface QuestionListProps {
  ids: string[];
}

export function QuestionList({ ids }: QuestionListProps) {
  const questions = useAppSelector((state) => state.questions.entities);

  if (ids.length === 0) {
    return <p className="rounded-md border bg-white p-4 text-sm text-slate-600">No polls in this category.</p>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {ids.map((id) => {
        const question = questions[id];
        if (!question) return null;
        return <QuestionCard key={id} question={question} />;
      })}
    </div>
  );
}
