import type { Question } from '@/types';
import { Button } from '@/components/ui/button';

interface PollOptionsProps {
  question: Question;
  disabled?: boolean;
  onVote: (answer: 'optionOne' | 'optionTwo') => void;
}

export function PollOptions({ question, disabled = false, onVote }: PollOptionsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Button variant="outline" disabled={disabled} onClick={() => onVote('optionOne')}>
        {question.optionOne.text}
      </Button>
      <Button variant="outline" disabled={disabled} onClick={() => onVote('optionTwo')}>
        {question.optionTwo.text}
      </Button>
    </div>
  );
}
