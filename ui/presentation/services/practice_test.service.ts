import {
  NewPracticeTest,
  PracticeTest,
  UpdatePracticeTest,
  AnswerQuestionData,
} from "@/domain/entities/PracticeTest";
import { ResultWithHistories } from "@/domain/entities/Result";
import axios from "axios";

const base_url = "/api/practice-test";

interface DeleteOptionData {
  questionId: string;
  optionId: string;
}

export async function getUserPracticeTest(): Promise<PracticeTest[]> {
  const response = await axios.get(`${base_url}/user`);
  return response.data;
}

export async function getRandomPracticeTest() {
  const response = await axios.get(`${base_url}/random`);
  return response.data;
}

export async function getPracticeTestDetail(practiceTestId: string) {
  const response = await axios.get(`${base_url}/detail`, {
    params: {
      practice_test_id: practiceTestId,
    },
  });
  return response.data;
}

export async function getPracticeTestRandomDetail(
  practiceTestId: string,
  count: number | undefined,
) {
  const response = await axios.get(`${base_url}/random-question`, {
    params: {
      practice_test_id: practiceTestId,
      count: count,
    },
  });
  return response.data;
}

// Lịch sử
export async function getAllHistories() {
  return await axios.get(`${base_url}/history`);
}

export async function getResultHistory(
  resultId: string,
  practiceTestId: string,
) {
  const response = await axios.get(
    `${base_url}/history/${practiceTestId}?rid=${resultId}`,
  );
  return response.data;
}

// Thêm
export async function createNewPracticeTest(newPracticeTest: NewPracticeTest) {
  return await axios.post(`${base_url}/create`, newPracticeTest);
}

export async function submitPracticeTest(
  practiceTestId: string,
  answerQuestions: AnswerQuestionData,
  questionsCount: number,
  score: number,
) {
  const response = await axios.post(`${base_url}/submit-test`, {
    practiceTestId: practiceTestId,
    answerQuestions: answerQuestions,
    questionsCount: questionsCount,
    score: score,
  });
  return response.data;
}

// Sửa
export async function updatePracticetestService(
  practiceTestId: string,
  updatePracticeTest: UpdatePracticeTest,
) {
  return await axios.put(`${base_url}/update`, {
    practiceTestId: practiceTestId,
    updatePracticeTest: updatePracticeTest,
  });
}

// Xoá
export async function deleteOptionsService(
  practiceTestId: string,
  deleteOptions: DeleteOptionData[],
) {
  return await axios.delete(`${base_url}/delete/options`, {
    data: {
      practiceTestId: practiceTestId,
      deletedOptions: deleteOptions,
    },
  });
}

export async function deleteQuestionsService(
  practiceTestId: string,
  deleteQuestions: string[],
) {
  return await axios.delete(`${base_url}/delete/questions`, {
    data: {
      practiceTestId: practiceTestId,
      deleteQuestions: deleteQuestions,
    },
  });
}

export async function deletePracticeTestService(practiceTestId: string) {
  const response = await axios.delete(`${base_url}/delete`, {
    data: { practiceTestId: practiceTestId },
  });
  return response.data;
}
