import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/app/hooks';
import { saveQuestion } from '@/features/questions/thunks';

export function NewQuestionPage() {
  const [optionOneText, setOptionOneText] = useState('');
  const [optionTwoText, setOptionTwoText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    const result = await dispatch(saveQuestion({ optionOneText, optionTwoText }));
    if (saveQuestion.rejected.match(result)) {
      setError(result.payload ?? 'Failed to save question.');
      return;
    }
    navigate('/', { replace: true });
  }

  const disabled = !optionOneText.trim() || !optionTwoText.trim();

  return (
    <Card className="mx-auto max-w-3xl">
      <CardHeader className="text-center">
        <CardTitle>Would You Rather</CardTitle>
        <p className="text-slate-500">Create Your Own Poll</p>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={onSubmit}>
          <div>
            <label htmlFor="optionOne" className="mb-2 block text-sm font-medium">
              First Option
            </label>
            <Input
              id="optionOne"
              placeholder="Option One"
              value={optionOneText}
              onChange={(event) => setOptionOneText(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="optionTwo" className="mb-2 block text-sm font-medium">
              Second Option
            </label>
            <Input
              id="optionTwo"
              placeholder="Option Two"
              value={optionTwoText}
              onChange={(event) => setOptionTwoText(event.target.value)}
            />
          </div>
          {error && <p className="text-sm text-red-700">{error}</p>}
          <Button disabled={disabled} type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
