import type { OptionKey, Question } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface VoteResultsProps {
  question: Question;
  selectedAnswer: OptionKey;
}

function percentage(total: number, count: number): string {
  if (!total) return '0%';
  return `${Math.round((count / total) * 100)}%`;
}

export function VoteResults({ question, selectedAnswer }: VoteResultsProps) {
  const totalVotes = question.optionOne.votes.length + question.optionTwo.votes.length;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {(['optionOne', 'optionTwo'] as const).map((key) => {
        const option = question[key];
        const isSelected = selectedAnswer === key;
        return (
          <Card key={key} className={isSelected ? 'border-sky-700' : ''}>
            <CardHeader>
              <CardTitle className="text-base">{option.text}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 text-sm">
              <p>Votes: {option.votes.length}</p>
              <p>Percentage: {percentage(totalVotes, option.votes.length)}</p>
              {isSelected && <p className="font-semibold text-sky-700">Your vote</p>}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
