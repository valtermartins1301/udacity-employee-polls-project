import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAppSelector } from '@/app/hooks';
import { QuestionList } from '@/components/QuestionList';
import {
  selectAnsweredQuestionIdsByRecency,
  selectUnansweredQuestionIdsByRecency,
} from '@/selectors/questionsSelectors';

export function HomePage() {
  const authedUserId = useAppSelector((state) => state.auth.authedUserId);
  const user = useAppSelector((state) => (authedUserId ? state.users.entities[authedUserId] : null));
  const unanswered = useAppSelector((state) =>
    authedUserId ? selectUnansweredQuestionIdsByRecency(state, authedUserId) : [],
  );
  const answered = useAppSelector((state) =>
    authedUserId ? selectAnsweredQuestionIdsByRecency(state, authedUserId) : [],
  );

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
      <Tabs defaultValue="unanswered">
        <TabsList>
          <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
          <TabsTrigger value="answered">Answered</TabsTrigger>
        </TabsList>
        <TabsContent value="unanswered">
          <QuestionList ids={unanswered} />
        </TabsContent>
        <TabsContent value="answered">
          <QuestionList ids={answered} />
        </TabsContent>
      </Tabs>
    </section>
  );
}
