import { test as setup } from '@playwright/test';

setup('cleanup test data', async ({ request }) => {
  // Clean up test topics
  const testTopics = await request.get('/api/topics');
  const topics = await testTopics.json();
  
  for (const topic of topics) {
    if (topic.name.includes('Test Topic') || topic.name.includes('Delete Me')) {
      await request.delete(`/api/topics/${topic.id}`);
    }
  }
  
  // Clean up test questions
  const testQuestions = await request.get('/api/questions');
  const questions = await testQuestions.json();
  
  for (const question of questions) {
    if (question.question_text.includes('Test Question')) {
      await request.delete(`/api/questions/${question.id}`);
    }
  }
}); 