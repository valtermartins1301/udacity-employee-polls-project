import { useParams } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PollOptions } from '@/components/PollOptions';
import { VoteResults } from '@/components/VoteResults';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { saveQuestionAnswer } from '@/features/questions/thunks';
import { selectQuestionById } from '@/selectors/questionsSelectors';
import { NotFoundPage } from '@/pages/NotFoundPage';

export function QuestionPage() {
  const { question_id = '' } = useParams();
  const dispatch = useAppDispatch();
  const authedUserId = useAppSelector((state) => state.auth.authedUserId);
  const question = useAppSelector((state) => selectQuestionById(state, question_id));
  const author = useAppSelector((state) => (question ? state.users.entities[question.author] : null));
  const selectedAnswer = useAppSelector((state) =>
    authedUserId && question ? state.users.entities[authedUserId]?.answers[question.id] : undefined,
  );

  if (!authedUserId || !question) {
    return <NotFoundPage />;
  }

  return (
    <Card className="mx-auto max-w-3xl">
      <CardHeader className="items-center text-center">
        <CardTitle>Poll by {author?.id ?? question.author}</CardTitle>
        <Avatar className="h-28 w-28">
          <AvatarImage src={author?.avatarURL} alt={author?.name} />
          <AvatarFallback>{author?.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardContent className="space-y-6">
        <h2 className="text-center text-3xl font-bold">Would You Rather</h2>
        {selectedAnswer ? (
          <VoteResults question={question} selectedAnswer={selectedAnswer} />
        ) : (
          <PollOptions
            question={question}
            onVote={(answer) => {
              void dispatch(saveQuestionAnswer({ qid: question.id, answer }));
            }}
          />
        )}
      </CardContent>
    </Card>
  );
}
